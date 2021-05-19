
function addStudent({id,nome,idade,endereco,cpf,rg}){
    const table = document.querySelector('.table');
    for(let i = 0; i < 6; i++){
        var variavel = document.createElement('p');
        document.body.insertBefore(variavel,table);
        table.appendChild(variavel);
        if(i == 0) variavel.appendChild(document.createTextNode(id));
        else if(i == 1) variavel.appendChild(document.createTextNode(nome));
        else if(i == 2) variavel.appendChild(document.createTextNode(idade));
        else if(i == 3) variavel.appendChild(document.createTextNode(endereco));
        else if(i == 4) variavel.appendChild(document.createTextNode(cpf));
        else if(i == 5) variavel.appendChild(document.createTextNode(rg));
    }
}

function add(){
    
    const dadoStudents = document.querySelectorAll('.table p');
    const opt = document.querySelector('#opcao').value;
    const campo = document.querySelector('#campo').value;
    let verificador = 0;
    
    dadoStudents.forEach((item) => {
        item.remove();
    })
    
    fetch('http://localhost:5500/TakeStudents')
    .then((response) => response.json())
    .then((data) => {
        for(let i = 0; i < data.length; i++){
            if(opt == 'id' && campo == data[i].id){
                verificador = 1;
                addStudent(data[i])
                break
            }
            else if(opt == 'nome' && campo == data[i].nome){
                verificador = 1;
                addStudent(data[i])
                break
            }
            else if(opt == 'idade' && campo == data[i].idade){
                verificador = 1;
                addStudent(data[i])
                break
            }
            else if(opt == 'endereco' && campo == data[i].endereco){
                verificador = 1;
                addStudent(data[i]);
                break
            } 
            else if(opt == 'cpf' && campo == data[i].cpf){
                verificador = 1;
                addStudent(data[i]);
                break
            } 
            else if(opt == 'rg' && campo == data[i].rg){
                verificador = 1;
                addStudent(data[i]);
                break
            } 
        }
    })
    .then(() => {
        if(verificador == 0){
            alert('Usuario não encontrado')
        } 
    })
}

const but = document.getElementById('busca');
but.onclick = add;
