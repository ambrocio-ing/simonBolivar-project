import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadPlanteado } from 'src/app/Modelo/Actividad/actividad';
import { ActividadEntregado } from 'src/app/Modelo/ActividaEntregado/actividad-entregado';
import { DetalleAlumno } from 'src/app/Modelo/DetalleAlumno/detalle-alumno';
import { DetalleCursoEmpleado } from 'src/app/Modelo/DetalleCursoEmpleado/detalle-curso-empleado';
import { ActividadService } from 'src/app/Servicio/Actividad/actividad.service';
import { ActividadEntregadoService } from 'src/app/Servicio/ActividadEntregado/actividad-entregado.service';
import { DetalleAlumnoService } from 'src/app/Servicio/DetalleAlumno/detalle-alumno.service';
import { DetalleCursoEmpleadoService } from 'src/app/Servicio/DetalleCursoEmpleado/detalle-curso-empleado.service';
import { UsuarioAlumnoService } from 'src/app/Servicio/UsuarioAlumno/usuario-alumno.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-actividad-entregado',
  templateUrl: './actividad-entregado.component.html',
  styleUrls: ['./actividad-entregado.component.css']
})
export class ActividadEntregadoComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private aeservicio:ActividadEntregadoService,
    private activatedRoute:ActivatedRoute,private daservicio:DetalleAlumnoService,
    private apservicio:ActividadService, public usualumno:UsuarioAlumnoService,
    private router:Router) {
    this.construirForm();
  }

  public urlBackend:String = URL_BACKEND;

  ae:ActividadEntregado = new ActividadEntregado();
  actividad:ActividadPlanteado;
  detallealumno:DetalleAlumno;

  aes:ActividadEntregado[];

  dce:DetalleCursoEmpleado;
  
  formActividadEntregado:FormGroup;
  formBuscar:FormControl = new FormControl('',[Validators.required]); 

  botonEditar:Boolean;
  botonGuardar:Boolean;

  fechaHoy = new Date(Date.now());

  construirForm(){
    this.formActividadEntregado = this.formBuilder.group({
      fidactividad_entregado : ['',[]],
      fdescripcion : ['',[]],
      ffecha_entrega : [formatDate(this.fechaHoy,'yyyy-MM-dd', 'en'),[Validators.required]]
    });
  }

  obtenerValoresForm(ae1:ActividadEntregado){
    ae1.idactividadentregado = this.formActividadEntregado.get('fidactividad_entregado')?.value;
    ae1.descripcion = this.formActividadEntregado.get('fdescripcion')?.value;
    ae1.fecha_entrega = this.formActividadEntregado.get('ffecha_entrega')?.value;
    ae1.detallealumno = this.detallealumno;
    ae1.actividad = this.actividad;
  }

  limpiarForm(){
    this.formActividadEntregado.setValue({
      fidactividad_entregado : "",
      fdescripcion : "",
      ffecha_entrega : formatDate(this.fechaHoy,'yyyy-MM-dd', 'en')
    });
  }

  cargarValoresForm(ae1:ActividadEntregado){
    this.formActividadEntregado.setValue({
      fidactividad_entregado : ae1.idactividadentregado,
      fdescripcion : ae1.descripcion,
      ffecha_entrega : formatDate(ae1.fecha_entrega,'yyyy-MM-dd', 'en')
    });
    //this.detallealumno = ae1.detallealumno;
    //this.actividad = ae1.actividad;
  }

  ngOnInit(): void {

    let idac = sessionStorage.getItem('idact');
    let idda = this.usualumno.ualumno.iddetalle_alumno;
    let iddce = sessionStorage.getItem('id_dce');
    if(idac != null && idda != null && iddce != null){
      this.recuperActividad(+idac);
      this.recuperarDA(+idda);
      this.listar(+idda,+iddce);
      this.obtenerActividadesPorDCE(+iddce);
    }

    this.modoInsercion();

  }

  recuperActividad(idac:Number){
    this.aeservicio.actividadPlanteadoObtener(idac).subscribe(dato => {
      this.actividad = dato;
    });
  }

  recuperarDA(idda:Number){
    this.daservicio.detallealumnObtener(idda).subscribe(dato => {
      this.detallealumno = dato;
    });
  }
  mensaje:String;
  listar(idda:Number,iddce:Number){
    this.aeservicio.obtenerAEPorDCE(idda,iddce).subscribe(datos => {
      this.aes = datos;
      this.mensaje = "";
    }, err => {
      this.mensaje = "Sin datos que mostrar";
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

  limpiar(){
    this.limpiarForm();
    this.modoInsercion();
    this.formActividadEntregado.markAsUntouched();
  }

  save(event:Event){
    event.preventDefault();
    if(this.formActividadEntregado.valid){
      if(this.botonGuardar){
        this.guardar();
      }
      else if(this.botonEditar){
        this.editar();
      }
      else{
        alert("Operación no reconocida")
      }
    }
    else{
      this.formActividadEntregado.markAllAsTouched();
    }
  }

  guardar(){
    this.obtenerValoresForm(this.ae);
    if(this.ae.idactividadentregado.toString() == ""){
      this.aeservicio.crearAE(this.ae).subscribe(dato => {
        alert("Actividad entregado con éxito");
        this.ngOnInit();
        this.limpiar();
      });
    }
    else{
      alert("Operación no identificada");
    }
  }

  obtener(ae:ActividadEntregado){
    let id:Number = ae.idactividadentregado;
    if(id != null){
      this.aeservicio.obtenerAE(id).subscribe(dato => {
        this.ae = dato;
        this.cargarValoresForm(this.ae);
        this.modoEdicion();
      });
    }
  }

  editar(){
    this.obtenerValoresForm(this.ae);
    if(this.ae.idactividadentregado.toString() != ""){
      this.aeservicio.editarAE(this.ae).subscribe(dato => {
        alert("Actividad actualiado con éxito");
        this.ngOnInit();
        this.limpiar();
      });
    }
    else{
      alert("Operación no identificada");
    }
  }

  eliminar(ae:ActividadEntregado){
    let id:Number = ae.idactividadentregado;
    if(id != null){
      let confirmar = confirm("Seguro que desea eliminar la actividad????");
      if(confirmar){
        this.aeservicio.eliminar(id).subscribe(dato => {
          this.ae = dato;
          this.ngOnInit();
        });
      }
    }
  }  

  buscar(){

  }

  //mdal

  actividadSeleccionado:ActividadEntregado;
  estadoModal:Boolean;

  abrirModal(ae:ActividadEntregado){
    this.estadoModal=true;
    this.actividadSeleccionado = ae;
  }

  obtenerActividadesPorDCE(id:Number){
    this.daservicio.dceOptener(id).subscribe(dato => {
      this.dce = dato;

    });
  }

  irAclase(){
    if(this.usualumno.isAuthenticated()){
      this.router.navigate(['clases/estudiante']);
    }
    else{
      this.usualumno.cerrarSession();
      this.router.navigate(['login']);
    }
    
  }

  cerrarSesion(){
    this.usualumno.cerrarSession();
    this.router.navigate(['login']);
  }

}
