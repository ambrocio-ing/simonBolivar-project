import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ActividadEntregado } from 'src/app/Modelo/ActividaEntregado/actividad-entregado';
import { ActividadEntregadoService } from 'src/app/Servicio/ActividadEntregado/actividad-entregado.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-archivo-entregado',
  templateUrl: './archivo-entregado.component.html',
  styleUrls: ['./archivo-entregado.component.css']
})
export class ArchivoEntregadoComponent implements OnInit {

  constructor(private servicio:ActividadEntregadoService) { }

  public urlBackend:String = URL_BACKEND;

  @Input() visible:Boolean;
  @Output() cerrar:EventEmitter<Boolean>  = new EventEmitter();

  estadoBoton:Boolean;
  progreso:Number = 0;

  @Input() actividadEntregado:ActividadEntregado;

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
    this.estadoBoton = true;    
  }

  guardar(){
    if(this.archivoSeleccionado != null){
      this.servicio.archivoEntregar(this.archivoSeleccionado,this.actividadEntregado.idactividadentregado).subscribe(event => {
        if(event.type === HttpEventType.UploadProgress && event.total != undefined){
          this.progreso = Math.round((event.loaded / event.total)*100);
        }
        else if(event.type === HttpEventType.Response){
          let response:any = event.body;
          this.actividadEntregado.archivo = response.nombre;
          alert(response.mensaje);
        }
      });
    }
  }

  eliminar(actividadEntregado:ActividadEntregado){
    let confirmar = confirm("Seguro que desea eliminar el archivo??????");
    if(confirmar){
      this.servicio.archivoEliminar(actividadEntregado.archivo).subscribe(event => {
        if(event.type === HttpEventType.Response){
          let response:any = event.body;
          this.actividadEntregado.archivo = response.nombre;
          alert(response.mensaje);
        }
      });
    }
  }

}
