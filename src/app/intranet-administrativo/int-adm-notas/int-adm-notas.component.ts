import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { DetalleAlumno } from 'src/app/Modelo/DetalleAlumno/detalle-alumno';
import { MlibretaNotas } from 'src/app/Modelo/MLibretaNotas/mlibreta-notas';
import { ClaseService } from 'src/app/Servicio/Clase/clase.service';
import { DetalleAlumnoService } from 'src/app/Servicio/DetalleAlumno/detalle-alumno.service';
import { saveAs } from 'file-saver';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-int-adm-notas',
  templateUrl: './int-adm-notas.component.html',
  styleUrls: ['./int-adm-notas.component.css']
})

export class IntAdmNotasComponent implements OnInit {

  urlBackend:String = URL_BACKEND;

  constructor(private router:Router, private daservicio:DetalleAlumnoService,
    private clservicio:ClaseService, public ususervicio:UsuarioRoleService) { 

  }

  detallealumno:DetalleAlumno;
  detallealumns:DetalleAlumno[] = [];
  libretas:MlibretaNotas[] = [];

  falumno:FormControl = new FormControl('',[Validators.required]);
  fdetallealumno:FormControl = new FormControl('',[Validators.required]);

  mensajeAlumno:String;
  mensajeDetalle:String;
  mensajeTabla:String;
  estadoBusqueda:Boolean;
  estadoDescarga:Boolean;  

  ngOnInit(): void {
    this.estadoBusqueda = false;
    this.estadoDescarga = false;
  }

  

  buscar(){
    if(this.falumno.valid){
      this.mensajeAlumno = "";
      let texto = this.falumno.value;

      this.daservicio.detalle_Buscar(texto).subscribe(datos => {
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
        
        this.clservicio.mostrarLibreta(detalle_alumno.iddetalle_alumno).subscribe(datos => {
          this.libretas = datos;
          this.estadoDescarga = true;
        }, err => {
          this.mensajeTabla = "Sin datos que mostrar";
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
    this.clservicio.descargarLibreta(this.detallealumno.iddetalle_alumno).subscribe(dato => {
      const blob = new Blob([dato],{type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      let numero = Math.round(Math.random() * (12 - 10 )+10);
      saveAs(blob, numero+''+this.detallealumno.alumno.nombre.replace(/\s+/g,'')+'libreta.xls'); 
    });
  }
  
  irAperfil(){
    if(this.ususervicio.isAuthenticated()){
      this.router.navigate(['intra/personal']);
    }
    else{
      this.router.navigate(['login']);
    }
    
  }

  cerrarSesion(){
    this.ususervicio.cerrarSession();
    this.router.navigate(['login']);
  }

}
