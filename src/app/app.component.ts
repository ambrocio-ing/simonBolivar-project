import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComunicadorService } from './Servicio/Comunicador/comunicador.service';
import { UsuarioAlumnoService } from './Servicio/UsuarioAlumno/usuario-alumno.service';
import { UsuarioApoderadoService } from './Servicio/UsuarioApoderado/usuario-apoderado.service';
import { UsuarioRoleService } from './Servicio/UsuarioRole/usuario-role.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto-colegio';

  constructor(private router:Router, private comunicador:ComunicadorService, 
    public usuusuario:UsuarioRoleService, public usualumno:UsuarioAlumnoService,
    public usuapoderado:UsuarioApoderadoService){

  } 

  iniciarSesion(){    
    this.router.navigate(['login']);
  }
  
  navegarInicio(){
    if(this.estadoAutenticacion()){
      alert("Cerrar sesión primero");
    }
    else{
      this.router.navigate(['']);
    }
    
  }

  tramite(){
    this.router.navigate(['tramite']);
  }

  irApoderado(){
    if(this.usuapoderado.isAuthenticated()){
      this.router.navigate(['apo/intra']);
    }
    else{
      this.router.navigate(['login']);
    }
    
  }

  estadoAutenticacion():Boolean{
    if(this.usuusuario.isAuthenticated() || this.usualumno.isAuthenticated() || this.usuapoderado.isAuthenticated()){
      return true;
    }
    else{
      return false;
    }
  }

  cerrarSesion(){
    if(this.usuusuario.isAuthenticated()){
      this.usuusuario.cerrarSession();
      this.router.navigate(['']);
    }
    else if(this.usualumno.isAuthenticated()){
      this.usualumno.cerrarSession();
      this.router.navigate(['']);
    }
    else if(this.usuapoderado.isAuthenticated()){
      this.usuapoderado.cerrarSession();
      this.router.navigate(['']);
    }
    else{
      sessionStorage.clear();
      this.router.navigate(['']);
    }
  }
  
}
