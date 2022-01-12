import { Injectable } from '@angular/core';
import { Especialidad } from 'src/app/Modelo/Especialidad/especialidad';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioRoleService } from '../UsuarioRole/usuario-role.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});  

  url:String = URL_BACKEND+"/especialidad";

  constructor(private http:HttpClient, private ususervicio:UsuarioRoleService,
    private router:Router) { 

  }

  private isNoAutorizado(e:any): Boolean{
    if(e.status == 401 || e.status == 403){

      if(this.ususervicio.isAuthenticated()){
        this.ususervicio.cerrarSession();
      }
      
      this.router.navigate(['login']);
      return true;

    }
    else{
      return false;
    }
  }  

  private agregarAutorizacion(){
    let permiso = this.ususervicio.username_password;
    if(permiso != null){
      return this.httpHeaders.append('Authorization', 'Basic '+permiso);
    }
    else{
      return this.httpHeaders;
    }
  }

  listarEspecialidad(){
    return this.http.get<Especialidad[]>(this.url+"/eslista",{headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  crearEspecialidad(especialidad:Especialidad){
    return this.http.post<Especialidad>(this.url+"/escrear",especialidad, {headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {
        
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }   

        if(e.status == 400){
          return throwError(e);          
        }

        return throwError(e);
      })
    );
  }

  obtenerEspecialidad(id:Number){
    return this.http.get<Especialidad>(this.url+"/esobtener/"+id, {headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        return throwError(e);
      })
    );
  }

  editarEspecialidad(especialidad:Especialidad){
    return this.http.put<Especialidad>(this.url+"/eseditar/"+especialidad.idespecialidad,especialidad, {headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {
        
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }   

        if(e.status == 400){
          return throwError(e);          
        }

        return throwError(e);
      })
    );
  }

  eliminarEspecialidad(id:Number){
    return this.http.delete<Especialidad>(this.url+"/eseliminar/"+id, {headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  buscarEspecialidad(especialidad:Especialidad){
    return this.http.post<Especialidad[]>(this.url+"/esbuscar",especialidad, {headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

}
