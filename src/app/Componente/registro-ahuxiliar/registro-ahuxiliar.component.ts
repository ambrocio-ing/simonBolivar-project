import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { McursoCompetenciaI } from 'src/app/Informes/MCursoCompetenciaI/mcurso-competencia-i';
import { McursoCompetenciaIi } from 'src/app/Informes/MCursoCompetenciaII/mcurso-competencia-ii';
import { McursoCompetenciaIii } from 'src/app/Informes/MCursoCompetenciaIII/mcurso-competencia-iii';
import { McursoCompetenciaIv } from 'src/app/Informes/MCursoCompetenciaIV/mcurso-competencia-iv';
import { DetalleCursoEmpleado } from 'src/app/Modelo/DetalleCursoEmpleado/detalle-curso-empleado';
import { Grado } from 'src/app/Modelo/Grado/grado';
import { Seccion } from 'src/app/Modelo/Seccion/seccion';
import { DetalleAlumnoService } from 'src/app/Servicio/DetalleAlumno/detalle-alumno.service';
import { DetaleBimestreCompetenciaService } from 'src/app/Servicio/DetalleBimestreCompetencia/detale-bimestre-competencia.service';
import { DetalleCursoEmpleadoService } from 'src/app/Servicio/DetalleCursoEmpleado/detalle-curso-empleado.service';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router'; 
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-registro-ahuxiliar',
  templateUrl: './registro-ahuxiliar.component.html',
  styleUrls: ['./registro-ahuxiliar.component.css']
})
export class RegistroAhuxiliarComponent implements OnInit {

  urlBackend:String = URL_BACKEND;

  constructor(private daservicio: DetalleAlumnoService,
    private dceservicio: DetalleCursoEmpleadoService,
    private dbcservicio: DetaleBimestreCompetenciaService,
    private router:Router, public ususervicio:UsuarioRoleService) { }

  grados: Grado[];
  secciones: Seccion[];
  dces: DetalleCursoEmpleado[] = [];

  fechahoy = new Date(Date.now());

  fgrado: FormControl = new FormControl('', [Validators.required]);
  fseccion: FormControl = new FormControl('', [Validators.required]);
  fdce: FormControl = new FormControl('', [Validators.required]);
  ffecha: FormControl = new FormControl(formatDate(this.fechahoy, "yyyy-MM-dd", "en"), [Validators.required]);

  mensajeBuscar: String;
  mensajeMostrar: String;
  mensajegrado: String;
  mensajeseccion: String;

  ngOnInit(): void {

    this.listarGrado();
    this.listarSeccion();

  }
  
  listarGrado() {
    this.daservicio.listaGrado().subscribe(datos => {
      this.grados = datos;
      this.mensajegrado = "";
    }, err => {
      this.mensajegrado = "Sin datos que mostrar";
    });
  }

  listarSeccion() {
    this.daservicio.listaSeccion().subscribe(datos => {
      this.secciones = datos;
      this.mensajeseccion = "";
    }, err => {
      this.mensajeseccion = "Sin datos que mostrar";
    });
  }

  buscar() {
    if (this.fgrado.valid && this.fseccion.valid) {
      let grado: Grado = this.fgrado.value;
      let seccion: Seccion = this.fseccion.value;
      this.daservicio.mostrar_PorGrado_Seccion(grado.idgrado, seccion.idseccion).subscribe(datos => {
        this.dces = datos;
        this.mensajeBuscar = "";
      }, err => {
        this.mensajeBuscar = "No se encontraron coincidencias";
      });
    }
    else {
      this.mensajeBuscar = "Seleccione grado y secci??n";
    }
  }

  competencias_uno: McursoCompetenciaI[]= [];
  competencias_dos: McursoCompetenciaIi[] = [];
  competencias_tres: McursoCompetenciaIii[] = [];
  competencias_cuatro: McursoCompetenciaIv[] = [];
  fechaUso:Number;
  mensajeTabla:String;

  estadocuatro:Boolean;
  estadotres:Boolean;
  estadodos:Boolean;
  estadouno:Boolean;

  dceseleccionado:DetalleCursoEmpleado;
  fechaconsulta:String;  

