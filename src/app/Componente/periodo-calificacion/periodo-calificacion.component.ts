import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms'
import { PeriodoCalificacion } from 'src/app/Modelo/PeriodoCalificacion/periodo-calificacion';
import { PeriodoCalificacionService } from 'src/app/Servicio/PeriodoCalificacion/periodo-calificacion.service';

@Component({
  selector: 'app-periodo-calificacion',
  templateUrl: './periodo-calificacion.component.html',
  styleUrls: ['./periodo-calificacion.component.css']
})
export class PeriodoCalificacionComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private pcservicio:PeriodoCalificacionService) {
    this.construirForm();
  }

  botonGuardar:Boolean;
  botonEditar:Boolean;
  fechahoy = new Date(Date.now());

  periodo:PeriodoCalificacion = new PeriodoCalificacion();
  periodos:PeriodoCalificacion[] = [];

  fperiodo:FormGroup;

  modoInsercion(){
    this.botonGuardar = true;
    this.botonEditar = false;
  }

  modoEdicion(){
    this.botonGuardar = false;
    this.botonEditar = true;
  }

  construirForm(){
    this.fperiodo = this.formBuilder.group({
      fidperiodo:['',[]],
      finicio:[formatDate(this.fechahoy,"yyyy-MM-dd","en"),[Validators.required]],
      ffin:[formatDate(this.fechahoy,"yyyy-MM-dd","en"),[Validators.required]]
    });
  }

  obtenerValoresForm(per:PeriodoCalificacion){
    per.idperiodo = this.fperiodo.get('fidperiodo')?.value;
    per.finicio = this.fperiodo.get('finicio')?.value;
    per.ffin = this.fperiodo.get('ffin')?.value;
  }

  limpiarForm(){
    this.fperiodo.setValue({
      fidperiodo:"",
      finicio:formatDate(this.fechahoy,"yyyy-MM-dd","en"),
      ffin:formatDate(this.fechahoy,"yyyy-MM-dd","en")
    });
  }

  cargarForm(per:PeriodoCalificacion){
    this.fperiodo.setValue({
      fidperiodo: per.idperiodo,
      finicio:formatDate(per.finicio,"yyyy-MM-dd","en"),
      ffin:formatDate(per.ffin,"yyyy-MM-dd","en")
    });
  }

  ngOnInit(): void {

    this.modoInsercion();
    this.listar();

  }

  mensaje:String;
  listar(){
    this.pcservicio.pcLista().subscribe(datos => {
      this.periodos = datos;
      this.mensaje = "";
    }, err => {
      this.mensaje = "Sin datos que mostrar";
    });
  }

  enviar(event:Event){
    event.preventDefault();
    if(this.fperiodo.valid){
      if(this.botonGuardar){
        this.guardar();
      }
      else if(this.botonEditar){
        this.editar();
      }
      else{
        alert("Operación no identificado");
      }
    }
    else{
      this.fperiodo.markAllAsTouched();
    }
  }

  guardar(){
    this.obtenerValoresForm(this.periodo);
    if(this.periodo.idperiodo.toString() == ""){
      console.log(this.periodo);
      this.pcservicio.pcCrear(this.periodo).subscribe(dato => {
        alert("Registro insertado con éxito");
        this.ngOnInit();
        this.cancelar();
      });
    }
    else{
      alert("Operación no identificado");
    }
  }

  obtener(periodo:PeriodoCalificacion){
    let id:Number = periodo.idperiodo;
    if(id > 0){
      this.pcservicio.pcObtenerId(id).subscribe(dato => {
        this.periodo = dato;
        this.cargarForm(this.periodo);
        this.modoEdicion();
      }, err => {
        alert("Registro no encontrado");
      });
    }
  }

  editar(){
    this.obtenerValoresForm(this.periodo);
    if(this.periodo.idperiodo.toString() != ""){
      this.pcservicio.pcEditar(this.periodo).subscribe(dato => {
        alert("Registro actualizado con éxito");
        this.ngOnInit();
        this.cancelar();
      });
    }
    else{
      alert("Operación no identificado");
    }
  }

  eliminar(periodo:PeriodoCalificacion){
    let id = periodo.idperiodo;
    if(id != null){
      let confirmar = confirm("Seguro que desea eliminar??? Solo podras eliminar si el registro aun no fue usado");
      if(confirmar){
        this.pcservicio.pcEliminar(id).subscribe(dato => {
          alert("Registro borrado con éxito");
          this.ngOnInit();
        });
      }
    }
  }

  cancelar(){
    this.limpiarForm();
    this.modoInsercion();
    this.fperiodo.markAsUntouched();
  }

}
