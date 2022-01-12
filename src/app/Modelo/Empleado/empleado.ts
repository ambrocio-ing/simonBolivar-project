import { Especialidad } from "../Especialidad/especialidad";

export class Empleado {

    idempleado:Number;
    dni:String;
    nombre:String;
    apellidos:String;
    genero:String;
    fecha_nac:Date;
    estado_civil:String;
    foto:String;
    direccion:String;
    telefono:String;    
    cv:String;
    estado:String;    
    especialidad:Especialidad;

    /*
    +--------------------+--------------+------+-----+---------+----------------+
    | Field              | Type         | Null | Key | Default | Extra          |
    +--------------------+--------------+------+-----+---------+----------------+
    | idempleado         | int(11)      | NO   | PRI | NULL    | auto_increment |
    | dni_empleado       | varchar(8)   | NO   | UNI | NULL    |                |
    | nombre_empleado    | varchar(50)  | NO   |     | NULL    |                |
    | apellidos_empleado | varchar(50)  | NO   |     | NULL    |                |
    | sexo_empleado      | varchar(1)   | NO   |     | NULL    |                |
    | fecha_nacimiento   | date         | NO   |     | NULL    |                |
    | estado_civil       | varchar(20)  | NO   |     | NULL    |                |
    | foto_empleado      | varchar(150) | YES  |     | NULL    |                |
    | direccion_empleado | varchar(150) | YES  |     | NULL    |                |
    | telefono_empleado  | varchar(9)   | YES  |     | NULL    |                |
    | acceso_empleado    | varchar(20)  | YES  |     | NULL    |                |
    | contra_empleado    | varchar(20)  | YES  | UNI | NULL    |                |
    | cv_empleado        | varchar(150) | YES  |     | NULL    |                |
    | estado_empleado    | varchar(20)  | NO   |     | NULL    |                |
    | idespecialidad     | int(11)      | NO   | MUL | NULL    |                |    
    +--------------------+--------------+------+-----+---------+----------------+

    */
}
