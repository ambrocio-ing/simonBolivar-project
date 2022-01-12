import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Apoderado } from 'src/app/Modelo/Apoderado/apoderado';
import { ApServicioService } from 'src/app/Servicio/Apoderado/ap-servicio.service';
import { Router } from '@angular/router';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';

@Component({
  selector: 'app-apcrear',
  templateUrl: './apcrear.component.html',
  styleUrls: ['./apcrear.component.css']
})
export class ApcrearComponent implements OnInit {

  formApoderadoCrear: FormGroup;
  formBuscar= new FormControl('',[Validators.required]);
  apoderados:Apoderado[];

  estadoGuardar:Boolean;
  estadoEditar:Boolean;

  constructor(private servicio: ApServicioService,private router:Router, 
    public ususervicio:UsuarioRoleService) {

    this.formCrear();
  }

  ngOnInit(): void { 
    this.listar();
    this.estadoEditar = false;
    this.estadoGuardar = true;
  }

  mensaje:String;
  listar(): void{
    this.servicio.getApoderados().subscribe(lista => {
      this.apoderados=lista
      this.mensaje = "";
    },err => {
      this.mensaje = "Sin datos que mostrar";
    });
  }  

  private formCrear() {
    this.formApoderadoCrear = new FormGroup({
      idapoderado: new FormControl('', []),
      dni: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d{7,7}$/),
      Validators.minLength(8), Validators.maxLength(8)]),
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d{6,8}$/)]),
      sexo: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      password: new FormControl('',[]),
      estado: new FormControl('',[Validators.required]),
      acceso: new FormControl('ROLE_APODERADO',[])
    }) 
  }

  apoderado: Apoderado = new Apoderado();

  llenarApoderado(apoderado2: Apoderado) {
    apoderado2.idapoderado = this.formApoderadoCrear.get('idapoderado')?.value;
    apoderado2.dni = this.formApoderadoCrear.get('dni')?.value;
    apoderado2.nombre = this.formApoderadoCrear.get('nombre')?.value;
    apoderado2.apellidos = this.formApoderadoCrear.get('apellidos')?.value;
    apoderado2.direccion = this.formApoderadoCrear.get('direccion')?.value;
    apoderado2.telefono = this.formApoderadoCrear.get('telefono')?.value;
    apoderado2.sexo = this.formApoderadoCrear.get('sexo')?.value;
    apoderado2.password = this.formApoderadoCrear.get('password')?.value;
    apoderado2.estado = this.formApoderadoCrear.get('estado')?.value;
    apoderado2.acceso = "ROLE_APODERADO";
    
  }

  llenarForm(apoderado1: Apoderado) {
    this.formApoderadoCrear.setValue({
      idapoderado: apoderado1.idapoderado,
      dni: apoderado1.dni,
      nombre: apoderado1.nombre,
      apellidos: apoderado1.apellidos,
      direccion: apoderado1.direccion,
      telefono: apoderado1.telefono,
      sexo: apoderado1.sexo,
      password : "",
      estado : apoderado1.estado,
      acceso : apoderado1.acceso
    });
  }

  limpiarForm(){
    this.formApoderadoCrear.setValue({
      idapoderado: "",
      dni: "",
      nombre: "",
      apellidos: "",
      direccion: "",
      telefono: "",
      sexo: "",
      password : "",
      estado : "Activo",
      acceso : "ROLE_APODERADO"      
    });
  }  

  save(event: Event) {
    event.preventDefault();
    if (this.formApoderadoCrear.valid) {
      //guardar      
      if(this.estadoGuardar){
        this.apoderadoSave();
      }
      else if(this.estadoEditar)
      {
        this.apoderadoEditar();
      }
      else{
        alert("Operación no reconocida");
      }
            
    }
    else {
      this.formApoderadoCrear.markAllAsTouched();
      
    }
  }

  apoderadoSave() {
    this.llenarApoderado(this.apoderado);    
    if(this.apoderado.idapoderado.toString() == "")
    {      
      this.servicio.crearApoderado(this.apoderado).subscribe(valor => {
        alert("Operación exitoso");
        this.limpiarForm();
        this.formApoderadoCrear.markAsUntouched();
        this.ngOnInit();      
      },err=>{
        alert("Operación fallida");
      });
      
    }
    else
    {      
      alert("Operación no reconocida");   
    }   

  }

  obtenerApoderado(apoderado:Apoderado){    
    let id = apoderado.idapoderado
    if (id != null) {
      this.servicio.optenerApoderado(+id).subscribe(dato => {
        this.apoderado = dato;
        this.llenarForm(this.apoderado);
        this.estadoEditar = true;
        this.estadoGuardar = false;
      });
    }
  } 

  apoderadoEditar(){
    this.llenarApoderado(this.apoderado);
    if(this.apoderado.idapoderado.toString() != "")
    {
      this.servicio.editarApoderado(this.apoderado).subscribe(valor => {
        alert("Actualización exitoso");
        this.limpiarForm();        
        this.formApoderadoCrear.markAsUntouched();        
        this.ngOnInit();
        this.estadoEditar = false;
        this.estadoGuardar = true;
        }, err=>{
        alert("Operación fallida");
      });
    }
    else
    {      
      alert("Operación no reconocida");   
    }  
    
  }

  

  eliminar(apoderado:Apoderado){
    var confirmar = confirm("Seguro que desea eliminar? solo podrá eliminar en caso de que no exista asignaciones previas");
    if(confirmar)
    {
      this.servicio.eliminarApoderado(apoderado.idapoderado).subscribe(valor =>{
        alert("Operación exitosa!!!!!");
        this.ngOnInit();
      },err=>{
        alert("Es posible que el apoderado ya este asignado a algún alumno");
      });
      
    }
    
  }

  limpiar(){
    this.limpiarForm();
    this.estadoEditar = false;
    this.estadoGuardar = true;
    this.formApoderadoCrear.markAsUntouched();    
  }

  Buscar(){
    //event.preventDefault();
    if(this.formBuscar.valid)
    {
      let nombre = this.formBuscar.value;      
      this.servicio.buscarApoderado(nombre).subscribe(datos =>{
        this.apoderados = datos;
        this.mensaje = "";      
      }, err => {
        this.mensaje = "Sin datos que mostrar";
      });
    }
    else{
      this.formBuscar.markAsTouched();
    }    
    
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
