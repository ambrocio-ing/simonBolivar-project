import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Clase } from 'src/app/Modelo/Clase/clase';
import { ClaseService } from 'src/app/Servicio/Clase/clase.service';
import { URL_BACKEND } from 'src/app/config/config';


@Component({
  selector: 'app-clase-archivos',
  templateUrl: './clase-archivos.component.html',
  styleUrls: ['./clase-archivos.component.css']
})
export class ClaseArchivosComponent implements OnInit {

  constructor(private servicio:ClaseService) { }

  public urlBackend:String = URL_BACKEND;

  @Input() clase:Clase;

  mensajeErrorDocumento1:String;
  mensajeErrorDocumento2:String;
  mensajeErrorDocumento3:String;
  progreso:Number = 0;

  estadoBoton:Boolean;

  @Input() visibleModal:Boolean;
  @Output() cerrar : EventEmitter<Boolean> = new EventEmitter();
  //@Output() abrir = new EventEmitter();

  ngOnInit(): void {
    this.estadoBoton = false;

  } 

  documento1Seleccionado:File;
  documento2Seleccionado:File;
  documento3Seleccionado:File;

  cerrarModal(){
    this.cerrar.emit(false);
    this.progreso = 0;
    this.documento1Seleccionado == null;
    this.documento2Seleccionado == null;
    this.documento3Seleccionado == null;
  }

  capturarDocumento1(event:Event){
    const target = event.target as HTMLInputElement;
    this.documento1Seleccionado = (target.files as FileList)[0];
    this.progreso = 0;
    this.estadoBoton = true;
  }

  capturarDocumento2(event:Event){
    const target = event.target as HTMLInputElement;
    this.documento2Seleccionado = (target.files as FileList)[0];
    this.progreso = 0;
    this.estadoBoton = true;

  }

  capturarDocumento3(event:Event){
    const target = event.target as HTMLInputElement;
    this.documento3Seleccionado = (target.files as FileList)[0];
    this.progreso = 0;
    this.estadoBoton = true;
  }

  guardar(){

    if(this.documento1Seleccionado != null || this.documento2Seleccionado != null || this.documento3Seleccionado != null)
    {
      this.servicio.claseCrearArchivos(this.documento1Seleccionado,this.documento2Seleccionado,
        this.documento3Seleccionado,this.clase.idclase).subscribe(event => {
          if(event.type === HttpEventType.UploadProgress && event.total != undefined){
            this.progreso = Math.round((event.loaded / event.total)*100);
          }
          else if(event.type === HttpEventType.Response){
            let response:any = event.body;          
            this.clase.documento1 = response.documento1;
            this.clase.documento2 = response.documento2;
            this.clase.documento3 = response.documento3;         
            alert(response.mensaje);          
          }    
        });
    } 

  }

  eliminarUno(clase: Clase) {
    let id = clase.idclase;
    let texto = clase.documento1;
    let confirma = confirm("Seguro que desea eliminar el documento");
    if (confirma) {
      this.servicio.claseEliminarArchivo(id, texto).subscribe(event => {
        if (event.type === HttpEventType.Response) {
          let response: any = event.body;
          this.clase = response.clase;
          alert(response.mensaje);
        }
      });
    }

  }

  eliminarDos(clase: Clase) {
    let id = clase.idclase;
    let texto = clase.documento2;
    let confirma = confirm("Seguro que desea eliminar el documento");
    if (confirma) {
      this.servicio.claseEliminarArchivo(id, texto).subscribe(event => {
        if (event.type === HttpEventType.Response) {
          let response: any = event.body;
          this.clase = response.clase;
          alert(response.mensaje);
        }
      });
    }
  }

  eliminarTres(clase: Clase) {
    let id = clase.idclase;
    let texto = clase.documento3;
    let confirma = confirm("Seguro que desea eliminar el documento");
    if (confirma) {
      this.servicio.claseEliminarArchivo(id, texto).subscribe(event => {
        if (event.type === HttpEventType.Response) {
          let response: any = event.body;
          this.clase = response.clase;
          alert(response.mensaje);
        }
      });
    }
  }
}
