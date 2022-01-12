import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/Modelo/Alumno/alumno';
import { Usuario } from 'src/app/Modelo/Usuario/usuario';
import { UsuarioAlumnoService } from 'src/app/Servicio/UsuarioAlumno/usuario-alumno.service';

@Component({
  selector: 'app-nueva-contra-alumno',
  templateUrl: './nueva-contra-alumno.component.html',
  styleUrls: ['./nueva-contra-alumno.component.css']
})
export class NuevaContraAlumnoComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private router:Router, private usualumno:UsuarioAlumnoService ) { 

    this.construirForm();
  }

  flogin:FormGroup;

  usuario:Usuario = new Usuario();
  alumno:Alumno = new Alumno();

  construirForm(){
    this.flogin = this.formBuilder.group({
      fusername:['',[Validators.required]],
      fpassword:['',[Validators.required]],
      fpasswordnueva:['',[Validators.required]]
    });
  }
 

  obtenerValoresForm(usu:Usuario){
    usu.username = this.flogin.get('fusername')?.value;
    usu.password = this.flogin.get('fpassword')?.value;
    
  }

  asignarAlumno(alum:Alumno){
    alum.dni = this.flogin.get('fusername')?.value;
    alum.pass = this.flogin.get('fpasswordnueva')?.value;
  }

  estadoBoton:Boolean;

  ngOnInit(): void {
    this.estadoBoton = true;
  }

  mensajeLogin:String;
  save(event:Event){
    event.preventDefault();
    if(this.flogin.valid){      
      this.obtenerValoresForm(this.usuario);
      this.asignarAlumno(this.alumno);
      if(this.usuario != null && this.alumno != null){
        this.usualumno.cambiarContraAlumno(this.usuario.username, this.usuario.password, this.alumno).subscribe(dato => {
          alert("Has cambiado tu contraseña con éxito, seras redirigido al login");
          this.router.navigate(['login']);
        }, err => {
          alert("Error: el proceso no se completo con éxito intentelo nuevamente");
        }); 
      }
      else{
        this.mensajeLogin = "Ocurrio un error intentelo nuevamente";
      }
    }
    else{
      this.mensajeLogin = "Complete todos los campos de entrada";
    }
  }

}
