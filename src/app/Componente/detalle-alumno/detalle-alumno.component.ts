import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Grado } from 'src/app/Modelo/Grado/grado';
import { Seccion } from 'src/app/Modelo/Seccion/seccion';
import { Alumno } from 'src/app/Modelo/Alumno/alumno';
import { formatDate } from '@angular/common'
import { DetalleAlumno } from 'src/app/Modelo/DetalleAlumno/detalle-alumno'
import { DetalleAlumnoService } from 'src/app/Servicio/DetalleAlumno/detalle-alumno.service';
import { ComunicadorService } from 'src/app/Servicio/Comunicador/comunicador.service';
import { RunGuardsAndResolvers } from '@angular/router';

@Component({
  selector: 'app-detalle-alumno',
  templateUrl: './detalle-alumno.component.html',
  styleUrls: ['./detalle-alumno.component.css']
})
export class DetalleAlumnoComponent implements OnInit {

  detalle_alumnos: DetalleAlumno[] = new Array<DetalleAlumno>();

  constructor(private servicio: DetalleAlumnoService, private comunicador: ComunicadorService) {

  }

  ngOnInit(): void {
    this.listar();
    this.llenarComboGrado();
    this.llenarComboSeccion();
    this.recibirAlumno();
    this.modoInsercion();
  }


  fechaHoy = new Date(Date.now());
  mensaje: String;

  estadoGuardar: Boolean;
  estadoEditar: Boolean;
  estadoAgregar: Boolean;

  detalleAlumnos: DetalleAlumno[];

  grados: Grado[];
  secciones: Seccion[];

  detalleAlumno: DetalleAlumno;
  grado: Grado;
  seccion: Seccion;
  alumno: Alumno = new Alumno();

  formIddetalleAlumno = new FormControl('', [Validators.required]);
  formPeriodo = new FormControl(formatDate(this.fechaHoy, "yyyy-MM-dd", "en"), [Validators.required]);

  formIdalumno = new FormControl('', [Validators.required]);
  formNombreAlumno = new FormControl('', [Validators.required]);

  formGrado = new FormControl('', [Validators.required]);
  formSeccion = new FormControl('', [Validators.required]);

  formBuscar = new FormControl('', [Validators.required]);

  navegar(element: HTMLElement) {
    element.scrollIntoView();
  }

  llenarComboGrado(): void {
    this.servicio.listaGrado().subscribe(datos => {
      this.grados = datos;
    });
  }

  llenarComboSeccion(): void {
    this.servicio.listaSeccion().subscribe(datos => {
      this.secciones = datos;
    });
  }

  listar(): void {
    this.servicio.listaDetalle().subscribe(datos => {
      this.detalleAlumnos = datos;
      this.mensaje = "";
    }, err => {
      this.mensaje = "Sin datos que mostrar";
    });
  }

  llenarDetalleAlumno() {
    let iddetalle_alumno = this.formIddetalleAlumno.value;
    //periodo = this.formPeriodo.value;
    //this.alumno.idalumno = this.formIdalumno.value;    
    this.grado = this.formGrado.value;
    this.seccion = this.formSeccion.value;

    this.detalleAlumno = new DetalleAlumno(iddetalle_alumno, this.formPeriodo.value, this.alumno, this.grado, this.seccion);
  }

  limpiarForms() {
    this.formIddetalleAlumno.setValue('');
    this.formPeriodo.setValue(formatDate(this.fechaHoy, 'yyyy-MM-dd', 'en'));
    this.formIdalumno.setValue('');
    this.formNombreAlumno.setValue('');
  }

  agregar() {
    if (this.formPeriodo.valid && this.formIdalumno.valid && this.formGrado.valid && this.formSeccion.valid) {
      this.llenarDetalleAlumno();
      if (this.detalleAlumno.iddetalle_alumno.toString() == "") {
        if (this.alumno.idalumno.toString() != "" && this.grado.idgrado.toString() != "" && this.seccion.idseccion.toString() != "") {

          const encontrar = this.detalle_alumnos.find(x => x.alumno == this.detalleAlumno.alumno);

          if (encontrar == undefined || encontrar == null) {
            this.detalle_alumnos.push(this.detalleAlumno);
            this.limpiarForms();
          }
          else {
            alert("El alumno ya fue agregado")
          }

        }
      }
    }
    else {
      this.formIddetalleAlumno.markAsTouched();
      this.formPeriodo.markAsTouched();
      this.formIdalumno.markAsTouched();
      this.formGrado.markAsTouched();
      this.formSeccion.markAsTouched();
    }

  }

  eliminar(detalleAlumno: DetalleAlumno) {
    let confirmar = confirm("Seguro que desea eliminar?????");
    if (confirmar) {
      var indice = this.detalle_alumnos.indexOf(detalleAlumno);
      this.detalle_alumnos.splice(indice, 1);
    }

  }

