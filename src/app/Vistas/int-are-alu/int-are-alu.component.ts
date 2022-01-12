import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DetalleAlumno } from 'src/app/Modelo/DetalleAlumno/detalle-alumno';
import { DetalleCursoEmpleado } from 'src/app/Modelo/DetalleCursoEmpleado/detalle-curso-empleado';
import { DetalleAlumnoService } from 'src/app/Servicio/DetalleAlumno/detalle-alumno.service';
import { DetalleCursoEmpleadoService } from 'src/app/Servicio/DetalleCursoEmpleado/detalle-curso-empleado.service';
import { UsuarioAlumnoService } from 'src/app/Servicio/UsuarioAlumno/usuario-alumno.service';

@Component({
  selector: 'app-int-are-alu',
  templateUrl: './int-are-alu.component.html',
  styleUrls: ['./int-are-alu.component.css']
})
export class IntAreAluComponent implements OnInit {

  
  constructor(private router:Router,private daservicio:DetalleAlumnoService,
    public usualumno:UsuarioAlumnoService) { 

  }

  detallealumno:DetalleAlumno;
  dces:DetalleCursoEmpleado[] = [];

  ngOnInit(): void {
    let idda = this.usualumno.ualumno.iddetalle_alumno;
    if(idda != null){
      this.daservicio.detallealumnObtener(+idda).subscribe(dato => {
        this.detallealumno = dato;
        this.cargarDCE();
      });
    }
     
  }

  cargarDCE(){
    this.daservicio.mostrarPorGradoSeccion(this.detallealumno.grado.idgrado,this.detallealumno.seccion.idseccion).subscribe(datos => {
        this.dces = datos;
    });
  }
  
  verClases(dce:DetalleCursoEmpleado){
    let iddce = dce.iddetalle_ce;
    if(iddce != null){
      sessionStorage.setItem("id_dce", iddce.toString());
      this.router.navigate(['clases/estudiante']);
    }
    
  }

  irAperfil(){
    if(this.usualumno.isAuthenticated()){
      this.router.navigate(['aula']);
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

  //metodos antiguos  

}
