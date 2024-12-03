document.addEventListener('DOMContentLoaded', function () {
    const perfilContainer = document.getElementById('perfil-container');

    // Recupera o ID do usuário logado
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const usuarios = JSON.parse(localStorage.getItem('usuario')) || [];

    if (usuarioLogado) {
        // Encontra o usuário logado
        const usuario = usuarios.find(user => user.id === parseInt(usuarioLogado));

        if (usuario) {
            // Exibe as informações do usuário
            document.getElementById('user-info').innerHTML = `
                <strong>Nome:</strong> ${usuario.nome}<br>
                <strong>E-mail:</strong> ${usuario.email}
            `;
        } else {
            // Caso o usuário não seja encontrado, limpa o estado de login e redireciona
            localStorage.removeItem('usuarioLogado');
            window.location.href = '/login/login.html';
        }
    } else {
        // Se o estado de login não existir, redireciona para a página de login
        window.location.href = '/login/login.html';
    }
});
