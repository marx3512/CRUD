const Database = require('../database/db');

class ShowOnlyOneStudent{
    constructor(body){
        this.body = body;
        this.errors = [];
    }

    async show(){
        this.valida();
        if(this.errors.length > 0) return;
        const db = await Database;
        var student = [];
        student = await db.all(`SELECT * FROM students WHERE id = ${this.body.campo} OR cpf = ${this.body.campo} OR rg = ${this.body.campo}`);
        return student;
    }

    valida(){
        if(this.body.campo == '') this.errors.push('Digite algo pra a busca funcionar');
        if(this.checkLetter(this.body.campo)) this.errors.push('Digite um CPF,RG ou ID para a busca funcionar');
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

module.exports = ShowOnlyOneStudent;