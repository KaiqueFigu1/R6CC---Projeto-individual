async function validation(){
    
    const bt = document.getElementById('submit-btn')
    bt.disabled = true

    showGif()

    const userData = {
        email: document.getElementById('email').value,
        nick: document.getElementById('nick').value,
        password: document.getElementById('password').value
    }

    console.log('Validando dados do usuário')

    if(userData.email.search('@') != -1 && userData.email.search('.com') != -1){
        console.log('Email ok')
        if(userData.password.length >= 8){
            console.log('Password ok')

            await fetchSingup(userData)
        }else{
            console.log('Invalid password')
        }
    }else{
        console.log('Invalid email')
    }
      
    bt.disabled = false
    closeGif()
}

function showGif(){
    let waitGif = document.getElementById('wait')
    waitGif.style.display = 'block'
}

function closeGif(){
    let waitGif = document.getElementById('wait')
    waitGif.style.display = 'none'
}

function fetchSingup(userData){
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }

    fetch('/user/singup', options)
    .then(r => r.json())
    .then(res => {
        setAlert(res)
    })
}

function setAlert(res){

    const alert = document.getElementById('alert')

    if(res.status == 'ok'){
        
        alert.innerHTML = ''
        alert.style.display = 'block'

        const h2 = document.createElement('h2')
        const p = document.createElement('p')
        const content = document.createTextNode('Sua conta foi criado com succeso volte para tela de ')
        const a = document.createElement('a')
        const link = document.createTextNode('login')

        a.appendChild(link)
        a.href = '/login'

        h2.appendChild(document.createTextNode('Deu Bom!'))
        p.appendChild(content)
        p.appendChild(a)

        alert.appendChild(h2)
        alert.appendChild(p)
        alert.style.backgroundColor = '#50ff24'
    } else {

        alert.innerHTML = ''
        alert.style.display = 'block'

        const h2 = document.createElement('h2')
        const p = document.createElement('p')

        let content = document.createTextNode(`O nome de usuário ou email ${res.errors[0].value} já existe`);        

        h2.appendChild(document.createTextNode('Deu Ruim!'))
        p.appendChild(content)

        alert.appendChild(h2)
        alert.appendChild(p)
        alert.style.backgroundColor = '#ff3b3b'
    }
}