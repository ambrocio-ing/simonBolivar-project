import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Empleado } from 'src/app/Modelo/Empleado/empleado';
import { Grado } from 'src/app/Modelo/Grado/grado';
import { Seccion } from 'src/app/Modelo/Seccion/seccion';
import { Tutor } from 'src/app/Modelo/Tutor/tutor';
import { UsuarioRoleService } from '../UsuarioRole/usuario-role.service';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http:HttpClient, private router:Router, private ususervicio:UsuarioRoleService) { }

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
  
  url:String = URL_BACKEND+"/gs";
  

  listaGrado(){
    return this.http.get<Grado[]>(this.url+"/grado", {headers : this.agregarAutorizacion()});
  }

  listaSeccion(){
    return this.http.get<Seccion[]>(this.url+"/seccion", {headers : this.agregarAutorizacion()});
  }

  urlem:String = URL_BACKEND+"/empleado";

  listarEmpleado(){
    return this.http.get<Empleado[]>(this.urlem+"/docentes", {headers : this.agregarAutorizacion()});
  }

  //administrar tutor
  urltu:String = URL_BACKEND+"/tutor";
  
  listaTutor(){
    return this.http.get<Tutor[]>(this.urltu+"/tulista", {headers : this.agregarAutorizacion()});
  }

  crearTu(tutor:Tutor){
    return this.http.post<Tutor>(this.urltu+"/tucrear",tutor, {headers : this.agregarAutorizacion()}).pipe(
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

  obtenerTu(id:Number){
    return this.http.get<Tutor>(this.urltu+"/tuobtener/"+id, {headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        } 

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  editarTU(tutor:Tutor){
    return this.http.put<Tutor>(this.urltu+"/tueditar/"+tutor.idtutor,tutor , {headers : this.agregarAutorizacion()}).pipe(
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

  eliminarTu(id:Number){
    return this.http.delete<Tutor>(this.urltu+"/tueliminar/"+id, {headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        } 

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

}
