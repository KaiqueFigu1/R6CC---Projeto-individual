function validation(){

    showGif()

    let userData = {
        email: document.getElementById('email').value,
        nick: document.getElementById('nick').value,
        password: document.getElementById('password').value
    }

    console.log('Validando dados do usuário')


    if(userData.email.search('@') != -1){
        console.log('Email ok')
        if(userData.password.length >= 8){
            console.log('Password ok')
            

        }else{
            console.log('Invalid password')
        }
    }else{
        console.log('Invalid email')
    }
      
}

function showGif(){
    let waitGif = document.getElementById('wait')
    waitGif.style.display = 'block'
}

function closeGif(){
    let waitGif = document.getElementById('wait')
    waitGif.style.display = 'none'
}