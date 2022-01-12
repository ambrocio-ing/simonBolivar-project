import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apoderado } from 'src/app/Modelo/Apoderado/apoderado';
import { Usuario } from 'src/app/Modelo/Usuario/usuario';
import { ApoderadoService } from 'src/app/Servicio/Apoderado/apoderado.service';

@Component({
  selector: 'app-nueva-contra',
  templateUrl: './nueva-contra.component.html',
  styleUrls: ['./nueva-contra.component.css']
})
export class NuevaContraApoderadoComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private router:Router, private apservicio:ApoderadoService) { 

    this.construirForm();
  }

  flogin:FormGroup;

  usuario:Usuario = new Usuario();
  apoderado:Apoderado = new Apoderado();

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

  asignarApoderado(apo:Apoderado){
    apo.dni = this.flogin.get('fusername')?.value;
    apo.password = this.flogin.get('fpasswordnueva')?.value;
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
      this.asignarApoderado(this.apoderado);
      if(this.usuario != null && this.apoderado != null){
        this.apservicio.cambiarContraApoderado(this.usuario, this.apoderado).subscribe(dato => {
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
