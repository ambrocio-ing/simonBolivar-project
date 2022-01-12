import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tramite } from 'src/app/Modelo/Tramite/tramite';
import { TramiteService } from 'src/app/Servicio/Tramite/tramite.service';
import { UsuarioRoleService } from 'src/app/Servicio/UsuarioRole/usuario-role.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-int-adm-doc',
  templateUrl: './int-adm-doc.component.html',
  styleUrls: ['./int-adm-doc.component.css']
})
export class IntAdmDocComponent implements OnInit {

  public urlBackend: String = URL_BACKEND;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private traservicio: TramiteService, public ususervicio: UsuarioRoleService) {

  }

  fechahoy = new Date(Date.now());

  tramites: Tramite[] = [];


  ngOnInit() {
    this.listar();
  }

  listar() {
    this.traservicio.tramiteLista().subscribe(datos => {
      this.tramites = datos;
    });
  }

  irAperfil() {
    if (this.ususervicio.isAuthenticated()) {
      this.router.navigate(['intra/personal']);
    }
    else {
      this.router.navigate(['login']);
    }

  }

  cerrarSesion() {
    this.ususervicio.cerrarSession();
    this.router.navigate(['login']);
  }



  eliminar(tramite: Tramite) {
    let id = tramite.idtramite;
    if (id != null) {
      let confirmar = confirm("Seguro que desea eliminar el registro?? Ya no podras recuperar el registro");
      if (confirmar) {
        this.traservicio.tramitePrivadoEliminar(+id).subscribe(dato => {
          alert("Registro eliminado con éxito");
          this.ngOnInit();
        });
      }
    }
  }

  revisar(tramite: Tramite) {

    this.traservicio.tramiteMarcarRevisado(tramite).subscribe(dato => {
      alert("Revisión éxitosa");
      this.ngOnInit();
    });

  }

}
