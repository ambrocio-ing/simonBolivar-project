import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mcursos } from 'src/app/Informes/MCurso/mcursos';
import { DetalleAlumnoService } from 'src/app/Servicio/DetalleAlumno/detalle-alumno.service';
import { DetalleCursoEmpleadoService } from 'src/app/Servicio/DetalleCursoEmpleado/detalle-curso-empleado.service';
import { UsuarioAlumnoService } from 'src/app/Servicio/UsuarioAlumno/usuario-alumno.service';

@Component({
  selector: 'app-int-asi-alu',
  templateUrl: './int-asi-alu.component.html',
  styleUrls: ['./int-asi-alu.component.css']
})
export class IntAsiAluComponent implements OnInit {
 

  constructor(private router:Router, private daservicio:DetalleAlumnoService, 
    public usualumno:UsuarioAlumnoService){

  }

  mcursos:Mcursos[] = [];
  mensaje:String;
  ngOnInit(): void {
    let idda = this.usualumno.ualumno.iddetalle_alumno;
    if(idda != null){
      this.daservicio.listarAsistencias(+idda).subscribe(datos => {
        this.mcursos = datos;
        this.mensaje = "";
      }, err => {
        this.mensaje = "Sin datos que mostrar";
      });
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

}