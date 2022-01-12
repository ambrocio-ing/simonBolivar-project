import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Apoderado } from 'src/app/Modelo/Apoderado/apoderado';
import { URL_BACKEND } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioApoderadoService {

  constructor(private http:HttpClient, private router:Router) { }

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  private _username_pasword:String;
  private _uapoderado:Apoderado;

  public get uapoderado():Apoderado{
    if(this._uapoderado != null){
      return this._uapoderado;
    }
    else if(this._uapoderado == null && sessionStorage.getItem("uapoderado") != null){
     
      this._uapoderado = JSON.parse(sessionStorage.getItem('uapoderado') || '{}') as Apoderado;
      return this._uapoderado;
    }
    else{
      return new Apoderado();
    }

  }

  public get username_password():String{
    if(this._username_pasword != null){
      return this._username_pasword;
    }
    else if(this._username_pasword == null && sessionStorage.getItem("ppermiso") != null){
     
      this._username_pasword = sessionStorage.getItem('ppermiso')!;
      
      return this._username_pasword;
    }
    else{
      return "";
    }
  }

  login(username:String, password:String):Observable<Apoderado>{

    const urllogin = URL_BACKEND+"/intranet/apoderado";
    const credenciales = btoa(username +':'+password);
    const httpHeaders = new HttpHeaders({Authorization : 'Basic '+credenciales}); 
    this._username_pasword = credenciales;
    return this.http.get<Apoderado>(urllogin+"/usuario/"+username,{headers : httpHeaders});

  }    

  guardarUsuario(uTemporal:Apoderado){
    this._uapoderado = new Apoderado();
    this._uapoderado.idapoderado = uTemporal.idapoderado;
    this._uapoderado.dni = uTemporal.dni;
    this._uapoderado.nombre = uTemporal.nombre;
    this._uapoderado.apellidos = uTemporal.apellidos;
    this._uapoderado.acceso = uTemporal.acceso;  
    
    sessionStorage.setItem("uapoderado", JSON.stringify(this._uapoderado));
    sessionStorage.setItem("ppermiso",this._username_pasword.toString());

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
    this._uapoderado == null;
    sessionStorage.clear();
  }

  verificarRole(rolename:String):Boolean{
    
    if(this.uapoderado.acceso = rolename){
      return true;
      
    }
    else{
      return false;
      
    }
    
  }

}
