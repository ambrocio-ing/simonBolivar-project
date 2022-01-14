import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Clase } from 'src/app/Modelo/Clase/clase';
import { FichaAsistencia } from 'src/app/Modelo/FichaAsistencia/ficha-asistencia';
import { ClaseService } from 'src/app/Servicio/Clase/clase.service';
import { FichaAsistenciaService } from 'src/app/Servicio/FichaAsistencia/ficha-asistencia.service';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';

@Component({
  selector: 'app-ficha-asistencia',
  templateUrl: './ficha-asistencia.component.html',
  styleUrls: ['./ficha-asistencia.component.css']
})
export class FichaAsistenciaComponent implements OnInit {

  constructor(private clservicio:ClaseService, private faservicio:FichaAsistenciaService,
    private router:Router, public ususervicio:UsuarioRoleService) {

  }

  clase:Clase;

  //fichaasistencia:FichaAsistencia;
  fichaasistencias:FichaAsistencia[] = [];

  ngOnInit(): void {  
    this.recuperarClase();
  }

  recuperarClase(){
    let idclase = sessionStorage.getItem("id_cl");
    if(idclase != null){
        this.clservicio.claseObtener(+idclase).subscribe(dato => {
          this.clase = dato;
          this.recuperarListaDeAlumnos();
        });

    }
  }

  recuperarListaDeAlumnos(){
    this.faservicio.recuperarAsistencia(this.clase.idclase).subscribe(datos => {
      this.fichaasistencias = datos;
    }, err => {
      this.faservicio.listaDeAlumnos(this.clase.idclase).subscribe(datos => {
        this.fichaasistencias = datos;        
      });
    });
    
  }

  fcondicion:FormControl = new FormControl('',[Validators.required]);

  condicionCambiar(fichaasistencia:FichaAsistencia){
    fichaasistencia.condicion = this.fcondicion.value;
  }

  guardar(){
    let estado:Boolean = true;

    for(let ficha of this.fichaasistencias){
      if(ficha.condicion == null || ficha.condicion == ""){
        estado = false;
        break;
      }
    }

    if(estado == true){            
      this.faservicio.fichaCrear(this.fichaasistencias).subscribe(dato => {
        alert("Asistencia registrado con éxito");
        this.faservicio.recuperarAsistencia(this.clase.idclase).subscribe(datos => {
          this.fichaasistencias = datos;
        });
      });
    }
    else{
      alert("Procura Llenar todas las asistencias");
    }
    
  }

  editar(fichaasistencia:FichaAsistencia){
    if(fichaasistencia.idfichaasistencia.toString() != ""){
      this.faservicio.fichaEditar(fichaasistencia).subscribe(dato => {
        alert("Asistencia actualizado con éxito");
        
      });
    }
  }

  descargar(){    
    this.faservicio.descargarFicha(this.clase.idclase).subscribe(dato => {
      const blob = new Blob([dato],{type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      let numero = Math.round(Math.random() * (12 - 10 )+10);
      saveAs(blob, numero+''+this.clase.tema.replace(/\s+/g,'')+'ficha.xlsx');  
    }, err => {
      alert("Ficha asistencia para esta clase no fue encontrado");
    });
  }

  irClase(){
    if (this.ususervicio.isAuthenticated()) {
      this.router.navigate(['clase_vista']);
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
