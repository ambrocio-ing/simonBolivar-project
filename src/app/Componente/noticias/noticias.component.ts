import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cronograma } from 'src/app/Modelo/Cronograma/cronograma';
import { CronogramaService } from 'src/app/Servicio/Cronograma/cronograma.service';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  constructor(public ususervicio:UsuarioRoleService,
    private router:Router, private formBuilder:FormBuilder, private crservicio:CronogramaService) { 
      this.construirForm();
  }

  cronograma:Cronograma = new Cronograma();
  cronogramas:Cronograma[] = [];

  fechahoy = new Date(Date.now());

  fcronograma:FormGroup;
  formBuscar:FormControl = new FormControl(formatDate(this.fechahoy,"yyyy-MM-dd","en"),[]);  

  construirForm(){
    this.fcronograma = this.formBuilder.group({
      idcronograma : ['',[]],
      fecha : [formatDate(this.fechahoy,"yyyy-MM-dd","en"),[Validators.required]],
      link_video:['',[]],
      descripcion : ['',[]],
      estado:['',[Validators.required]]
    });
  }

  asignarValores(cr:Cronograma){
    cr.idcronograma = this.fcronograma.get('idcronograma')?.value;
    cr.fecha = this.fcronograma.get('fecha')?.value;
    cr.link_video = this.fcronograma.get('link_video')?.value;
    cr.archivo = "";
    cr.descripcion = this.fcronograma.get('descripcion')?.value;
    cr.estado = this.fcronograma.get('estado')?.value;
  }

  limpiarForm(){
    this.fcronograma.setValue({
      idcronograma : "",
      fecha : formatDate(this.fechahoy,"yyyy-MM-dd","en"),
      link_video : "",
      descripcion : "",
      estado : "Publicar"
    });
  }

  cargarForm(cr:Cronograma){
    this.fcronograma.setValue({
      idcronograma : cr.idcronograma,
      fecha : formatDate(cr.fecha,"yyyy-MM-dd","en"),
      link_video : cr.link_video,
      descripcion : cr.descripcion,
      estado : cr.estado
      
    });
  }

  estadoGuardar:Boolean;
  estadoEditar:Boolean;

  modoInsercion(){
    this.estadoGuardar = true;
    this.estadoEditar = false;
  }

  modoEdicion(){
    this.estadoGuardar = false;
    this.estadoEditar = true;
  }

  ngOnInit(): void {
    this.modoInsercion();
    this.listar();
  }

  mensaje:String;

  listar(){
    this.crservicio.crLista().subscribe(datos => {
      this.cronogramas = datos;
      this.mensaje  = "";
    }, err => {
      this.mensaje = "Sin datos que mostrar";
    });
  }

  save(event:Event){
    event.preventDefault();
    if(this.fcronograma.valid){
      if(this.estadoGuardar){
        this.guardar();
      }
      else if(this.estadoEditar){
        this.editar();
      }
      else{
        alert("Operación no reconocido");
      }
    }
    else{
      this.fcronograma.markAllAsTouched();
    }
  }

  guardar(){
    this.asignarValores(this.cronograma);
    if(this.cronograma.idcronograma.toString() == ""){
      this.crservicio.crCrear(this.cronograma).subscribe(dato => {
        alert("Registro creado con éxito");
        this.ngOnInit();
        this.limpiar();
      });
    }
    else{
      alert("Operación no reconocido");
    }
  }

  obtener(cronograma:Cronograma){
    let id = cronograma.idcronograma;
    if(id != null){
      this.crservicio.crOptener(id).subscribe(dato => {
        this.cronograma = dato;
        this.cargarForm(this.cronograma);
        this.modoEdicion();
      });
    }
  }

  editar(){
    this.asignarValores(this.cronograma);
    if(this.cronograma.idcronograma.toString() != ""){
      this.crservicio.crEditar(this.cronograma).subscribe(dato => {
        alert("Registro editado con éxito");
        this.ngOnInit();
        this.limpiar();
      });
    }
    else{
      alert("Operación no reconocido");
    }
  }

  eliminar(cronograma:Cronograma){
    let id = cronograma.idcronograma;
    if(id != null){
      let confirmar = confirm("Seguro que desea eliminar el registro????");
      if(confirmar){
        this.crservicio.crEliminar(id).subscribe(dato => {
          alert("Registro eliminado con éxito")
          this.ngOnInit();
        });
      }      
    }
  }  

  limpiar(){
    this.limpiarForm();
    this.modoInsercion();
    this.fcronograma.markAsUntouched();
  }

  buscar(){
    if(this.formBuscar.valid){
      let fecha = this.formBuscar.value;
      this.crservicio.crBuscar(fecha).subscribe(datos => {
        this.cronogramas = datos;
        this.mensaje = "";
      }, err => {
        this.mensaje = "Sin datos que mostrar";
      });
    }
  }

  irAperfil(){
    if(this.ususervicio.isAuthenticated()) {
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


  //modal
  estadoModal:Boolean;
  cronogramaSeleccionado:Cronograma;

  abrirModal(cronograma:Cronograma){
    this.cronogramaSeleccionado = cronograma;
    this.estadoModal = true;
  }


}
