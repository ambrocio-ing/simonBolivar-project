import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadService } from 'src/app/Servicio/Actividad/actividad.service';
import { URL_BACKEND } from 'src/app/config/config';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';

export interface MActividadEntregadoLista{
  idactividadentregado:Number;
  nombre_alumno:String;    
  archivo:String;
  descripcion:String;
  fecha_entrega:Date;  
}

@Component({
  selector: 'app-revisar-actividades',
  templateUrl: './revisar-actividades.component.html',
  styleUrls: ['./revisar-actividades.component.css']
})
export class RevisarActividadesComponent implements OnInit {

  constructor(private router:Router, private acservicio:ActividadService, public ususervicio:UsuarioRoleService) { }

  public urlBackend:String = URL_BACKEND;

  mactividadlista:MActividadEntregadoLista[] = [];

  mensaje:String;

  ngOnInit(): void {

    let idclase = sessionStorage.getItem('idact');
    if(idclase != null){
      this.acservicio.listarActividadesEntregados(+idclase).subscribe(datos => {
        this.mactividadlista = datos;
        this.mensaje = "";
      }, err => {
        this.mensaje = "Sin datos que mostrar";
      });
    }
  }  

  irActividad(){
    this.router.navigate(['actividad_vista']);
  }

  irAperfil(){
    if(this.ususervicio.isAuthenticated()){
      this.router.navigate(['actividad_vista']);
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
