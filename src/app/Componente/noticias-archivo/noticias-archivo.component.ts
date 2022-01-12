import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cronograma } from 'src/app/Modelo/Cronograma/cronograma';
import { CronogramaService } from 'src/app/Servicio/Cronograma/cronograma.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-noticias-archivo',
  templateUrl: './noticias-archivo.component.html',
  styleUrls: ['./noticias-archivo.component.css']
})
export class NoticiasArchivoComponent implements OnInit {

  constructor(private crservicio:CronogramaService) { }

  public urlBackend:String = URL_BACKEND;

  @Input() visible:Boolean;
  @Output() cerrar:EventEmitter<Boolean> = new EventEmitter();

  progreso:Number = 0;

  @Input() cronograma : Cronograma;

  estadoBoton:Boolean;

  archivoSeleccionado:File;

  ngOnInit(): void {
  }

  cerrarModal(){
    this.cerrar.emit(false);
    this.progreso = 0;
    this.archivoSeleccionado == null;
  }

  capturarArchivo(event:Event){
    let target = event.target as HTMLInputElement;
    this.archivoSeleccionado = (target.files as FileList)[0];
    this.progreso = 0;
    if(this.archivoSeleccionado.type.indexOf('image') < 0){
      alert("El archivo debe ser una imagen");     
      this.estadoBoton = false;
    }
    else{
      this.estadoBoton = true;
    }

  }  

  guardar(){
    if(this.archivoSeleccionado != null){
      this.crservicio.crArchivo(this.archivoSeleccionado,this.cronograma.idcronograma).subscribe(event => {
        if(event.type === HttpEventType.UploadProgress && event.total != undefined){
          this.progreso = Math.round((event.loaded / event.total)*100);
        }
        else if(event.type === HttpEventType.Response){
          let response:any = event.body;
          this.cronograma.archivo = response.nombre;
          alert(response.mensaje);
        }   
      });
    }
  }
  
}
