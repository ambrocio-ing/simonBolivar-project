import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cronograma } from 'src/app/Modelo/Cronograma/cronograma';
import { UsuarioRoleService } from '../UsuarioRole/usuario-role.service';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class CronogramaService {

  constructor(private http:HttpClient, private router:Router, 
    private ususervicio:UsuarioRoleService) { 

  }

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

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

  url:String = URL_BACKEND+"/cronograma";

  crLista(){
    return this.http.get<Cronograma[]>(this.url+"/crlista", {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  } 
  
  crCrear(cronograma:Cronograma){
    return this.http.post<Cronograma>(this.url+"/crcrear", cronograma, {headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {

        alert(e.error.mensaje);

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

  crOptener(id:Number){
    return this.http.get<Cronograma>(this.url+"/crobtener/"+id, {headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  crEditar(cronograma:Cronograma){
    return this.http.put<Cronograma>(this.url+"/creditar/"+cronograma.idcronograma, cronograma, {headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {

        alert(e.error.mensaje);

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

  crEliminar(id:Number){
    return this.http.delete(this.url+"/creliminar/"+id, {headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  crArchivo(archivo:File, id:any):Observable<HttpEvent<{}>>{

    let formData =  new FormData();
    formData.append("archivo", archivo);   
    formData.append("id", id);   

    let httpHeaders = new HttpHeaders();
    let permiso = this.ususervicio.username_password;
    if(permiso != null){
      httpHeaders = httpHeaders.append('Authorization', 'Basic '+permiso);
    }

    const req = new HttpRequest('POST',this.url+"/crarchivo",formData,{
      reportProgress : true,
      headers:httpHeaders
    });

    return this.http.request(req);

  }

  crBuscar(fecha:String){
    return this.http.get<Cronograma[]>(this.url+"/crbuscar/"+fecha, {headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

}
