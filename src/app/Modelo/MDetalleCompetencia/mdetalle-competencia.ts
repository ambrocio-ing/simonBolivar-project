import { OtraCalificacion } from "../OtraCalificacion/otra-calificacion";
import { ResultadoActividad } from "../ResultadoActividad/resultado-actividad";

export class MdetalleCompetencia {
    iddetallecompetencia:Number;
    fecha:Date;
    nombre_alumno:String;
    nombre_competencia:String;
    nota:Number;
    alias:String;
    descripcion:String;
    nombre_bimestre:String;
    resultadoactividades:Array<ResultadoActividad>;
    otrascalificaciones:Array<OtraCalificacion>;
    mensaje:String;   

    
}