  mostrarRegistro() {
    this.fechaconsulta = this.ffecha.value;
    this.competencias_cuatro.length = 0;
    this.competencias_tres.length = 0;
    this.competencias_dos.length = 0;
    this.competencias_uno.length = 0;
    this.estadocuatro = false;
    this.estadotres = false;
    this.estadodos = false;
    this.estadouno = false;
    if (this.fgrado.valid && this.fseccion.valid && this.fdce.valid && this.ffecha.valid) {      
      let dce: DetalleCursoEmpleado = this.fdce.value;
      this.dceseleccionado = dce;
      let fecha = this.ffecha.value;
      let f:Date = new Date(this.ffecha.value);
      this.fechaUso = f.getFullYear();
      let nombre_curso = dce.curso.nombre.toUpperCase();
      
      if(nombre_curso == "MATEM??TICA I" || nombre_curso == "MATEMATICA I" || 
          nombre_curso == "MATEM??TICA II" || nombre_curso == "MATEMATICA II" ||  
          nombre_curso == "MATEM??TICA III" || nombre_curso == "MATEMATICA III" || 
          nombre_curso == "MATEM??TICA IV" || nombre_curso == "MATEMATICA IV" || 
          nombre_curso == "MATEM??TICA V" || nombre_curso == "MATEMATICA V")
        {

        this.dbcservicio.listarRegistroAuxiliarCuatro(dce.iddetalle_ce,fecha).subscribe(datos => {
          this.competencias_cuatro = datos;
          this.estadocuatro = true;
          this.mensajeTabla = "";
        }, err => {
          this.estadocuatro = false;
          this.mensajeTabla = "Sin datos que mostar";
        });

      }      
      else if(nombre_curso == "COMUNICACI??N I" || nombre_curso == "COMUNICACION I" || 
          nombre_curso == "COMUNICACI??N II" || nombre_curso == "COMUNICACION II" ||  
          nombre_curso == "COMUNICACI??N III" || nombre_curso == "COMUNICACION III" || 
          nombre_curso == "COMUNICACI??N IV" || nombre_curso == "COMUNICACION IV" || 
          nombre_curso == "COMUNICACI??N V" || nombre_curso == "COMUNICACION V")
        {

        this.dbcservicio.listarRegistroAuxiliarTres(dce.iddetalle_ce,fecha).subscribe(datos => {
          this.competencias_tres = datos;
          this.estadotres = true;
          this.mensajeTabla = "";
        }, err => {
          this.estadotres = false;
          this.mensajeTabla = "Sin datos que mostar";
        });

      }
      else if(nombre_curso == "INGL??S I" || nombre_curso == "INGLES I" || 
          nombre_curso == "INGL??S II" || nombre_curso == "INGLES II" ||  
          nombre_curso == "INGL??S III" || nombre_curso == "INGLES III" || 
          nombre_curso == "INGL??S IV" || nombre_curso == "INGLES IV" || 
          nombre_curso == "INGL??S V" || nombre_curso == "INGLES V")
        {

        this.dbcservicio.listarRegistroAuxiliarTres(dce.iddetalle_ce,fecha).subscribe(datos => {
          this.competencias_tres = datos;
          this.estadotres = true;
          this.mensajeTabla = "";
        }, err => {
          this.estadotres = false;
          this.mensajeTabla = "Sin datos que mostar";
        });

      }
      else if(nombre_curso == "CIENCIAS SOCIALES I" || nombre_curso == "CIENCIAS SOCIALES II" ||  
          nombre_curso == "CIENCIAS SOCIALES III" || nombre_curso == "CIENCIAS SOCIALES IV" ||  
          nombre_curso == "CIENCIAS SOCIALES V")
        {

        this.dbcservicio.listarRegistroAuxiliarTres(dce.iddetalle_ce,fecha).subscribe(datos => {
          this.competencias_tres = datos;
          this.estadotres = true;
          this.mensajeTabla = "";
        }, err => {
          this.estadotres = false;
          this.mensajeTabla = "Sin datos que mostar";
        });

      }
      else if(nombre_curso == "EDUCACI??N F??SICA I" || nombre_curso == "EDUCACION FISICA I" || 
          nombre_curso == "EDUCACI??N F??SICA II" || nombre_curso == "EDUCACION FISICA II" ||  
          nombre_curso == "EDUCACI??N F??SICA III" || nombre_curso == "EDUCACION FISICA III" || 
          nombre_curso == "EDUCACI??N F??SICA IV" || nombre_curso == "EDUCACION FISICA IV" || 
          nombre_curso == "EDUCACI??N F??SICA V" || nombre_curso == "EDUCACION FISICA V")
        {

        this.dbcservicio.listarRegistroAuxiliarTres(dce.iddetalle_ce,fecha).subscribe(datos => {
          this.competencias_tres = datos;
          this.estadotres = true;
          this.mensajeTabla = "";
        }, err => {
          this.estadotres = false;
          this.mensajeTabla = "Sin datos que mostar";
        });

      }
      else if(nombre_curso == "CIENCIA Y TECNOLOG??A I" || nombre_curso == "CIENCIA Y TECNOLOGIA I" || 
          nombre_curso == "CIENCIA Y TECNOLOG??A II" || nombre_curso == "CIENCIA Y TECNOLOGIA II" ||  
          nombre_curso == "CIENCIA Y TECNOLOG??A III" || nombre_curso == "CIENCIA Y TECNOLOGIA III" || 
          nombre_curso == "CIENCIA Y TECNOLOG??A IV" || nombre_curso == "CIENCIA Y TECNOLOGIA IV" || 
          nombre_curso == "CIENCIA Y TECNOLOG??A V" || nombre_curso == "CIENCIA Y TECNOLOGIA V")
        {

        this.dbcservicio.listarRegistroAuxiliarTres(dce.iddetalle_ce,fecha).subscribe(datos => {
          this.competencias_tres = datos;
          this.estadotres = true;
          this.mensajeTabla = "";
        }, err => {
          this.estadotres = false;
          this.mensajeTabla = "Sin datos que mostar";
        });

      }
      else if(nombre_curso == "ARTE Y CULTURA I" || nombre_curso == "ARTE Y CULTURA II" ||  
          nombre_curso == "ARTE Y CULTURA III" || nombre_curso == "ARTE Y CULTURA IV" ||  
          nombre_curso == "ARTE Y CULTURA V")
        {

        this.dbcservicio.listarRegistroAuxiliarDos(dce.iddetalle_ce,fecha).subscribe(datos => {
          this.competencias_dos = datos;
          this.estadodos = true;
          this.mensajeTabla = "";
        }, err => {
          this.estadodos = false;
          this.mensajeTabla = "Sin datos que mostar";
        });

      }
      else if(nombre_curso == "DESARROLLO PERSONAL, CIUDADAN??A Y C??VICA I" || nombre_curso == "DESARROLLO PERSONAL, CIUDADANIA Y CIVICA I" ||
          nombre_curso == "DESARROLLO PERSONAL, CIUDADAN??A Y C??VICA II" ||  nombre_curso == "DESARROLLO PERSONAL, CIUDADANIA Y CIVICA II" ||
          nombre_curso == "DESARROLLO PERSONAL, CIUDADAN??A Y C??VICA III" || nombre_curso == "DESARROLLO PERSONAL, CIUDADANIA Y CIVICA III" ||
          nombre_curso == "DESARROLLO PERSONAL, CIUDADAN??A Y C??VICA IV" ||  nombre_curso == "DESARROLLO PERSONAL, CIUDADANIA Y CIVICA IV" ||
          nombre_curso == "DESARROLLO PERSONAL, CIUDADAN??A Y C??VICA V" || nombre_curso == "DESARROLLO PERSONAL, CIUDADANIA Y CIVICA V")
        {

        this.dbcservicio.listarRegistroAuxiliarDos(dce.iddetalle_ce,fecha).subscribe(datos => {
          this.competencias_dos = datos;
          this.estadodos = true;
          this.mensajeTabla = "";
        }, err => {
          this.estadodos = false;
          this.mensajeTabla = "Sin datos que mostar";
        });

      }
      else if(nombre_curso == "EDUCACI??N RELIGIOSA I" || nombre_curso == "EDUCACION RELIGIOSA I" ||
          nombre_curso == "EDUCACI??N RELIGIOSA II" ||  nombre_curso == "EDUCACION RELIGIOSA II" ||
          nombre_curso == "EDUCACI??N RELIGIOSA III" || nombre_curso == "EDUCACION RELIGIOSA III" ||
          nombre_curso == "EDUCACI??N RELIGIOSA IV" ||  nombre_curso == "EDUCACION RELIGIOSA IV" ||
          nombre_curso == "EDUCACI??N RELIGIOSA V" || nombre_curso == "EDUCACION RELIGIOSA V")
        {

        this.dbcservicio.listarRegistroAuxiliarDos(dce.iddetalle_ce,fecha).subscribe(datos => {
          this.competencias_dos = datos;
          this.estadodos = true;
          this.mensajeTabla = "";
        }, err => {
          this.estadodos = false;
          this.mensajeTabla = "Sin datos que mostar";
        });

      }
      else if(nombre_curso == "EDUCACI??N PARA EL TRABAJO I" || nombre_curso == "EDUCACION PARA EL TRABAJO I" ||
          nombre_curso == "EDUCACI??N PARA EL TRABAJO II" ||  nombre_curso == "EDUCACION PARA EL TRABAJO II" ||
          nombre_curso == "EDUCACI??N PARA EL TRABAJO III" || nombre_curso == "EDUCACION PARA EL TRABAJO III" ||
          nombre_curso == "EDUCACI??N PARA EL TRABAJO IV" ||  nombre_curso == "EDUCACION PARA EL TRABAJO IV" ||
          nombre_curso == "EDUCACI??N PARA EL TRABAJO V" || nombre_curso == "EDUCACION PARA EL TRABAJO V")
        {

        this.dbcservicio.listarRegistroAuxiliarUno(dce.iddetalle_ce,fecha).subscribe(datos => {
          this.competencias_uno = datos;
          this.estadouno = true;
          this.mensajeTabla = "";
        }, err => {
          this.estadouno = false;
          this.mensajeTabla = "Sin datos que mostar";
        });

      }
      else{
        this.mensajeTabla = "Sin datos que mostar";
      }

    }
    else {
      this.mensajeMostrar = "Seleccione un elemento de cada combo para continuar";
    }
  }

