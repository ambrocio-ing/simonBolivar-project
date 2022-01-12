import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Masistencia } from 'src/app/Informes/MAsistencia/masistencia';
import { Mcursos } from 'src/app/Informes/MCurso/mcursos';
import { DetalleAlumno } from 'src/app/Modelo/DetalleAlumno/detalle-alumno';
import { DetalleAlumnoService } from 'src/app/Servicio/DetalleAlumno/detalle-alumno.service';
import { DetaleBimestreCompetenciaService } from 'src/app/Servicio/DetalleBimestreCompetencia/detale-bimestre-competencia.service';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';
import { Tutor } from 'src/app/Modelo/Tutor/tutor';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-detalle-bimestre-competencia',
  templateUrl: './detalle-bimestre-competencia.component.html',
  styleUrls: ['./detalle-bimestre-competencia.component.css']
})
export class DetalleBimestreCompetenciaComponent implements OnInit {

  urlBackend:String = URL_BACKEND;

  constructor(private daservicio: DetalleAlumnoService,    
    private dbcservicio: DetaleBimestreCompetenciaService,
    private router:Router, public ususervicio:UsuarioRoleService) {

  } 

  detallealums:DetalleAlumno[] = [];

  fechahoy = new Date(Date.now());

  falumno:FormControl = new FormControl('',[Validators.required]);
  fdetallealumno:FormControl = new FormControl('',[Validators.required]);
  //ffecha:FormControl = new FormControl(formatDate(this.fechahoy,"yyyy-MM-dd","en"),[Validators.required]);

  mensajeAlumno:String;
  mensajeFecha:String;
  mensajeValidar:String;
  mensajeBuscar:String;
  mensajeda:String;

  ngOnInit(): void {   

  }

  buscarAlumno(){
    if(this.falumno.valid){
      let texto:String = this.falumno.value;
      this.daservicio.detalle_Buscar(texto).subscribe(datos => {
        this.detallealums = datos;
        this.mensajeBuscar = "";
        this.mensajeAlumno = "";
      }, err => {
        this.mensajeBuscar = "No se encontro coincidencias";
      });
    }
    else{
      this.mensajeAlumno = "Ingrese alumno abuscar";
    }
  }
  mensajeAsistencias:String;
  mcursos:Mcursos[] = [];
  alumnoselect:DetalleAlumno;
  masistencias:Masistencia[] = [];
  tutor:Tutor;

  mensajeTutor:String;
  validarAlumno(){
        
    if(this.fdetallealumno.valid){
      this.mensajeda = "";
      let detallealumno:DetalleAlumno = this.fdetallealumno.value;
      this.alumnoselect = detallealumno;
      if(detallealumno.iddetalle_alumno.toString() != ""){

        this.dbcservicio.obtenerTutor(detallealumno.iddetalle_alumno).subscribe(dato => {
          this.tutor = dato;
          this.mensajeTutor = "";
        }, err => {
          this.mensajeTutor = "Sin tutor";
        });

        this.dbcservicio.listarInformeAprovechamiento(detallealumno.iddetalle_alumno).subscribe(datos => {
          this.mcursos = datos;
          this.mensajeValidar = "";
        }, err => {
          this.mensajeValidar = "No se encontraron coincidencias";
          this.mcursos.length = 0;
        });

        this.dbcservicio.listarAsistencia(detallealumno.iddetalle_alumno).subscribe(datos => {
          this.masistencias = datos;
        }, err => {
          this.mensajeAsistencias = "Sin datos que mostrar";
        });

      }
    }
    else{
      this.mensajeda = "Seleccione detalle de alumno";
    }
  }

  descargar(){    
    
    this.dbcservicio.descargaExcelAprovechamiento(this.alumnoselect.iddetalle_alumno).subscribe(dato => {
      const blob = new Blob([dato],{type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      let numero = Math.round(Math.random() * (12 - 10 )+10);
      saveAs(blob, numero+''+this.alumnoselect.alumno.nombre.replace(/\s+/g,'')+'reporteAprovechamiento.xlsx');  
    }, err => {
      alert("No se pudo descargar documento");
    });
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
