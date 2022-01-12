import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Bimestre } from 'src/app/Modelo/Bimestre/bimestre';
import { PeriodoCalificacion } from 'src/app/Modelo/PeriodoCalificacion/periodo-calificacion';
import { UsuarioRoleService } from '../UsuarioRole/usuario-role.service';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class PeriodoCalificacionService {

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  url:String = URL_BACKEND+"/periodo";

  constructor(private http:HttpClient, private ususervicio:UsuarioRoleService,private router:Router) { }

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

  pcLista(){
    return this.http.get<PeriodoCalificacion[]>(this.url+"/pclista", {headers : this.agregarAutorizacion()});
  }

  pcCrear(pc:PeriodoCalificacion){
    return this.http.post<PeriodoCalificacion>(this.url+"/pccrear",pc, {headers : this.agregarAutorizacion()}).pipe(
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

  pcObtenerId(id:Number){
    return this.http.get<PeriodoCalificacion>(this.url+"/pcobtener/"+id, {headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        return throwError(e);
      })
    );
  }

  _pcObtenerFecha(fecha:any){

    let formData = new FormData();
    formData.append("fecha", fecha);
    return this.http.post<PeriodoCalificacion>(this.url+"/pcobtener/fecha",formData , {headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        return throwError(e);
      })
    );
     
  }

  pcObtenerFecha(){    
    return this.http.get<PeriodoCalificacion>(this.url+"/pcpor/fecha", {headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        return throwError(e);
      })
    );
     
  }


  pcEditar(pc:PeriodoCalificacion){
    return this.http.put<PeriodoCalificacion>(this.url+"/pceditar/"+pc.idperiodo,pc, {headers : this.agregarAutorizacion()}).pipe(
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

  pcEliminar(id:Number){
    return this.http.delete<PeriodoCalificacion>(this.url+"/pceliminar/"+id, {headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  //metodos y propiedades pera bimestre  

  urlbim:String = URL_BACKEND +"/bimestre"

  bimLista(){
    return this.http.get<Bimestre[]>(this.urlbim+"/bimlista", {headers : this.agregarAutorizacion()});
  }

  bimListaDelAnnio(){
    return this.http.get<Bimestre[]>(this.urlbim+"/bim/del/annio", {headers : this.agregarAutorizacion()});
  }

  bimCrear(bimestre:Bimestre){
    return this.http.post<Bimestre>(this.urlbim+"/bimcrear", bimestre, {headers : this.agregarAutorizacion()}).pipe(
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

  bimObtener(id:Number){
    return this.http.get<Bimestre>(this.urlbim+"/bimobtener/"+id, {headers : this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  bimEditar(bimestre:Bimestre){
    return this.http.put<Bimestre>(this.urlbim+"/bimeditar/"+bimestre.idbimestre, bimestre, {headers : this.agregarAutorizacion()}).pipe(
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

  bimEliminar(id:Number){
    return this.http.delete<Bimestre>(this.urlbim+"/bimeliminar/"+id, {headers : this.agregarAutorizacion()}).pipe(
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
