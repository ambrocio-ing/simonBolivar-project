import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Clase } from 'src/app/Modelo/Clase/clase';
import { catchError, map } from 'rxjs/operators';
import { MlibretaNotas } from 'src/app/Modelo/MLibretaNotas/mlibreta-notas';
import { Mestadistica } from 'src/app/Modelo/MEstadistica/mestadistica';
import { DetalleCursoEmpleado } from 'src/app/Modelo/DetalleCursoEmpleado/detalle-curso-empleado';
import { Router } from '@angular/router';
import { UsuarioRoleService } from '../UsuarioRole/usuario-role.service';
import { ActividadEntregado } from 'src/app/Modelo/ActividaEntregado/actividad-entregado';
import { Usuario } from 'src/app/Modelo/Usuario/usuario';
import { URL_BACKEND } from 'src/app/config/config';


@Injectable({
  providedIn: 'root'
})
export class ClaseService {

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

  url:String = URL_BACKEND+"/clase";

  claseLista(id:Number):Observable<Clase[]>{
    return this.http.get(this.url+"/cllista/map/"+id, {headers:this.agregarAutorizacion()}).pipe(
      map(response => response as Clase[]),
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })

    );
  }
  
  _claseLista(id:Number):Observable<Clase[]>{
    return this.http.get(this.url+"/cllista/"+id, {headers:this.agregarAutorizacion()}).pipe(
      map(response => response as Clase[]),
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }  

  claseCrear(clase:Clase){
    return this.http.post<Clase>(this.url+"/clcrear", clase, {headers:this.agregarAutorizacion()}).pipe(
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

  claseObtener(id:Number):Observable<Clase>{
    return this.http.get<Clase>(this.url+"/clobtener/"+id, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {

        this.isNoAutorizado(e);

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  claseEditar(clase:Clase){
    return this.http.put<Clase>(this.url+"/cleditar/"+clase.idclase, clase, {headers:this.agregarAutorizacion()}).pipe(
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

  claseEliminar(id:Number){
    return this.http.delete<Clase>(this.url+"/cleliminar/"+id, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  claseBuscar(tema:String):Observable<Clase[]>{
    return this.http.get(this.url+"/clbuscar/"+tema, {headers:this.agregarAutorizacion()}).pipe(
      map(response => response as Clase[]),
      catchError(e => {

        this.isNoAutorizado(e);

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  claseCrearArchivos(documento1:File,documento2:File,documento3:File, id:any):Observable<HttpEvent<{}>>{

    let formData =  new FormData();
    formData.append("documentos", documento1);
    formData.append("documentos", documento2);
    formData.append("documentos", documento3);
    formData.append("idclase", id);   

    let httpHeaders = new HttpHeaders();
    let permiso = this.ususervicio.username_password;
    if(permiso != null){
      httpHeaders = httpHeaders.append('Authorization', 'Basic '+permiso);
    }

    const req = new HttpRequest('POST',this.url+"/clarchivos",formData,{
      reportProgress : true,
      headers:httpHeaders
    });

    return this.http.request(req);

  }

  claseEliminarArchivo(id:any,texto:any):Observable<HttpEvent<{}>>{
    let formData =  new FormData();
    
    formData.append("documento", texto);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let permiso = this.ususervicio.username_password;
    if(permiso != null){
      httpHeaders = httpHeaders.append('Authorization', 'Basic '+permiso);
    }
    
    const req = new HttpRequest('POST',this.url+"/cleu",formData, {headers:httpHeaders});

    return this.http.request(req);
    
  }

  listarCursosDocente(idem:Number){
    return this.http.get<DetalleCursoEmpleado[]>(this.url+"/lista/dce/"+idem , {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  detalleOptener(id:Number):Observable<DetalleCursoEmpleado>{
    return this.http.get<DetalleCursoEmpleado>(this.url+"/dceobtener/"+id, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        } 

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }  

  obtenerAEPorDCE(idda:Number, iddce:Number){
    return this.http.get<ActividadEntregado[]>(this.url+"/aeobtener/dceal/"+idda+"/"+iddce, {headers:this.agregarAutorizacion()}).pipe(
      
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  } 

  cambiarContraDocente(usuario:Usuario, ucambiar:Usuario){
    const urllogin = URL_BACKEND+"/clase";
    const credenciales = btoa(usuario.username +':'+usuario.password);
    const httpHeaders = new HttpHeaders({Authorization : 'Basic '+credenciales});     
    return this.http.put<Usuario>(urllogin+"/editar/pass/"+usuario.username,ucambiar,{headers : httpHeaders});
  }

  //acceso para tutoria
  urltutoria:String = URL_BACKEND+"/tutoria";

  dceParaTutoria(idem:Number):Observable<DetalleCursoEmpleado>{
    return this.http.get<DetalleCursoEmpleado>(this.urltutoria+"/confirmar/tutor/"+idem, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {
        
        this.isNoAutorizado(e)        
        return throwError(e);
      })
    );
  }  

  listaDeClasesParaTutoria(iddce:Number,fecha:String){
    return this.http.get<Clase[]>(this.urltutoria+"/monitoreo/"+iddce+"/"+fecha, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {        
        this.isNoAutorizado(e)        
        return throwError(e);
      })
    );
  } 

  //personal administrativo
  //lista de clases del dia
  urlad:String = URL_BACKEND+"/clasead";
 

  claseListaDelDia(fecha:String):Observable<Clase[]>{
    return this.http.get<Clase[]>(this.urlad+"/cldel/dia/"+fecha, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  //mostrar libreta
  mostrarLibreta(idda:Number){
    return this.http.get<MlibretaNotas[]>(this.urlad+"/libreta/"+idda, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {

        this.isNoAutorizado(e);

        return throwError(e);
      })
    );
  }

  descargarLibreta(idda:Number){
    return this.http.get(this.urlad+"/reporte/libreta/"+idda,{responseType: 'blob',headers:this.agregarAutorizacion()});
  }

  //estadisticas
  mostrarEstadicticas(fecha:String){
    return this.http.get<Mestadistica[]>(this.urlad+"/estadistica/"+fecha, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  cambiarContra(usuario:Usuario, ucambiar:Usuario){
    const urllogin = URL_BACKEND+"/clasead";
    const credenciales = btoa(usuario.username +':'+usuario.password);
    const httpHeaders = new HttpHeaders({Authorization : 'Basic '+credenciales});     
    return this.http.put<Usuario>(urllogin+"/editar/pass/"+usuario.username,ucambiar,{headers : httpHeaders});
  }


 
}
