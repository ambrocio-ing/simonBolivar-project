import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MActividadEntregadoLista } from 'src/app/intranet-docente/revisar-actividades/revisar-actividades.component';
import { ActividadPlanteado} from 'src/app/Modelo/Actividad/actividad';
import { UsuarioRoleService } from '../UsuarioRole/usuario-role.service';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

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

  url:String = URL_BACKEND+"/actividad";

  actividadLista(id:Number):Observable<ActividadPlanteado[]>{
    return this.http.get(this.url+"/aplista/"+id, {headers:this.agregarAutorizacion()}).pipe(
      map(respuesta => respuesta as ActividadPlanteado[]),
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  actividadCrear(actividad:ActividadPlanteado){
    return this.http.post<ActividadPlanteado>(this.url+"/apcrear",actividad, {headers:this.agregarAutorizacion()}).pipe(
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

  actividadObtener(id:Number):Observable<ActividadPlanteado>{
    return this.http.get<ActividadPlanteado>(this.url+"/apobtener/"+id, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {

        this.isNoAutorizado(e);

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  actividadEditar(actividad:ActividadPlanteado){
    return this.http.put<ActividadPlanteado>(this.url+"/apeditar/"+actividad.idactividad,actividad, {headers:this.agregarAutorizacion()}).pipe(
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

  actividadEliminar(id:Number){
    return this.http.delete<ActividadPlanteado>(this.url+"/apeliminar/"+id, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  actividadBusacar(id:Number,nombre:String):Observable<ActividadPlanteado[]>{
    return this.http.get(this.url+"/apbuscar/"+id+"/"+nombre, {headers:this.agregarAutorizacion()}).pipe(
      map(respuesta => respuesta as ActividadPlanteado[]),
      catchError(e => {

        this.isNoAutorizado(e);

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  archivoGuardar(archivo:File, id:any):Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo", archivo);  
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let permiso = this.ususervicio.username_password;
    if(permiso != null){
      httpHeaders = httpHeaders.append('Authorization', 'Basic '+permiso);
    }

    let req = new HttpRequest('POST',this.url+"/aparchivo",formData,{
      reportProgress : true,
      headers:httpHeaders
    });

    return this.http.request(req);
  }  

  eliminarUno(archivo:any):Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo",archivo);

    let httpHeaders = new HttpHeaders();
    let permiso = this.ususervicio.username_password;
    if(permiso != null){
      httpHeaders = httpHeaders.append('Authorization', 'Basic '+permiso);
    }

    let req = new HttpRequest('POST',this.url+"/eliminarUno",formData,{headers:httpHeaders});

    return this.http.request(req);

  }

  actividadPorDCE(iddce:Number):Observable<ActividadPlanteado[]>{
    return this.http.get(this.url+"/apmostrar/pordce/"+iddce, {headers:this.agregarAutorizacion()}).pipe(
      map(respuesta => respuesta as ActividadPlanteado[]),
      catchError(e => {

        this.isNoAutorizado(e);        

        //alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  //lsita de actividades por revisar

  listarActividadesEntregados(idclase:Number){
    return this.http.get<MActividadEntregadoLista[]>(this.url+"/listar/entregas/"+idclase, {headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {

        this.isNoAutorizado(e);

        return throwError(e);
      })
    );
  }

}