  //empiezan las descargas
  descargarCuatro(){    
    /*this.dbcservicio.exportarExcel(this.dceseleccionado.iddetalle_ce,this.fechaconsulta).subscribe(dato => {
      const blob = new Blob([dato],{type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      saveAs(blob, 'registroAhuxiliar.xlsx');      
    });*/
    this.dbcservicio.descargaExcelCuatro(this.dceseleccionado.iddetalle_ce, this.fechaconsulta).subscribe(dato => {
      const blob = new Blob([dato],{type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      let numero = Math.round(Math.random() * (12 - 10 )+10);
      saveAs(blob, numero+''+this.dceseleccionado.curso.nombre.replace(/\s+/g,'')+'registroAhuxiliar.xlsx');         
    }, err => {
      alert("No se pudo descargar el documento");
    });
  }

  descargarTres(){
    this.dbcservicio.descargaExcelTres(this.dceseleccionado.iddetalle_ce, this.fechaconsulta).subscribe(dato => {
      const blob = new Blob([dato],{type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      let numero = Math.round(Math.random() * (12 - 10 )+10);
      saveAs(blob, numero+''+this.dceseleccionado.curso.nombre.replace(/\s+/g,'')+'registroAhuxiliar.xlsx');     
    }, err => {
      alert("No se pudo descargar el documento");
    });
  }

  descargarDos(){
    this.dbcservicio.descargaExcelDos(this.dceseleccionado.iddetalle_ce, this.fechaconsulta).subscribe(dato => {
      const blob = new Blob([dato],{type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      let numero = Math.round(Math.random() * (12 - 10 )+10);
      saveAs(blob, numero+''+this.dceseleccionado.curso.nombre.replace(/\s+/g,'')+'registroAhuxiliar.xlsx');     
    }, err => {
      alert("No se pudo descargar el documento");
    });
  }

  descargarUno(){
    this.dbcservicio.descargaExcelUno(this.dceseleccionado.iddetalle_ce, this.fechaconsulta).subscribe(dato => {
      const blob = new Blob([dato],{type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      let numero = Math.round(Math.random() * (12 - 10 )+10);
      saveAs(blob, numero+''+this.dceseleccionado.curso.nombre.replace(/\s+/g,'')+'registroAhuxiliar.xlsx');       
    }, err => {
      alert("No se pudo descargar el documento");
    });
  }

  irAperfil(){
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
