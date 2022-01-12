import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apoderado } from 'src/app/Modelo/Apoderado/apoderado';
import { DetalleAlumno } from 'src/app/Modelo/DetalleAlumno/detalle-alumno';
import { Usuario } from 'src/app/Modelo/Usuario/usuario';
import { EmpleadoService } from 'src/app/Servicio/Empleado/empleado.service';
import { UsuarioAlumnoService } from 'src/app/Servicio/UsuarioAlumno/usuario-alumno.service';
import { UsuarioApoderadoService } from 'src/app/Servicio/UsuarioApoderado/usuario-apoderado.service';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private ususervicio:UsuarioRoleService,
    private router:Router, private emservicio:EmpleadoService, 
    private usualumno:UsuarioAlumnoService, private usuapoderado:UsuarioApoderadoService) {

      this.construirForm();
  }

  flogin:FormGroup;

  usuario:Usuario = new Usuario();
  titulo:String = "Por favor ingrese sus credenciales";

  construirForm(){
    this.flogin = this.formBuilder.group({
      fusername:['',[Validators.required]],
      fpassword:['',[Validators.required]],
      facceso:['',[Validators.required]]
    });
  }

  obtenerValoresForm(usu:Usuario){
    usu.username = this.flogin.get('fusername')?.value;
    usu.password = this.flogin.get('fpassword')?.value;
  }

  estadoBoton:Boolean;
  ngOnInit(): void {
    this.estadoBoton = true;
    if(this.ususervicio.isAuthenticated()){
      
      alert("Hola: "+this.ususervicio.usuario.empleado.nombre+" Ya estas autenticado");
      if(this.ususervicio.verificarRole("ROLE_ADMIN") || this.ususervicio.verificarRole("ROLE_ADMINISTRATIVO") || this.ususervicio.verificarRole("ROLE_USER") || this.ususervicio.verificarRole("ROLE_AHUXILIAR")){
        this.router.navigate(['intra/personal']);
      }
      else if(this.ususervicio.verificarRole("ROLE_DOCENTE")){
        this.router.navigate(['intra/docente']);
      }
      else{
        this.ususervicio.cerrarSession();
        this.router.navigate(['login']);
        this.estadoBoton = true;
      }     
      
    }
    else if(this.usualumno.isAuthenticated()){
      alert("Hola: "+this.usualumno.ualumno.alumno.nombre+" ya estas autenticado");
      this.estadoBoton = false;
      this.router.navigate(['aula']);
      
    }
    else if(this.usuapoderado.isAuthenticated()){
      alert("Hola: "+this.usuapoderado.uapoderado.nombre+" ya estas autenticado");
      this.estadoBoton = false;
      this.router.navigate(['apo/intra']);
      
    }
    else{
      sessionStorage.clear();
      this.router.navigate(['login']);
      this.estadoBoton = true;
    }

  }

  mensajeLogin:String;

  save(event:Event){
    event.preventDefault();    
    if(this.flogin.valid){ 
      
      this.obtenerValoresForm(this.usuario);
      if(this.usuario.username == null || this.usuario.password == null){
        alert("Error inicio de sesión, Nombre de usuario o contraseña vacias");
        return;
      }

      let valor = this.flogin.get('facceso')?.value;

      if(valor != null && valor == "Alumno"){

        this.usualumno.login(this.usuario.username,this.usuario.password).subscribe(dato => {
          this.mensajeLogin = "";
          
          let uTemporal:DetalleAlumno = dato;                
          this.usualumno.guardarUsuario(uTemporal);

          if(this.usualumno.verificarRole("ROLE_ESTUDIANTE")){
            this.router.navigate(['aula']);
          }
          else{
            this.usualumno.cerrarSession();
            alert("ERROR: ACCESO DENEGADO -- CREDENCIALES INCORRECTOS");
          }          
           
        }, err => {
          this.mensajeLogin = "Autenticación fallida, usuario o contraseña incorrectas";
        });

        
      }
      else if(valor != null && valor == "Administrativo"){      
        
        this.ususervicio.login(this.usuario).subscribe(datos => {
          this.mensajeLogin = "";
          
          let uTemporal:Usuario = datos;                
          this.ususervicio.guardarUsuario(uTemporal);
          if(this.ususervicio.verificarRole("ROLE_ADMIN") || this.ususervicio.verificarRole("ROLE_ADMINISTRATIVO") || this.ususervicio.verificarRole("ROLE_USER")
           || this.ususervicio.verificarRole("ROLE_AHUXILIAR")){
            this.router.navigate(['intra/personal']);
          }
          else{
            this.ususervicio.cerrarSession();
            alert("ERROR: NO TIENES PERMISO PARA ACCESO ADMINISTRATIVO");
          }
          
           
        }, err => {
          this.mensajeLogin = "Autenticación fallida, usuario o contraseña incorrectas";
        });        

      }
      else if(valor != null && valor == "Docente"){

        this.ususervicio.login(this.usuario).subscribe(datos => {
          this.mensajeLogin = "";
          
          let uTemporal:Usuario = datos;      
          this.ususervicio.guardarUsuario(uTemporal);
          if(this.ususervicio.verificarRole("ROLE_DOCENTE")){
            this.router.navigate(['intra/docente']);
          }
          else{
            this.ususervicio.cerrarSession();
            alert("ERROR: ACCESO DENEGADO NO ESTAS AUTORIZADO");
          }
          
           
        }, err => {
          this.mensajeLogin = "Autenticación fallida, usuario o contraseña incorrectas";
        });
        

      }
      else if(valor != null && valor == "Apoderado"){

        this.usuapoderado.login(this.usuario.username, this.usuario.password).subscribe(dato => {
          this.mensajeLogin = "";
          
          let uTemporal:Apoderado = dato;      
          this.usuapoderado.guardarUsuario(uTemporal);
          if(this.usuapoderado.verificarRole("ROLE_APODERADO")){
            this.router.navigate(['apo/intra']);
          }
          else{
            this.usuapoderado.cerrarSession();
            alert("ERROR: ACCESO DENEGADO NO ESTAS AUTORIZADO");
          }
          
           
        }, err => {
          this.mensajeLogin = "Autenticación fallida, usuario o contraseña incorrectas";
        });

      }
      else{
        alert("Operación no reconocido");
      }

      
    }
    else{
      alert("Error inicicio de sesión, Nombre de usuario o contraseña vacias");
    }    
    
  } 
  
  
}
