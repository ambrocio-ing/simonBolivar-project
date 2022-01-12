import { Injectable } from '@angular/core';
import { Grado } from 'src/app/Modelo/Grado/grado';
import { Seccion } from 'src/app/Modelo/Seccion/seccion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DetalleAlumno } from 'src/app/Modelo/DetalleAlumno/detalle-alumno';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UsuarioRoleService } from '../UsuarioRole/usuario-role.service';
import { Router } from '@angular/router';
import { UsuarioAlumnoService } from '../UsuarioAlumno/usuario-alumno.service';
import { DetalleCursoEmpleado } from 'src/app/Modelo/DetalleCursoEmpleado/detalle-curso-empleado';
import { MlibretaNotas } from 'src/app/Modelo/MLibretaNotas/mlibreta-notas';
import { Mcursos } from 'src/app/Informes/MCurso/mcursos';
import { Clase } from 'src/app/Modelo/Clase/clase';
import { URL_BACKEND } from 'src/app/config/config';
import { Horario } from 'src/app/Modelo/Horario/horario';

@Injectable({
  providedIn: 'root'
})
export class DetalleAlumnoService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private ususervicio: UsuarioRoleService,
     private router: Router, private usualumno:UsuarioAlumnoService) { 

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

  url:String = URL_BACKEND+"/gs";
  url1:String = URL_BACKEND+"/det_alumno";

  listaGrado() {
    return this.http.get<Grado[]>(this.url + "/grado", { headers: this.agregarAutorizacion() });
  }

  listaSeccion() {
    return this.http.get<Seccion[]>(this.url + "/seccion", { headers: this.agregarAutorizacion() });
  }

  listaDetalle() {
    return this.http.get<DetalleAlumno[]>(this.url1 + "/detalumlista", { headers: this.agregarAutorizacion() });
  }

  detalleCrear(detalleAlumno: DetalleAlumno[]) {
    return this.http.post<DetalleAlumno>(this.url1 + "/detalumcrear", detalleAlumno, { headers: this.agregarAutorizacion() }).pipe(
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

  detalleObtener(id: Number) {
    return this.http.get<DetalleAlumno>(this.url1 + "/detalumobtener/" + id, { headers: this.agregarAutorizacion() }).pipe(
      catchError(e => {

        this.isNoAutorizado(e)

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  detalleEditar(detalleAlumno: DetalleAlumno) {
    return this.http.put<DetalleAlumno>(this.url1 + "/detalumeditar/" + detalleAlumno.iddetalle_alumno, detalleAlumno, { headers: this.agregarAutorizacion() }).pipe(
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

  //Busqueda con like
  detalleBuscar(nombre: String) {
    return this.http.get<DetalleAlumno[]>(this.url1 + "/detalumbuscar/" + nombre, { headers: this.agregarAutorizacion() }).pipe(
      catchError(e => {

        this.isNoAutorizado(e)

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  //busqueda exacta
  detalle_Buscar(texto: String) {
    return this.http.get<DetalleAlumno[]>(this.url1 + "/da/buscar/" + texto, { headers: this.agregarAutorizacion() }).pipe(
      catchError(e => {

        this.isNoAutorizado(e)

        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  //metodo para obtener los alumnos pertenecientes a un grado
  obtenerPorGS(idg: Number, ids: Number) {
    return this.http.get<DetalleAlumno[]>(this.url1 + "/detoptener/porgs/" + idg + "/" + ids, { headers: this.agregarAutorizacion() }).pipe(
      catchError(e => {
        this.isNoAutorizado(e)
        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  mostrar_PorGrado_Seccion(idgrado:Number,idseccion:Number):Observable<DetalleCursoEmpleado[]>{
    return this.http.get(this.url1+"/dareciente/"+idgrado+"/"+idseccion, { headers: this.agregarAutorizacion() }).pipe(
      map(respuesta => respuesta as DetalleCursoEmpleado[]),
      catchError(e => {
        this.isNoAutorizado(e)
        
        return throwError(e);
      })
    ); 
  }

  urlalum: String = URL_BACKEND+"/intranet/estudiante";

  private httpheaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private isNo_Autorizado(e: any): Boolean {
    if (e.status == 401 || e.status == 403) {

      if (this.usualumno.isAuthenticated()) {
        this.usualumno.cerrarSession();
      }

      this.router.navigate(['login']);
      return true;

    }
    else {
      return false;
    }
  }

  private agregar_Autorizacion() {
    let permiso = this.usualumno.username_password;
    if (permiso != null) {
      return this.httpheaders.append('Authorization', 'Basic ' + permiso);
    }
    else {
      return this.httpheaders;
    }
  }

  mostarMtriculaReciente(dni:String): Observable<DetalleAlumno> {
    return this.http.get<DetalleAlumno>(this.urlalum + "/dareciente/" + dni, {headers:this.agregar_Autorizacion()}).pipe(
      catchError(e => {

        this.isNo_Autorizado(e);
        //alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  detallealumnObtener(idda: Number) {
    return this.http.get<DetalleAlumno>(this.urlalum + "/detalumobtener/" + idda, {headers:this.agregar_Autorizacion()}).pipe(
      catchError(e => {

        this.isNo_Autorizado(e);
        //alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  mostrarPorGradoSeccion(idgrado:Number,idseccion:Number):Observable<DetalleCursoEmpleado[]>{
    return this.http.get(this.urlalum+"/dareciente/"+idgrado+"/"+idseccion, {headers:this.agregar_Autorizacion()}).pipe(
      map(respuesta => respuesta as DetalleCursoEmpleado[]),
      catchError(e => {

        this.isNo_Autorizado(e);
        //alert(e.error.mensaje);
        return throwError(e);
      })
    ); 
  }

  dceOptener(id:Number):Observable<DetalleCursoEmpleado>{
    return this.http.get<DetalleCursoEmpleado>(this.urlalum+"/dceobtener/map/"+id, {headers:this.agregar_Autorizacion()}).pipe(
      catchError(e => {
        this.isNo_Autorizado(e); 
        alert(e.error.mensaje);
        return throwError(e);
      })
    );
  }
  
  mostrarLibreta(idda:Number){
    return this.http.get<MlibretaNotas[]>(this.urlalum+"/libreta/"+idda, {headers:this.agregar_Autorizacion()}).pipe(
      catchError(e => {
        this.isNo_Autorizado(e); 
        return throwError(e);
      })
    );
  }

  descargarLibreta(idda:Number){
    return this.http.get(this.urlalum+"/reporte/libreta/"+idda,{responseType: 'blob', headers:this.agregar_Autorizacion()});
  }

  listarAsistencias(idda:Number){
    return this.http.get<Mcursos[]>(this.urlalum+"/asistencias/"+idda, {headers:this.agregar_Autorizacion()}).pipe(
        
      catchError(e => {     

        this.isNo_Autorizado(e); 
        return throwError(e);
      })
    );
  }

  claseLista(id:Number):Observable<Clase[]>{
    return this.http.get(this.urlalum+"/cllista/map/"+id, {headers:this.agregar_Autorizacion()}).pipe(
      map(response => response as Clase[]),
      catchError(e => {     

        this.isNo_Autorizado(e); 
        return throwError(e);
      })
    );
  }

  recuperarHorario(idda:Number){
    return this.http.get(this.urlalum+"/ho/archivo/"+idda, {headers:this.agregar_Autorizacion()}).pipe(
      map(response => response as Horario),
      catchError(e => {          
        return throwError(e);
      })
    );
  }

}
