import { ActividadPlanteado } from "../Actividad/actividad";
import { DetalleAlumno } from "../DetalleAlumno/detalle-alumno";

export class ActividadEntregado {

    idactividadentregado:Number;
    archivo:String;
    descripcion:String;
    fecha_entrega:Date;    
    detallealumno:DetalleAlumno;
    actividad:ActividadPlanteado;

}
