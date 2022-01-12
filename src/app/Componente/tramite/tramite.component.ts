import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tramite } from 'src/app/Modelo/Tramite/tramite';
import { TramiteService } from 'src/app/Servicio/Tramite/tramite.service';

@Component({
  selector: 'app-tramite',
  templateUrl: './tramite.component.html',
  styleUrls: ['./tramite.component.css']
})
export class TramiteComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private traservicio: TramiteService) {
    this.construirForm();
  }

  tramite: Tramite = new Tramite();

  fechahoy = new Date(Date.now());

  formTramite: FormGroup;

  construirForm() {
    this.formTramite = this.formBuilder.group({
      idtramite: ['', []],
      estado: ['Pendiente', []], 
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]\d{7,7}$/)]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      asunto: ['', [Validators.required]],
      dirigido: ['', [Validators.required]],
      fecha: [formatDate(this.fechahoy, "yyyy-MM-dd", "en"), [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]\d{6,8}$/)]],
      archivo: ['', [Validators.required]],
      detalle: ['', [Validators.required]]
    });
  }

  obtenerValoresForm(tra: Tramite) {
    tra.idtramite = this.formTramite.get('idtramite')?.value;
    tra.estado = "Pendiente";
    tra.dni = this.formTramite.get('dni')?.value;
    tra.nombre = this.formTramite.get('nombre')?.value;
    tra.apellidos = this.formTramite.get('apellidos')?.value;
    tra.asunto = this.formTramite.get('asunto')?.value;
    tra.dirigido = this.formTramite.get('dirigido')?.value;
    tra.fecha = this.formTramite.get('fecha')?.value;
    tra.email = this.formTramite.get('email')?.value;
    tra.telefono = this.formTramite.get('telefono')?.value;
    tra.detalle = this.formTramite.get('detalle')?.value;
  }

  limpiarForm() {
    this.formTramite.setValue({
      idtramite: "",
      estado: "Pendiente",
      dni: "",
      nombre: "",
      apellidos: "",
      asunto: "",
      dirigido: "",
      fecha: formatDate(this.fechahoy, "yyyy-MM-dd", "en"),
      email: "",
      telefono: "",
      archivo: "",
      detalle: ""
    });
    this.formTramite.markAsUntouched();
  }

  archivoSeleccionado: File;

  capturarArchivo(event: Event) {
    let target = event.target as HTMLInputElement;
    this.archivoSeleccionado = (target.files as FileList)[0];
  }

  ngOnInit(): void {

  }

  save(event: Event) {
    event.preventDefault();
    if (this.formTramite.valid) {
      this.obtenerValoresForm(this.tramite);
      if (this.tramite != null) {
        this.traservicio.tramiteCrear(this.tramite).subscribe(dato => {
          this.limpiarForm();
          this.traservicio.tramiteArchivo(this.archivoSeleccionado, this.tramite.dni).subscribe(datos => {            

          }, err => {
            this.traservicio.tramiteEliminar(this.tramite.dni).subscribe(datito => {
              alert("Su tramite no fue enviado, por favor llene todos los campos y vuelva a intentar");

            }, error => {
              alert("Su tramite no fue enviado, por favor llene todos los campos y vuelva a intentar");
            });

          });

          alert("Su tramite se a enviado con éxito, nuestro personal se comunicará con usted pronto");

        });
      }
      else {
        alert("Operación no reconocido");
      }

    }
    else {
      this.formTramite.markAllAsTouched();
    }
  }

  irAperfil() {
    this.router.navigate(['intra/personal']);
  }

}
