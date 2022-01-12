import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActividadEntregado } from 'src/app/Modelo/ActividaEntregado/actividad-entregado';
import { DetalleAlumno } from 'src/app/Modelo/DetalleAlumno/detalle-alumno';
import { DetalleCompetencia } from 'src/app/Modelo/DetalleCompetencia/detalle-competencia';
import { DetalleCursoEmpleado } from 'src/app/Modelo/DetalleCursoEmpleado/detalle-curso-empleado';
import { OtraCalificacion } from 'src/app/Modelo/OtraCalificacion/otra-calificacion';
import { ResultadoActividad } from 'src/app/Modelo/ResultadoActividad/resultado-actividad';
import { DetalleAlumnoService } from 'src/app/Servicio/DetalleAlumno/detalle-alumno.service';
import { DetalleCursoEmpleadoService } from 'src/app/Servicio/DetalleCursoEmpleado/detalle-curso-empleado.service';
import { ActividadEntregadoService } from 'src/app/Servicio/ActividadEntregado/actividad-entregado.service';
import { CompetenciaService } from 'src/app/Servicio/Competencia/competencia.service';
import { ActividadPlanteado } from 'src/app/Modelo/Actividad/actividad';
import { ActividadService } from 'src/app/Servicio/Actividad/actividad.service';
import { DetalleCompeteniaService } from 'src/app/Servicio/DetalleCompetencia/detalle-competenia.service';
import { CompetenciaCurso } from 'src/app/Modelo/CompetenciaCurso/competencia-curso';
import { PeriodoCalificacionService } from 'src/app/Servicio/PeriodoCalificacion/periodo-calificacion.service';
import { PeriodoCalificacion } from 'src/app/Modelo/PeriodoCalificacion/periodo-calificacion'
import { MdetalleCompetencia } from 'src/app/Modelo/MDetalleCompetencia/mdetalle-competencia';
import { formatDate } from '@angular/common';
import { Bimestre } from 'src/app/Modelo/Bimestre/bimestre';
import { Router } from '@angular/router';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';
import { ClaseService } from 'src/app/Servicio/Clase/clase.service';

@Component({
  selector: 'app-detalle-competencia',
  templateUrl: './detalle-competencia.component.html',
  styleUrls: ['./detalle-competencia.component.css']
})
export class DetalleCompetenciaComponent implements OnInit {

  constructor(private dceservicio:DetalleCursoEmpleadoService, private clservicio:ClaseService,
    private daservicio:DetalleAlumnoService, private aeservicio:ActividadEntregadoService,
    private comservicio:CompetenciaService, private apservicio:ActividadService,
    private decomservicio:DetalleCompeteniaService,
    private pcservicio:PeriodoCalificacionService, private router:Router,
    public ususervicio:UsuarioRoleService) {

  }

  //validar periodo
  periodo:PeriodoCalificacion;

  //para la tabla detalle competencia
  fechahoy = new Date(Date.now());
  dce:DetalleCursoEmpleado = new DetalleCursoEmpleado();
  competenciacurso:CompetenciaCurso;
  detallecompetencia:DetalleCompetencia = new DetalleCompetencia();
  detallecoms:DetalleCompetencia[] = [];

  //lista de actividades resueltos
  resultadoact:ResultadoActividad;
  resultadoacts:ResultadoActividad[] = [];

  nota_entregado:FormControl = new FormControl('',[Validators.max(20),Validators.min(1),Validators.required]);
  fechageneral:FormControl = new FormControl(formatDate(this.fechahoy,"yyyy-MM-dd","en"),[]);

  //lista de otras calificaciones
  otracalificacion:OtraCalificacion;
  otrascalificaciones : OtraCalificacion[] = [];

  nombre_calificacion:FormControl = new FormControl('',[Validators.required]);
  nota_calificacion:FormControl = new FormControl('',[Validators.required,Validators.max(20),Validators.min(1)]);
  
