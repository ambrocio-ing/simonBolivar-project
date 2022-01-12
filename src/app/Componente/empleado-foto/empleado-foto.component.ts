import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Empleado } from 'src/app/Modelo/Empleado/empleado';
import { EmpleadoService } from 'src/app/Servicio/Empleado/empleado.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-empleado-foto',
  templateUrl: './empleado-foto.component.html',
  styleUrls: ['./empleado-foto.component.css']
})
export class EmpleadoFotoComponent implements OnInit {

  public urlBackend:String = URL_BACKEND;

  @Input() empleado:Empleado;

  @Input() visibleModal:Boolean;
  @Output() cerrar:EventEmitter<Boolean> = new EventEmitter();
  @Output() abrirModal = new EventEmitter();
  
  progreso:Number = 0;  
  estadoBoton:Boolean;

  fotoSeleccionado:File;
  cvSeleccionado:File;

  constructor(private servicio:EmpleadoService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.cerrar.emit(false);
    this.progreso = 0;
    this.fotoSeleccionado == null;
    this.cvSeleccionado == null;
  }

  mensajeErrorFoto:String;
  mensajeErrorCV:String;

  capturarFoto(event:Event){
    const target = event.target as HTMLInputElement;
    this.fotoSeleccionado = (target.files as FileList)[0];
    this.progreso = 0;
    if(this.fotoSeleccionado.type.indexOf('image') < 0){
      this.mensajeErrorFoto = "Selecione una imagen";  
      this.estadoBoton = false;
    }
    else{
      this.estadoBoton = true;
      this.mensajeErrorFoto = "";
    }
  }

  capturarCV(event:Event){
    const target = event.target as HTMLInputElement;
    this.cvSeleccionado = (target.files as FileList)[0];
    this.progreso = 0;
    if(this.cvSeleccionado.type.indexOf('image') < 0){          
      this.estadoBoton = true;
      this.mensajeErrorCV = "";
    }
    else{
      this.estadoBoton = false;
      this.mensajeErrorCV = "Seleccione un archivo diferente a una imagen";
    }
  }

  guardar(){
    if(!this.fotoSeleccionado){
      alert("Primero seleccione una imagen");
    }
    else{
      this.servicio.subirArchivo(this.fotoSeleccionado,this.cvSeleccionado,this.empleado.idempleado).subscribe(event => {

        if(event.type === HttpEventType.UploadProgress && event.total != undefined){
          this.progreso = Math.round((event.loaded / event.total)*100);
        }
        else if(event.type === HttpEventType.Response){
          let response:any = event.body;          
          this.empleado.foto = response.foto;
          this.empleado.cv = response.cv;          
          alert(response.mensaje);          
        }        
        
      }, err => {
        alert("Ocurrio error: Asegurece de ingresar siempre los dos archivos");
      });
    }    
  }

}
