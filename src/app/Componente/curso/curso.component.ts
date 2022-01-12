import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Curso } from 'src/app/Modelo/Curso/curso';
import { DetalleCursoEmpleado } from 'src/app/Modelo/DetalleCursoEmpleado/detalle-curso-empleado';
import { Empleado } from 'src/app/Modelo/Empleado/empleado';
import { Grado } from 'src/app/Modelo/Grado/grado';
import { Seccion } from 'src/app/Modelo/Seccion/seccion';
import { DetalleCursoEmpleadoService } from 'src/app/Servicio/DetalleCursoEmpleado/detalle-curso-empleado.service';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private servicio:DetalleCursoEmpleadoService,
    private router:Router, public ususervicio:UsuarioRoleService) { 
    this.construirForm();
    this.construirFormDetalle();
  }

  botonGuardar:Boolean;
  botonEditar:Boolean;

  mensaje:String;

  cursos:Curso[] = [];
  curso:Curso = new Curso();

  formCurso:FormGroup;
  formBuscarNombre:FormControl = new FormControl('',[Validators.required]);

  construirForm():void{
    this.formCurso = this.formBuilder.group({
      idcurso:['',[]],
      codigo:['',[Validators.required,Validators.pattern(/^[0-9]\d{5,5}$/)]],
      nombre:['',[Validators.required]],
      descripcion:['',[]]
    });
  }

  limpiarFormCurso():void{
    this.formCurso.setValue({
      idcurso:"",
      codigo:"",
      nombre:"",
      descripcion:""
    });
  }

  recuperarValoresFormCurso(curso1:Curso):void{
    curso1.idcurso = this.formCurso.get('idcurso')?.value;
    curso1.codigo = this.formCurso.get('codigo')?.value;
    curso1.nombre = this.formCurso.get('nombre')?.value;
    curso1.descripcion = this.formCurso.get('descripcion')?.value;
  }

  cargarFormCurso(curso1:Curso):void{
    this.formCurso.setValue({
      idcurso:curso1.idcurso,
      codigo:curso1.codigo,
      nombre:curso1.nombre,
      descripcion:curso1.descripcion
    });
  }

  ngOnInit(): void {
    this.mensaje = "";
    this.listar();
    this.modoInsercion();
    this.modoDetalleInsercion();
    this.listarEmpleado();
    this.listarDetalle();
    this.listarGrado();
    this.listarSeccion();
    this.listarCursos();
  }

  listar():void{    

    this.servicio.cursoListar20().subscribe(datos => {
      this.cursos = datos; 
      this.mensaje = "";
    },err => {
      this.mensaje = "Sin datos que mostrar";
    });
  }

  enviar(event:Event){
    event.preventDefault();
    if(this.formCurso.valid){
      if(this.botonGuardar){
        this.guardarCurso();
      }
      else if(this.botonEditar){
        this.editarCurso();
      }
      else{
        alert("Operación no reconocida");
      }

    }
    else{
      this.formCurso.markAllAsTouched();
    }
  }

  guardarCurso(){
    this.recuperarValoresFormCurso(this.curso);
    if(this.curso.idcurso.toString() == ""){
      this.servicio.cursoCrear(this.curso).subscribe(datos => {
        alert("Operación conpletado con éxito");
        this.limpiar();
        this.ngOnInit();
      });
    }
    else{
      alert("Operación no reconocida");
    }
  }

  obtener(curso:Curso){
    let id:Number = curso.idcurso;
    if(id != null){
      this.servicio.cursoObtener(id).subscribe(datos => {
        this.curso = datos;
        this.cargarFormCurso(this.curso);
        this.modoEdicion();
      });
    }
    else{
      alert("Imposible recuperar registro");
    }
  }

  editarCurso(){
    this.recuperarValoresFormCurso(this.curso);
    if(this.curso.idcurso.toString() != ""){
      this.servicio.cursoEditar(this.curso).subscribe(datos => {
        alert("Operación completado con éxito");
        this.limpiar();
        this.ngOnInit();
      });
    }
    else{
      alert("Operación no reconocida");
    }
  }

  limpiar(){
    this.limpiarFormCurso();
    this.modoInsercion();
    this.formCurso.markAsUntouched();    
  }
  

  modoEdicion():void{
    this.botonEditar = true;
    this.botonGuardar = false;
  }

  modoInsercion():void{
    this.botonGuardar = true;
    this.botonEditar = false;
  }  

  eliminar(curso:Curso){
    let id = curso.idcurso;
    if(id != null){

      let confirmar = confirm("Seguro que decea eliminar el registro??? Solo prodras eliminar si el curso no tiene asignaciones");
      if(confirmar){
        this.servicio.cursoEliminar(+id).subscribe(datos => {
          alert("Operación completado con éxito");
          this.ngOnInit();          
        });
      }
      
    }
  }

  buscar(){
    if(this.formBuscarNombre.valid){
      let texto:String = this.formBuscarNombre.value;
      this.servicio.cursoBuscar(texto).subscribe(datos => {
        this.cursos = datos;
      });
    }
    
  }

  //propiedades y metodos para detalle curso empleado
  empleados:Empleado[];

  listarEmpleado(){
    this.servicio.detalleListarEmpleado().subscribe(datos => {
      this.empleados = datos;
    });
  }

  listarDetalle():void{
    this.servicio.detalleLista().subscribe(datos => {
      this.detalleCursoEmpleados = datos;
      this.mensajeDetalle = "";
    },err => {
      this.mensajeDetalle = "Sin datos que mostrar";
    });
  }

  botonGuardarDetalle:Boolean;
  botonEditarDetalle:Boolean;

  mensajeDetalle:String;

  fechahoy = new Date(Date.now());

  detalleCursoEmpleados:DetalleCursoEmpleado[] = [];

  detalleCursoEmpleado:DetalleCursoEmpleado = new DetalleCursoEmpleado();

  formDetalleCursoEmpleado:FormGroup;
  formBuscarDetalleNombre:FormControl = new FormControl('',[Validators.required]);

  construirFormDetalle(){
    this.formDetalleCursoEmpleado = this.formBuilder.group({
      iddetalle_ce:['',[]],
      fecha:[formatDate(this.fechahoy,'yyyy-MM-dd','en'),[Validators.required]],
      curso:['',[Validators.required]],
      empleado:['',[Validators.required]],
      grado:['',[Validators.required]],
      seccion:['',Validators.required],
      estado:['',[Validators.required]]
    });
  }

  obtenerValoresFormDetalle(dce1:DetalleCursoEmpleado):void{
    dce1.iddetalle_ce = this.formDetalleCursoEmpleado.get('iddetalle_ce')?.value;
    dce1.fecha = this.formDetalleCursoEmpleado.get('fecha')?.value;
    dce1.curso = this.formDetalleCursoEmpleado.get('curso')?.value;
    dce1.empleado = this.formDetalleCursoEmpleado.get('empleado')?.value;
    dce1.grado = this.formDetalleCursoEmpleado.get('grado')?.value;
    dce1.seccion = this.formDetalleCursoEmpleado.get('seccion')?.value;
    dce1.estado = this.formDetalleCursoEmpleado.get('estado')?.value;
  }  

  cargarFormDetalle(dce1:DetalleCursoEmpleado):void{
    this.formDetalleCursoEmpleado.setValue({
      iddetalle_ce : dce1.iddetalle_ce,
      fecha : formatDate(dce1.fecha, 'yyyy-MM-dd','en'),
      curso : dce1.curso,
      empleado : dce1.empleado,
      grado : dce1.grado,
      seccion : dce1.seccion,
      estado : dce1.estado
    });
  }

  compararCurso(c1:Curso,c2:Curso){
    if(c1 == null || c2 == null){
      return null;
    }
    else{
      return c1.nombre === c2.nombre
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

  limpiarDetalle():void{    
    this.formDetalleCursoEmpleado.get('iddetalle_ce')?.setValue("");
    this.formDetalleCursoEmpleado.get('fecha')?.setValue(formatDate(this.fechahoy, 'yyyy-MM-dd', 'en'));
  }

  enviarDetalle(event:Event){  
    event.preventDefault();
    if(this.formDetalleCursoEmpleado.valid){
      if(this.botonGuardarDetalle){
        this.guardarDetalle();
      }
      else if(this.botonEditarDetalle){
        this.editarDetalle();
      }
      else{
        alert("Operación no reconocida");
      }
    }
    else{
      this.formDetalleCursoEmpleado.markAllAsTouched();
    }
  }

  guardarDetalle(){
    this.obtenerValoresFormDetalle(this.detalleCursoEmpleado);
    if(this.detalleCursoEmpleado.iddetalle_ce.toString() == ""){
      this.servicio.detalleCrear(this.detalleCursoEmpleado).subscribe(datos => {
        alert("Operación completado con éxito");
        this.ngOnInit();
        this.limpiarDetalle();        
      });
    }
    else{
      alert("Operación no reconocida");
    }

  }  

  obtenerDetalle(detalleCursoEmpleado:DetalleCursoEmpleado){
    let id = detalleCursoEmpleado.iddetalle_ce; 
    if(id != null){
      this.servicio.detalleOptener(+id).subscribe(dato => {
        this.detalleCursoEmpleado = dato;
        this.cargarFormDetalle(this.detalleCursoEmpleado);
        this.modoDetalleEdicion();
      });
    }
    else{
      alert("Registro incompleto");
    }
  }

  editarDetalle(){
    this.obtenerValoresFormDetalle(this.detalleCursoEmpleado);
    if(this.detalleCursoEmpleado.iddetalle_ce.toString() != ""){
      this.servicio.detalleEditar(this.detalleCursoEmpleado).subscribe(datos => {
        alert("Operación completado con éxito");
        this.ngOnInit();
        this.limpiarDetalle();        
      });
    }
    else{
      alert("Operación no reconocida");
    }
  }
  //eliminarDetalle(detalleCursoEmpleado)
  eliminarDetalle(detalleCursoEmpleado:DetalleCursoEmpleado){
    let id = detalleCursoEmpleado.iddetalle_ce; 
    if(id != null){
      let confirmar = confirm("Seguro que decea eliminar???? solo podras eliminar si el registro no fue previamente asignado a otras tablas");
      if(confirmar){
        this.servicio.detalleEliminar(+id).subscribe(dato => {
          alert("Operación completado con éxito");     
          this.ngOnInit();
        });
      }      
      
    }
    else{
      alert("Registro incompleto");
    }
  }

  buscarDetalle(){
    if(this.formBuscarDetalleNombre.valid){
      let texto:String = this.formBuscarDetalleNombre.value;
      this.servicio.detalleBuscar(texto).subscribe(datos => {
        this.detalleCursoEmpleados = datos;
      });
    }
    else{
      alert("Ingrese primero texto a buscar");
    }
    
  }

  modoDetalleInsercion(): void{
    this.botonGuardarDetalle = true;
    this.botonEditarDetalle = false;
  }

  modoDetalleEdicion(): void{
    this.botonGuardarDetalle = false;
    this.botonEditarDetalle = true;
  }

  cancelar(){
    this.limpiarDetalle();
    this.modoDetalleInsercion();
  }

  //metodos y propiedades para grado y seccion
  grados:Grado[];
  secciones:Seccion[];
  cursos_combo:Curso[];

  listarGrado(){
    this.servicio.listaGrado().subscribe(datos => {
      this.grados = datos;
    });
  }

  listarSeccion(){
    this.servicio.listaSeccion().subscribe(datos => {
      this.secciones = datos;
    });
  }  

  listarCursos(){
    this.servicio.cursoListar().subscribe(datos => {
      this.cursos_combo = datos;
    });
  }

  irAperfil() {
    if (this.ususervicio.isAuthenticated()) {
      this.router.navigate(['intra/personal']);
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
