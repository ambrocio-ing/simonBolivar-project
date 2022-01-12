import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { formatDate } from '@angular/common';
import { Horario } from 'src/app/Modelo/Horario/horario';
import { Grado } from 'src/app/Modelo/Grado/grado';
import { Seccion } from 'src/app/Modelo/Seccion/seccion';
import { DetalleAlumnoService } from 'src/app/Servicio/DetalleAlumno/detalle-alumno.service';
import { HorarioService } from 'src/app/Servicio/Horario/horario.service';
import { URL_BACKEND } from 'src/app/config/config';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  public urlBackend:String = URL_BACKEND;

  fechahoy = new Date(Date.now());

  constructor(private router:Router, public ususervicio:UsuarioRoleService, 
    private formBuilder:FormBuilder, private daservicio:DetalleAlumnoService,
    private hoservicio:HorarioService) {

    this.construirForm();

  }

  horario:Horario = new Horario();
  horarios:Horario[] = [];

  grados:Grado[] = [];
  secciones:Seccion[] = [];

  fhorario:FormGroup;
  formBuscar:FormControl = new FormControl(formatDate(this.fechahoy,"yyyy-MM-dd","en"),[Validators.required]);

  construirForm(){
    this.fhorario = this.formBuilder.group({
      idhorario:['',[]],
      fecha:[formatDate(this.fechahoy,"yyyy-MM-dd", "en"),[Validators.required]],
      archivo:['',[Validators.required]],
      grado:['',[Validators.required]],
      seccion:['',[Validators.required]]
    }); 
  }

  fotoSeleccionado:File;
  estadoBoton:Boolean;    

  capturarFoto(event:Event){    
    const tar_get = (event.target as HTMLInputElement);    
    this.fotoSeleccionado = (tar_get.files as FileList)[0];    
    if(this.fotoSeleccionado.type.indexOf('image') < 0){
      alert("El archivo debe ser una imagen");     
      this.estadoBoton = false;
    }
    else{
      this.estadoBoton = true;
    }
    
  }

  obtenerValoresForm(ho:Horario){
    ho.idhorario = this.fhorario.get('idhorario')?.value;
    ho.fecha = this.fhorario.get('fecha')?.value;
    ho.archivo = "";
    ho.grado = this.fhorario.get('grado')?.value;
    ho.seccion = this.fhorario.get('seccion')?.value;
  }


  ngOnInit(): void {
    this.listarGrado();
    this.listarSeccion();
    this.listar();
  }

  mensajeHorario:String;
  listar(){
    this.hoservicio.listarHorario().subscribe(datos => {
      this.horarios = datos;
      this.mensajeHorario = "";
    }, err => {
      this.mensajeHorario = "Sin datos que mostrar";
    });
  }

  listarGrado(){
    if(this.grados.length == 0 || this.grados == null){
      this.daservicio.listaGrado().subscribe(datos => {
        this.grados = datos;
      });
    }  
    
  }

  listarSeccion(){
    if(this.secciones == null || this.secciones.length == 0){
      this.daservicio.listaSeccion().subscribe(datos => {
        this.secciones = datos;
      });
    }
    
  }

  enviar(event:Event){
    event.preventDefault();
    if(this.fhorario.valid){
      this.obtenerValoresForm(this.horario);
      this.hoservicio.crearHorario(this.fotoSeleccionado,this.horario).subscribe(event => {
        
        if(event.type === HttpEventType.Response){
          let response:any = event.body;          
          //this.fotoSeleccionado == null;
          alert(response.mensaje);          
        }
        this.ngOnInit();        
        
      });
    }
    else{
      this.fhorario.markAllAsTouched();
    }
  } 

  eliminar(horario:Horario){
    let id = horario.idhorario;
    if(id != null){
      let confirmar = confirm("Seguro que desea eliminar registro????");
      if(confirmar){
        this.hoservicio.eliminarHorario(+id).subscribe(dato => {
          this.ngOnInit();
        });
      }
    }
  }

  buscar(){
    if(this.formBuscar.valid){
      let fecha = this.formBuscar.value;
      this.hoservicio.buscarHorario(fecha).subscribe(datos => {
        this.horarios = datos;
        this.mensajeHorario = "";
      }, err => {
        this.mensajeHorario = "Sin datos que mostrar";
      });
    }
  }

  irAperfil(){
    this.router.navigate(['intra/personal']);
  }

  cerrarSesion(){
    this.ususervicio.cerrarSession();
    this.router.navigate(['login']);
  }

}
