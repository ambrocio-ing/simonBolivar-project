import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { Curso } from 'src/app/Modelo/Curso/curso';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Empleado } from 'src/app/Modelo/Empleado/empleado';
import { DetalleCursoEmpleado } from 'src/app/Modelo/DetalleCursoEmpleado/detalle-curso-empleado';
import { Grado } from 'src/app/Modelo/Grado/grado';
import { Seccion } from 'src/app/Modelo/Seccion/seccion';
import { Router } from '@angular/router';
import { UsuarioRoleService } from '../UsuarioRole/usuario-role.service';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class DetalleCursoEmpleadoService {  

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

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
    return this.http.get<Grado[]>(this.url+"/grado", {headers:this.agregarAutorizacion()});
  }

  listaSeccion(){
    return this.http.get<Seccion[]>(this.url+"/seccion", {headers:this.agregarAutorizacion()});
  }

  urlcurso:String = URL_BACKEND+"/curso";

  cursoListar():Observable<Curso[]>{
    return this.http.get(this.urlcurso+"/curlista", {headers:this.agregarAutorizacion()}).pipe(
      map(respuesta => respuesta as Curso[]),
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );      
  }
  cursoListar20():Observable<Curso[]>{
    return this.http.get(this.urlcurso+"/lista20", {headers:this.agregarAutorizacion()}).pipe(
      map(respuesta => respuesta as Curso[]),
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );      
  }

  cursoCrear(curso:Curso){
    return this.http.post<Curso>(this.urlcurso+"/curcrear",curso, {headers:this.agregarAutorizacion()}).pipe(
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

  cursoObtener(id:Number):Observable<Curso>{
    return this.http.get<Curso>(this.urlcurso+"/curobtener/"+id, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        alert(e.error.mensaje);
        return throwError(e);
      })
    );      
    
  }

  cursoEditar(curso:Curso){
    return this.http.put<Curso>(this.urlcurso+"/cureditar/"+curso.idcurso,curso, {headers:this.agregarAutorizacion()}).pipe(
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

  cursoEliminar(id:Number){
    return this.http.delete<Curso>(this.urlcurso+"/cureliminar/"+id, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }  

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  cursoBuscar(texto:String):Observable<Curso[]>{
    return this.http.get(this.urlcurso+"/curbuscar/"+texto, {headers:this.agregarAutorizacion()}).pipe(
      map(respuesta => respuesta as Curso[]),
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  //codigo para detalle curso empleado

  urldetalle:String = URL_BACKEND+"/dce";

  detalleListarEmpleado():Observable<Empleado[]>{
    return this.http.get(this.urldetalle+"/docentes", {headers:this.agregarAutorizacion()}).pipe( 
      map(respuesta => respuesta as Empleado[])
    );
  }

  detalleLista():Observable<DetalleCursoEmpleado[]>{
    return this.http.get(this.urldetalle+"/dcelista", {headers:this.agregarAutorizacion()}).pipe(
      map(respuesta => respuesta as DetalleCursoEmpleado[])
    );
  }

  detalleCrear(dce:DetalleCursoEmpleado){
    return this.http.post<DetalleCursoEmpleado>(this.urldetalle+"/dcecrear",dce, {headers:this.agregarAutorizacion()}).pipe(
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

  detalleOptener(id:Number):Observable<DetalleCursoEmpleado>{
    return this.http.get<DetalleCursoEmpleado>(this.urldetalle+"/dceobtener/"+id, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        } 

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }  

  detalleEditar(dce:DetalleCursoEmpleado){
    return this.http.put<DetalleCursoEmpleado>(this.urldetalle+"/dceeditar/"+dce.iddetalle_ce,dce, {headers:this.agregarAutorizacion()}).pipe(
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

  detalleEliminar(id:Number){
    return this.http.delete<DetalleCursoEmpleado>(this.urldetalle+"/dceeliminar/"+id, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        } 

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  detalleBuscar(texto:String):Observable<DetalleCursoEmpleado[]>{
    return this.http.get(this.urldetalle+"/dcebuscar/"+texto, {headers:this.agregarAutorizacion()}).pipe(
      map(respuesta => respuesta as DetalleCursoEmpleado[]),
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })      
    );
  }    

  /*urlalum:String = "http://localhost:8085/intranet/estudiante";

  mostrarPorGradoSeccion(idgrado:Number,idseccion:Number):Observable<DetalleCursoEmpleado[]>{
    return this.http.get(this.urlalum+"/dareciente/"+idgrado+"/"+idseccion).pipe(
      map(respuesta => respuesta as DetalleCursoEmpleado[])
    ); 
  }

  dceOptener(id:Number):Observable<DetalleCursoEmpleado>{
    return this.http.get<DetalleCursoEmpleado>(this.urlalum+"/dceobtener/map/"+id).pipe(
      catchError(e => {
        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }
  
  mostrarLibreta(idda:Number){
    return this.http.get<MlibretaNotas[]>(this.urlalum+"/libreta/"+idda).pipe(
      catchError(e => {
        
        return throwError(e);
      })
    );
  }

  descargarLibreta(idda:Number){
    return this.http.get(this.urlalum+"/reporte/libreta/"+idda,{responseType: 'blob'});
  }

  listarAsistencias(idda:Number){
    return this.http.get<Mcursos[]>(this.urlalum+"/asistencias/"+idda).pipe(
      catchError(e => {        
        return throwError(e);
      })
    );
  }*/

}
