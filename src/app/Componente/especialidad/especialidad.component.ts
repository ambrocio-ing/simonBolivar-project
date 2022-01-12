import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Especialidad } from 'src/app/Modelo/Especialidad/especialidad';
import { EspecialidadService } from 'src/app/Servicio/Especialidad/especialidad.service';
import { ComunicadorService } from 'src/app/Servicio/Comunicador/comunicador.service';
import { Router } from '@angular/router'
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private servicio:EspecialidadService, 
    private comunicador:ComunicadorService, private router:Router, public ususervicio:UsuarioRoleService) 
    {
    this.detalleForm();
  }

  mensaje:String;
  botonEditar:Boolean;
  botonGuardar:Boolean;

  especialidad:Especialidad = new Especialidad();
  especialidades:Especialidad[];

  formEspecialidad:FormGroup;
  formBuscarNombre = new FormControl('',[Validators.required]);

  ngOnInit(): void {
    this.listar();
    this.botonEditar=false;
    this.botonGuardar=true;
  }

  listar(): void{
    this.servicio.listarEspecialidad().subscribe(datos =>{
      this.especialidades = datos;
    },
    err =>{
      this.mensaje="Sin datos que mostrar";
    });
  }

  detalleForm(){
    this.formEspecialidad = this.formBuilder.group({
      idespecialidad:['',[]],
      nombre:['',[Validators.required]],
      descripcion:['',[]]
    });
  }

  limpiarForm(){
    this.formEspecialidad.setValue({
      idespecialidad:"",
      nombre:"",
      descripcion:""
    });
  }

  cargarEspecialidad(especialidad1:Especialidad){
    especialidad1.idespecialidad = this.formEspecialidad.get('idespecialidad')?.value;
    especialidad1.nombre = this.formEspecialidad.get('nombre')?.value;
    especialidad1.descripcion = this.formEspecialidad.get('descripcion')?.value;
  }

  cargarForm(especialidad1:Especialidad){
    this.formEspecialidad.setValue({
      idespecialidad:especialidad1.idespecialidad,
      nombre:especialidad1.nombre,
      descripcion:especialidad1.descripcion
    });
  }

  save(event:Event){
    event.preventDefault();
    if(this.formEspecialidad.valid)
    {
      if(this.botonGuardar)
      {
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
      this.formEspecialidad.markAllAsTouched();
    }
  }

  guardar(){
    this.cargarEspecialidad(this.especialidad);
    if(this.especialidad.idespecialidad.toString() == "")
    {
      this.servicio.crearEspecialidad(this.especialidad).subscribe(datos =>{
        alert("Operación exitosa");
        this.limpiarForm();
        this.mensaje="";        
        this.ngOnInit();
        this.formEspecialidad.markAsUntouched();        
      }, err=> {
        alert("Operación fallida");
      })
    }
    else{
      alert("Precione Limpiar primero");
    }
    
  }
  
  editar(){
    this.cargarEspecialidad(this.especialidad);
    if(this.especialidad.idespecialidad.toString() != ""){
      this.servicio.editarEspecialidad(this.especialidad).subscribe(datos => {
        alert("Operación exitosa");
        this.limpiarForm();
        this.mensaje="";        
        this.ngOnInit();
        this.formEspecialidad.markAsUntouched();
        this.botonEditar = false;
        this.botonGuardar = true;  
      }, err => {
        alert("Operación fallida");
      });
    }
    else{
      alert("Falta identificador del registro");
    }
    
  }

  obtener(especialidad:Especialidad){
    let id = especialidad.idespecialidad;
    if(id != null)
    {
      this.servicio.obtenerEspecialidad(id).subscribe(datos => {
        this.especialidad = datos;
        this.cargarForm(this.especialidad);
        this.botonGuardar=false;
        this.botonEditar = true;
      }, err =>{
        alert("Imposible editar");
      });
    }
  }

  limpiar(){
    this.limpiarForm();
    this.botonEditar = false;
    this.botonGuardar = true;
    this.formEspecialidad.markAsUntouched();
  }

  eliminar(especialidad:Especialidad){
    let id = especialidad.idespecialidad;
    if(id != null){
      let confirmar = confirm("Seguro que desea eliminar?? solo podras eliminar si el registro nunca fue usado");
      if(confirmar)
      {
        this.servicio.eliminarEspecialidad(id).subscribe(datos => {
          alert("Operación exitosa");
          this.ngOnInit();
        },err =>{
          alert("Operación fallida");
        });
      }
      
    }
  }

  Buscar(){
    let nombre = this.formBuscarNombre.value;
    this.especialidad.nombre = nombre;
    this.servicio.buscarEspecialidad(this.especialidad).subscribe(datos =>{
      this.especialidades = datos;
      this.mensaje = "";
    }, err =>{
      this.mensaje = "Sin datos que mostrar";
    });
  }

  enviar(especialidad:Especialidad){
    let id = especialidad.idespecialidad;
    if(id != null)
    {
      this.servicio.obtenerEspecialidad(id).subscribe(datos => {
        this.especialidad = datos;
        this.comunicador.disparador2.emit(this.especialidad);
      }, err =>{
        alert("Imposible enviar datos");
      });
    }
  }  

  irAperfil() {
    if (this.ususervicio.isAuthenticated()) {
      this.router.navigate(['intra/personal']);
    }
    else {
      this.ususervicio.cerrarSession()
      this.router.navigate(['login']);
    }

  }

  cerrarSesion() {
    this.ususervicio.cerrarSession()
    this.router.navigate(['login']);
  }

}
