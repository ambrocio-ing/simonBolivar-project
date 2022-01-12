import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Modelo/Usuario/usuario';
import { ClaseService } from 'src/app/Servicio/Clase/clase.service';
import { EmpleadoService } from 'src/app/Servicio/Empleado/empleado.service';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';

@Component({
  selector: 'app-nueva-contra',
  templateUrl: './nueva-contra.component.html',
  styleUrls: ['./nueva-contra.component.css']
})
export class NuevaContraComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private router:Router, private clservicio:ClaseService) { 

    this.construirForm();
  }

  flogin:FormGroup;

  usuario:Usuario = new Usuario();
  ucambiar:Usuario = new Usuario();
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

  aignarUCambiar(usu:Usuario){
    usu.username = this.flogin.get('fusername')?.value;
    usu.password = this.flogin.get('fpasswordnueva')?.value;
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
      this.aignarUCambiar(this.ucambiar);
      if(this.usuario != null && this.ucambiar != null){
        this.clservicio.cambiarContra(this.usuario, this.ucambiar).subscribe(dato => {
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
