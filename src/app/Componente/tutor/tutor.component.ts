import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Empleado } from 'src/app/Modelo/Empleado/empleado';
import { Grado } from 'src/app/Modelo/Grado/grado';
import { Seccion } from 'src/app/Modelo/Seccion/seccion';
import { Tutor } from 'src/app/Modelo/Tutor/tutor';
import { TutorService } from 'src/app/Servicio/Tutor/tutor.service';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.css']
})
export class TutorComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private tuservicio:TutorService) {
    this.construirForm();
  }

  tutor:Tutor = new Tutor();
  tutores:Tutor[] = [];

  empleados:Empleado[];
  grados:Grado[];
  secciones:Seccion[];
  
  botonGuardar:Boolean;
  botonEditar:Boolean;

  formTutor:FormGroup;
  formBuscar:FormControl = new FormControl('',[Validators.required]);
  fechahoy = new Date(Date.now());

  mensaje:String;

  construirForm(){
    this.formTutor = this.formBuilder.group({
      idtutor:['',[]],
      fecha:[formatDate(this.fechahoy,"yyyy-MM-dd","en"),[]],
      descripcion:['',[]],
      empleado:['',[Validators.required]],
      grado:['',[Validators.required]],
      seccion:['',[Validators.required]]

    });
  }

  obtenerValoresForm(tu:Tutor){
    tu.idtutor = this.formTutor.get('idtutor')?.value;
    tu.fecha = this.formTutor.get('fecha')?.value;
    tu.descripcion = this.formTutor.get('descripcion')?.value;
    tu.empleado = this.formTutor.get('empleado')?.value;
    tu.grado = this.formTutor.get('grado')?.value;
    tu.seccion = this.formTutor.get('seccion')?.value;
  }

  limpiarForm(){
    this.formTutor.setValue({
      idtutor:"",
      fecha: formatDate(this.fechahoy, "yyyy-MM-dd", "en"),
      descripcion:"",
      empleado:"",
      grado:"",
      seccion:""
    });
  }

  cargarValoresForm(tu:Tutor){
      this.formTutor.setValue({
      idtutor:tu.idtutor,
      fecha:formatDate(tu.fecha,"yyyy-MM-dd","en"),
      descripcion:tu.descripcion,
      empleado:tu.empleado,
      grado:tu.grado,
      seccion:tu.seccion
    });
  }

  modoInsercion(){
    this.botonGuardar = true;
    this.botonEditar = false;
  }

  modoEdicion(){
    this.botonGuardar = false;
    this.botonEditar = true;
  }
  

  ngOnInit(): void {

    this.modoInsercion();
    this.listarEmpleado();
    this.listarGrado();
    this.listarSeccion();
    this.listaGeneral();
  }

  listarEmpleado(){
    this.tuservicio.listarEmpleado().subscribe(datos => {
      this.empleados = datos;
    });
  }

  listarGrado(){
    this.tuservicio.listaGrado().subscribe(datos => {
      this.grados = datos;
    });
  }

  listarSeccion(){
    this.tuservicio.listaSeccion().subscribe(datos => {
      this.secciones = datos;
    });
  }

  listaGeneral(){
    this.tuservicio.listaTutor().subscribe(datos => {
      this.tutores = datos;
      this.mensaje = "";
    }, err => {
      this.mensaje = "Sin datos que mostrar";
    });
  }

  enviar(event:Event){
    event.preventDefault();
    if(this.formTutor.valid){
      if(this.botonGuardar){
        this.guardar();
      }
      else if(this.botonEditar){
        this.editar();
      }
      else{
        alert("Operación no reconcida");
      }
    }
    else{
      this.formTutor.markAllAsTouched();
    }
  }

  guardar(){
    this.obtenerValoresForm(this.tutor);
    console.log(this.tutor);
    if(this.tutor.idtutor.toString() == ""){
      this.tuservicio.crearTu(this.tutor).subscribe(dato => {
        alert("Registro creado con éxito");
        this.ngOnInit();
        this.cancelar();
      });
    }
    else{
      alert("Operación no reconcida");
    }
  }

  obtener(tutor:Tutor){
    let id:Number = tutor.idtutor;
    if(id > 0){
      this.tuservicio.obtenerTu(id).subscribe(dato => {
        this.tutor = dato;
        this.cargarValoresForm(this.tutor);
        this.modoEdicion();
      });
    }
  }

  editar(){
    this.obtenerValoresForm(this.tutor);
    if(this.tutor.idtutor.toString() != ""){
      this.tuservicio.editarTU(this.tutor).subscribe(dato => {
        alert("Registro actualizado con éxito");
        this.ngOnInit();
        this.cancelar();
      });
    }
    else{
      alert("Operación no reconcida");
    }
  }

  cancelar(){
    this.formTutor.markAsUntouched();
    this.limpiarForm();
    this.modoInsercion();
  }

  buscar(){

  }

  eliminar(tutor:Tutor){
    let id = tutor.idtutor;
    if(id != null){
      let confirmar = confirm("Seguro que decea eliminar registro?????");
      if(confirmar){
        this.tuservicio.eliminarTu(id).subscribe(dato => {
          alert("Registro eliminado con éxito");
          this.ngOnInit();
        });
      }
    }
  }

  

  compararEmpleado(e1:Empleado,e2:Empleado){
    if(e1 == null || e2 == null){
      return null;
    }
    else{
      return e1.nombre === e2.nombre;
    }
  }

  compararGrados(g1:Grado,g2:Grado){
    if(g1 == null || g2 == null){
      return null;
    }
    else{
      return g1.nombre_grado === g2.nombre_grado
    }
  }

  compararSecciones(s1:Seccion,s2:Seccion){
    if(s1 == null || s2 == null){
      return null;
    }
    else{
      return s1.nombre_seccion === s2.nombre_seccion;
    }
  }

}
