import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service'
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-intra-administrativo',
  templateUrl: './intra-administrativo.component.html',
  styleUrls: ['./intra-administrativo.component.css']
})
export class IntraAdministrativoComponent implements OnInit {

  constructor(private router:Router, public urservicio:UsuarioRoleService) { }

  public urlBackend:String = URL_BACKEND;
  
  nombreFoto:String;

  ngOnInit(): void {
    this.nombreFoto = this.urservicio.usuario.empleado.foto;
    if(!this.urservicio.isAuthenticated()){      
      this.router.navigate(['login']);
    }
    else if(this.urservicio.verificarRole("ROLE_ADMIN") || this.urservicio.verificarRole("ROLE_ADMINISTRATIVO") || this.urservicio.verificarRole("ROLE_USER")
    || this.urservicio.verificarRole("ROLE_AHUXILIAR")){
      
    }
    else{
      this.urservicio.cerrarSession();
      this.router.navigate(['login']);
    }   
      

  }

  cargarRole(){

  }

  gestionUsuarios(){

    this.router.navigate(['usuarios']);
  }

  gestionPersonal(){
    this.router.navigate(['personal']);
  }

  gestionEstudiante(){
    this.router.navigate(['detalle-alumno']);
  }

  asistenciaPersonal(){
    //this.router.navigate(['asispersonal'])
  }

  gestionPeriodoLectivo(){
    this.router.navigate(['bimestre']);
  }

  gestionCompetencias(){
    this.router.navigate(['competencias']);
  }

  gestionCursos(){
    this.router.navigate(['cursos']);
  }

  gestionHorarios(){
    this.router.navigate(['horario']);
  }

  monitoreoClases(){
    this.router.navigate(['monitoreo']);
  }

  gestionDocumentos(){
    this.router.navigate(['admdoc']);
  }

  padronPadres(){
    this.router.navigate(['apcrear']);
  }

  registroAhuxiliar(){
    this.router.navigate(['registro/ahuxiliar']);
  }

  informeAprovechamiento(){
    this.router.navigate(['informe']);
  }

  libretoNotas(){
    this.router.navigate(['admnotas']);
  }

  analisisNotas(){
    this.router.navigate(['analinotas']);
  }

  actualizarNoticias(){
    this.router.navigate(['noticias']);
  }

  cerrarSesion(){
    this.urservicio.cerrarSession();
    this.router.navigate(['login']);
  }

  cambiarContra(){
    this.urservicio.cerrarSession();
    this.router.navigate(['nueva/contra']);
  }

}
