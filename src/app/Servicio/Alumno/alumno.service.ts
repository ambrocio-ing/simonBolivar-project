import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from 'src/app/Modelo/Alumno/alumno';
import {Apoderado} from 'src/app/Modelo/Apoderado/apoderado'
import {map, catchError} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { UsuarioRoleService } from '../UsuarioRole/usuario-role.service';
import { Router } from '@angular/router';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'}); 
  
  

  constructor(private http:HttpClient, 
    private ususervicio:UsuarioRoleService, private router:Router) { 

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

  url:String = URL_BACKEND+"/alumno";

  getAlumnos(){
    return this.http.get<Alumno[]>(this.url+"/"+"allista",{headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        return throwError(e);
      })
    );
  }

  alumnoCrear(alumno:Alumno){    
    return this.http.post<Alumno>(this.url+"/"+"alcrear",alumno,{headers : this.agregarAutorizacion()}).pipe(
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

  alumnoObener(idalumno:Number){
    return this.http.get<Alumno>(this.url+"/"+"alobtener"+"/"+idalumno,{headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  alumnoEditar(alumno:Alumno){
    return this.http.put<Alumno>(this.url+"/"+"aleditar"+"/"+alumno.idalumno,alumno,{headers : this.agregarAutorizacion()}).pipe(
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

  alumnoEliminar(idalumno:Number){
    return this.http.delete<Alumno>(this.url+"/"+"aleliminar"+"/"+idalumno,{headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  alumnoBuscar(alumno:Alumno){
    return this.http.post<Alumno[]>(this.url+"/albuscar",alumno,{headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        return throwError(e);
      })
    );
  }

  subirFoto(archivo:File, id:any):Observable<HttpEvent<{}>>{//:Observable<HttpEvent<{}>> si devuelves algo podrias agregar esto
    let formData = new FormData();
    formData.append("archivo" ,archivo);
    formData.append("id" ,id);

    let httpHeaders = new HttpHeaders();
    let permiso = this.ususervicio.username_password;
    if(permiso != null){
      httpHeaders = httpHeaders.append('Authorization', 'Basic '+permiso);
    }

    const req = new HttpRequest('POST',this.url+"/foto",formData,{
      reportProgress:true,
      headers:httpHeaders
    });
    return this.http.request(req);
  }

}
