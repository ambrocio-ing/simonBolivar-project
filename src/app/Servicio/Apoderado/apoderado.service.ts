import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Mcursos } from 'src/app/Informes/MCurso/mcursos';
import { Apoderado } from 'src/app/Modelo/Apoderado/apoderado';
import { DetalleAlumno } from 'src/app/Modelo/DetalleAlumno/detalle-alumno';
import { MlibretaNotas } from 'src/app/Modelo/MLibretaNotas/mlibreta-notas';
import { Usuario } from 'src/app/Modelo/Usuario/usuario';
import { UsuarioApoderadoService } from '../UsuarioApoderado/usuario-apoderado.service';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ApoderadoService {

  constructor(private http:HttpClient, private router:Router, 
    private usuapoderado:UsuarioApoderadoService) { 

  }

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  private isNoAutorizado(e:any): Boolean{
    if(e.status == 401 || e.status == 403){

      if(this.usuapoderado.isAuthenticated()){
        this.usuapoderado.cerrarSession();
      }
      
      this.router.navigate(['login']);
      return true;
 
    }
    else{
      return false;
    }
  }  

  private agregarAutorizacion(){
    let permiso = this.usuapoderado.username_password;
    if(permiso != null){
      return this.httpHeaders.append('Authorization', 'Basic '+permiso);
    }
    else{
      return this.httpHeaders;
    }
  }

  url:String = URL_BACKEND+"/intranet/apoderado"

  detalle_Buscar(texto:String, idapo:Number){
    return this.http.get<DetalleAlumno[]>(this.url+"/da/buscar/"+texto+"/"+idapo,{headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
  
  mostrarLibreta(idda:Number){
    return this.http.get<MlibretaNotas[]>(this.url+"/libreta/"+idda,{headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  descargarLibreta(idda:Number){
    return this.http.get(this.url+"/reporte/libreta/"+idda,{responseType: 'blob', headers:this.agregarAutorizacion()});
  }

  listarAsistencias(idda:Number){
    return this.http.get<Mcursos[]>(this.url+"/asistencias/"+idda, {headers:this.agregarAutorizacion()}).pipe(        
      catchError(e => {     

        this.isNoAutorizado(e); 
        return throwError(e);
      })
    );
  }

  cambiarContraApoderado(usuario:Usuario, apoderado:Apoderado){    
    const credenciales = btoa(usuario.username +':'+usuario.password);
    const httpHeaders = new HttpHeaders({Authorization : 'Basic '+credenciales});     
    return this.http.put<Apoderado>(this.url+"/editar/pass/"+usuario.username,apoderado,{headers : httpHeaders});
  }

}
