import { Masistencia } from "../MAsistencia/masistencia";
import { McompetenciaNotas } from "../MCompetenciaNotas/mcompetencia-notas";

export class Mcursos {

    idcurso:Number;
    codigo:String;
    nombre:String;
    descripcion:String;
    comnotas:Array<McompetenciaNotas>;  
    asistencias:Masistencia[];
}
