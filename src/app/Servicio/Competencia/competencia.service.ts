import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Competencia } from 'src/app/Modelo/Competencia/competencia';
import { CompetenciaCurso } from 'src/app/Modelo/CompetenciaCurso/competencia-curso';
import { UsuarioRoleService } from '../UsuarioRole/usuario-role.service';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class CompetenciaService {

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

  url:String = URL_BACKEND+"/competencia";

  comLista():Observable<Competencia[]>{
    return this.http.get(this.url+"/comlista", {headers : this.agregarAutorizacion()}).pipe(
      map(response => response as Competencia[]),
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  competenciaCursoPorCurso(idcurso:Number):Observable<CompetenciaCurso[]>{
    return this.http.get(this.url+"/comcur/lispor/"+idcurso, {headers : this.agregarAutorizacion()}).pipe(
      map(response => response as CompetenciaCurso[]),
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  comCrear(competencia:Competencia){
    return this.http.post<Competencia>(this.url+"/comcrear",competencia, {headers : this.agregarAutorizacion()}).pipe(
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

  comObtener(id:Number):Observable<Competencia>{
    return this.http.get<Competencia>(this.url+"/comobtener/"+id, {headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        } 
        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  comEditar(competencia:Competencia){
    return this.http.put<Competencia>(this.url+"/comeditar/"+competencia.idcompetencia,competencia, {headers : this.agregarAutorizacion()}).pipe(
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

  comEliminar(id:Number){
    return this.http.delete<Competencia>(this.url+"/comeliminar/"+id, {headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        } 
        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  comBuscar(nombre:String):Observable<Competencia[]>{
    return this.http.get(this.url+"/combuscar/"+nombre, {headers : this.agregarAutorizacion()}).pipe(
      map(response => response as Competencia[]),
      catchError(e => {
        this.isNoAutorizado(e)

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  comMostrarPorCurso(idcurso:Number):Observable<Competencia[]>{
    return this.http.get(this.url+"/commos/porcur/"+idcurso, {headers : this.agregarAutorizacion()}).pipe(
      map(response => response as Competencia[]),
      catchError(e => {
        this.isNoAutorizado(e)

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  //metodos y propiedades para gestion de competencia--curso
  urlcom:String = URL_BACKEND+"/comcur";

  comcurLista():Observable<CompetenciaCurso[]>{
    return this.http.get(this.urlcom+"/cclista", {headers : this.agregarAutorizacion()}).pipe(
      map(response => response as CompetenciaCurso[]),
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  comcurCrear(comscurs:CompetenciaCurso[]){
    return this.http.post<CompetenciaCurso[]>(this.urlcom+"/cccrear",comscurs, {headers : this.agregarAutorizacion()}).pipe(
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

  comcurEliminar(id:Number){
    return this.http.delete<CompetenciaCurso>(this.urlcom+"/cceliminar/"+id, {headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {
        
        if(this.isNoAutorizado(e)){
          return throwError(e);
        } 
        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  comcurBuscar(nombre:String){
    return this.http.get(this.urlcom+"/ccbuscar/por/"+nombre, {headers : this.agregarAutorizacion()}).pipe(
      map(response => response as CompetenciaCurso[]),
      catchError(e => {
        this.isNoAutorizado(e)

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

}
