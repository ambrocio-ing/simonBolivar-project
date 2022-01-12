import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Masistencia } from 'src/app/Informes/MAsistencia/masistencia';
import { Mcursos } from 'src/app/Informes/MCurso/mcursos';
import { McursoCompetenciaIv } from 'src/app/Informes/MCursoCompetenciaIV/mcurso-competencia-iv';
import { UsuarioRoleService } from '../UsuarioRole/usuario-role.service';
import { URL_BACKEND } from 'src/app/config/config';
import { Tutor } from 'src/app/Modelo/Tutor/tutor';


@Injectable({
  providedIn: 'root'
})
export class DetaleBimestreCompetenciaService {

  url:String = URL_BACKEND+"/informe";

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

  listarInformeAprovechamiento(idda:Number){
    return this.http.get<Mcursos[]>(this.url+"/notas/"+idda, {headers : this.agregarAutorizacion()}).pipe(
      
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  listarAsistencia(idda:Number){
    return this.http.get<Masistencia[]>(this.url+"/asistencia/"+idda, {headers : this.agregarAutorizacion()}).pipe(
      
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  obtenerTutor(idda:Number){
    return this.http.get<Tutor>(this.url+"/obtener/tutor/"+idda, {headers : this.agregarAutorizacion()}).pipe(
      
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  descargaExcelAprovechamiento(idda:Number):Observable<Blob>{
    return this.http.get(this.url+"/generar/reporte/aprovechamiento/"+idda,{responseType: 'blob', headers : this.agregarAutorizacion()});
  }


  urlregistro:String = URL_BACKEND+"/registro/ahuxiliar";

  //métodos para registro ahuxiliar
  //para las cursos con 4 competencias
  listarRegistroAuxiliarCuatro(iddce:Number,fecha:String){
    return this.http.get<McursoCompetenciaIv[]>(this.urlregistro+"/comcuatro/"+iddce+"/"+fecha, {headers : this.agregarAutorizacion()});

  }
  //para las cursos con 3 competencias
  listarRegistroAuxiliarTres(iddce:Number,fecha:String){
    return this.http.get<McursoCompetenciaIv[]>(this.urlregistro+"/comtres/"+iddce+"/"+fecha, {headers : this.agregarAutorizacion()});
    
  }

  //para las cursos con 2 competencias
  listarRegistroAuxiliarDos(iddce:Number,fecha:String){
    return this.http.get<McursoCompetenciaIv[]>(this.urlregistro+"/comdos/"+iddce+"/"+fecha, {headers : this.agregarAutorizacion()});
    
  }

  //para las cursos con 1 competencias
  listarRegistroAuxiliarUno(iddce:Number,fecha:String){
    return this.http.get<McursoCompetenciaIv[]>(this.urlregistro+"/comuno/"+iddce+"/"+fecha, {headers : this.agregarAutorizacion()});
    
  }  

  //sin uso
  exportarExcel(iddce:Number,fecha:String){
    return this.http.get(this.urlregistro+"/generar/reporte/"+iddce+"/"+fecha, {responseType: 'arraybuffer'});
  }

  descargaExcelCuatro(iddce:Number,fecha:String):Observable<Blob>{
    return this.http.get(this.urlregistro+"/generar/reporte/cuatro/"+iddce+"/"+fecha,{responseType: 'blob', headers : this.agregarAutorizacion()});
  }

  descargaExcelTres(iddce:Number,fecha:String):Observable<Blob>{
    return this.http.get(this.urlregistro+"/generar/reporte/tres/"+iddce+"/"+fecha,{responseType: 'blob', headers : this.agregarAutorizacion()});
  }

  descargaExcelDos(iddce:Number,fecha:String):Observable<Blob>{
    return this.http.get(this.urlregistro+"/generar/reporte/dos/"+iddce+"/"+fecha,{responseType: 'blob', headers : this.agregarAutorizacion()});
  }

  descargaExcelUno(iddce:Number,fecha:String):Observable<Blob>{
    return this.http.get(this.urlregistro+"/generar/reporte/uno/"+iddce+"/"+fecha,{responseType: 'blob', headers : this.agregarAutorizacion()});
  }

  
}
