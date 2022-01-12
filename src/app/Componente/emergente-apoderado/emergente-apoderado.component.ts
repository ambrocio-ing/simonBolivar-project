import { Component, Input, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { Apoderado } from 'src/app/Modelo/Apoderado/apoderado';
import { ApServicioService } from 'src/app/Servicio/Apoderado/ap-servicio.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComunicadorService } from 'src/app/Servicio/Comunicador/comunicador.service';

@Component({
  selector: 'app-emergente-apoderado',
  templateUrl: './emergente-apoderado.component.html',
  styleUrls: ['./emergente-apoderado.component.css']

})
export class EmergenteApoderadoComponent implements OnInit {



  @Input() visible: boolean;
  @Output() cerrar: EventEmitter<boolean> = new EventEmitter();
  @Output() cargar = new EventEmitter();

  apoderados: Apoderado[];
  apoderado: Apoderado = new Apoderado();

  buscarForm = new FormControl('', [Validators.required]);

  constructor(private servicio: ApServicioService, private comunicador: ComunicadorService) { }


  ngOnInit(): void {

  }

  cerrarModal() {
    this.cerrar.emit(false);
  }

  messageError: String;

  buscar(event: Event) {
    event.preventDefault();
    if (this.buscarForm.valid) {
      let texto = this.buscarForm.value;
      this.servicio.buscarApoderado(texto).subscribe(lista => {
        this.apoderados = lista;
      }, err => {

        alert("Sin datos que mostrar");
      });
    }
  }

  enviar1(apoderado: Apoderado) {
    //capturar el id desde la vista     
    this.servicio.optenerApoderado(apoderado.idapoderado).subscribe(valor => {
      this.apoderado = valor;
      this.comunicador.disparador.emit(this.apoderado);
    }, err => {
      alert("Error: no se encontro respuesta válida");
    });

  }


}