  //requerimientos para llenar combos
  competenciacursos:CompetenciaCurso[];
  fcompetenciacurso:FormControl = new FormControl('',Validators.required);

  detalumnos:DetalleAlumno[];
  fdetalumno:FormControl = new FormControl('',[Validators.required]);

  actentregados:ActividadEntregado[] = [];
  factentregado:FormControl = new FormControl('',[Validators.required]);  

  mensajeEstado:String;
  
  //bimestre
  bimestres: Bimestre[];
  //bimestreseleccionado: Bimestre;
  fbimestre: FormControl = new FormControl('', [Validators.required]);
  fdescripcion: FormControl = new FormControl();

  ngOnInit(): void {   

    this.listarBimestre(); 
    this.pcservicio.pcObtenerFecha().subscribe(dato => {
      this.periodo = dato;
      this.mensajeEstado = "";
      let iddce = sessionStorage.getItem('iddc_e');
      if(iddce != null){
        this.cotejarPersonal(+iddce);
      }
      else{
        this.mensajeEstado = "Datos del docente no reconocidos";
      }      
            
    }, err => {
      this.mensajeEstado = "El periodo para subir notas aun no fue establecido";
    });

    this.modoInsercion();
       
  }

  mensajeBimestre:String;
  listarBimestre() {
    this.pcservicio.bimListaDelAnnio().subscribe(datos => {
      this.bimestres = datos;
      this.mensajeBimestre = "";
    }, err => {
      this.mensajeBimestre = "Sin datos que mostrar";
    });
  }
   //validar si el ingreso de nota es visible  

  //iddce:Number = 5;
  cotejarPersonal(iddce:Number){
    this.clservicio.detalleOptener(iddce).subscribe(dato => {
      this.dce = dato;
      this.obtenerAlumnoPorGS();      
      this.llenarCompetencia();
      this.mostrarActividadesPlanteados();
      this.listaGeneral(this.dce.iddetalle_ce); 
    });
  } 

  obtenerAlumnoPorGS(){    
    this.daservicio.obtenerPorGS(this.dce.grado.idgrado,this.dce.seccion.idseccion).subscribe(datos => {
      this.detalumnos = datos;

    });
  }
  
  estado_Botones:Boolean=false;
  estadoBotones:Boolean=false;

  mensajeError:String;
  optenerActividadEntregado(){
    this.estado_Botones = true;
    const detalum:DetalleAlumno = this.fdetalumno.value;    
    this.clservicio.obtenerAEPorDCE(detalum.iddetalle_alumno,this.dce.iddetalle_ce).subscribe(datos => {
      this.actentregados.length = 0;
      this.otrascalificaciones.length = 0;
      this.resultadoacts.length = 0;
      this.actentregados = datos;      
      this.mensajeError = "";  
    },err => {
      this.actentregados.length = 0;
      this.mensajeError = "Sin actividades";
    })
  }

  comError:String;
  llenarCompetencia(){
    this.comservicio.competenciaCursoPorCurso(this.dce.curso.idcurso).subscribe(datos => {
      this.competenciacursos = datos;
      this.comError = "";
    }, err => {
      this.comError = "Sin datos que mostrar";
    });
  }

  cambiarEstado(){
    this.estadoBotones = true;
  }

  //LISTA DE ACTIVIDADES PLANTEADOS
  actplanteados:ActividadPlanteado[] = [];
  actplanteado:ActividadPlanteado;
  
  factplanteado:FormControl = new FormControl('',[Validators.required]);
  mensaje_Error:String;

  mostrarActividadesPlanteados(){
    this.apservicio.actividadPorDCE(this.dce.iddetalle_ce).subscribe(datos => {
      this.actplanteados = datos;
      this.mensaje_Error = "";
    },err => {
      this.mensaje_Error = "Sin actividades";
    });
  }

  //metodos para administrar resultado de actividad
  limpiarControlesResultado(){
    this.idresultado = 0;
    this.nota_entregado.setValue(1);
    this.nota_entregado.markAsUntouched();
  }

