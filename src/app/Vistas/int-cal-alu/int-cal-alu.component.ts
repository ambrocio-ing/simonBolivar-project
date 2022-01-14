import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetalleAlumno } from 'src/app/Modelo/DetalleAlumno/detalle-alumno';
import { MlibretaNotas } from 'src/app/Modelo/MLibretaNotas/mlibreta-notas';
import { saveAs } from 'file-saver';
import { DetalleAlumnoService } from 'src/app/Servicio/DetalleAlumno/detalle-alumno.service';
import { UsuarioAlumnoService } from 'src/app/Servicio/UsuarioAlumno/usuario-alumno.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-int-cal-alu',
  templateUrl: './int-cal-alu.component.html',
  styleUrls: ['./int-cal-alu.component.css']
})
export class IntCalAluComponent implements OnInit {

  urlBackend:String = URL_BACKEND;

  constructor(private router:Router, public usualumno:UsuarioAlumnoService,
    private daservicio:DetalleAlumnoService) {

  }

  detallealumno:DetalleAlumno;
  libretas:MlibretaNotas[] = [];

  mensajeTabla:String;
  estadoDescarga:Boolean;

  ngOnInit(): void {
    let idda = this.usualumno.ualumno.iddetalle_alumno;
    this.detallealumno = this.usualumno.ualumno;
    if(idda != null){
      /*this.daservicio.detallealumnObtener(+idda).subscribe(dato => {
        this.detallealumno = dato;
      }, err => {

      });*/

      this.daservicio.mostrarLibreta(+idda).subscribe(datos => {
        this.libretas = datos;
        this.mensajeTabla = "";
        this.estadoDescarga = true;
      },err => {
        this.mensajeTabla = "Sin datos que mostrar";
      });
    }
    
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
  
  descargarLibreta(){
    this.daservicio.descargarLibreta(this.detallealumno.iddetalle_alumno).subscribe(dato => {
      const blob = new Blob([dato],{type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      let numero = Math.round(Math.random() * (12 - 10 )+10);
      saveAs(blob, numero+''+this.detallealumno.alumno.nombre.replace(/\s+/g,'')+'libreta.xlsx'); 
    });
  }   

}
