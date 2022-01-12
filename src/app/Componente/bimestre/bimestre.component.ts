import { formatDate } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bimestre } from 'src/app/Modelo/Bimestre/bimestre';
import { PeriodoCalificacionService } from 'src/app/Servicio/PeriodoCalificacion/periodo-calificacion.service';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';

@Component({
  selector: 'app-bimestre',
  templateUrl: './bimestre.component.html',
  styleUrls: ['./bimestre.component.css']
})
export class BimestreComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, 
    private pcservicio:PeriodoCalificacionService, 
    private router:Router, public ususervicio:UsuarioRoleService) { 

    this.construirForm();
  }

  bimestre:Bimestre = new Bimestre();
  bimestres:Bimestre[] = [];

  fbimestre:FormGroup;

  fechahoy = new Date(Date.now());

  botonGuardar:Boolean;
  botonEditar:Boolean;

  construirForm(){
    this.fbimestre = this.formBuilder.group({
      fidbimestre : ['',[]],
      fnombre : ['',[Validators.required]],
      fdescripcion : ['',[]],
      finicio : [formatDate(this.fechahoy, "yyyy-MM-dd","en"),[Validators.required]],
      ffin : [formatDate(this.fechahoy, "yyyy-MM-dd","en"),[Validators.required]]
    });
  }

  obtenerValoresForm(bim:Bimestre){
    bim.idbimestre = this.fbimestre.get('fidbimestre')?.value;
    bim.nombre = this.fbimestre.get('fnombre')?.value;
    bim.descripcion = this.fbimestre.get('fdescripcion')?.value;
    bim.fecha_inicio = this.fbimestre.get('finicio')?.value;
    bim.fecha_fin = this.fbimestre.get('ffin')?.value;

  }

  limpiarForm(){
    this.fbimestre.setValue({
      fidbimestre : "",
      fnombre : "",
      fdescripcion :"",
      finicio :formatDate(this.fechahoy, "yyyy-MM-dd","en"),
      ffin : formatDate(this.fechahoy, "yyyy-MM-dd","en")
    });
  }

  cargarForm(bim:Bimestre){
    this.fbimestre.setValue({
      fidbimestre : bim.idbimestre,
      fnombre : bim.nombre,
      fdescripcion : bim.descripcion,
      finicio :formatDate(bim.fecha_inicio, "yyyy-MM-dd","en"),
      ffin : formatDate(bim.fecha_fin, "yyyy-MM-dd","en")
    });
  }

  modoInsercion(){
    this.botonGuardar = true;
    this.botonEditar = false;
  }

  modoEdicion(){
    this.botonGuardar = false;
    this.botonEditar = true;
  }

  mensaje:String;

  ngOnInit(): void {
    this.modoInsercion();
    this.listar();
  }

  listar(){
    this.pcservicio.bimLista().subscribe(datos => {
      this.bimestres = datos;
      this.mensaje = "";
    }, err => {
      this.mensaje = "Sin datos que mostrar";
    });
  }

  enviar(event:Event){
    event.preventDefault();
    if(this.fbimestre.valid){
      if(this.botonGuardar){
        this.guardar();
      }
      else if(this.botonEditar){
        this.editar();
      }
      else{
        alert("Operación no reconocido");
      }
    }
    else{
      this.fbimestre.markAllAsTouched();
    }
  }

  guardar(){
    this.obtenerValoresForm(this.bimestre);
    if(this.bimestre.idbimestre.toString() == ""){
      this.pcservicio.bimCrear(this.bimestre).subscribe(datos => {
        alert("Registro creado con éxito");
        this.ngOnInit();
        this.cancelar();
      });
    }
    else{
      alert("Operación no reconocido");
    }
  }

  obtener(bimestre:Bimestre){
    let id:Number = bimestre.idbimestre;
    if(id > 0){
      this.pcservicio.bimObtener(id).subscribe(datos => {
        this.bimestre = datos;
        this.cargarForm(this.bimestre);
        this.modoEdicion();
      });
    }
  }

  editar(){
    this.obtenerValoresForm(this.bimestre);
    if(this.bimestre.idbimestre.toString() != ""){
      this.pcservicio.bimEditar(this.bimestre).subscribe(dato => {
        alert("Registro actualizado con éxito");
        this.ngOnInit();
        this.cancelar();
      });
    }
    else{
      alert("Operación no reconocido");
    }
  }

  eliminar(bimestre:Bimestre){
    let id = bimestre.idbimestre;
    if(id != null){
      let confirmar = confirm("Seguro que desea eliminar????");
      if(confirmar){
        this.pcservicio.bimEliminar(id).subscribe(dato => {
          alert("Registro borrado con éxito");
          this.ngOnInit();
        });
      }
    }
  }

  cancelar(){
    this.fbimestre.markAsUntouched();
    this.limpiarForm();
    this.modoInsercion();
  }

  irAperfil(){
    if(this.ususervicio.isAuthenticated()){
      this.router.navigate(['intra/personal']);
    }
    else{
      this.ususervicio.cerrarSession();
      this.router.navigate(['login']);
    }
    
  }

  cerrarSesion(){
    this.ususervicio.cerrarSession();
    this.router.navigate(['login']);
  }

}
