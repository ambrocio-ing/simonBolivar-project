import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import { ApServicioService } from './Servicio/Apoderado/ap-servicio.service';
import { AlumnoService } from './Servicio/Alumno/alumno.service';
import { ComunicadorService } from './Servicio/Comunicador/comunicador.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { NgChartsModule } from 'ng2-charts';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTreeModule} from '@angular/material/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import {A11yModule} from '@angular/cdk/a11y';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatSliderModule } from '@angular/material/slider';
import {  MatOptionModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {OverlayModule} from '@angular/cdk/overlay';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApcrearComponent } from './Componente/apoderado/apcrear.component';
import { AlumnoComponent } from './Componente/alumno/alumno.component';
import { EmergenteApoderadoComponent } from './Componente/emergente-apoderado/emergente-apoderado.component';
import { EmpleadoComponent } from './Componente/empleado/empleado.component';
import { EspecialidadComponent } from './Componente/especialidad/especialidad.component';
import { DetalleAlumnoComponent } from './Componente/detalle-alumno/detalle-alumno.component';
import { AlumnoFotoComponent } from './Componente/alumno-foto/alumno-foto.component';
import { EmpleadoFotoComponent } from './Componente/empleado-foto/empleado-foto.component';
import { CursoComponent } from './Componente/curso/curso.component';
import { ClaseComponent } from './Componente/clase/clase.component';
import { ClaseArchivosComponent } from './Componente/clase-archivos/clase-archivos.component';
import { ActividadPlanteadaComponent } from './Componente/actividad-planteada/actividad-planteada.component';
import { ActividadArchivoComponent } from './Componente/actividad-archivo/actividad-archivo.component';

import { ActividadEntregadoComponent } from './Componente/actividad-entregado/actividad-entregado.component';
import { ArchivoEntregadoComponent } from './Componente/archivo-entregado/archivo-entregado.component';
import { CompetenciaComponent } from './Componente/competencia/competencia.component';
import { DetalleCompetenciaComponent } from './Componente/detalle-competencia/detalle-competencia.component';
import { PeriodoCalificacionComponent } from './Componente/periodo-calificacion/periodo-calificacion.component';
import { DetalleCompetenciaModaComponent } from './Componente/detalle-competencia-moda/detalle-competencia-moda.component';
import { OtraCalificacionModalComponent } from './Componente/otra-calificacion-modal/otra-calificacion-modal.component';
import { TutorComponent } from './Componente/tutor/tutor.component';
import { BimestreComponent } from './Componente/bimestre/bimestre.component';
import { FichaAsistenciaComponent } from './Componente/ficha-asistencia/ficha-asistencia.component';
import { DetalleBimestreCompetenciaComponent } from './Componente/detalle-bimestre-competencia/detalle-bimestre-competencia.component';
import { RegistroAhuxiliarComponent } from './Componente/registro-auxiliar/registro-ahuxiliar.component';
import { UsuariosComponent } from './Componente/usuarios/usuarios.component';
import { LoginComponent } from './Componente/login/login.component';
import { HomeComponent } from './Vistas/home/home.component';

import { IntAlumnoComponent } from './Vistas/int-alumno/int-alumno.component';
import { IntAreAluComponent } from './Vistas/int-are-alu/int-are-alu.component';
import { IntAsiAluComponent } from './Vistas/int-asi-alu/int-asi-alu.component';
import { IntCalAluComponent } from './Vistas/int-cal-alu/int-cal-alu.component';
import { IntClasesComponent } from './Vistas/int-clases/int-clases.component';
import { IntHorAluComponent } from './Vistas/int-hor-alu/int-hor-alu.component';
import { PerfilDocenteComponent } from './intranet-docente/perfil-docente/perfil-docente.component';
import { RevisarActividadesComponent } from './intranet-docente/revisar-actividades/revisar-actividades.component';
import { IntranetMonitoreoComponent } from './intranet-administrativo/intranet-monitoreo/intranet-monitoreo.component';

