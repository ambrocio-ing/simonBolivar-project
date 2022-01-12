import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DetalleCompetencia } from 'src/app/Modelo/DetalleCompetencia/detalle-competencia';
import { OtraCalificacion } from 'src/app/Modelo/OtraCalificacion/otra-calificacion';
import { ResultadoActividad } from 'src/app/Modelo/ResultadoActividad/resultado-actividad';
import { MdetalleCompetencia } from 'src/app/Modelo/MDetalleCompetencia/mdetalle-competencia' 
import { Router } from '@angular/router';
import { UsuarioRoleService } from '../UsuarioRole/usuario-role.service';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class DetalleCompeteniaService {

  url:String = URL_BACKEND+"/decom";

  constructor(private http:HttpClient, private router:Router, private ususervicio:UsuarioRoleService) { }

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

  decomLista(iddce:Number):Observable<DetalleCompetencia[]>{
    return this.http.get(this.url+"/dclista/"+iddce, {headers:this.agregarAutorizacion()}).pipe(
      map(response => response as DetalleCompetencia[]),
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  decom_Lista(iddce:Number):Observable<DetalleCompetencia[]>{
    return this.http.get(this.url+"/dclista/map/"+iddce, {headers:this.agregarAutorizacion()}).pipe(
      map(response => response as DetalleCompetencia[]),
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  decomCrear(decom:DetalleCompetencia){
    return this.http.post<DetalleCompetencia>(this.url+"/dccrear",decom, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        if(e.status == 400){
          return throwError(e);          
        }

        alert(e.error.error);
        return throwError(e);
      })
    );
  }

  decomObtener(iddecom:Number):Observable<DetalleCompetencia>{
    return this.http.get<DetalleCompetencia>(this.url+"/dcobtener/"+iddecom, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {

        this.isNoAutorizado(e);

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  decomEditar(decom:DetalleCompetencia){
    return this.http.put<DetalleCompetencia>(this.url+"/dceditar/"+decom.iddetallecompetencia,decom, {headers:this.agregarAutorizacion()}).pipe(
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

  decomEliminar(iddecom:Number){
    return this.http.delete<DetalleCompetencia>(this.url+"/dceliminar/"+iddecom, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  _decomPorAlumnoCompetenciaPeriodo(idda:Number,idcc:Number,idbimestre:Number){
    return this.http.get<DetalleCompetencia>(this.url+"/dclista/poralum/"+idda+"/"+idcc+"/"+idbimestre, {headers:this.agregarAutorizacion()});
  }

  //administrar resultado de actividades
  urlresultado:String = URL_BACKEND+"/resultadoact";

  resultadoEditar(resultado:ResultadoActividad):Observable<HttpEvent<{}>>{

    let req = new HttpRequest('PUT',this.urlresultado+"/raeditar/"+resultado.idresultado, resultado, {headers:this.agregarAutorizacion()});
    return this.http.request(req);

    /*return this.http.put<ResultadoActividad>(this.urlresultado+"/raeditar/"+resultado.idresultado, resultado).pipe(
      catchError(e => {
        alert(e.error.mensaje);
        return throwError(e);
      })
    );*/
  }

  //administrar otras calificiones
  urlotra:String = URL_BACKEND+"/otrac";

  otracEditar(otracal:OtraCalificacion):Observable<HttpEvent<{}>>{

    let req = new HttpRequest('PUT',this.urlotra+"/oceditar/"+otracal.idotracalificacion, otracal, {headers:this.agregarAutorizacion()});

    return this.http.request(req);

    /*return this.http.put<OtraCalificacion>(this.urlotra+"/oceditar/"+otracal.idotracalificacion, otracal).pipe(
      catchError(e => {
        alert(e.error.mensaje);
        return throwError(e);
      })
    );*/
  }

  //adiministra el metodo para listar las calificaiones por periodo
  //http://localhost:8085/decom/dcmap/lista/5

  decomListaMapeado(iddce:Number):Observable<MdetalleCompetencia[]>{
    return this.http.get(this.url+"/dcmap/lista/"+iddce, {headers:this.agregarAutorizacion()}).pipe(
      map(response => response as MdetalleCompetencia[]),
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  ///dc/por/alum/cur/{idda}/{idc}/{idbi}
  decomListaCalificaciones(idda:Number,idc:Number,idbi:Number):Observable<DetalleCompetencia[]>{
    return this.http.get(this.url+"/dc/por/alum/cur/"+idda+"/"+idc+"/"+idbi , {headers:this.agregarAutorizacion()}).pipe(
      map(response => response as DetalleCompetencia[]),
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
}
