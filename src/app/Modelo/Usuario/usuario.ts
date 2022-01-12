import { Empleado } from "../Empleado/empleado";
import { Role } from "../Role/role";

export class Usuario {

    idusuario:Number;
    username:String;
    password:String;
    empleado:Empleado;
    roles:Role[] = [];
}
