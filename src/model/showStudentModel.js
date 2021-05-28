const Database = require('../database/db');

class Show{
    constructor(body){
        this.body = body;
        this.errors = [];
    }

    async show(){
        this.valida();
        if(this.errors.length > 0) return;
        const db = await Database;
        var allStudents = [];

        if(this.body.variavel == 'nome' || this.body.variavel == 'endereco'){
            allStudents = await db.all(`SELECT * FROM students WHERE ${this.body.variavel} LIKE '%${this.body.campo}%'`);
            return allStudents;
        }

        allStudents = await db.all(`SELECT * FROM students WHERE ${this.body.variavel} = ${this.body.campo}`);
        return allStudents;
    }

    valida(){
        if(this.body.campo == '') this.errors.push('Digite algo pra a busca funcionar');
        if(this.body.variavel != 'nome' && this.body.variavel != 'endereco'){
            if(this.checkLetter(this.body.campo)) this.errors.push('Digite um numero quando for procurar por ID,IDADE,CPF ou RG');
        }
    }

    checkLetter(campo){
        var alfabeto = "abcdefghijklmnopqrstuwxyz";
        var codigosm = [];
        var codigosM = [];
        for(let i = 0; i < alfabeto.length; i++){
            codigosm.push(alfabeto[i])
            codigosM.push(alfabeto[i].toUpperCase())
        }
        for(let i = 0; i <(campo.length); i++){
            for(let j = 0; j < codigosm.length; j++){
                if(campo[i] == codigosm[j] ||(campo[i] == codigosM[j])){
                    return true;
                }
            }
        }
        return false;
    }
}

module.exports = Show;