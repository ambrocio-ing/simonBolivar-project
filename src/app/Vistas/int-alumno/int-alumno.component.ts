import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetalleAlumno } from 'src/app/Modelo/DetalleAlumno/detalle-alumno';
import { DetalleCursoEmpleado } from 'src/app/Modelo/DetalleCursoEmpleado/detalle-curso-empleado';
import { DetalleAlumnoService } from 'src/app/Servicio/DetalleAlumno/detalle-alumno.service';
import { DetalleCursoEmpleadoService } from 'src/app/Servicio/DetalleCursoEmpleado/detalle-curso-empleado.service';
import { UsuarioAlumnoService } from 'src/app/Servicio/UsuarioAlumno/usuario-alumno.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-int-alumno',
  templateUrl: './int-alumno.component.html',
  styleUrls: ['./int-alumno.component.css']
})
export class IntAlumnoComponent implements OnInit {

  constructor(private router:Router,private daservicio:DetalleAlumnoService,
    private dceservicio:DetalleCursoEmpleadoService, public usualumno:UsuarioAlumnoService) {

  }

  public urlBackend:String = URL_BACKEND;

  detallealumno:DetalleAlumno;
  dces:DetalleCursoEmpleado[] = [];

  nombreFoto:String;

  ngOnInit(): void {
    this.nombreFoto = this.usualumno.ualumno.alumno.foto;
    if(!this.usualumno.isAuthenticated()){      
      this.router.navigate(['login']);
    }
    else if(this.usualumno.isAuthenticated() && this.usualumno.verificarRole("ROLE_ALUMNO")){
      this.detallealumno = this.usualumno.ualumno;
    }
    else{
      this.usualumno.cerrarSession();
      this.router.navigate(['login']);
    }    
    
  }     

  irArea(){
    this.router.navigate(['areas']);
  }  

  irHorario(){
    this.router.navigate(['ver/hor']);
  }

  irAsistencia(){
    this.router.navigate(['asistencia']);
  }

  irCalificaciones(){
    this.router.navigate(['calificaciones']);
  }

  cerrarSesion(){
    this.usualumno.cerrarSession();
    this.router.navigate(['login']);
  }

  cambiarContra(){
    this.usualumno.cerrarSession();
    this.router.navigate(['nueva/contra/alumno']);
  }

}
