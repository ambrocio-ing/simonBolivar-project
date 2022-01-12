import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ActividadPlanteado } from 'src/app/Modelo/Actividad/actividad';
import { ActividadService } from 'src/app/Servicio/Actividad/actividad.service';
import { URL_BACKEND } from 'src/app/config/config';


@Component({
  selector: 'app-actividad-archivo',
  templateUrl: './actividad-archivo.component.html',
  styleUrls: ['./actividad-archivo.component.css']
})
export class ActividadArchivoComponent implements OnInit {

  constructor(private servicio:ActividadService) { }

  @Input() visible:Boolean;
  @Output() cerrar:EventEmitter<Boolean> = new EventEmitter();

  progreso:Number = 0;

  @Input() actividad:ActividadPlanteado;

  public urlBackend:String = URL_BACKEND;

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
    this.estadoBoton = true;   
  }

  guardar(){
    if(this.archivoSeleccionado != null){
      this.servicio.archivoGuardar(this.archivoSeleccionado,this.actividad.idactividad).subscribe(event => {
        if(event.type === HttpEventType.UploadProgress && event.total != undefined){
          this.progreso = Math.round((event.loaded / event.total)*100);
        }
        else if(event.type === HttpEventType.Response){
          let response:any = event.body;
          this.actividad.archivo = response.nombre;
          alert(response.mensaje);
        }   
      });
    }
  }

  eliminar(actividad:ActividadPlanteado){
    let archivo = actividad.archivo;
    if(archivo != null){
      let confirmar = confirm("Seguro que decea eliminar el archivo?????");
      if(confirmar){
        this.servicio.eliminarUno(archivo).subscribe(event => {
          if(event.type === HttpEventType.Response){
            let response:any = event.body;
            this.actividad.archivo = response.nombre;          
          }
        });
      }
      
    }
  }
}
