import { ActividadEntregado } from "../ActividaEntregado/actividad-entregado";
import { DetalleCompetencia } from "../DetalleCompetencia/detalle-competencia";

export class ResultadoActividad {    

    idresultado:Number;
    fecha:Date;
    detallecompetencia:DetalleCompetencia;
    actividadentregado:ActividadEntregado;
    nota:Number;

    iddetallecompetencia:Number;
    idactividadentregado:Number;
    iddetallealumno:Number;
    nombre_alumno:String;
    apellidos_alumno:String;

    constructor(idresultado:Number,fecha:Date, actividadentregado:ActividadEntregado,nota:Number){

        this.idresultado = idresultado;
        this.fecha = fecha;      
        this.actividadentregado = actividadentregado;
        this.nota = nota;

    }
    
}
