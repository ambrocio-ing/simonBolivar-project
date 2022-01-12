import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Alumno } from 'src/app/Modelo/Alumno/alumno';
import { DetalleAlumno } from 'src/app/Modelo/DetalleAlumno/detalle-alumno';
import { Grado } from 'src/app/Modelo/Grado/grado';
import { OtraCalificacion } from 'src/app/Modelo/OtraCalificacion/otra-calificacion';
import { Seccion } from 'src/app/Modelo/Seccion/seccion';
import { DetalleCompeteniaService } from 'src/app/Servicio/DetalleCompetencia/detalle-competenia.service';

@Component({
  selector: 'app-otra-calificacion-modal',
  templateUrl: './otra-calificacion-modal.component.html',
  styleUrls: ['./otra-calificacion-modal.component.css']
})
export class OtraCalificacionModalComponent implements OnInit {

  constructor(private decomservicio:DetalleCompeteniaService) { }

  @Input() visible:Boolean;
  @Output() cerrarya :EventEmitter<Boolean> = new EventEmitter(); 

  nota_calificacion:FormControl = new FormControl('',[Validators.required,Validators.max(20),Validators.min(1)]);

  @Input() otracalificacion:OtraCalificacion;

  estadoOtro:Boolean;

  ngOnInit(): void {

  }

  detallealumno:DetalleAlumno;
  alumno:Alumno = new Alumno();
  grado:Grado;
  seccion:Seccion;
  otracal:OtraCalificacion;
  editarOtra(otracalificacion:OtraCalificacion){
    if(this.nota_calificacion.valid){
      if(otracalificacion.idotracalificacion > 0){

        let idotracalificacion = otracalificacion.idotracalificacion;
        this.detallealumno = new DetalleAlumno(0,new Date(Date.now()),this.alumno,this.grado,this.seccion);
        this.detallealumno.iddetalle_alumno = otracalificacion.iddetallealumno;        
        let nombre = otracalificacion.nombre;
        let fecha = otracalificacion.fecha;
        let nota = this.nota_calificacion.value;
        this.otracal = new OtraCalificacion(idotracalificacion,this.detallealumno,nombre,fecha,nota);
        this.decomservicio.otracEditar(this.otracal).subscribe(event => {
          if(event.type === HttpEventType.Response){
            let response:any = event.body;
            this.otracalificacion.nota = response.nota;
            alert(response.mensaje);
          }   
        });
      }
    }
    else{
      this.nota_calificacion.markAsTouched();
    }
    
  }

  cerrarModal(){
    this.cerrarya.emit(false);
  }

}
