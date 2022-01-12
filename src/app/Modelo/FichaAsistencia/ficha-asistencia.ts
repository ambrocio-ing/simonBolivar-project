import { Clase } from "../Clase/clase";
import { DetalleAlumno } from "../DetalleAlumno/detalle-alumno";

export class FichaAsistencia {

    idfichaasistencia:Number;
    clase:Clase;
    detallealumno:DetalleAlumno;
    fecha:Date;
    condicion:String;
    observacion:String;

}
