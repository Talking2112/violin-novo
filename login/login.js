function login(event) {
    // Prevenindo o comportamento padrão do formulário
    event.preventDefault();

    // Pegando os valores inseridos nos campos de e-mail e senha
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;

    // Pegando os usuários armazenados no localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuario')) || [];

    // Verificando se o e-mail e a senha são válidos
    let usuario = usuarios.find(usuario => usuario.email === email && usuario.senha === btoa(password)); // btoa para comparar com a senha armazenada

    if (usuario) {
        // Se o usuário for encontrado, redireciona para a página homeajust.html
        window.location.href = '/Home/homeajust.html';
    } else {
        // Se o login falhar, exibe uma mensagem de erro
        document.getElementById('mensagem').innerText = 'E-mail ou senha incorretos.';
    }
}
