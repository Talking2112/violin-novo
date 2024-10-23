//funcao que verifica se o usuario esta logado no sistema, se nao tiver, ele direciona para pagina de login

function verificaUsuario(){
    let usuarioLogado = sessionStorage.getItem('usuarioLogado')
    if (usuarioLogado){
        alert("Favor efetuar o login")
        window.location.href = 'index.html'
    }
        window.onload = function(){
        verificaUsuario()
    }
}

function logOut() {
    sessionStorage.removeItem('usuarioLogado')
    console.log('usuario deslogado')
    window.location.href
}

