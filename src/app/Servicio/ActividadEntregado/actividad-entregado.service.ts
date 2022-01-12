import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ActividadPlanteado } from 'src/app/Modelo/Actividad/actividad';
import { ActividadEntregado } from 'src/app/Modelo/ActividaEntregado/actividad-entregado';
import { UsuarioAlumnoService } from '../UsuarioAlumno/usuario-alumno.service';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ActividadEntregadoService {

  constructor(private http:HttpClient, private usualumno:UsuarioAlumnoService, private router:Router) { }

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private isNo_Autorizado(e: any): Boolean {
    if (e.status == 401 || e.status == 403) {

      if (this.usualumno.isAuthenticated()) {
        this.usualumno.cerrarSession();
      }

      this.router.navigate(['login']);
      return true;

    }
    else {
      return false;
    }
  }

  private agregar_Autorizacion() {
    let permiso = this.usualumno.username_password;
    if (permiso != null) {
      return this.httpHeaders.append('Authorization', 'Basic ' + permiso);
    }
    else {
      return this.httpHeaders;
    }
  }

  url:String = URL_BACKEND +"/aentregado";

  listarAE(id:Number):Observable<ActividadEntregado[]>{
    return this.http.get(this.url+"/aelista/"+id, {headers:this.agregar_Autorizacion()}).pipe(
      map(response => response as ActividadEntregado[]),
      catchError(e => {

        this.isNo_Autorizado(e);
        //alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  crearAE(ae:ActividadEntregado){
    return this.http.post<ActividadEntregado>(this.url+"/aecrear",ae, {headers:this.agregar_Autorizacion()}).pipe(
      catchError(e => {

        if(this.isNo_Autorizado(e)){
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

  obtenerAE(id:Number):Observable<ActividadEntregado>{
    return this.http.get<ActividadEntregado>(this.url+"/aeobtener/"+id, {headers:this.agregar_Autorizacion()}).pipe(
      catchError(e => {
        this.isNo_Autorizado(e);
        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  editarAE(ae:ActividadEntregado){
    return this.http.put<ActividadEntregado>(this.url+"/aeeditar/"+ae.idactividadentregado , ae, {headers:this.agregar_Autorizacion()}).pipe(
      catchError(e => {

        if(this.isNo_Autorizado(e)){
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

  eliminar(id:Number){
    return this.http.delete<ActividadEntregado>(this.url+"/aeeliminar/"+id, {headers:this.agregar_Autorizacion()}).pipe(
      catchError(e => {

        if(this.isNo_Autorizado(e)){
          return throwError(e);
        }

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  archivoEntregar(archivo:File, id:any):Observable<HttpEvent<{}>>{
    let formData = new FormData();

    formData.append("id", id);
    formData.append("archivo", archivo);

    let httpHeaders = new HttpHeaders();
    let permiso = this.usualumno.username_password;
    if(permiso != null){
      httpHeaders = httpHeaders.append('Authorization', 'Basic '+permiso);
    }

    let req = new HttpRequest('POST', this.url+"/aearchivo",formData,{
      reportProgress : true,
      headers:httpHeaders
    });

    return this.http.request(req);    
  }

  archivoEliminar(nombre:any):Observable<HttpEvent<{}>>{
    let formData = new FormData();

    formData.append("nombre", nombre);  
    
    let httpHeaders = new HttpHeaders();
    let permiso = this.usualumno.username_password;
    if(permiso != null){
      httpHeaders = httpHeaders.append('Authorization', 'Basic '+permiso);
    }

    let req = new HttpRequest('POST', this.url+"/aearchivoeliminar",formData,{headers:httpHeaders});

    return this.http.request(req);    
  }

  obtenerAEPorDCE(idda:Number, iddce:Number){
    return this.http.get<ActividadEntregado[]>(this.url+"/aeobtener/dceal/"+idda+"/"+iddce, {headers:this.agregar_Autorizacion()}).pipe(
      catchError(e => {
        this.isNo_Autorizado(e);
        //alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }  

  actividadPlanteadoObtener(id:Number):Observable<ActividadPlanteado>{
    return this.http.get<ActividadPlanteado>(this.url+"/apobtener/"+id, {headers:this.agregar_Autorizacion()}).pipe(
      catchError(e => {
        this.isNo_Autorizado(e);
        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

}
