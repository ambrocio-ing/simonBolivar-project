import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/Modelo/Alumno/alumno';
import { AlumnoService } from 'src/app/Servicio/Alumno/alumno.service';
import { FormControl } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { ComunicadorService } from 'src/app/Servicio/Comunicador/comunicador.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-alumno-foto',
  templateUrl: './alumno-foto.component.html',
  styleUrls: ['./alumno-foto.component.css']
})
export class AlumnoFotoComponent implements OnInit {

  @Input() alumno:Alumno;

  @Input() visibleFoto : boolean;
  @Output() cerrarFoto : EventEmitter<boolean> = new EventEmitter();
  @Output() cargarFoto = new EventEmitter(); 

  public urlBackend:String = URL_BACKEND;

  constructor(private servicio:AlumnoService) { 
      
  }  

  ngOnInit(): void {
    /*this.activateRoute.paramMap.subscribe(params =>{
      let id = params.get('id');
      if(id){
        this.servicio.alumnoObener(+id).subscribe(datos => {
          this.alumno = datos;
        });
      }
    })*/
  }

  fotoSeleccionado:File;
  estadoBoton:Boolean;  
  progreso:number = 0;

  capturarFoto(event:Event){    
    const tar_get = (event.target as HTMLInputElement);
    //const archivo: File = (target.files as FileList)[0];
    this.fotoSeleccionado = (tar_get.files as FileList)[0];
    this.progreso = 0;
    if(this.fotoSeleccionado.type.indexOf('image') < 0){
      alert("El archivo debe ser una imagen");     
      this.estadoBoton = false;
    }
    else{
      this.estadoBoton = true;
    }
    
  }

  guardar(){
    if(!this.fotoSeleccionado){
      alert("Primero seleccione una imagen");
    }
    else{
      this.servicio.subirFoto(this.fotoSeleccionado,this.alumno.idalumno).subscribe(event => {

        if(event.type === HttpEventType.UploadProgress && event.total != undefined){
          this.progreso = Math.round((event.loaded / event.total)*100);
        }
        else if(event.type === HttpEventType.Response){
          let response:any = event.body;
          //this.alumno = response.alumno as Alumno
          this.alumno.foto = response.nombre;
          //this.comunicador.notificarLaRecarga.emit(this.alumno.foto);
          alert(response.mensaje);          
        }        
        
      });
    }    
  }

  cerrarModal(){
    this.cerrarFoto.emit(false);
    this.fotoSeleccionado == null;
    this.progreso = 0;
  }
  
}
