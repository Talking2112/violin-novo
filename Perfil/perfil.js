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

// Elementos do DOM
const formCriarPlaylist = document.getElementById('form_criar_playlist');
const listaPlaylistsElement = document.getElementById('lista_playlists');

// Recupera as playlists do LocalStorage
let playlists = JSON.parse(localStorage.getItem('playlists')) || [];

// Exibe as playlists salvas no carregamento da página
playlists.forEach(playlist => {
    criarElementoPlaylist(playlist);
});

// Evento para criar uma nova playlist
formCriarPlaylist.addEventListener('submit', function (event) {
    event.preventDefault();

    const nomePlaylist = document.getElementById('nome_playlist').value.trim();

    if (!nomePlaylist) {
        alert('O nome da playlist não pode estar vazio.');
        return;
    }

    const novaPlaylist = {
        id: Date.now(), // ID único baseado no timestamp
        nome: nomePlaylist,
        musicas: [] // Inicialmente, a playlist não tem músicas
    };

    playlists.push(novaPlaylist);
    localStorage.setItem('playlists', JSON.stringify(playlists));

    criarElementoPlaylist(novaPlaylist);

    // Limpa o formulário
    formCriarPlaylist.reset();
});

// Função para criar o elemento de uma playlist
function criarElementoPlaylist(playlist) {
    const elementoPlaylist = document.createElement('li');
    elementoPlaylist.className = 'item_playlist';

    const tituloPlaylist = document.createElement('p');
    tituloPlaylist.textContent = playlist.nome;

    const listaMusicasPlaylist = document.createElement('ul');
    listaMusicasPlaylist.className = 'musicas_playlist';
    playlist.musicas.forEach(musica => {
        const musicaItem = document.createElement('li');
        musicaItem.textContent = musica.titulo;
        listaMusicasPlaylist.appendChild(musicaItem);
    });

    // Botão para adicionar músicas à playlist
    const botaoAdicionarMusica = document.createElement('button');
    botaoAdicionarMusica.textContent = 'Adicionar Música';
    botaoAdicionarMusica.addEventListener('click', function () {
        adicionarMusicaNaPlaylist(playlist.id);
    });

    // Botão para deletar a playlist
    const botaoDeletarPlaylist = document.createElement('button');
    botaoDeletarPlaylist.textContent = 'Deletar Playlist';
    botaoDeletarPlaylist.addEventListener('click', function () {
        deletarPlaylist(playlist.id);
    });

    elementoPlaylist.appendChild(tituloPlaylist);
    elementoPlaylist.appendChild(listaMusicasPlaylist);
    elementoPlaylist.appendChild(botaoAdicionarMusica);
    elementoPlaylist.appendChild(botaoDeletarPlaylist);

    listaPlaylistsElement.appendChild(elementoPlaylist);
}

// Função para adicionar músicas à playlist
function adicionarMusicaNaPlaylist(playlistId) {
    // Recupera a lista de músicas do LocalStorage
    const listaMusica = JSON.parse(localStorage.getItem('musicas') || "[]");
    const playlist = playlists.find(p => p.id === playlistId);

    if (!playlist) {
        alert("Playlist não encontrada.");
        return;
    }

    // Cria a interface para o usuário selecionar uma música
    let musicaSelecionada = prompt(
        `Escolha uma música para adicionar à playlist "${playlist.nome}":\n` +
        listaMusica.map((musica, index) => `${index + 1}. ${musica.titulo}`).join('\n')
    );

    const musicaIndex = parseInt(musicaSelecionada) - 1;

    if (musicaIndex >= 0 && musicaIndex < listaMusica.length) {
        const musica = listaMusica[musicaIndex];
        playlist.musicas.push(musica);
        localStorage.setItem('playlists', JSON.stringify(playlists));
        atualizarPlaylistsUI();
    } else {
        alert('Seleção inválida. Tente novamente.');
    }
}

// Função para atualizar a UI das playlists
function atualizarPlaylistsUI() {
    listaPlaylistsElement.innerHTML = '';
    playlists.forEach(playlist => criarElementoPlaylist(playlist));
}

// Função para deletar a playlist
function deletarPlaylist(playlistId) {
    // Confirmação de deleção
    if (confirm('Você tem certeza que deseja deletar esta playlist?')) {
        // Filtra a playlist que será deletada
        playlists = playlists.filter(playlist => playlist.id !== playlistId);
        localStorage.setItem('playlists', JSON.stringify(playlists));

        // Atualiza a interface
        atualizarPlaylistsUI();
    }
}