import { IntAdmDocComponent } from './intranet-administrativo/int-adm-doc/int-adm-doc.component';
import { IntAdmNotasComponent } from './intranet-administrativo/int-adm-notas/int-adm-notas.component';
import { IntAnalisisNotasComponent } from './intranet-administrativo/int-analisis-notas/int-analisis-notas.component';
import { IntAsiPersonalComponent } from './intranet-administrativo/int-asi-personal/int-asi-personal.component';

import { IntraAdministrativoComponent } from './intranet-administrativo/intra-administrativo/intra-administrativo.component';import { TramiteComponent } from './Componente/tramite/tramite.component';
import { ApoderadoIntranetComponent } from './intranet-apoderado/apoderado-intranet/apoderado-intranet.component';
import { NuevaContraComponent } from './intranet-administrativo/nueva-contra/nueva-contra.component';
import { NuevaContraDocenteComponent } from './intranet-docente/nueva-contra-docente/nueva-contra-docente.component';
import { NuevaContraAlumnoComponent } from './Vistas/nueva-contra-alumno/nueva-contra-alumno.component';
import { NuevaContraApoderadoComponent } from './intranet-apoderado/nueva-contra/nueva-contra.component';
import { NoticiasComponent } from './Componente/noticias/noticias.component';
import { NoticiasArchivoComponent } from './Componente/noticias-archivo/noticias-archivo.component';
import { TutoriaComponent } from './intranet-docente/tutoria/tutoria.component';
import { HorarioComponent } from './intranet-administrativo/horario/horario.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,  
    ApcrearComponent,
    AlumnoComponent,
    EmergenteApoderadoComponent,
    EmpleadoComponent,
    EspecialidadComponent,
    DetalleAlumnoComponent,
    AlumnoFotoComponent,
    EmpleadoFotoComponent,
    CursoComponent,
    ClaseComponent,
    ClaseArchivosComponent,
    ActividadPlanteadaComponent,  
    ActividadArchivoComponent,  
    ActividadEntregadoComponent,
    ArchivoEntregadoComponent,
    CompetenciaComponent,
    DetalleCompetenciaComponent,
    PeriodoCalificacionComponent,
    DetalleCompetenciaModaComponent,
    OtraCalificacionModalComponent,
    TutorComponent,
    BimestreComponent,
    FichaAsistenciaComponent,
    DetalleBimestreCompetenciaComponent,
    RegistroAhuxiliarComponent,
    UsuariosComponent,
    LoginComponent,
    HomeComponent,
    
    IntAlumnoComponent,
    IntAreAluComponent,
    IntAsiAluComponent,
    IntCalAluComponent,
    IntClasesComponent,
    IntHorAluComponent,    
    PerfilDocenteComponent,
    RevisarActividadesComponent,
    IntranetMonitoreoComponent,

    //import angular material
    IntAdmDocComponent,
    IntAdmNotasComponent,
    IntAnalisisNotasComponent,
    IntAsiPersonalComponent,      
    IntraAdministrativoComponent,
    TramiteComponent,
    ApoderadoIntranetComponent,
    NuevaContraComponent,
    NuevaContraDocenteComponent,
    NuevaContraAlumnoComponent,
    NuevaContraApoderadoComponent,
    NoticiasComponent,
    NoticiasArchivoComponent,
    TutoriaComponent,
    HorarioComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
   
    HttpClientModule,
    
    
    //imports angular material 
    
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSliderModule,
    MatTreeModule,
    MatAutocompleteModule,
    MatIconModule,    
    MatFormFieldModule,
    MatInputModule, 
    MatOptionModule,
    MatExpansionModule,
    MatTableModule,
    CdkTableModule,
    MatNativeDateModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatButtonToggleModule,
    
    A11yModule,
    CdkAccordionModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    NgChartsModule,
    NgxChartsModule
    
  ],
  providers: [ApServicioService,AlumnoService,ComunicadorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
