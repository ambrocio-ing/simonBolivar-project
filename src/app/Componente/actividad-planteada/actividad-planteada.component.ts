import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadPlanteado } from 'src/app/Modelo/Actividad/actividad';
import { Clase } from 'src/app/Modelo/Clase/clase';
import { ActividadService } from 'src/app/Servicio/Actividad/actividad.service';
import { ClaseService } from 'src/app/Servicio/Clase/clase.service';
import { ComunicadorService } from 'src/app/Servicio/Comunicador/comunicador.service';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';

@Component({
  selector: 'app-actividad-planteada',
  templateUrl: './actividad-planteada.component.html',
  styleUrls: ['./actividad-planteada.component.css']
})
export class ActividadPlanteadaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private comunicador: ComunicadorService,
    private activatedRoute: ActivatedRoute, private serClase: ClaseService,
    private servicio: ActividadService, private router: Router, public ususervicio:UsuarioRoleService) {

    this.construirForm();

  }

  actividad: ActividadPlanteado = new ActividadPlanteado();
  actividades: ActividadPlanteado[] = [];
  clase: Clase = new Clase();

  botonGuardar: Boolean;
  botonEditar: Boolean;
  mensaje: String;

  fechahoy = new Date(Date.now());

  formActividad: FormGroup;
  formBuscar: FormControl = new FormControl('', [Validators.required]);

  construirForm() {
    this.formActividad = this.formBuilder.group({
      fidactividad: ['', []],
      fnombre: ['', [Validators.required]],
      fdescripcion: ['', []],
      ffecha_publicacion: [formatDate(this.fechahoy, 'yyyy-MM-dd', 'en'), [Validators.required]],
      ffecha_entrega: [formatDate(this.fechahoy, 'yyyy-MM-dd', 'en'), [Validators.required]]
    });
  }

  obtenerValoresForm(actividad1: ActividadPlanteado) {
    actividad1.idactividad = this.formActividad.get('fidactividad')?.value;
    actividad1.nombre = this.formActividad.get('fnombre')?.value;
    actividad1.archivo = "";
    actividad1.descripcion = this.formActividad.get('fdescripcion')?.value;
    actividad1.fecha_publicacion = this.formActividad.get('ffecha_publicacion')?.value;
    actividad1.fecha_entrega = this.formActividad.get('ffecha_entrega')?.value;
    actividad1.clase = this.clase;
  }

  cargarForm(actividad1: ActividadPlanteado) {
    this.formActividad.setValue({
      fidactividad: actividad1.idactividad,
      fnombre: actividad1.nombre,
      fdescripcion: actividad1.descripcion,
      ffecha_publicacion: actividad1.fecha_publicacion,
      ffecha_entrega: actividad1.fecha_entrega
    });
    //this.clase = actividad1.clase;
    //console.log(this.clase);   
  }

  limpiarForm() {
    this.formActividad.setValue({
      fidactividad: "",
      fnombre: "",
      fdescripcion: "",
      ffecha_publicacion: formatDate(this.fechahoy, 'yyyy-MM-dd', 'en'),
      ffecha_entrega: formatDate(this.fechahoy, 'yyyy-MM-dd', 'en')
    });
  }

  modoInsercion() {
    this.botonGuardar = true;
    this.botonEditar = false;
  }

  modoEdicion() {
    this.botonGuardar = false;
    this.botonEditar = true;
  }

  ngOnInit(): void {
    //this.capturarClase();

    let id = sessionStorage.getItem("idcl");
    if (id != null) {
      this.serClase.claseObtener(+id).subscribe(dato => {
        this.clase = dato;
        this.listar();
      });
    }
    
    this.modoInsercion();
  }

  listar() {
    this.servicio.actividadLista(this.clase.idclase).subscribe(datos => {
      this.actividades = datos;
      this.mensaje = "";
    }, err => {
      this.mensaje = "Sin datos que mostrar";
    });
  }

  limpiar() {
    this.modoInsercion();
    this.limpiarForm();
    this.formActividad.markAsUntouched();
  }

  save(event: Event) {
    event.preventDefault();
    if (this.formActividad.valid) {
      if (this.botonGuardar) {
        this.guardar();
      }
      else if (this.botonEditar) {
        this.editar();
      }
      else {
        alert("Operación no identificado");
      }
    }
    else {
      this.formActividad.markAllAsTouched();
    }
  }

  guardar() {
    this.obtenerValoresForm(this.actividad);
    if (this.actividad.idactividad.toString() == "") {
      if (this.actividad.clase.idclase.toString() != "") {
        this.servicio.actividadCrear(this.actividad).subscribe(dato => {
          alert("Actividad creado con éxito");
          this.ngOnInit();
          this.limpiar();
        });
      }
      else {
        alert("Operación no identificado");
      }
    }
    else {
      alert("Operación no identificado");
    }
  }

  obtener(actividad: ActividadPlanteado) {
    let id: Number = actividad.idactividad;
    if (id > 0) {
      this.servicio.actividadObtener(id).subscribe(dato => {
        this.actividad = dato;
        this.cargarForm(this.actividad);
        this.modoEdicion();
      });
    }
  }

  editar() {
    this.obtenerValoresForm(this.actividad);
    if (this.actividad.idactividad.toString() != "") {
      if (this.actividad.clase.idclase.toString() != "") {
        this.servicio.actividadEditar(this.actividad).subscribe(dato => {
          alert("Actividad actualizado con éxito");
          this.ngOnInit();
          this.limpiar();
        });
      }
    }
  }

  eliminar(actividad: ActividadPlanteado) {
    let id = actividad.idactividad;
    if (id != null) {
      let confirmar = confirm("Seguro que desea eliminar la actividad?????");
      if (confirmar) {
        this.servicio.actividadEliminar(+id).subscribe(dato => {
          alert("La actividad se eliminó con éxito");
          this.ngOnInit();
        });
      }

    }
  }

  buscar() {
    if (this.formBuscar.valid) {
      let nombre: String = this.formBuscar.value;
      this.servicio.actividadBusacar(this.clase.idclase, nombre).subscribe(datos => {
        this.actividades = datos;
      });
    }
  }

  capturarClase() {
    //this.comunicador.enviarClase.subscribe(dato =>{
    //this.clase = dato;
    //console.log(this.clase);
    //});
    this.activatedRoute.paramMap.subscribe(parametro => {
      let id = parametro.get("id");
      if (id != null) {
        this.serClase.claseObtener(+id).subscribe(dato => {
          this.clase = dato;
        });
      }
    });
  }

  //propiedades y metodos para manejar modal
  estadoModal: Boolean;
  actividadSeleccionado: ActividadPlanteado;

  abrirModal(actividad: ActividadPlanteado) {
    this.actividadSeleccionado = actividad;
    this.estadoModal = true;
  }

  irClase() {
    if(this.ususervicio.isAuthenticated()){
      this.router.navigate(['clase_vista']);

    }
    else{
      this.ususervicio.cerrarSession();
      this.router.navigate(['login']);
    }
    
  }

  verEntregas(actividad: ActividadPlanteado) {
    sessionStorage.setItem('idact', actividad.idactividad.toString());
    this.router.navigate(['activi/entregados']);
  }

  cerrarSesion(){
    this.ususervicio.cerrarSession();
    this.router.navigate(['login']);
  }

}
