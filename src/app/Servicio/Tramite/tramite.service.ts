import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cronograma } from 'src/app/Modelo/Cronograma/cronograma';
import { Tramite } from 'src/app/Modelo/Tramite/tramite';
import { UsuarioRoleService } from '../UsuarioRole/usuario-role.service';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class TramiteService {

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

  urlp:String = URL_BACKEND+"/tramite";

  tramiteLista(){
    return this.http.get<Tramite[]>(this.urlp+"/tralista",{headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  tramitePrivadoEliminar(id:Number){
    return this.http.delete(this.urlp+"/traeliminar/"+id, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  tramiteMarcarRevisado(tramite:Tramite){
    return this.http.put<Tramite>(this.urlp+"/traeditar/"+tramite.idtramite, tramite, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {
        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }


  //metodos publicos apto para todo público

  url:String = URL_BACKEND+"/public/tramite";

  crLista(){
    return this.http.get<Cronograma[]>(this.url+"/crlista", {headers:this.httpHeaders}).pipe(
      catchError(e => {        
        return throwError(e);
      })
    );
  }

  tramiteCrear(tramite:Tramite){
    return this.http.post<Tramite>(this.url+"/tracrear",tramite,{headers:this.httpHeaders}).pipe(
      catchError(e => {
        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  tramiteArchivo(archivo:File, dni:any){
    let formData = new FormData();
    formData.append("dni", dni);
    formData.append("archivo", archivo);
    

    let req = new HttpRequest('POST',this.url+"/traarchivo", formData);

    return this.http.request(req);

  }

  tramiteEliminar(dni:String){
    return this.http.delete(this.url+"/traeliminar/"+dni,{headers:this.httpHeaders});
  }

}
