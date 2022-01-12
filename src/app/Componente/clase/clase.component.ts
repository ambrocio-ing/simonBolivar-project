import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators,FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Clase } from 'src/app/Modelo/Clase/clase';
import { DetalleCursoEmpleado } from 'src/app/Modelo/DetalleCursoEmpleado/detalle-curso-empleado';
import { ClaseService } from 'src/app/Servicio/Clase/clase.service';
import { ComunicadorService } from 'src/app/Servicio/Comunicador/comunicador.service';
import { DetalleCursoEmpleadoService } from 'src/app/Servicio/DetalleCursoEmpleado/detalle-curso-empleado.service';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.css']
})
export class ClaseComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private servicio:ClaseService,
     private router:Router,private comunicador:ComunicadorService,
     private dceservicio:DetalleCursoEmpleadoService, public ususervicio:UsuarioRoleService) {

    this.construirForm();
  }

  clase:Clase = new Clase();
  dce:DetalleCursoEmpleado;
  clases:Clase[]; 

  fecha = new Date(Date.now()); 
  botonGuardar:Boolean;
  botonEditar:Boolean;
  mensaje:String; 
 
  formClase:FormGroup;
  formBuscar:FormControl = new FormControl('',[Validators.required]);

  construirForm(){
    this.formClase = this.formBuilder.group({
      fidclase:['',[]],
      ftema:['',[Validators.required]],
      fdescripcion:['',[]],
      flink:['',[]],
      flink_clase:['',[]]
    });
  } 

  asignarValores(cl:Clase){
    cl.idclase = this.formClase.get('fidclase')?.value;    
    cl.dce = this.dce;
    cl.tema = this.formClase.get('ftema')?.value;
    cl.descripcion = this.formClase.get('fdescripcion')?.value;
    cl.link_url = this.formClase.get('flink')?.value;
    cl.link_clase = this.formClase.get('flink_clase')?.value;
    cl.documento1 = "";
    cl.documento2 = "";
    cl.documento3 = "";    
  }

  cargarFormClase(cl:Clase){
    this.formClase.setValue({
      fidclase : cl.idclase,      
      ftema : cl.tema,
      fdescripcion : cl.descripcion,
      flink : cl.link_url,
      flink_clase : cl.link_clase
    });
    this.dce = cl.dce;
  }

  limpiarForm(){
    this.formClase.setValue({
      fidclase : "",
      ftema : "",
      fdescripcion : "",
      flink : "",
      flink_clase : ""
    });
  }

  ngOnInit(): void {
    //let id:Number = 5;
    let id = sessionStorage.getItem('id_dce');
    if(id != null){
      this.servicio.detalleOptener(+id).subscribe(dato => {
        this.dce = dato;
        this.listar();
        this.validarCurso();          
      });
    }    
    //console.log(this.dce);
    //this.mensaje = "";
    this.modoInsercion();    
    
  }

  validarCurso():Boolean{
    if(this.dce.curso.nombre.toUpperCase() == "TUTORIA I" || this.dce.curso.nombre.toUpperCase() == "TUTORIA II" || 
      this.dce.curso.nombre.toUpperCase() == "TUTORIA III" || this.dce.curso.nombre.toUpperCase() == "TUTORIA IV" || 
      this.dce.curso.nombre.toUpperCase() == "TUTORIA V"){

      return false;

    }
    else{
      return true;
    }

  }

  listar(){
    this.servicio.claseLista(this.dce.iddetalle_ce).subscribe(datos => {
      this.clases = datos;
      this.mensaje = "";
    },err => {
      this.mensaje = "Sin datos que mostrar";
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

  enviar(event:Event){
    event.preventDefault();
    if(this.formClase.valid){
      if(this.botonGuardar){
        this.guardar();
      }
      else if(this.botonEditar){
        this.editar();
      }
      else{
        alert("Operación no reconocida");
      }
    }
    else{
      this.formClase.markAllAsTouched();
    }
        
  }

  guardar(){
    this.asignarValores(this.clase);    
    if(this.clase.idclase.toString() == ""){
      this.servicio.claseCrear(this.clase).subscribe(datos => {
        alert("Clase nueva creada con éxito");
        this.ngOnInit();
        this.cancelar();
      });
    }
    else{
      alert("Operación no reconocido")
    }
  }

  obtener(clase:Clase){
    let id = clase.idclase;
    if(id != null){
      this.servicio.claseObtener(+id).subscribe( datos => {
        this.clase = datos;
        this.cargarFormClase(this.clase);        
        this.modoEdicion();
      });
    }
  }


  editar(){
    this.asignarValores(this.clase);
    if(this.clase.idclase.toString() != "" || this.clase.idclase > 0){
      this.servicio.claseEditar(this.clase).subscribe(datos => {
        alert("Actualización completado con éxito");
        this.ngOnInit();
        this.cancelar();
        this.clase.idclase = 0;
      });
    }
    else{
      alert("Operación no reconocido")
    }
  }

  cancelar(){
    this.limpiarForm();
    this.modoInsercion();
    this.formClase.markAsUntouched();
  }

  buscar(){
    if(this.formBuscar.valid){
      let tema:String = this.formBuscar.value;
      this.servicio.claseBuscar(tema).subscribe(datos => {
        this.clases = datos;
      });
    }
  }

  eliminar(clase:Clase){
    let id = clase.idclase;
    if(id != null){
      let confirmar = confirm("Seguro que decea eliminar la clase???? Solo podras si la clase aun no fue usada por otras tablas");
      if(confirmar){
        this.servicio.claseEliminar(+id).subscribe(datos => {
          alert("Registro eliminado con éxito");
          this.ngOnInit();
        });
      }
    }
  }

  //metodos modal

  estadoModal:Boolean;
  claseSeleccionado:Clase;
  
  cargarModal(clase:Clase){   
    this.estadoModal = true;
    this.claseSeleccionado = clase;
  }

  
  addActividad(clase:Clase){ 
    //this.router.navigate(['actividad_vista']);         
    //this.comunicador.enviarClase.emit(clase);
    sessionStorage.setItem('idcl', clase.idclase.toString());
    this.router.navigate(["actividad_vista"]);
  }

  /*obtenerDce(id:Number){
    this.dceservicio.detalleOptener(+id).subscribe(dato => {
      this.dce = dato;
    });
  }*/

  asistencia(clase:Clase){
    sessionStorage.setItem("id_cl",clase.idclase.toString());
    this.router.navigate(['fichaa']);
  }

  irAperfil(){
    if(this.ususervicio.isAuthenticated()){
      this.router.navigate(['intra/docente']);
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
