import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Clase } from 'src/app/Modelo/Clase/clase';
import { DetalleCursoEmpleado } from 'src/app/Modelo/DetalleCursoEmpleado/detalle-curso-empleado';
import { ClaseService } from 'src/app/Servicio/Clase/clase.service';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-tutoria',
  templateUrl: './tutoria.component.html',
  styleUrls: ['./tutoria.component.css']
})
export class TutoriaComponent implements OnInit {

  constructor(private clservicio:ClaseService, 
    public ususervicio:UsuarioRoleService, private router:Router) {

  }

  public urlBackend:String = URL_BACKEND;

  dce:DetalleCursoEmpleado;
  clases:Clase[] = [];
  mensajeTutor:String;

  fechahoy = new Date(Date.now());

  ffecha:FormControl = new FormControl(formatDate(this.fechahoy,"yyyy-MM-dd","en"),[]);
  estadoBusqueda:Boolean;

  ngOnInit(): void {
    let idem = this.ususervicio.usuario.empleado.idempleado;
    if(idem != null){
      this.clservicio.dceParaTutoria(idem).subscribe(dato => {
        this.dce = dato;
        this.estadoBusqueda = true;
        let fecha = this.ffecha.value;
        this.encontrarClases(this.dce.iddetalle_ce,fecha);
        
      }, err =>{
        this.estadoBusqueda = false;
        this.mensajeTutor = "No se encontro registros";
      });
    }
    else{
      this.mensajeTutor = "Sin datos que mostrar";
    }
    
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
  encontrarClases(iddce:Number,fecha:String){
    this.clservicio.listaDeClasesParaTutoria(iddce,fecha).subscribe(datos => {
      this.clases = datos;
      this.mensajeClase = "";
    }, err => {
      this.mensajeClase = "Sin clases que mostrar";
    });
  }

  buscarClases(){
    let fecha = this.ffecha.value;
    this.clservicio.listaDeClasesParaTutoria(this.dce.iddetalle_ce,fecha).subscribe(datos => {
      this.clases = datos;
      this.mensajeClase = "";
    }, err => {
      this.mensajeClase = "Sin clases que mostrar";
    });
  }

  irAperfil(){ 
    if(this.ususervicio.isAuthenticated()){
      this.router.navigate(['intra/docente']);
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

}
