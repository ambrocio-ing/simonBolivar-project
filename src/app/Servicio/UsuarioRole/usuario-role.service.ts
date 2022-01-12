import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Role } from 'src/app/Modelo/Role/role';
import { Usuario } from 'src/app/Modelo/Usuario/usuario';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRoleService {  

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  private _username_pasword:String;
  private _usuario:Usuario;

  public get usuario():Usuario{
    if(this._usuario != null){
      return this._usuario;
    }
    else if(this._usuario == null && sessionStorage.getItem("usuario") != null){
     
      this._usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}') as Usuario;
      return this._usuario;
    }
    else{
      return new Usuario();
    }

  }

  public get username_password():String{
    if(this._username_pasword != null){
      return this._username_pasword;
    }
    else if(this._username_pasword == null && sessionStorage.getItem("permiso") != null){
     
      this._username_pasword = sessionStorage.getItem('permiso')!;
      
      return this._username_pasword;
    }
    else{
      return "";
    }
  }

  constructor(private http:HttpClient, private router:Router) { }

  //metodos para verificar usuario y agregar cabeceras

  private isNoAutorizado(e:any): Boolean{
    if(e.status == 401 || e.status == 403){

      if(this.isAuthenticated()){
        this.cerrarSession();
      }
      
      this.router.navigate(['login']);
      return true;

    }
    else{
      return false;
    }
  }  

  private agregarAutorizacion(){
    let permiso = this.username_password;
    if(permiso != null){
      return this.httpHeaders.append('Authorization', 'Basic '+permiso);
    }
    else{
      return this.httpHeaders;
    }
  }

  url:String = URL_BACKEND+"/usuario"

  cambiarContraGeneral(usuario:Usuario){
    
    return this.http.put<Usuario>(this.url+"/editar/pass/"+usuario.username, usuario,{headers: this.agregarAutorizacion()}).pipe(
      catchError(e => {
        
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        alert(e.error.mensaje);
        return throwError(e);
      })
    );

  }  

  listarRoles(){
    return this.http.get<Role[]>(this.url+"/roles",{headers: this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
  
  //crud usuario
  usuarioCrear(usurio:Usuario){
    return this.http.post<Usuario>(this.url+"/ucrear",usurio,{headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  usuarioObtener(username:String){
    return this.http.get<Usuario>(this.url+"/uobtener/"+username,{headers: this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  usuarioEditar(usurio:Usuario){
    return this.http.put<Usuario>(this.url+"/ueditar",usurio,{headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  usuarioRolEliminar(idusuario:Number, idrol:Number){
    return this.http.delete(this.url+"/ureliminar/"+idusuario+"/"+idrol,{headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  usuarioEliminar(idusuario:Number){
    return this.http.delete(this.url+"/ueliminar/"+idusuario, {headers: this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  login(usuario:Usuario):Observable<Usuario>{

    const urllogin = URL_BACKEND+"/inicio/empleado/login";
    const credenciales = btoa(usuario.username +':'+usuario.password);
    const httpHeaders = new HttpHeaders({Authorization : 'Basic '+credenciales}); 
    this._username_pasword = credenciales;
    return this.http.post<Usuario>(urllogin,usuario,{headers : httpHeaders});

  }
   

  guardarUsuario(uTemporal:Usuario){
    this._usuario = new Usuario();
    this._usuario.empleado = uTemporal.empleado;
    this._usuario.roles = uTemporal.roles;
    sessionStorage.setItem("usuario", JSON.stringify(this._usuario));
    sessionStorage.setItem("permiso",this._username_pasword.toString());

  }  

  isAuthenticated():Boolean{
    let credenciales = this.username_password;
    if(credenciales != "" && credenciales != null && credenciales.length != 0){
      return true;
    }
    else{
      return false;
    }
  }

  cerrarSession(){
    this._username_pasword = "";
    this._usuario == null;
    sessionStorage.clear();
  }

  verificarRole(rolename:String):Boolean{
    const comparacion = this.usuario.roles.find(x => x.nombre == rolename);
    if(comparacion != null){
      return true;
      
    }
    else{
      return false;
      
    }
    
  }
  
}
