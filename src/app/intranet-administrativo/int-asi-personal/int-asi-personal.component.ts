import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';
import { FichaAsistenciaService } from 'src/app/Servicio/FichaAsistencia/ficha-asistencia.service';
import { MfichaAsistenciaLista } from 'src/app/Modelo/MFichaAsistenciaLista/mficha-asistencia-lista';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';

@Component({
  selector: 'app-int-asi-personal',
  templateUrl: './int-asi-personal.component.html',
  styleUrls: ['./int-asi-personal.component.css']
})
export class IntAsiPersonalComponent implements OnInit {

  constructor(private router:Router, private faservicio:FichaAsistenciaService, public ususervicio:UsuarioRoleService){}

  mfichas:MfichaAsistenciaLista[] = [];

  ngOnInit(): void { 
    this.cargarAsistencia();
  }
  
  mensajeAsistencia:String;
  cargarAsistencia(){
    let idclase = sessionStorage.getItem("i_d_c_l");
    if(idclase != null){
      this.mensajeAsistencia = "";
      this.faservicio.listarAsistenciaDelDia(+idclase).subscribe(datos => {
        this.mfichas = datos;
      }, err => {
        this.mensajeAsistencia = "Sin datos que mostrar: Lista no encontrado";
      });
    }
  }
  
  irAperfil(){
    if(this.ususervicio.verificarRole("ROLE_ADMIN") || this.ususervicio.verificarRole("ROLE_ADMINISTRATIVO") ||
     this.ususervicio.verificarRole("ROLE_AHUXILIAR") || this.ususervicio.verificarRole("ROLE_USER")){
      this.router.navigate(['monitoreo']);
    }    
    else if(this.ususervicio.verificarRole("ROLE_DOCENTE")){
      this.router.navigate(['tutoria']);
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

  
}
