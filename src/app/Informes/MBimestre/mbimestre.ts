import { Mcalificaciones } from "../MCalificaciones/mcalificaciones";

export class Mbimestre {

    idbimestre:Number;
    nombre:String;
    descripcion:String;
    fecha_inicio:Date;
    fecha_fin:Date;
    calificaciones:Array<Mcalificaciones>;

}
