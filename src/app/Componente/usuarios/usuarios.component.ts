import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/Modelo/Role/role';
import { Usuario } from 'src/app/Modelo/Usuario/usuario';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, 
    public urservicio:UsuarioRoleService, 
    private router:Router) { 
    
  }

  roles:Role[];
  roles_seleccionados:Role[] = [];
  usuarios:Usuario[] = [];
  usuario:Usuario = new Usuario();
  
  formBuscar:FormControl = new FormControl('',[Validators.required]);
  frole:FormControl = new FormControl('',[Validators.required]);

  nombreusuario:FormControl = new FormControl('',[Validators.required]);
  pass:FormControl = new FormControl('',[Validators.required]);

  mensajeRoles:String;
  mensaje:String;  

  obtenerValoreForm(usu:Usuario){
    usu.username = this.nombreusuario.value;
    usu.password = this.pass.value;   
    usu.roles = this.roles_seleccionados;
  }

  limpiarForm(){
    this.nombreusuario.setValue("");
    this.pass.setValue("");
    this.roles_seleccionados.length = 0;
  }

  estadoGuardar:Boolean;
  estadoEditar:Boolean;

  ngOnInit(): void {
    
    this.listar_Roles();
    this.modoInsercion();
  }

  modoInsercion(){
    this.estadoGuardar = true;
    this.estadoEditar = false;
  }

  modoEdicion(){
    this.estadoGuardar = false;
    this.estadoEditar = true;
  }

  listar_Roles(){
    this.urservicio.listarRoles().subscribe(datos => {
      this.roles = datos;
      this.mensajeRoles = "";
    }, err => {
      this.mensajeRoles = "Sin datos que mostrar";
    });
  }

  agregarLista(){
    let role:Role = this.frole.value;
    if(role != null || role != undefined){

      const comparar = this.roles_seleccionados.find(x => x.nombre == role.nombre);
      if(comparar == null || comparar == undefined){
        this.roles_seleccionados.push(role);
      }
      else{
        alert("El rol ya fue seleccionado");
      }      
    }
  }

  eliminarrole(role_select:Role){
    let confirmar = confirm("Seguro que desea eliminar rol de la lista");
    if(confirmar){
      var indice = this.roles_seleccionados.indexOf(role_select);
      this.roles_seleccionados.splice(indice,1);
    }
  }

  

  obtener(usuario:Usuario){
    this.modoEdicion();
    this.nombreusuario.setValue(usuario.username);  

  }

  editar(){
    if(this.nombreusuario.valid && this.roles_seleccionados.length > 0){
      this.mensajeRoles = "";
      this.usuario.username = this.nombreusuario.value;
      this.usuario.roles = this.roles_seleccionados;
      this.urservicio.usuarioEditar(this.usuario).subscribe(dato => {
        alert("Nuevo rol asignado con éxito");
        this.cancelar();
      });
    }
    else{
      this.nombreusuario.markAsTouched();
      this.mensajeRoles = "Seleccione por lo menos un rol";
    }
  }

  guardar(){
    if(this.nombreusuario.valid && this.pass.valid && this.roles_seleccionados.length > 0){
      this.mensajeRoles="";
      this.obtenerValoreForm(this.usuario);
      if(this.usuario != null || this.usuario != undefined){
        this.urservicio.usuarioCrear(this.usuario).subscribe(dato => {
          alert("Usuario creado con éxito");
          this.cancelar();
        });
      }

    }
    else{
      this.nombreusuario.markAsTouched();
      this.pass.markAsTouched();
      this.mensajeRoles = "Seleccione por lo menos un rol";
    }
  }   

  cancelar(){
    this.limpiarForm();
    this.modoInsercion();
    this.nombreusuario.markAsUntouched();
    this.pass.markAsUntouched();
    this.mensajeRoles = "";

  }

  buscar(){
    if(this.formBuscar.valid){
      
      let username = this.formBuscar.value;
      this.urservicio.usuarioObtener(username).subscribe(dato => {
        this.mensaje = "";
        this.usuarios.length = 0;
        this.usuarios.push(dato);
      }, err => {
        this.mensaje = "Sin datos que mostrar";
      });
    }
  }

  //eliminar un rol del usuario
  eliminar_Rol(ro_le:Role, usuario:Usuario){
    let idrol = ro_le.idrol;
    let idusuario = usuario.idusuario;
    //console.log(idrol+" "+idusuario+"");
    if(idrol != null && idusuario != null){
      let confirmar = confirm("Seguro que decea eliminar rol asignado al usuario");
      if(confirmar){
        this.urservicio.usuarioRolEliminar(+idusuario, +idrol).subscribe(dato => {
          alert("Rol eliminado con éxito");
          this.usuarios.length = 0;
        });
      }
    }
  }

  eliminarUsuario(usuario:Usuario){
    
    let idusuario = usuario.idusuario;
    if(idusuario != null){
      let confirmar = confirm("Seguro que desea eliminar usuario");
      if(confirmar){
        this.urservicio.usuarioEliminar(+idusuario).subscribe(dato => {
          alert("Usuario eliminado con éxito");
          this.usuarios.length = 0;
        });
      }
    }
  }

  irAperfil(){
    if (this.urservicio.isAuthenticated()) {
      this.router.navigate(['intra/personal']);
    }
    else {
      this.urservicio.cerrarSession()
      this.router.navigate(['login']);
    }
  } 
    
  cerrarSesion() {
    this.urservicio.cerrarSession()
    this.router.navigate(['login']);
  }


  //METODO PARA CAMBIAR CONTRASEÑA DE UN ADMINISTRATIVO

  fusername:FormControl = new FormControl('',[Validators.required]);
  fpassword:FormControl = new FormControl('',[Validators.required]);

  ucambiar:Usuario = new Usuario();

  asignarValores(uc:Usuario){
    uc.username = this.fusername.value;
    uc.password = this.fpassword.value;
  }

  limpiarControles(){
    this.fusername.setValue("");
    this.fpassword.setValue("");
    this.fusername.markAsUntouched();
    this.fpassword.markAsUntouched();
  }

  mensajeCambio:String;

  cambiarContra(){
    if(this.fusername.valid && this.fpassword.valid){
      this.asignarValores(this.ucambiar);
      this.urservicio.cambiarContraGeneral(this.ucambiar).subscribe(dato => {
        alert("Contraseña actualizado con éxito");
        this.mensajeCambio = "";
      }, err => {
        this.mensajeCambio = "ERROR";
      });
    }
    else{
      this.fusername.markAsTouched();
      this.fpassword.markAsTouched();
    }
  }

}
