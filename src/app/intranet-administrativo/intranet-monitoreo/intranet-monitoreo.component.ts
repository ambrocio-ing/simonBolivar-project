import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Clase } from 'src/app/Modelo/Clase/clase';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { ClaseService } from 'src/app/Servicio/Clase/clase.service';
import { FichaAsistenciaService } from 'src/app/Servicio/FichaAsistencia/ficha-asistencia.service';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-intranet-monitoreo',
  templateUrl: './intranet-monitoreo.component.html',
  styleUrls: ['./intranet-monitoreo.component.css']
})
export class IntranetMonitoreoComponent implements OnInit {

  constructor(private router:Router,
    private clservicio:ClaseService, private faservicio:FichaAsistenciaService, 
    public ususervicio:UsuarioRoleService) {

  }

  public urlBackend:String = URL_BACKEND;

  clases:Clase[] = [];
  clase:Clase;

  fechaHoy = new Date(Date.now());

  ffecha:FormControl = new FormControl(formatDate(this.fechaHoy,"yyyy-MM-dd","en"),[]);

  ngOnInit(): void {
    this.listarAsistenciasDelDia();
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  mensajeClase:String;

  listarAsistenciasDelDia(){
    let fecha:String = this.ffecha.value;
    this.mensajeClase = "";
    if(fecha != null){
      this.clservicio.claseListaDelDia(fecha).subscribe(datos => {
        this.clases = datos;
      }, err => {
        this.mensajeClase = "Sin clases que mostrar";
      });
    }
  }

  buscarClases(){
    let fecha:String = this.ffecha.value;
    this.mensajeClase = "";
    if(fecha != null){
      this.clservicio.claseListaDelDia(fecha).subscribe(datos => {
        this.clases = datos;
      }, err => {
        this.mensajeClase = "Sin clases que mostrar";
      });
    }
  }

  verAsistencias(clase:Clase){
    let id_clase:Number = clase.idclase;
    if(id_clase > 0){
      sessionStorage.setItem("i_d_c_l", id_clase.toString());
      this.router.navigate(['asispersonal']);
    }
  } 

  verificarCurso(clase:Clase):Boolean{
    if(clase.dce.curso.nombre.toUpperCase() == "TUTORIA I" || clase.dce.curso.nombre.toUpperCase() == "TUTORIA II" ||
      clase.dce.curso.nombre.toUpperCase() == "TUTORIA III" || clase.dce.curso.nombre.toUpperCase() == "TUTORIA IV" ||
      clase.dce.curso.nombre.toUpperCase() == "TUTORIA V"){

      return false;

    }
    else{
      return true;
    }
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
