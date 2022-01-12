import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { formatDate } from '@angular/common';

import { Alumno } from 'src/app/Modelo/Alumno/alumno';
import { Apoderado } from 'src/app/Modelo/Apoderado/apoderado';
import { AlumnoService } from 'src/app/Servicio/Alumno/alumno.service';
import { ComunicadorService } from 'src/app/Servicio/Comunicador/comunicador.service';
import { Router } from '@angular/router';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  fechahoy = new Date(Date.now());

  public urlBackend:String = URL_BACKEND;

  public previsualizacion: String;
  //public arcrivos:any = [];

  mensaje_campo = "Campo requerido";
  mensaje_no = "Campo no válido";
  alumnos: Alumno[];

  modalEstado = false;
  modalFotoEstado = false;
  estadoGuardar: Boolean;
  estadoEditar: Boolean;

  constructor(private servicio: AlumnoService, private formBuilder: FormBuilder,
    private comunicador: ComunicadorService, 
    private sanitizer: DomSanitizer,private router:Router, 
    public ususervicio:UsuarioRoleService) {

    this.detalleForm();
  }

  mostrarModal() {
    this.modalEstado = true;
  }

  alumno: Alumno = new Alumno();
  apoderado: Apoderado = new Apoderado();

  ngOnInit() {
    this.listar();    
    this.actualizarCampos();
    this.estadoEditar = false;
    this.estadoGuardar = true;
  }

  mensaje:String;
  listar(): void {
    this.servicio.getAlumnos().subscribe(valores => {
      this.alumnos = valores;
      this.mensaje = "";      
    }, err => {
      this.mensaje = "Sin datos que mostrar";
    });
    
  }

  formAlumno: FormGroup;
  formBuscar = new FormControl('', [Validators.required]);

  formApoderado = new FormControl('', []);
  formIdapoderado = new FormControl('', [Validators.required]);

  private detalleForm() {
    this.formAlumno = this.formBuilder.group({
      idalumno: ['', []],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]\d{7,7}$/)]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      direccion: ['', []],
      telefono: ['', [Validators.pattern(/^[0-9]\d{6,8}$/)]],
      genero: ['', [Validators.required]],
      fecha_nac: [formatDate(this.fechahoy, 'yyyy-MM-dd', 'en'), [Validators.required]],      
      acceso: ['ROLE_ESTUDIANTE', [Validators.required]],
      pass: ['', []],
      estado: ['', [Validators.required]]
    })
  }

  limpiarControles() {
    this.formAlumno.setValue({
      idalumno: "",
      dni: "",
      nombre: "",
      apellidos: "",
      direccion: "",
      telefono: "",
      genero: "",
      fecha_nac: formatDate(this.fechahoy, 'yyyy-MM-dd', 'en'),      
      acceso: "ROLE_ESTUDIANTE",
      pass: "",
      estado: ""
    });
    this.formIdapoderado.setValue("");
    this.formApoderado.setValue("");
  }

  private asignarAlumno_form(alumno1: Alumno) {
    alumno1.idalumno = this.formAlumno.get('idalumno')?.value;
    alumno1.dni = this.formAlumno.get('dni')?.value;
    alumno1.nombre = this.formAlumno.get('nombre')?.value;
    alumno1.apellidos = this.formAlumno.get('apellidos')?.value;
    alumno1.direccion = this.formAlumno.get('direccion')?.value;
    alumno1.telefono = this.formAlumno.get('telefono')?.value;
    alumno1.genero = this.formAlumno.get('genero')?.value;
    alumno1.fecha_nac = this.formAlumno.get('fecha_nac')?.value;    
    alumno1.acceso = "ROLE_ESTUDIANTE";
    alumno1.pass = this.formAlumno.get('pass')?.value;
    alumno1.estado = this.formAlumno.get('estado')?.value;
    alumno1.apoderado = this.apoderado;
    alumno1.foto = "";    
  }

  passs:String;
  cargarControles(alumno1: Alumno): void {
    this.formAlumno.setValue({
      idalumno: alumno1.idalumno,
      dni: alumno1.dni,
      nombre: alumno1.nombre,
      apellidos: alumno1.apellidos,
      direccion: alumno1.direccion,
      telefono: alumno1.telefono,
      genero: alumno1.genero,
      fecha_nac: formatDate(alumno1.fecha_nac, 'yyyy-MM-dd', 'en'),      
      acceso: "ROLE_ESTUDIANTE",
      pass: "",
      estado: alumno1.estado
    });    
    this.formIdapoderado.setValue(alumno1.apoderado.idapoderado);
    this.formApoderado.setValue(alumno1.apoderado.nombre + ", " + alumno1.apoderado.apellidos);
    this.apoderado = alumno1.apoderado;
  }



  get fa() {
    return this.formAlumno.controls;
  }

  save(event: Event) {
    event.preventDefault();
    if (this.formAlumno.valid && this.formIdapoderado.valid) {
      if (this.estadoGuardar) {
        this.guardar();
      }
      else if (this.estadoEditar) {
        this.editar();
      }
      else {
        alert("Operación no reconocida");
      }

    }
    else {
      this.formAlumno.markAllAsTouched();
      this.formIdapoderado.markAsTouched();
      this.formIdapoderado.markAsDirty();
    }
  }

  guardar() {
    this.asignarAlumno_form(this.alumno);    
    if (this.alumno.apoderado.idapoderado.toString() != "") {

      if (this.alumno.idalumno.toString() == "") {
        //guardar        
        this.servicio.alumnoCrear(this.alumno).subscribe(datos => {
          alert("Operación exitosa");          
          this.limpiarControles();
          this.formAlumno.markAsUntouched();
          this.formIdapoderado.markAsUntouched();
          this.ngOnInit();
        });
      }
      else {
        alert("Operación no reconocida");

      }
    }
    else {
      console.log("no se encontro apoderado");
    }

  }

  editar() {
    this.asignarAlumno_form(this.alumno);    
    
    if (this.alumno.apoderado.idapoderado.toString() != "") {
      if (this.alumno.idalumno.toString() != "") {
        this.servicio.alumnoEditar(this.alumno).subscribe(datos => {
          alert("Operación exitosa"); 
          this.limpiarControles();
          this.formAlumno.markAsUntouched();
          this.formIdapoderado.markAsUntouched();
          this.ngOnInit();
        });
      }
      else {
        alert("Operación no reconocida");
      }
    }
    else {
      console.log("no se encontro apoderado");
    }
  }

  eliminar(alumno: Alumno) {
    let id = alumno.idalumno;
    if (id != null) {
      let confimar = confirm("Seguro que desea eliminar? solo podrá eliminar alumno sin ningun tipo de asignacion");
      if (confimar) {
        this.servicio.alumnoEliminar(alumno.idalumno).subscribe(datos => {   
          alert("Operación exitosa");        
          this.ngOnInit();
        });

      }

    }
  }

  obtenerAlumno(alumno: Alumno) {
    let id = alumno.idalumno;
    if (id != null) {
      this.servicio.alumnoObener(id).subscribe(datos => {
        this.alumno = datos;
        this.cargarControles(this.alumno);
        this.estadoEditar = true;
        this.estadoGuardar = false;
      });
    }
  }

  actualizarCampos() {
    this.comunicador.disparador.subscribe(datos => {
      this.apoderado = datos;
      this.formIdapoderado.setValue(this.apoderado.idapoderado.toString());
      this.formApoderado.setValue(this.apoderado.nombre.toString() + ", " + this.apoderado.apellidos.toString());

    });
  }

  Limpiar() {
    this.limpiarControles();
    this.formAlumno.markAsUntouched();
    this.estadoEditar = false;
    this.estadoGuardar = true;
  }

  Buscar() {
    if (this.formBuscar.valid) {
      let nombre = this.formBuscar.value;
      this.alumno.nombre = nombre;
      this.servicio.alumnoBuscar(this.alumno).subscribe(datos => {
        this.alumnos = datos;
      });
    }
  }

  capturarFoto(event: Event): any {
    const target = (event.target as HTMLInputElement);
    const archivo: File = (target.files as FileList)[0];
    this.extraerBase64(archivo).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);
    });
    //this.arcrivos.push(archivo);

  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const imagen = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      
    }
  });

  enviar(alumno: Alumno) {
    let id = alumno.idalumno;
    if (id != null) {
      this.comunicador.disparador3.emit(alumno);
    }
  }

  alumnoSeleccionado:Alumno;

  abrirModalFoto(alumno:Alumno){
    this.alumnoSeleccionado = alumno;
    this.modalFotoEstado = true;
  }

  //metodo sin uso
  capturarEmisionNombreFoto(){
    this.comunicador.notificarLaRecarga.subscribe(dato => {
      this.alumno.foto = dato;
    });
  }

  irAperfil(){
    if(this.ususervicio.isAuthenticated()){
      this.router.navigate(['intra/personal']);
    }
    else{
      this.ususervicio.cerrarSession();
      this.router.navigate(['login']);
    }
    
  }

  cerrarSesion(){
    this.ususervicio.cerrarSession();
    this.router.navigate(['login']);
  }

}
