import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URL_BACKEND } from 'src/app/config/config';
import { Horario } from 'src/app/Modelo/Horario/horario';
import { DetalleAlumnoService } from 'src/app/Servicio/DetalleAlumno/detalle-alumno.service';
import { UsuarioAlumnoService } from 'src/app/Servicio/UsuarioAlumno/usuario-alumno.service';

@Component({
  selector: 'app-int-hor-alu',
  templateUrl: './int-hor-alu.component.html',
  styleUrls: ['./int-hor-alu.component.css']
})
export class IntHorAluComponent implements OnInit {

  constructor(private router:Router,public usualumno:UsuarioAlumnoService, 
    private daservicio:DetalleAlumnoService) {

  }

  public urlBackend:String = URL_BACKEND;

  horario:Horario;
  mensaje:String;
  ngOnInit(): void {
    let idda = this.usualumno.ualumno.iddetalle_alumno;
    this.daservicio.recuperarHorario(idda).subscribe(dato => {
      this.horario = dato;
      this.mensaje = "";
    }, err => {
      this.mensaje = "Sin datos que mostrar";
    });

  }

  irAperfil(){
    if(this.usualumno.isAuthenticated()){
      this.router.navigate(['aula']);
    }
    else{
      this.usualumno.cerrarSession();
      this.router.navigate(['login']);
    }
    
  }

  cerrarSesion(){
    this.usualumno.cerrarSession();
    this.router.navigate(['login']);
  }

}
