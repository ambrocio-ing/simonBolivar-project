import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from 'src/app/Modelo/Alumno/alumno';
import { DetalleAlumno } from 'src/app/Modelo/DetalleAlumno/detalle-alumno';
import { Grado } from 'src/app/Modelo/Grado/grado';
import { Seccion } from 'src/app/Modelo/Seccion/seccion';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAlumnoService {

  constructor(private http:HttpClient) { }

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  private _username_pasword:String;
  private _ualumno:DetalleAlumno;

  public get ualumno():DetalleAlumno{
    if(this._ualumno != null){
      return this._ualumno;
    }
    else if(this._ualumno == null && sessionStorage.getItem("ualumno") != null){
     
      this._ualumno = JSON.parse(sessionStorage.getItem('ualumno') || '{}') as DetalleAlumno;
      return this._ualumno;
    }
    else{
      let iddetalle_alumno = 0;;
      let periodo = new Date();
      let alumno:Alumno = new Alumno();
      let grado:Grado = new Grado();
      let seccion:Seccion = new Seccion();
      return new DetalleAlumno(iddetalle_alumno,periodo,alumno,grado,seccion);
    }

  } 

  public get username_password():String{
    if(this._username_pasword != null){
      return this._username_pasword;
    }
    else if(this._username_pasword == null && sessionStorage.getItem("permisoa") != null){
     
      this._username_pasword = sessionStorage.getItem('permisoa')!;
      
      return this._username_pasword;
    }
    else{
      return "";
    }
  }
  

  login(username:String,password:String):Observable<DetalleAlumno>{

    const urllogin = URL_BACKEND+"/intranet/estudiante";
    const credenciales = btoa(username +':'+password);

    const httpHeaders = new HttpHeaders({Authorization : 'Basic '+credenciales}); 
    this._username_pasword = credenciales;
    return this.http.get<DetalleAlumno>(urllogin+"/dareciente/"+username,{headers : httpHeaders});

  }
  
  cambiarContraAlumno(username:String,password:String, alumno:Alumno){

    const urllogin = URL_BACKEND+"/intranet/estudiante";
    const credenciales = btoa(username +':'+password);
    const httpHeaders = new HttpHeaders({Authorization : 'Basic '+credenciales});     
    return this.http.put<Alumno>(urllogin+"/alumno/pass/"+username,alumno,{headers : httpHeaders});

  }   

  guardarUsuario(uTemporal:DetalleAlumno){
    let iddetalle_alumno = uTemporal.iddetalle_alumno;
    let periodo = uTemporal.periodo;
    let alumno:Alumno = uTemporal.alumno;
    let grado:Grado = uTemporal.grado;
    let seccion:Seccion = uTemporal.seccion;

    this._ualumno = new DetalleAlumno(iddetalle_alumno,periodo,alumno,grado,seccion);   

    sessionStorage.setItem("ualumno", JSON.stringify(this._ualumno));
    sessionStorage.setItem("permisoa",this._username_pasword.toString());

  }  

  isAuthenticated():Boolean{
    let credenciales = this.username_password;
    if(credenciales != "" && credenciales != null && credenciales.length != 0){
      return true;
    }
    else{
      return false;
    }
  }

  cerrarSession(){
    this._username_pasword = "";
    this._ualumno == null;
    sessionStorage.clear();
  }

  verificarRole(rolename:String):Boolean{    
    if(this.ualumno.alumno.acceso = rolename){
      return true;      
    }
    else{
      return false;      
    }
    
  }

}
