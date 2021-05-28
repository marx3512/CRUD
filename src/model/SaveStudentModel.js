const Database = require('../database/db');
const saveStudentMethod = require('../database/saveStudent');

class Save{
    constructor(body){
        this.body = body;
        this.errors = [];
    }

    async register(data){
        this.valida(data);
        if(this.errors.length > 0) return;
        const db = await Database;
        try {
            await saveStudentMethod(db, this.body);
        } catch (error) {
            console.log(error)
        }
    }

    valida(data){
        for(const student of data){
            if(student.cpf == this.body.cpf) this.errors.push('CPF ja cadastrado');
            else if(student.rg == this.body.rg) this.errors.push('RG ja esta cadastrado');
        }
        for(const key in this.body){
            if(this.body[key] == ''){
                this.errors.push('Todos os campos devem ser preenchidos');
                break;
            } 
        }
        if(!this.checkCPF(this.body.cpf) || this.body.cpf.length <= 2) this.errors.push('Digite um CPF valido');
        
        if(this.checkRG(this.body.rg) || this.body.rg.length <= 4) this.errors.push('Digite um RG valido');
    }

    checkCPF(strCPF){
        var Soma;
        var Resto;
        Soma = 0;
      if (strCPF == "00000000000") return false;
    
      for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
    
      Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
    }

    checkRG(RG){
        var alfabeto = "abcdefghijklmnopqrstuwxyz";
        var codigosm = [];
        var codigosM = [];
        for(let i = 0; i < alfabeto.length; i++){
            codigosm.push(alfabeto[i])
            codigosM.push(alfabeto[i].toUpperCase())
        }
        for(let i = 0; i < RG.length; i++){
            for(let j = 0; j < codigosm.length; j++){
                if(RG[i] == codigosm[j] || RG[i] == codigosM[j]){
                    condicao = 1
                    return true
                }
            }
        }
        return false
    }
}

module.exports = Save;