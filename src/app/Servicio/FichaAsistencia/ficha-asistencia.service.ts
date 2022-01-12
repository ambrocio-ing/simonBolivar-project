import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FichaAsistencia } from 'src/app/Modelo/FichaAsistencia/ficha-asistencia';
import { MfichaAsistenciaLista } from 'src/app/Modelo/MFichaAsistenciaLista/mficha-asistencia-lista';
import { UsuarioRoleService } from '../UsuarioRole/usuario-role.service';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class FichaAsistenciaService {

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

  url:String = URL_BACKEND+"/ficha";

  recuperarAsistencia(id:Number){
    return this.http.get<FichaAsistencia[]>(this.url+"/falista/"+id,{headers:this.agregarAutorizacion()});
  }

  listaDeAlumnos(id:Number){
    return this.http.get<FichaAsistencia[]>(this.url+"/por/cl/"+id,{headers:this.agregarAutorizacion()});
  }

  fichaCrear(fichaasistencias:FichaAsistencia[]){
    return this.http.post<FichaAsistencia[]>(this.url+"/facrear",fichaasistencias,{headers:this.agregarAutorizacion()}).pipe(
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

  fichaEditar(fichaasistencia:FichaAsistencia){
    return this.http.put<FichaAsistencia>(this.url+"/faeditar/"+fichaasistencia.idfichaasistencia, fichaasistencia,{headers:this.agregarAutorizacion()}).pipe(
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

  descargarFicha(idclase:Number):Observable<Blob>{
    return this.http.get(this.url+"/exportar/ficha/"+idclase,{responseType : 'blob', headers:this.agregarAutorizacion()});
  }

  urlad:String = URL_BACKEND+"/clasead";
  ///fa/porcl/{idclase}
  listarAsistenciaDelDia(idclase:Number){
    return this.http.get<MfichaAsistenciaLista[]>(this.urlad+"/fa/porcl/"+idclase ,{headers:this.agregarAutorizacion()});
  }
}
