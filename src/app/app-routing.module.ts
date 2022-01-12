import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoComponent } from './Componente/alumno/alumno.component';
import { ApcrearComponent } from './Componente/apoderado/apcrear.component';
import { CursoComponent } from './Componente/curso/curso.component';
import { DetalleAlumnoComponent } from './Componente/detalle-alumno/detalle-alumno.component';
import { EmpleadoComponent } from './Componente/empleado/empleado.component';
import { ClaseComponent } from './Componente/clase/clase.component';
import { ActividadPlanteadaComponent } from './Componente/actividad-planteada/actividad-planteada.component';
import { ActividadEntregadoComponent } from './Componente/actividad-entregado/actividad-entregado.component';
import { CompetenciaComponent } from './Componente/competencia/competencia.component';
import { DetalleCompetenciaComponent } from './Componente/detalle-competencia/detalle-competencia.component';

import { TutorComponent } from './Componente/tutor/tutor.component';
import { FichaAsistenciaComponent } from './Componente/ficha-asistencia/ficha-asistencia.component';
import { DetalleBimestreCompetenciaComponent } from './Componente/detalle-bimestre-competencia/detalle-bimestre-competencia.component';
import { RegistroAhuxiliarComponent } from './Componente/registro-ahuxiliar/registro-ahuxiliar.component';
import { UsuariosComponent } from './Componente/usuarios/usuarios.component';
import { LoginComponent } from './Componente/login/login.component';
import { HomeComponent } from './Vistas/home/home.component';
import { IntAlumnoComponent } from './Vistas/int-alumno/int-alumno.component';
import { IntAreAluComponent } from './Vistas/int-are-alu/int-are-alu.component';
import { IntAsiAluComponent } from './Vistas/int-asi-alu/int-asi-alu.component';
import { IntCalAluComponent } from './Vistas/int-cal-alu/int-cal-alu.component';
import { IntClasesComponent } from './Vistas/int-clases/int-clases.component';
import { IntHorAluComponent } from './Vistas/int-hor-alu/int-hor-alu.component';
import { IntraAdministrativoComponent } from './intranet-administrativo/intra-administrativo/intra-administrativo.component';

import { IntAsiPersonalComponent } from './intranet-administrativo/int-asi-personal/int-asi-personal.component';
import { IntAdmDocComponent } from './intranet-administrativo/int-adm-doc/int-adm-doc.component';
import { IntAdmNotasComponent } from './intranet-administrativo/int-adm-notas/int-adm-notas.component';
import { IntAnalisisNotasComponent } from './intranet-administrativo/int-analisis-notas/int-analisis-notas.component';
import { BimestreComponent } from './Componente/bimestre/bimestre.component';
import { PerfilDocenteComponent } from './intranet-docente/perfil-docente/perfil-docente.component';
import { IntranetMonitoreoComponent } from './intranet-administrativo/intranet-monitoreo/intranet-monitoreo.component';
import { TramiteComponent } from './Componente/tramite/tramite.component';
import { RevisarActividadesComponent } from './intranet-docente/revisar-actividades/revisar-actividades.component';
import { ApoderadoIntranetComponent } from './intranet-apoderado/apoderado-intranet/apoderado-intranet.component';
import { NuevaContraComponent } from './intranet-administrativo/nueva-contra/nueva-contra.component';
import { NuevaContraApoderadoComponent } from './intranet-apoderado/nueva-contra/nueva-contra.component';
import { NuevaContraDocenteComponent } from './intranet-docente/nueva-contra-docente/nueva-contra-docente.component';
import { NuevaContraAlumnoComponent } from './Vistas/nueva-contra-alumno/nueva-contra-alumno.component';
import { NoticiasComponent } from './Componente/noticias/noticias.component';
import { TutoriaComponent } from './intranet-docente/tutoria/tutoria.component';
import { HorarioComponent } from './intranet-administrativo/horario/horario.component';

const routes: Routes = [ 
  {path: '',component:HomeComponent},
  {path: 'apcrear',component:ApcrearComponent},
  {path: 'alumno_vista',component:AlumnoComponent},
  {path: 'personal',component:EmpleadoComponent},
  {path: 'detalle-alumno',component:DetalleAlumnoComponent},
  {path: 'cursos', component:CursoComponent},
  {path: 'clase_vista', component:ClaseComponent},
  {path: 'actividad_vista', component:ActividadPlanteadaComponent},
  {path: 'entregar_actividad',component:ActividadEntregadoComponent},
  {path: 'competencias', component:CompetenciaComponent},
  {path: 'det_com', component:DetalleCompetenciaComponent},
  {path: 'tutorvista', component:TutorComponent},
  {path: 'fichaa', component:FichaAsistenciaComponent},
  {path: 'informe', component:DetalleBimestreCompetenciaComponent},
  {path: 'registro/ahuxiliar', component:RegistroAhuxiliarComponent},
  {path: 'usuarios', component:UsuariosComponent},
  {path: 'login', component:LoginComponent},
  {path: 'bimestre', component:BimestreComponent},
  {path: 'nueva/contra', component:NuevaContraComponent},

  //rutas para la vista de componentes alumno
  {path: 'aula', component:IntAlumnoComponent},
  {path: 'areas', component: IntAreAluComponent},
  {path: 'asistencia', component: IntAsiAluComponent},
  {path: 'calificaciones', component: IntCalAluComponent},
  {path: 'clases/estudiante', component: IntClasesComponent},
  {path: 'ver/hor', component: IntHorAluComponent},
  {path: 'nueva/contra/alumno', component:NuevaContraAlumnoComponent},

  //rutas para la vista administrativo  
  {path: 'intra/personal', component:IntraAdministrativoComponent},
  {path: 'asispersonal', component: IntAsiPersonalComponent},
  {path: 'monitoreo', component:IntranetMonitoreoComponent},
  {path: 'admdoc', component:IntAdmDocComponent},
  {path: 'admnotas', component:IntAdmNotasComponent},
  {path: 'analinotas', component:IntAnalisisNotasComponent},
  {path: 'noticias', component: NoticiasComponent},
  {path: 'tramite', component:TramiteComponent},
  {path: 'horario', component:HorarioComponent},

  //rutas para intranet docente
  {path: 'intra/docente', component:PerfilDocenteComponent}, 
  {path: 'activi/entregados', component:RevisarActividadesComponent},
  {path: 'nueva/contra/docente', component:NuevaContraDocenteComponent},
  {path: 'tutoria', component:TutoriaComponent},
  {path: 'apo/intra', component:ApoderadoIntranetComponent},
  {path: 'nueva/contra/apoderado', component:NuevaContraApoderadoComponent}  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
