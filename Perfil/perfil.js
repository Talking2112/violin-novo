// Verifica se o usuário está logado
document.addEventListener('DOMContentLoaded', function () {
    const perfilContainer = document.getElementById('perfil-container');

    const usuarios = JSON.parse(localStorage.getItem('usuario')) || [];
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (usuarioLogado) {
        const usuario = usuarios.find(user => user.id === parseInt(usuarioLogado));

        if (usuario) {
            // Exibe as informações do usuário
            document.getElementById('user-info').innerHTML = `
                <strong>Nome:</strong> ${usuario.nome}<br>
                <strong>E-mail:</strong> ${usuario.email}
            `;
        } else {
            perfilContainer.innerHTML = '<p>Usuário não encontrado.</p>';
        }
    } else {
        // Redireciona se não estiver logado
        window.location.href = '/login.html';
    }
});
