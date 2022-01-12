import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Competencia } from 'src/app/Modelo/Competencia/competencia';
import { CompetenciaCurso } from 'src/app/Modelo/CompetenciaCurso/competencia-curso';
import { Curso } from 'src/app/Modelo/Curso/curso';
import { CompetenciaService } from 'src/app/Servicio/Competencia/competencia.service';
import { DetalleCursoEmpleadoService } from 'src/app/Servicio/DetalleCursoEmpleado/detalle-curso-empleado.service';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';

@Component({
  selector: 'app-competencia',
  templateUrl: './competencia.component.html',
  styleUrls: ['./competencia.component.css']
})
export class CompetenciaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private curservicio: DetalleCursoEmpleadoService,
    private servicio: CompetenciaService, private router: Router, public ususervicio: UsuarioRoleService) {
    this.construirForm();
  }

  formCompetencia: FormGroup;
  formBuscar: FormControl = new FormControl('', [Validators.required]);
  formBuscarCompetencia: FormControl = new FormControl('', [Validators.required]);

  selectCompetencias: Competencia[] = [];
  selectCursos: Curso[] = [];
  cursos: Curso[] = [];

  competencia: Competencia = new Competencia();
  competencias: Competencia[];


  mensajeBuscar: String;
  mensaje: String;

  botonEditar: Boolean;
  botonGuardar: Boolean;

  modoInsercion() {
    this.botonEditar = false;
    this.botonGuardar = true;
  }

  modoEdicion() {
    this.botonGuardar = false;
    this.botonEditar = true;
  }

  construirForm() {
    this.formCompetencia = this.formBuilder.group({
      idcompetencia: ['', []],
      nombre: ['', [Validators.required]],
      descripcion: ['', []]

    });
  }

  optenerValoresForm(com: Competencia) {
    com.idcompetencia = this.formCompetencia.get('idcompetencia')?.value;
    com.nombre = this.formCompetencia.get('nombre')?.value;
    com.descripcion = this.formCompetencia.get('descripcion')?.value;

  }

  limpiarForm() {
    this.formCompetencia.setValue({
      idcompetencia: "",
      nombre: "",
      descripcion: ""
    });

  }

  cargarForm(com: Competencia) {
    this.formCompetencia.setValue({
      idcompetencia: com.idcompetencia,
      nombre: com.nombre,
      descripcion: com.descripcion
    });

  }

  ngOnInit(): void {
    this.modoInsercion();
    this.listar();
    this.listarComCur();
  }



  listar() {
    this.servicio.comLista().subscribe(datos => {
      this.competencias = datos;
      this.mensaje = "";
    }, err => {
      this.mensaje = "Sin datos que mostrar";
    });
  }

  save(event: Event) {
    event.preventDefault();
    if (this.formCompetencia.valid) {
      if (this.botonGuardar) {
        this.guardar();
      }
      else if (this.botonEditar) {
        this.editar();
      }
      else {
        alert("Operación no reconocido");
      }
    }
    else {
      this.formCompetencia.markAllAsTouched();
    }
  }

  guardar() {
    this.optenerValoresForm(this.competencia);
    if (this.competencia.idcompetencia.toString() == "") {
      this.servicio.comCrear(this.competencia).subscribe(dato => {
        alert("Competencia guardado con éxito");
        this.ngOnInit();
        this.limpiar();
      });
    }
    else {
      alert("Operación no reconocido")
    }
  }

  obtener(com: Competencia) {
    let id: Number = com.idcompetencia;
    if (id > 0) {
      this.servicio.comObtener(id).subscribe(dato => {
        this.competencia = dato;
        this.cargarForm(this.competencia);
        this.modoEdicion();
      });
    }
  }

  editar() {
    this.optenerValoresForm(this.competencia);
    if (this.competencia.idcompetencia.toString() != "") {
      this.servicio.comEditar(this.competencia).subscribe(dato => {
        alert("Competencia actualizado con éxito");
        this.ngOnInit();
        this.limpiar();
      });
    }
    else {
      alert("Operación no reconocido")
    }
  }

  limpiar() {
    this.modoInsercion();
    this.limpiarForm();
    this.formCompetencia.markAsUntouched();
  }

  eliminar(com: Competencia) {
    let id: Number = com.idcompetencia;
    if (id > 0) {
      let confirmar = confirm("Seguro que decea eliminar?????");
      if (confirmar) {
        this.servicio.comEliminar(id).subscribe(dato => {
          alert("Competencia eliminado con exito");
          this.ngOnInit();
        });
      }
    }
  }

  buscarCom() {
    if (this.formBuscarCompetencia.valid) {
      let nombre: String = this.formBuscarCompetencia.value;
      this.servicio.comBuscar(nombre).subscribe(datos => {
        this.competencias = datos;
        this.mensaje = "";
      }, err => {
        this.mensaje = "Sin datos que mostrar";
      });
    }

  }

  //buscar y seleccionar cursos
  buscar() {
    if (this.formBuscar.valid) {
      let nombre = this.formBuscar.value;
      this.curservicio.cursoBuscar(nombre).subscribe(datos => {
        this.cursos = datos;
        this.mensajeBuscar = "";
      }, err => {
        this.mensajeBuscar = "Sin datos  que mostrar";
      });
    }
  }

  seleccionar(curso: Curso) {
    const encontrar = this.selectCursos.find(x => x.idcurso == curso.idcurso);
    if (encontrar == undefined || encontrar == null) {
      this.selectCursos.push(curso);
    }
    else {
      alert("El curso ya fue agregado")
    }

  }

  eliminarCursoLista(curso: Curso) {
    let confirmar = confirm("Seguro que desea eliminar de la lista");
    if (confirmar) {
      var indice = this.selectCursos.indexOf(curso);
      this.selectCursos.splice(indice, 1);
    }
  }

  //Los mas nuevos
  seleccionar_com(com: Competencia) {
    const encontrar = this.selectCompetencias.find(x => x.idcompetencia == com.idcompetencia);
    if (encontrar == undefined || encontrar == null) {
      this.selectCompetencias.push(com);
    }
    else {
      alert("El curso ya fue agregado")
    }
  }

  eliminarDeLista(competencia: Competencia) {
    let confirmar = confirm("Seguro que desea eliminar de la lista");
    if (confirmar) {
      var indice = this.selectCompetencias.indexOf(competencia);
      this.selectCompetencias.splice(indice, 1);
    }
  }

  competenciascursos: CompetenciaCurso[] = [];
  competenciacurso: CompetenciaCurso;
  idcompetenciacurso: Number;
  guardarDetalle() {  
    if (this.selectCompetencias.length > 0 && this.selectCursos.length > 0) {
      for (let competencia of this.selectCompetencias) {
        for (let curso of this.selectCursos) {
          this.competenciacurso = new CompetenciaCurso(this.idcompetenciacurso, competencia, curso);
          this.competenciascursos.push(this.competenciacurso);
        }
      }
      this.servicio.comcurCrear(this.competenciascursos).subscribe(dato => {
        alert("Asignaciones creadas con éxito");
        this.cancelarOperacion();
        this.ngOnInit();
      });     

    }
    else {
      alert("Selecione competencias y cursos primero");
    }
  }

  cancelarOperacion() {
    this.selectCompetencias.length = 0;
    this.selectCursos.length = 0;
    this.competenciascursos.length = 0;
  }

  //final
  form_Buscar: FormControl = new FormControl('', Validators.required);
  competenciacursos: CompetenciaCurso[] = [];

  mensajeya: String;
  listarComCur() {
    this.servicio.comcurLista().subscribe(datos => {
      this.competenciacursos = datos;
      this.mensajeya = "";
    }, err => {
      this.mensajeya = "Sin datos que mostrar";
    });
  }

  buscarGeneral() {
    if (this.form_Buscar.valid) {
      let nombre: String = this.form_Buscar.value;
      this.servicio.comcurBuscar(nombre).subscribe(datos => {
        this.competenciacursos = datos;
        this.mensajeya = "";
      }, err => {
        this.mensajeya = "Sin datos que mostrar";
      });
    }

  }

  eliminar_comcurso(comcurso: CompetenciaCurso) {
    let confirmar = confirm("Seguro que desea borrar el registro???");
    if (confirmar) {
      this.servicio.comcurEliminar(comcurso.idcompetenciacurso).subscribe(dato => {
        alert("El registro se borró con éxito");
        this.ngOnInit();
      });
    }

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
