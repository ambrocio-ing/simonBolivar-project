import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadPlanteado } from 'src/app/Modelo/Actividad/actividad';
import { Clase } from 'src/app/Modelo/Clase/clase';
import { DetalleCursoEmpleado } from 'src/app/Modelo/DetalleCursoEmpleado/detalle-curso-empleado';
import { ClaseService } from 'src/app/Servicio/Clase/clase.service';
import { DetalleAlumnoService } from 'src/app/Servicio/DetalleAlumno/detalle-alumno.service';
import { DetalleCursoEmpleadoService } from 'src/app/Servicio/DetalleCursoEmpleado/detalle-curso-empleado.service';
import { UsuarioAlumnoService } from 'src/app/Servicio/UsuarioAlumno/usuario-alumno.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-int-clases',
  templateUrl: './int-clases.component.html',
  styleUrls: ['./int-clases.component.css']
})
export class IntClasesComponent implements OnInit {

  constructor(private router:Router, private daservicio:DetalleAlumnoService,
    public usualumno:UsuarioAlumnoService) { 

  }

  public urlBackend:String = URL_BACKEND;

  dce:DetalleCursoEmpleado;
  clases:Clase[] = [];

  ngOnInit(): void {

    let iddce = sessionStorage.getItem("id_dce");
    if(iddce != null){
      this.daservicio.dceOptener(+iddce).subscribe(dato => {
        this.dce = dato;
        this.listarClases();
      });
    }    

  }

  listarClases(){
    this.daservicio.claseLista(this.dce.iddetalle_ce).subscribe(datos => {
      this.clases = datos;
    });
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  irAcursos(){
    if(this.usualumno.isAuthenticated()){
      this.router.navigate(['areas']);
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

  entregarActividad(actividad:ActividadPlanteado){
    let idact = actividad.idactividad;
    if(idact != null){      
      //sessionStorage.setItem("id_da", idda.toString());
      //sessionStorage.setItem("i_ddce", this.dce.iddetalle_ce.toString());
      sessionStorage.setItem("idact", idact.toString());
      this.router.navigate(['entregar_actividad']);
    }

    
  }
  
}
