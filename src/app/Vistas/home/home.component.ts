import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Cronograma } from 'src/app/Modelo/Cronograma/cronograma';
import { TramiteService } from 'src/app/Servicio/Tramite/tramite.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private tramite:TramiteService, private sanitizer:DomSanitizer) { }

  public urlBackend:String = URL_BACKEND;

  cronogramas:Cronograma[] = [];
  mensaje:String;
  ngOnInit(): void {
    this.tramite.crLista().subscribe(datos => {
      this.mensaje = "";
      this.cronogramas = datos;
    }, err => {
      this.mensaje = "Sin noticias que mostrar";
    });
  }

  getVideoIframe(url:String){
    var video , results;

    if(url === null){
      return "";
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
 
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video); 
  }

  validarVideo(archivo:String):Boolean{
    let indice = archivo.length;
    let cadena1 = archivo.charAt(indice - 1);
    let cadena2 = archivo.charAt(indice - 2);
    let cadena3 = archivo.charAt(indice - 3);
    if(cadena1+""+cadena2+""+cadena3 == "mp4" || cadena1+""+cadena2+""+cadena3 == "MP4"){
      return true;
    }
    else{
      return false;
    }

  }

}
