import { NodeWithI18n, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, FormControl } from '@angular/forms';
import { Empleado } from 'src/app/Modelo/Empleado/empleado';
import { Especialidad } from 'src/app/Modelo/Especialidad/especialidad';
import { ComunicadorService } from 'src/app/Servicio/Comunicador/comunicador.service';
import { EmpleadoService } from 'src/app/Servicio/Empleado/empleado.service';
import { formatDate } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import {URL_BACKEND} from 'src/app/config/config';

interface HtmlInputEvent extends Event{
  target:HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {  

  constructor(private formBuilder:FormBuilder,private comunicador:ComunicadorService,
    private servicio:EmpleadoService,private sanitizer:DomSanitizer)
    {
    this.detalleForm();
  }

  public urlBackend:String = URL_BACKEND;

  fechahoy = new Date(Date.now());
  foto:File;

  formEmpleado:FormGroup;
  formNombreEspe = new FormControl();
  formIdespecialidad = new FormControl('',[Validators.required]);
  formBuscarPersonal = new FormControl('',[Validators.required]);

  empleados:Empleado[];
  empleado:Empleado = new Empleado();
  mensaje:String;
  especialidad:Especialidad = new Especialidad();

  estadoEditar:Boolean;
  estadoGuardar:Boolean;

  estado():void{
    this.estadoEditar = false;
    this.estadoGuardar = true;
  }

  ngOnInit(): void {
    this.listar();
    this.cargarEspecialidad();
    this.estado();
  }

  listar():void{
    this.servicio.listarEmpleado().subscribe(datos => {
      this.empleados = datos;
      this.mensaje = "";
    }, err => {
      this.mensaje = "Sin datos que mostrar";
    });
  }

  detalleForm(){
    this.formEmpleado = this.formBuilder.group({
      idempleado:['',[]],
      dni:['',[Validators.required,Validators.pattern(/^[0-9]\d{7,7}$/)]],
      nombre:['',[Validators.required]],
      apellidos:['',[Validators.required]],
      genero:['',[Validators.required,Validators.maxLength(1)]],
      fecha_nac:[formatDate(this.fechahoy,"yyyy-MM-dd","en"),[Validators.required]],
      estado_civil:['',[Validators.required]],      
      direccion:['',[]],
      telefono:['',[Validators.pattern(/^[0-9]\d{6,8}$/)]],        
      estado:['',[Validators.required]],
    });
  }

  llenarEmpleado(empleado1:Empleado){    
    empleado1.idempleado = this.formEmpleado.get('idempleado')?.value;
    empleado1.dni = this.formEmpleado.get('dni')?.value;
    empleado1.nombre = this.formEmpleado.get('nombre')?.value;
    empleado1.apellidos = this.formEmpleado.get('apellidos')?.value;
    empleado1.genero = this.formEmpleado.get('genero')?.value;
    empleado1.fecha_nac = this.formEmpleado.get('fecha_nac')?.value;
    empleado1.estado_civil = this.formEmpleado.get('estado_civil')?.value;
    empleado1.foto = "";
    empleado1.direccion = this.formEmpleado.get('direccion')?.value;
    empleado1.telefono = this.formEmpleado.get('telefono')?.value;    
    empleado1.cv = "";
    empleado1.estado = this.formEmpleado.get('estado')?.value;
    empleado1.especialidad = this.especialidad;
  }

  limpiarForm(){
    this.formEmpleado.setValue({
      idempleado:"",
      dni:"",
      nombre:"",
      apellidos:"",
      genero:"",
      fecha_nac:formatDate(this.fechahoy,'yyyy-MM-dd','en'),
      estado_civil:"",      
      direccion:"",  
      telefono:"",        
      estado:""
    });
    this.formIdespecialidad.setValue("");
    this.formNombreEspe.setValue("");
  }

  cargarForm(empleado1:Empleado):void{
    this.formEmpleado.setValue({
      idempleado : empleado1.idempleado,
      dni : empleado1.dni,
      nombre : empleado1.nombre,
      apellidos : empleado1.apellidos,
      genero : empleado1.genero,
      fecha_nac : formatDate(empleado1.fecha_nac,'yyyy-MM-dd','en'),
      estado_civil : empleado1.estado_civil,      
      direccion : empleado1.direccion,
      telefono : empleado1.telefono,        
      estado : empleado1.estado      
    });
    this.especialidad = empleado1.especialidad;
    this.formIdespecialidad.setValue(empleado1.especialidad.idespecialidad);
    this.formNombreEspe.setValue(empleado1.especialidad.nombre);
  }

  limpiar(){
    this.limpiarForm();
    this.estado();
    this.formEmpleado.markAsUntouched();
    this.formIdespecialidad.markAsUntouched();
  }

  save(event:Event){
    if(this.formEmpleado.valid && this.formIdespecialidad.valid){
      if(this.estadoGuardar)
      {
        this.guardar();
      }
      else if(this.estadoEditar)
      {
        this.editar();
      }
      else
      {
        alert("Operación no reconocida");
      }
    }
    else{
      this.formEmpleado.markAllAsTouched();
      this.formIdespecialidad.markAsTouched();
    }
  }

  guardar(){
    this.llenarEmpleado(this.empleado);
    if(this.empleado.especialidad.idespecialidad.toString() != ""){
      if(this.empleado.idempleado.toString() == ""){
        this.servicio.crearEmpleado(this.empleado).subscribe(datos =>{
          this.limpiarForm();
          alert("Operación exitosa");
          this.ngOnInit();
          this.formEmpleado.markAsUntouched();
          this.formIdespecialidad.markAsUntouched();
          this.mensaje = "";          
        });
      }
      else{
        alert("Limpie controles primero");
      }
    }
    else{
      alert("Llene por completo el formulario");
    }
    
  }

  obtener(empleado:Empleado){
    let id = empleado.idempleado;
    if(id != null){
      this.servicio.obtenerEmpleado(id).subscribe(datos =>{
        this.empleado = datos;
        this.cargarForm(this.empleado);
        this.estadoEditar = true;
        this.estadoGuardar = false;
                
      });
    }
  }

  editar(){
    this.llenarEmpleado(this.empleado);    
    if(this.empleado.especialidad.idespecialidad.toString() != ""){
      if(this.empleado.idempleado.toString() != ""){
        this.servicio.editarEmpleado(this.empleado).subscribe(datos =>{
          this.limpiarForm();
          alert("Operación exitosa");
          this.ngOnInit();
          this.formEmpleado.markAsUntouched();
          this.formIdespecialidad.markAsUntouched();                 
        });
      }
      else{
        alert("Imposible editar faltan datos");
      }
    }
    else{
      alert("Operación no identificada");
    }
  }

  eliminar(empleado:Empleado){
    let id = empleado.idempleado;
    if(id != null){
      let confirmar = confirm("Seguro qu desea eliminar?? Solo podras eliminar si el personal numca fue asignado");
      if(confirmar){
        this.servicio.eliminarEmpleado(id).subscribe( datos => {
          alert("Operación exitosa");
          this.ngOnInit();
        });
        
      }      
    }
  }

  navegar(el:HTMLElement){
    el.scrollIntoView();
  }

  
  cargarEspecialidad(){
    this.comunicador.disparador2.subscribe(datos =>{
      this.especialidad = datos;
      this.formIdespecialidad.setValue(this.especialidad.idespecialidad);
      this.formNombreEspe.setValue(this.especialidad.nombre);
    });
  }

  buscar():void{
    if(this.formBuscarPersonal.valid)
    {
      let nombre = this.formBuscarPersonal.value;      
      this.empleado.nombre = nombre;
      this.servicio.buscarEmpleado(this.empleado).subscribe(datos => {
        this.empleados = datos;
        this.mensaje = "";
      }, err => {
        this.mensaje = "Sin datos que mostrar";
      });
      
    }
    
  }
  
  fileName="";
  file:File;
  previsualizacion:string;
  

  fotoSeleccionado(event:Event):any{    
    const target = (event.target as HTMLInputElement);
    const archivo: File = (target.files as FileList)[0];        
    this.extraerBase64(archivo).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      this.foto=archivo;
      this.asignarFoto();               
    });
  }
  
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const imagen = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      
    }
  });

  asignarFoto(){
    if(this.foto){
      this.fileName = this.foto.name;
      const fomrData = new FormData();
      fomrData.append('foto',this.foto);
      console.log(fomrData);
    }
  }

  //metodos y propiedades para modal de subir archivos
  estadoModal:Boolean;

  empleadoSeleccionado:Empleado;
  abrirModal(empleado:Empleado){
    this.estadoModal = true;
    this.empleadoSeleccionado = empleado;
  }

}