  enviar() {
    if (this.estadoGuardar) {
      this.guardar();
    } else if (this.estadoEditar) {
      if (this.formPeriodo.valid && this.formIdalumno.valid && this.formGrado.valid && this.formSeccion.valid) {
        this.editar();
      }
      else {
        this.formIddetalleAlumno.markAsTouched();
        this.formPeriodo.markAsTouched();
        this.formIdalumno.markAsTouched();
        this.formGrado.markAsTouched();
        this.formSeccion.markAsTouched();
      }
    }

  }

  guardar() {
    if (this.detalle_alumnos.length == 0 || this.detalle_alumnos == undefined) {
      alert("Primero agrege alumnos a matricular");
    } else {
      let validar = true;
      for (let detalle of this.detalle_alumnos) {
        if (detalle.iddetalle_alumno.toString() != "") {
          validar = false;
          break;
        }

      }

      if (validar) {
        if (this.detalle_alumnos.length != 0) {
          this.servicio.detalleCrear(this.detalle_alumnos).subscribe(datos => {
            alert("Operación exitosa");
            this.ngOnInit();
            this.detalle_alumnos.length = 0;
          }, err => {
            alert("Operación fallida");
          });
        }
        else {
          alert("Operación no reconocida");
        }
      }
      else {
        alert("Operación no reconocida");
      }
    }

  }

  cargarControles(detalleAlumno1: DetalleAlumno) {
    this.formIddetalleAlumno.setValue(detalleAlumno1.iddetalle_alumno);
    this.formPeriodo.setValue(formatDate(detalleAlumno1.periodo, 'yyyy-MM-dd', 'en'));
    this.formIdalumno.setValue(detalleAlumno1.alumno.idalumno);
    this.formNombreAlumno.setValue(detalleAlumno1.alumno.nombre + ", " + detalleAlumno1.alumno.apellidos);

    this.formGrado.setValue(detalleAlumno1.grado);
    this.formSeccion.setValue(detalleAlumno1.seccion);
    this.grado = detalleAlumno1.grado;
    this.seccion = detalleAlumno1.seccion;
    this.alumno = detalleAlumno1.alumno;
  }

  obtener(detalleAlumno: DetalleAlumno) {
    let id = detalleAlumno.iddetalle_alumno;
    if (id != undefined) {
      this.servicio.detalleObtener(id).subscribe(datos => {
        this.detalleAlumno = datos;
        this.cargarControles(this.detalleAlumno);
        this.modoEdicion();
      }, err => {
        alert("Imposible recuperar registros");
      });
    }

  }

  editar() {
    this.llenarDetalleAlumno();
    console.log(this.detalleAlumno);
    if (this.detalleAlumno.iddetalle_alumno.toString() != "" || this.detalleAlumno.iddetalle_alumno.toString() != undefined) {
      if (this.alumno.idalumno.toString() != "" && this.grado.idgrado.toString() != "" &&
        this.seccion.idseccion.toString() != "") {

        this.servicio.detalleEditar(this.detalleAlumno).subscribe(datos => {
          alert("Edición exitosa");
          this.ngOnInit();
          this.limpiarForms();
        }, err => {
          alert("Edición fallida");
        });
      }
    }
  }

  recibirAlumno() {
    this.comunicador.disparador3.subscribe(datos => {
      this.alumno = datos;
      this.formIdalumno.setValue(this.alumno.idalumno);
      this.formNombreAlumno.setValue(this.alumno.nombre + ", " + this.alumno.apellidos);
    });
  }

  Limpiar() {
    this.limpiarForms();
    this.modoInsercion();
    this.formIddetalleAlumno.markAsUntouched();
    this.formPeriodo.markAsUntouched();
    this.formIdalumno.markAsUntouched();
    this.formGrado.markAsUntouched();
    this.formSeccion.markAsUntouched();

  }

  modoInsercion() {
    this.estadoGuardar = true;
    this.estadoEditar = false;
    this.estadoAgregar = true;
  }

  modoEdicion() {
    this.estadoGuardar = false;
    this.estadoEditar = true;
    this.estadoAgregar = false;
  }

  Buscar() {
    if(this.formBuscar.valid){
      let nombre = this.formBuscar.value;
      this.servicio.detalleBuscar(nombre).subscribe(datos => {
        this.detalleAlumnos = datos;        
      }, err => {
        alert("Sin datos que mostrar");
      });
    }
  }

  compararGrados(grado1: Grado, grado2: Grado) {
    if (grado1 == null || grado2 == null) {
      return null;
    }
    else {
      return grado1.nombre_grado === grado2.nombre_grado;
    }
  }

  compararSecciones(secion1: Seccion, seccion2: Seccion) {
    if (secion1 == null || seccion2 == null) {
      return null;
    }
    else {
      return secion1.nombre_seccion === seccion2.nombre_seccion;
    }
  }

}
