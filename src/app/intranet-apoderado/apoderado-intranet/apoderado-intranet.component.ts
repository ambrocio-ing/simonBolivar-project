import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DetalleAlumno } from 'src/app/Modelo/DetalleAlumno/detalle-alumno';
import { MlibretaNotas } from 'src/app/Modelo/MLibretaNotas/mlibreta-notas';
import { ClaseService } from 'src/app/Servicio/Clase/clase.service';
import { DetalleAlumnoService } from 'src/app/Servicio/DetalleAlumno/detalle-alumno.service';
import { saveAs } from 'file-saver';
import { ApoderadoService } from 'src/app/Servicio/Apoderado/apoderado.service';
import { UsuarioApoderadoService } from 'src/app/Servicio/UsuarioApoderado/usuario-apoderado.service';
import { Mcursos } from 'src/app/Informes/MCurso/mcursos';

@Component({
  selector: 'app-apoderado-intranet',
  templateUrl: './apoderado-intranet.component.html',
  styleUrls: ['./apoderado-intranet.component.css']
})
export class ApoderadoIntranetComponent implements OnInit {

  constructor(private router:Router,private apservicio:ApoderadoService, public usuapoderado:UsuarioApoderadoService) { 

  }

  detallealumno:DetalleAlumno;
  detallealumns:DetalleAlumno[] = [];
  libretas:MlibretaNotas[] = [];

  mcursos:Mcursos[] = [];

  falumno:FormControl = new FormControl('',[Validators.required]);
  fdetallealumno:FormControl = new FormControl('',[Validators.required]);

  mensajeAlumno:String;
  mensajeDetalle:String;
  mensajeTabla:String;
  estadoBusqueda:Boolean;
  estadoDescarga:Boolean;  

  ngOnInit(): void {
    if(this.usuapoderado.isAuthenticated()){
      this.estadoBusqueda = false;
      this.estadoDescarga = false;
    }
    else{      
      this.router.navigate(['login']);
    }
    
  }  

  buscar(){
    if(this.falumno.valid){
      this.mensajeAlumno = "";
      let texto = this.falumno.value;
      let idpo = this.usuapoderado.uapoderado.idapoderado;
      this.apservicio.detalle_Buscar(texto, +idpo).subscribe(datos => {
        this.detallealumns = datos;
        this.estadoBusqueda = true;
      }, err => {
        this.mensajeAlumno = "No se encontro coincidencias";
      });

    }
    else{
      this.mensajeAlumno = "Campo requerido";
    }
  }

  mostrarLibreta(){
    if(this.fdetallealumno.valid){
      this.mensajeDetalle = "";
      this.mensajeTabla = "";
      this.libretas.length = 0;
      let detalle_alumno:DetalleAlumno = this.fdetallealumno.value;
      if(detalle_alumno != null || detalle_alumno != undefined){
        this.detallealumno = detalle_alumno;       
        
        this.apservicio.mostrarLibreta(detalle_alumno.iddetalle_alumno).subscribe(datos => {
          this.libretas = datos;
          this.estadoDescarga = true;
        }, err => {
          this.mensajeTabla = "Sin datos que mostrar";
        });

        this.apservicio.listarAsistencias(detalle_alumno.iddetalle_alumno).subscribe(datos => {
          this.mcursos = datos;
        }, err => {
          
        });

      }
      else{
        this.mensajeDetalle = "Ocurrio un error";
      }
    }
    else{
      this.mensajeDetalle = "Primero seleccione alumno";
    }
  }

  descargarLibreta(){
    this.apservicio.descargarLibreta(this.detallealumno.iddetalle_alumno).subscribe(dato => {
      const blob = new Blob([dato],{type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      let numero = Math.round(Math.random() * (12 - 10 )+10);
      saveAs(blob, numero+''+this.detallealumno.alumno.nombre.replace(/\s+/g,'')+'libreta.xlsx'); 
    });
  }

  cerrarSesion(){
    this.usuapoderado.cerrarSession();
    this.router.navigate(['login']);
  }

  cambiarContra(){
    this.usuapoderado.cerrarSession();
    this.router.navigate(['nueva/contra/apoderado']);
  }

}
