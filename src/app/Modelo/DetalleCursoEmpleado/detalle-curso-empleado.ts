import { Curso } from "../Curso/curso";
import { Empleado } from "../Empleado/empleado";
import { Grado } from "../Grado/grado";
import { Seccion } from "../Seccion/seccion";

export class DetalleCursoEmpleado {
    iddetalle_ce:Number;
    fecha:Date;
    curso:Curso;
    empleado:Empleado;
    grado:Grado;
    seccion:Seccion;
    estado:String;
}
