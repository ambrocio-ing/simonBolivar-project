import { Alumno } from "../Alumno/alumno";
import { Grado } from "../Grado/grado";
import { Seccion } from "../Seccion/seccion";

export class DetalleAlumno {   

    iddetalle_alumno:Number;
    periodo:Date;
    alumno:Alumno;
    grado:Grado;
    seccion:Seccion;

    constructor(iddetalle_alumno:Number, periodo:Date, alumno:Alumno, grado:Grado, seccion:Seccion){

        this.iddetalle_alumno = iddetalle_alumno;
        this.periodo = periodo;
        this.alumno = alumno;
        this.grado = grado;
        this.seccion = seccion;

    }
    
    //nombre_alumno:String;
    //nombre_grado:String;
    //nombre_seccion:String;

    

    /*
    +------------------+---------+------+-----+---------+----------------+
    | Field            | Type    | Null | Key | Default | Extra          |
    +------------------+---------+------+-----+---------+----------------+
    | iddetalle_alumno | int(11) | NO   | PRI | NULL    | auto_increment |
    | periodo_lectivo  | date    | NO   |     | NULL    |                |
    | idalumno         | int(11) | NO   | MUL | NULL    |                |
    | idgrado          | int(11) | NO   | MUL | NULL    |                |
    | idseccion        | int(11) | NO   | MUL | NULL    |                |
    +------------------+---------+------+-----+---------+----------------+

    */
}
