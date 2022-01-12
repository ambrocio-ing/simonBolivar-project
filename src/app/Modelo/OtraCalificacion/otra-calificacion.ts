import { DetalleAlumno } from "../DetalleAlumno/detalle-alumno";
import { DetalleCompetencia } from "../DetalleCompetencia/detalle-competencia";

export class OtraCalificacion {

    idotracalificacion:Number;
    detallecompetencia:DetalleCompetencia;
    detallealumno:DetalleAlumno;
    nombre:String;
    fecha:Date;
    nota:Number;

    iddetallealumno:Number;
    nombre_alumno:String;
    apellidos_alumno:String;

    constructor(idotracalificacion:Number,detallealumno:DetalleAlumno,nombre:String,fecha:Date,nota:Number){
        this.idotracalificacion = idotracalificacion;
        this.detallealumno = detallealumno;
        this.nombre = nombre;
        this.fecha = fecha;
        this.nota = nota;
    }
}