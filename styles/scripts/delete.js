
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

function addStyle(){
    const excluir = document.getElementById('excluir');
    excluir.style.cursor = 'pointer';
    excluir.style.opacity = '1';
}

function cell(valor,nome){
    const cell = document.querySelector('#' + nome)
    const form = document.querySelector('#' + nome + "Form")
    cell.innerHTML = nome.toUpperCase() + nome.slice(1) + ' :' + nome
    form.value = valor
}

function addStudent({id,nome,idade,endereco,cpf,rg}){
    const h2 = document.querySelectorAll('.Caixa h2')
    const form = document.querySelectorAll('form input')
    for(let i = 0; i < 6; i++){
        if(i == 0){
            h2[i].innerHTML = 'Id: ' + id
            form[i].value = id
        }
        else if(i == 1){
            h2[i].innerHTML = 'Nome: ' + nome
            form[i].value = nome
        }
        else if(i == 2){
            h2[i].innerHTML = 'Idade: ' + idade
            form[i].value = idade
        }
        else if(i == 3){
            h2[i].innerHTML = 'Endereço: ' + endereco
            form[i].value = endereco
        }
        else if(i == 4){
            h2[i].innerHTML = 'Cpf: ' + cpf
            form[i].value = cpf
        }
        else if(i == 5){
            h2[i].innerHTML = 'Rg: ' + rg
            form[i].value = rg
        }
    }
}

function add(){
    
    const campo = document.querySelector('#campo').value;
    condicao = 0

    if(VerificarLetras(campo)){
        condicao = 1
        alert('Digite um CPF, RG ou ID para iniciar a busca')
    }

    fetch('http://localhost:5500/TakeStudents')
    .then((response) => response.json())
    .then((data) => {
        for(let i = 0; i < data.length; i++){
            if(campo == data[i].id){
                addStudent(data[i])
                addStyle()
                condicao = 1
                break
            }
            else if(campo == data[i].cpf){
                addStudent(data[i])
                addStyle()
                condicao = 1
                break
            } 
            else if(campo == data[i].rg){
                addStudent(data[i])
                addStyle()
                condicao = 1
                break
            }
            
        }
        if(condicao == 0){
            alert('Não foi encontrado um aluno com esse dado')
        }
    })
    .then(() => {
        if(campo == '') alert('Digite um CPF, RG ou ID valido para iniciar a busca')

        else{
            buttonExcluir.disabled = false
        }
    })
}

function validate(){
    if(condicao = 1) alert('Cadastro excluido com sucesso')
}

let condicao = 0

//Variavel botão excluir
const buttonExcluir = document.getElementById("excluir");
buttonExcluir.disabled = true

//Variavel botão buscar
const but = document.getElementById('busca');
but.onclick = add;