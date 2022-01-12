import { ActividadPlanteado } from "../Actividad/actividad";
import { DetalleCursoEmpleado } from "../DetalleCursoEmpleado/detalle-curso-empleado";


export class Clase {

    idclase:Number;
    dce:DetalleCursoEmpleado;
    tema:String;
    documento1:String;
    documento2:String;
    documento3:String;
    fecha:Date;
    descripcion:String;
    link_url:String;
    link_clase:String;        
    actividades:Array<ActividadPlanteado>;
}
