const but = document.getElementById('busca');
but.onclick = add;

function validate(){
   const optionsValue = document.getElementById('opcao').value;
   const camp = document.getElementById('variavel');
   camp.value = optionsValue;
}