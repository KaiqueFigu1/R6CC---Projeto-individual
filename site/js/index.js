function verificar() {
    var nickname = i_nickname.value;
    var email = i_email.value;
    var senha = i_senha.value;
    var senhaRepetida = i_senhaRepetida.value;


    if (nickname.trimStart().trimEnd().indexOf('') == 0 || nickname.indexOf(' ') != -1) {
        alert('Insira um nickname válido')
    } else if (email.indexOf("@") == -1 || email.indexOf(".com") == -1) {
        alert('Digite um e-mail válido');
    } else if (senha == senhaRepetida) {

        var contador = 0;

        while (contador < 9) {
            if (senha.indexOf(contador) == -1) {
                alert('Senha Fraca. A senha deve conter um numero');
                break
            }
            contador++;
        }

    } else if (senha != senhaRepetida) {
        alert('A senha está diferente da senha confirmada');
    } else {
        alert(`${nickname} aguarde o contato da nossa equipe por e-mail :)`);
    }
}

function entrar() {
    if (email.indexOf("@") == -1 || email.indexOf(".com") == -1) {
        alert('Digite um e-mail válido');
    } else {
        alert('Bem vindo!')
    }
}

function buscar() {
    let mapPool = {
        mapa0: "Consulado",
        mapa1: "Fronteira",
        mapa2: "Casa de campo",
        mapa3: "Litoral",
        mapa4: "Café Dostoyevsky",
        mapa5: "Parque Temático",
        mapa6: "Mansão"
    }
    let num = parseInt(Math.random() * 7);
    let mapaSorteado = mapPool['mapa' + num];

    lmapas.innerHTML = '';

    if (num == 0) {
        lmapas.innerHTML =
            `Mapa sorteado: <br>
        <li class="item">
            <img src="img/mapas/consulado.jpg">
            <div class="caixa">Consulado</div>
        </li>`
    } else if (num == 1) {
        lmapas.innerHTML =
            `Mapa sorteado: <br>
        <li class="item">
            <img src="img/mapas/fronteira.jpg">
            <div class="caixa">Fronteira</div>
        </li>`
    } else if (num == 2) {
        lmapas.innerHTML =
            `Mapa sorteado: <br>
        <li class="item">
            <img src="img/mapas/campo.jpg">
            <div class="caixa">Casa de campo</div>
        </li>`
    } else if (num == 3) {
        lmapas.innerHTML =
            `Mapa sorteado: <br>
        <li class="item">
            <img src="img/mapas/litoral.jpg">
            <div class="caixa">Litoral</div>
        </li>`
    } else if (num == 4) {
        lmapas.innerHTML =
            `Mapa sorteado: <br>
        <li class="item">
            <img src="img/mapas/cafe.jpg">
            <div class="caixa">Café Dostoyevsky</div>
        </li>`
    } else if (num == 5) {
        lmapas.innerHTML =
            `Mapa sorteado: <br>
        <li class="item">
            <img src="img/mapas/parque.jpg">
            <div class="caixa">Parque Temático</div>
        </li>`
    } else {
        lmapas.innerHTML =
            `Mapa sorteado: <br>
        <li class="item">
            <img src="img/mapas/mansao.jpg">
            <div class="caixa">Mansão</div>
        </li>`
    }
}