  idresultado:Number = 0;
  agregarResultadoAct(){    
    if(this.factentregado.valid && this.nota_entregado.valid){
      this.cambiarEstado();
      let idresultado = this.idresultado;
      let fecha = this.fechageneral.value;
      let actividadentregado = this.factentregado.value;
      let nota = this.nota_entregado.value;
      this.resultadoact = new ResultadoActividad(idresultado,fecha,actividadentregado,nota);
      const repeticion = this.resultadoacts.find(x => x.actividadentregado == this.resultadoact.actividadentregado);
      if(repeticion == null || repeticion == undefined){
        this.resultadoacts.push(this.resultadoact);
        this.limpiarControlesResultado();
      }
      else{
        alert("La actividad ya fue agregado");
      }
    }
    else{
      this.factentregado.markAsTouched();
      this.nota_entregado.markAsTouched();
    }   
    
  }

  eliminarResultadoActividad(resultadoact:ResultadoActividad){
    let confirmar = confirm("Seguro que desea eliminar resultado de la lista?????");
    if(confirmar){
      var indice = this.resultadoacts.indexOf(resultadoact);
      this.resultadoacts.splice(indice,1);
    }
  }

  //Metodo para administrar resultado de otras calificaciones

  limpiarControlesOtrasC(){
    this.idotracalificacion = 0;
    this.nombre_calificacion.setValue("");
    this.nota_calificacion.setValue(1);
    this.nombre_calificacion.markAsUntouched();
    this.nota_calificacion.markAsUntouched();
  }

  //agraga nueva calificacion en la lista de otras calificaciones
  idotracalificacion:Number = 0;
  agregarOtrasCalificaciones(){
    if(this.fdetalumno.valid && this.nombre_calificacion.valid && this.nota_calificacion.valid){
      this.cambiarEstado();
      let idotracalificacion = this.idotracalificacion;    
      let detallealumno = this.fdetalumno.value;
      let nombre = this.nombre_calificacion.value;    
      let fecha = this.fechageneral.value;
      let nota = this.nota_calificacion.value;

      this.otracalificacion = new OtraCalificacion(idotracalificacion,detallealumno,nombre,fecha,nota);

      const comparacion = this.otrascalificaciones.find(x => x.nombre == this.otracalificacion.nombre);    
      if(comparacion == null || comparacion == undefined){ 

        this.otrascalificaciones.push(this.otracalificacion);
        this.limpiarControlesOtrasC();     
        
      }
      else{
        alert("Estas duplicando el nombre de la calificación");
      }
    }
    else{
      this.fdetalumno.markAsTouched();
      this.nombre_calificacion.markAsTouched();
      this.nota_calificacion.markAsTouched();
    }
    
  }

  eliminarOtraCalificacion(otracalificacion:OtraCalificacion){
    let confirmar = confirm("Seguro que desea eliminar calificación de la lista");
    if(confirmar){
      var indice = this.otrascalificaciones.indexOf(otracalificacion);
      this.otrascalificaciones.splice(indice,1);
    }
  }

  //En caso de que exista actividades no entregados por un alumno
  
  entregaTardia:ActividadEntregado = new ActividadEntregado();

  estadoEntrega:Boolean;

  activarEntrega(){
    if(this.estadoEntrega == true){
      this.estadoEntrega = false;
    }
    else{
      this.estadoEntrega = true;
    }
  }

  elegirActividad(){ 
    if(this.factplanteado.valid){
      const actividad:ActividadPlanteado = this.factplanteado.value;
      const detallealumno:DetalleAlumno = this.fdetalumno.value;
      const fecha_entrega:Date = this.fechageneral.value; 
      const descripcion:String = "La actividad denominada "+actividad.nombre+" no fue entregado a tiempo por el alumno "+detallealumno.alumno.nombre+" "+detallealumno.alumno.apellidos;
      
      this.entregaTardia.descripcion = descripcion;
      this.entregaTardia.fecha_entrega = fecha_entrega;
      this.entregaTardia.detallealumno = detallealumno;
      this.entregaTardia.actividad = actividad;
    } 
    
  } 

