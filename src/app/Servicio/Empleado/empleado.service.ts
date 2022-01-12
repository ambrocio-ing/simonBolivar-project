import { Injectable } from '@angular/core';
import { Empleado } from 'src/app/Modelo/Empleado/empleado';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { UsuarioRoleService } from '../UsuarioRole/usuario-role.service';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({  
  providedIn: 'root'
})
export class EmpleadoService {

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

  url:String = URL_BACKEND+"/empleado";

  listarEmpleado(){
    
    return this.http.get<Empleado[]>(this.url+"/emlista",{headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  crear_Empleado(empleado:Empleado){
    return this.http.post<Empleado>(this.url+"/emcrear",empleado);
  }

  crearEmpleado(empleado:Empleado):Observable<Empleado>{
    return this.http.post(this.url+"/emcrear",empleado,{headers: this.agregarAutorizacion()}).pipe(
      map((response:any) => response as Empleado),
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

  obtenerEmpleado(id:Number){
    return this.http.get<Empleado>(this.url+"/emobtener/"+id, {headers: this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        return throwError(e);
      })
    );
  }

  editarEmpleado(empleado:Empleado){
    return this.http.put<Empleado>(this.url+"/emeditar/"+empleado.idempleado,empleado,{headers: this.agregarAutorizacion()}).pipe(
      map((response:any) => response as Empleado),
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

  eliminarEmpleado(id:Number):Observable<Empleado>{
    return this.http.delete<Empleado>(this.url+"/emeliminar/"+id,{headers: this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  buscarEmpleado(empleado:Empleado){
    return this.http.post<Empleado[]>(this.url+"/embuscar",empleado, {headers: this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  subirArchivo(foto:File, cv:File, id:any):Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("cv" , cv);
    formData.append("foto", foto);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let permiso = this.ususervicio.username_password;
    if(permiso != null){
      httpHeaders = httpHeaders.append('Authorization', 'Basic '+permiso);
    }

    const req = new HttpRequest('POST',this.url+"/emfoto",formData,{
      reportProgress:true,
      headers: httpHeaders
    });

    return this.http.request(req);
  }

}
