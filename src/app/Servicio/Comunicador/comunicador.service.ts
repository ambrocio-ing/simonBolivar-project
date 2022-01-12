import { Injectable, Output ,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { Alumno } from 'src/app/Modelo/Alumno/alumno';
import { Apoderado } from 'src/app/Modelo/Apoderado/apoderado';
import { Clase } from 'src/app/Modelo/Clase/clase';
import { DetalleCursoEmpleado } from 'src/app/Modelo/DetalleCursoEmpleado/detalle-curso-empleado';
import { Especialidad } from 'src/app/Modelo/Especialidad/especialidad';

@Injectable({ 
  providedIn: 'root'
})
export class ComunicadorService {

  @Output() disparador:EventEmitter<Apoderado> = new EventEmitter();
  @Output() disparador2:EventEmitter<Especialidad> = new EventEmitter();
  @Output() disparador3:EventEmitter<Alumno> = new EventEmitter();
  @Output() obtenerDCE:EventEmitter<DetalleCursoEmpleado> = new EventEmitter();
  @Output() emviarTexto:EventEmitter<String> = new EventEmitter();

  private iddce = new ReplaySubject<Number>(1);

  
  private _notificarLaRecarga = new EventEmitter<any>();

  constructor(private router:Router) { }

  get notificarLaRecarga():EventEmitter<any>{
    return this._notificarLaRecarga;
  }

  obtener(dce:DetalleCursoEmpleado){
    this.obtenerDCE.emit(dce);
    this.router.navigate(['clases_creados']);
  }

  public get recibirdce(){
    return this.iddce.asObservable();
  }

  public enviardce(id:Number):void{
    this.iddce.next(id);
    this.router.navigate(['clases_creados']);
  }

}
