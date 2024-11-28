function login() {
    // Obtendo os valores dos campos de email e senha
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;

    // Pegando os usuários armazenados no localStorage ou criando uma lista vazia se não houver dados
    let usuarios = JSON.parse(localStorage.getItem('usuario')) || [];

    // Procurando o usuário no localStorage com o email e senha fornecidos
    let usuario = usuarios.find(usuario => usuario.email === email && atob(usuario.senha) === password);

    // Verifique se o login foi bem-sucedido
    if (usuario) {
        // Armazenando o usuário logado no sessionStorage
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));

        // Exibe o redirecionamento para debugar o redirecionamento
        console.log("Login bem-sucedido! Redirecionando para home/homeajust.html");

        // Redirecionando para a página homeajust.html após o login bem-sucedido
        window.location.href = "/Home/homeajust.html";  // Caminho absoluto (ajustado para seu servidor)
    } else {
        // Exibindo mensagem de erro caso email ou senha estejam incorretos
        document.getElementById('mensagem').innerText = 'Email ou senha incorretos';
        return false; // Evita o envio do formulário
    }
}
