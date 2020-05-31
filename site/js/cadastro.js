function verificar(){
    var nickname = i_nickname.value;
    var email = i_email.value;
    var senha = i_senha.value;
    var senhaRepetida = i_senhaRepetida.value;


    if (nickname.trimStart().trimEnd().indexOf('') == 0){
        alert('Insira um nickname válido')
    }else if (email.indexOf("@") == -1 || email.indexOf(".com") == -1){
        alert('Digite um e-mail válido');
    }else if(senha == senhaRepetida){

        var contador = 0;

        while(contador < 9){
            if(senha.indexOf(contador) == -1) {
                alert('Senha Fraca. A senha deve conter um numero');
                break
          }
            contador++;
        }

    }else if (senha != senhaRepetida){
        alert('A senha está diferente da senha confirmada');
    }else {
        alert(`${nickname} aguarde o contato do adm por e-mail :)`);
    }
}