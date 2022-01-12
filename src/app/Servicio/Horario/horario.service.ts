import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioAlumnoService } from '../UsuarioAlumno/usuario-alumno.service';
import { UsuarioRoleService } from '../UsuarioRole/usuario-role.service';
import { URL_BACKEND } from 'src/app/config/config';
import { Horario } from 'src/app/Modelo/Horario/horario';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private ususervicio: UsuarioRoleService,
    private router: Router) {

  }

  private isNoAutorizado(e: any): Boolean {
    if (e.status == 401 || e.status == 403) {

      if (this.ususervicio.isAuthenticated()) {
        this.ususervicio.cerrarSession();
      }

      this.router.navigate(['login']);
      return true;

    }
    else {
      return false;
    }
  }

  private agregarAutorizacion() {
    let permiso = this.ususervicio.username_password;
    if (permiso != null) {
      return this.httpHeaders.append('Authorization', 'Basic ' + permiso);
    }
    else {
      return this.httpHeaders;
    }
  }

  url:String = URL_BACKEND+"/horario";

  listarHorario(){
    return this.http.get<Horario[]>(this.url+"/holista",{headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  buscarHorario(fecha:String){
    return this.http.get<Horario[]>(this.url+"/hobuscar/"+fecha,{headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  crearHorario(archivo:File, horario:Horario):Observable<HttpEvent<{}>>{

    let formData = new FormData();
    formData.append("fecha", horario.fecha.toString()),
    formData.append("archivo", archivo);
    formData.append("idgrado", horario.grado.idgrado.toString());
    formData.append("idseccion", horario.seccion.idseccion.toString());

    let httpHeaders = new HttpHeaders();
    let permiso = this.ususervicio.username_password;
    if(permiso != null){
      httpHeaders = httpHeaders.append('Authorization', 'Basic '+permiso);
    }

    const req = new HttpRequest('POST',this.url+"/hocrear",formData,{      
      headers: httpHeaders
    });
  
    return this.http.request(req);

  }

  eliminarHorario(id:Number){
    return this.http.delete(this.url+"/hoeliminar/"+id,{headers:this.agregarAutorizacion()}).pipe(
      catchError(e => {
        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

}
