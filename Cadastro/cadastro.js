function cadastrarUsuario() {
    // Chamando os IDs em variáveis
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let confirmEmail = document.getElementById('confirm-email').value;  // Adicionado confirm-email
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm-password').value;  // Corrigido ID do campo

    // Pegando dados dos usuários na localStorage ou criando lista vazia caso não tenha dados armazenados
    let usuarios = JSON.parse(localStorage.getItem('usuario')) || [];

    // Validando confirmar e-mail e confirmar senha
    if (email !== confirmEmail) {
        document.getElementById('mensagem').innerText = 'Emails estão diferentes';
        return;
    }
    if (password !== confirmPassword) {
        document.getElementById('mensagem').innerText = 'Senhas estão diferentes';
        return;
    }

    // Verificando se o email já foi usado para algum cadastro
    let usuarioExistente = usuarios.find(usuario => usuario.email === email);
    if (usuarioExistente) {
        document.getElementById('mensagem').innerText = 'E-mail já cadastrado';
        return;
    }

    // Criando um objeto usuário para colocar na lista de usuários
    let novoUsuario = {
        id: Date.now(),
        nome: name,
        email: email,
        senha: btoa(password),  // Importante: Use uma abordagem de segurança mais robusta para senhas
        playlists: []
    };

    // Colocando o objeto novoUsuario no fim da lista de usuários
    usuarios.push(novoUsuario);

    // Salvando na localStorage
    localStorage.setItem('usuario', JSON.stringify(usuarios));  // Corrigido nome do item

    // Exibindo mensagem de sucesso
    document.getElementById('mensagem').innerText = 'Cadastro realizado com sucesso!';

    // Redirecionando para a página de login
    setTimeout(() => {
        window.location.href = '/login/login.html';  // Redireciona após 2 segundos
    }, 2000); // O tempo de 2 segundos (2000ms) é para dar tempo do usuário ver a mensagem de sucesso
}
