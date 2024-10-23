
function cadastrarMusica() {
        //chamando os id em variavei
    let titulo = document.getElementById('titulo_m').value
    let artista = document.getElementById('artista_m').value
    let genero = document.getElementById('genero_m').value
    let duracao = document.getElementById('duracao_m').value
    let link = document.getElementById('link_m').value

    //pegando dados dos usuarios na localstorage ou criando lista vazia caso nao tenha dados armazenados
    let listaMuscia = JSON.parse(localStorage.getItem('usuario')) || []

    //validando confirmar email e confirmar senha


    //verificando se o email ja foi usado para algum cadastro
    let musicaExistente = listaMuscia.find(listaMuscia => usuario.titulo === titulo)
    if(musicaExistente){
        document.getElementById('mensagem').innerText = 'Musica ja cadastrada'
        return
    }

    //criando um objeto usuario para colocar na lista de usuarios
    let novoUsuario = {
        id: Date.now(),
        nome: name,
        email: email,
        senha: btoa(password),  //salvando a senha com criptografia 
        
    }

    //colocar o objeto novoUsuario no fim da lista de usuarios
    usuarios.push(novoUsuario)

    //salvar na localSotrage
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    
    
} 
