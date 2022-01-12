import { CompetenciaCurso } from "../CompetenciaCurso/competencia-curso";
import { DetalleCursoEmpleado } from "../DetalleCursoEmpleado/detalle-curso-empleado";
import { OtraCalificacion } from "../OtraCalificacion/otra-calificacion";
import { ResultadoActividad } from "../ResultadoActividad/resultado-actividad";
import { PeriodoCalificacion } from "../PeriodoCalificacion/periodo-calificacion";
import { Bimestre } from "../Bimestre/bimestre";

export class DetalleCompetencia {

    iddetallecompetencia:Number;
    fecha:Date;
    competenciacurso:CompetenciaCurso;
    dce:DetalleCursoEmpleado;
    periodo:PeriodoCalificacion;
    bimestre:Bimestre;
    nota:Number;
    alias:String;
    descripcion:String;    
    resultadoactividades:Array<ResultadoActividad>;
    otrascalificaciones:Array<OtraCalificacion>;    
}
