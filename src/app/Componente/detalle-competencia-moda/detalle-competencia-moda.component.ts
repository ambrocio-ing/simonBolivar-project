import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActividadEntregado } from 'src/app/Modelo/ActividaEntregado/actividad-entregado';
import { OtraCalificacion } from 'src/app/Modelo/OtraCalificacion/otra-calificacion';
import { ResultadoActividad } from 'src/app/Modelo/ResultadoActividad/resultado-actividad';
import { DetalleCompeteniaService } from 'src/app/Servicio/DetalleCompetencia/detalle-competenia.service';

@Component({
  selector: 'app-detalle-competencia-moda',
  templateUrl: './detalle-competencia-moda.component.html',
  styleUrls: ['./detalle-competencia-moda.component.css']
})
export class DetalleCompetenciaModaComponent implements OnInit {

  constructor(private decomservicio:DetalleCompeteniaService) { }

  @Input() visible:Boolean;
  @Output() cerrar:EventEmitter<Boolean> = new EventEmitter();

  @Input() resultadoact:ResultadoActividad;

  nota_entregado:FormControl = new FormControl('',[Validators.max(20),Validators.min(1),Validators.required]);

  
  
  ngOnInit(): void {

  }

  estadoResultado:Boolean; 

  cerrarModal(){
    this.cerrar.emit(false);  
    
  }
  actividadentregado:ActividadEntregado;
  resultado:ResultadoActividad;
  editar(resultadoact:ResultadoActividad){
    if(this.nota_entregado.valid){
      if(resultadoact.idresultado > 0){
        let idresultado = resultadoact.idresultado;
        let fecha = resultadoact.fecha;
        this.actividadentregado = new ActividadEntregado();
        this.actividadentregado.idactividadentregado = resultadoact.idactividadentregado;
        let actividad_entregado = this.actividadentregado;
        let nota = this.nota_entregado.value;
        this.resultado = new ResultadoActividad(idresultado,fecha,actividad_entregado,nota);        
        
        this.decomservicio.resultadoEditar(this.resultado).subscribe(event => {
          if(event.type === HttpEventType.Response){
            let response:any = event.body;
            this.resultadoact.nota = response.nota;
            alert(response.mensaje);
          }   
          
        });
      }
    }
    else{
      this.nota_entregado.markAsTouched();
    }
    
  }

  

}
