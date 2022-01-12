import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Apoderado} from 'src/app/Modelo/Apoderado/apoderado';
import { UsuarioRoleService } from '../UsuarioRole/usuario-role.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ApServicioService {

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'}); 

  constructor(private http:HttpClient, private ususervicio:UsuarioRoleService, private router:Router) { }

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
 
  url = URL_BACKEND+'/apoderado';

  /*getEmergenteApoderado(apoderado:Apoderado){
    return this.http.post<Apoderado[]>(this.url+"/"+"apo_em_lista",apoderado,{headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        return throwError(e);
      })
    );
  }*/

  getApoderados(){
    return this.http.get<Apoderado[]>(this.url+"/"+"alista", {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        return throwError(e);
      })
    );
  }

  crearApoderado(apoderado:Apoderado) {
    return this.http.post<Apoderado>(this.url+"/"+"acrear",apoderado, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        if(e.status == 400){
          return throwError(e);
        }

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  optenerApoderado(idapoderado:Number) {
    return this.http.get<Apoderado>(this.url+"/"+"aoptener"+"/"+idapoderado, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        return throwError(e);
      })
    );
  }

  editarApoderado(apoderado:Apoderado){
    return this.http.put<Apoderado>(this.url+"/"+"aeditar"+"/"+apoderado.idapoderado,apoderado, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        if(e.status == 400){
          return throwError(e);
        }

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  eliminarApoderado(id:Number){
    return this.http.delete<Apoderado>(this.url+"/"+"aeliminar"+"/"+id, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        if(e.status == 400){
          return throwError(e);
        }

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  buscarApoderado(texto:String){
    return this.http.get<Apoderado[]>(this.url+"/apbuscar/"+texto, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        return throwError(e);
      })
    );
  }

}
