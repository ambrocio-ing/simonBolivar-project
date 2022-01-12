import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetalleCursoEmpleado } from 'src/app/Modelo/DetalleCursoEmpleado/detalle-curso-empleado';
import { ClaseService } from 'src/app/Servicio/Clase/clase.service';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-perfil-docente',
  templateUrl: './perfil-docente.component.html',
  styleUrls: ['./perfil-docente.component.css']
})
export class PerfilDocenteComponent implements OnInit {

  constructor(private router:Router, private clservicio:ClaseService, 
    public ususervicio:UsuarioRoleService) {

  }

  public urlBackend:String = URL_BACKEND;

  dces:DetalleCursoEmpleado[] = [];
  nombreFoto:String;
  ngOnInit(): void {
    this.nombreFoto = this.ususervicio.usuario.empleado.foto;
    if(!this.ususervicio.isAuthenticated()){
      this.router.navigate(['login']);
    }
    else if(this.ususervicio.verificarRole("ROLE_DOCENTE")){
      let idem = this.ususervicio.usuario.empleado.idempleado;
      if(idem != null){
        this.listarCursos(+idem);
      } 
    }
    else{
      this.ususervicio.cerrarSession();
      this.router.navigate(['login']);
    }       

  }

  //idem:Number = 1;
  mensaje:String;
  listarCursos(idem:Number){
    this.clservicio.listarCursosDocente(idem).subscribe(datos => {
      this.mensaje = "";
      this.dces = datos;
    }, err => {
      this.mensaje = "Sin datos que mostrar";
    });
  }

  

  verCursos(){

    this.router.navigate(['docursos']);
  }

  cerrarSesion(){
    this.ususervicio.cerrarSession();
    this.router.navigate(['login']);
  }

  cambiarContra(){
    this.ususervicio.cerrarSession();
    this.router.navigate(['nueva/contra/docente']);
  }

  crearClase(dce:DetalleCursoEmpleado){
    let iddce = dce.iddetalle_ce;
    if(iddce > 0){
      sessionStorage.setItem("id_dce", iddce.toString());
      this.router.navigate(['clase_vista']);
    }
  }

  entregaNotas(dce:DetalleCursoEmpleado){
    let iddce = dce.iddetalle_ce;
    if(iddce > 0){
      sessionStorage.setItem("iddc_e", iddce.toString());
      this.router.navigate(['det_com']);
    }
  }

  irAtutoria(){    
    this.router.navigate(['tutoria']);

  }

  verificarCurso(dce:DetalleCursoEmpleado):Boolean{
    if(dce.curso.nombre.toUpperCase() == "TUTORIA I" || dce.curso.nombre.toUpperCase() == "TUTORIA II" || 
      dce.curso.nombre.toUpperCase() == "TUTORIA III" || dce.curso.nombre.toUpperCase() == "TUTORIA IV" || 
      dce.curso.nombre.toUpperCase() == "TUTORIA V"){

      return false;

    }
    else{
      return true;
    }
  }

}