  realizarEntrega(){
    if(this.entregaTardia != null){
      this.aeservicio.crearAE(this.entregaTardia).subscribe(dato =>{
        alert("Entrega exitosa");
        this.ngOnInit();
      });
      this.entregaTardia == null;
    }
    
  }

  //envío final

  botonGuardar:Boolean;
  

  modoInsercion(){
    this.botonGuardar = true;
    
  } 

  envioFinal(){
    if(this.botonGuardar){
      this.guardar();
    }    
  }

  //para cargar detalle competencia
  id_detallecompetencia:Number;
  llenarDetalleCompetencia(decom:DetalleCompetencia){
    decom.iddetallecompetencia = this.id_detallecompetencia;
    decom.fecha = this.fechageneral.value;
    decom.competenciacurso = this.fcompetenciacurso.value;
    decom.dce = this.dce;
    decom.periodo = this.periodo;
    decom.bimestre = this.fbimestre.value;
    decom.nota = 0;
    decom.alias = "";
    decom.descripcion = this.fdescripcion.value;    
    decom.resultadoactividades = this.resultadoacts;
    decom.otrascalificaciones = this.otrascalificaciones;
  }

  validarEnvio():Boolean{
    if(this.resultadoacts.length == 0 && this.otrascalificaciones.length == 0){
      return false;
    }
    else{
      return true;
    }
  }
  
  guardar(){
    this.llenarDetalleCompetencia(this.detallecompetencia);    
    if(this.fbimestre.valid){
      if(this.validarEnvio()){        
        this.decomservicio.decomCrear(this.detallecompetencia).subscribe(dato => {
           alert("Calificación registrado con éxito");
           this.cancelar();
           this.ngOnInit();
         });
       }
       else{
         alert("Operación no reconocido");
       }
    }
    else{
      this.mensajeBimestre = "Seleccione bimestre";
    }
  }
  
  cancelar(){
    this.resultadoacts.length = 0;
    this.otrascalificaciones.length = 0;
    this.modoInsercion();
  } 

  //preparar vista para las notas  
  mdetallecoms:MdetalleCompetencia[] = [];
  mdetallecom:MdetalleCompetencia;

  listaGeneral(iddce:Number){
    this.decomservicio.decomListaMapeado(iddce).subscribe(datos => {
      this.mdetallecoms = datos;
    });
  }  

  eliminarDetalle(mdetallecom:MdetalleCompetencia){
    let iddc = mdetallecom.iddetallecompetencia;
    if(iddc != null){
      let confirmar = confirm("Seguro que desea eliminar el registro???");
      if(confirmar){
        this.decomservicio.decomEliminar(iddc).subscribe(dato => {
          alert("Registro eliminado con éxito");
          this.ngOnInit();
        });
      }
      
    }
  }

  listarInicio(){
    this.ngOnInit();
  }
  ////modal

  resultadoseleccionado:ResultadoActividad;
  otraseleccionado:OtraCalificacion;
  estadoModal:Boolean;
  estado_Modal:Boolean;
  
  
  obtenerResultado(resultado:ResultadoActividad){
    this.resultadoseleccionado = resultado;
    this.estadoModal = true;    
  }

  obtenerOtraCalificacion(otracalificacion:OtraCalificacion){
    this.otraseleccionado = otracalificacion;
    this.estado_Modal = true;    
  }

  irAperfil() {
    if (this.ususervicio.isAuthenticated()) {
      this.router.navigate(['intra/docente']);
    }
    else {
      this.ususervicio.cerrarSession()
      this.router.navigate(['login']);
    }

  }

  cerrarSesion() {
    this.ususervicio.cerrarSession()
    this.router.navigate(['login']);
  }

}
