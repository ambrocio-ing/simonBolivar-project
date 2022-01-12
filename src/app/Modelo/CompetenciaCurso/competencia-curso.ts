import {Competencia} from 'src/app/Modelo/Competencia/competencia';
import {Curso} from 'src/app/Modelo/Curso/curso';

export class CompetenciaCurso {

    idcompetenciacurso:Number;
    competencia:Competencia;
    curso:Curso;
    
    constructor(idcompetenciacurso:Number,competencia:Competencia,curso:Curso){
        this.idcompetenciacurso = idcompetenciacurso;
        this.competencia = competencia;
        this.curso = curso;
    }

}
