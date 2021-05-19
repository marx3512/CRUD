function VerificarLetras(campo){
    var alfabeto = "abcdefghijklmnopqrstuwxyz";
    var codigosm = [];
    var codigosM = [];
    for(let i = 0; i < alfabeto.length; i++){
        codigosm.push(alfabeto[i])
        codigosM.push(alfabeto[i].toUpperCase())
    }
    for(let i = 0; i < campo.length; i++){
        for(let j = 0; j < codigosm.length; j++){
            if(campo[i] == codigosm[j] || campo[i] == codigosM[j]){
                condicao = 1
                return true
            }
        }
    }
    return false
}

function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

function validate(event){
    const cpf = document.querySelector('#CPF').value;
    const rg = document.querySelector('#RG').value;
    let condicao = 0;

    if(VerificarLetras(rg)){
        event.preventDefault()
        alert('Digite um rg valido')
        condicao = 1
    }
    
    if(cpf.length <= 2 || TestaCPF(cpf) == false){
        event.preventDefault();
        alert('Digite um cpf valido')
        condicao = 1
    }
    else if(rg.length <= 4){
        event.preventDefault()
        alert('Digite um rg valido')
        condicao = 1
    }

    for(let i = 0; i < sessionStorage.length; i++){
        if(cpf == sessionStorage.getItem('CPF'+i)){
            event.preventDefault()
            condicao = 1
            alert('CPF ja esta cadastrado')
            break
        }
        else if(rg == sessionStorage.getItem('RG'+i)){
            event.preventDefault()
            condicao = 1
            alert('RG ja esta cadastrado')
            break
        }
    }
    if(condicao == 0){
        alert('Cadastro feito com sucesso');
    }
}

fetch('http://localhost:5500/TakeStudents')
    .then((response) => response.json())
    .then((data) => {
        for(let i = 0; i < data.length; i++){
            sessionStorage.setItem('CPF'+i,data[i].cpf)
            sessionStorage.setItem('RG'+i,data[i].rg)
        }
    })
