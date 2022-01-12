import { Alumno } from "../Alumno/alumno";
import { Bimestre } from "../Bimestre/bimestre";
import { DetalleCompetencia } from "../DetalleCompetencia/detalle-competencia";

export class DetalleBimestreCompetencia {
    iddetallebc:Number;
    alumno:Alumno;
    bimestre:Bimestre;
    notabimestral:Number;
    aliasnota:String;
    fecha:Date;
    descripcion:String;
    detallecompetencias:Array<DetalleCompetencia>;
}
