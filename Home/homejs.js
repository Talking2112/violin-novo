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

    elementoPlaylist.appendChild(tituloPlaylist);
    elementoPlaylist.appendChild(listaMusicasPlaylist);
    elementoPlaylist.appendChild(botaoAdicionarMusica);

    listaPlaylistsElement.appendChild(elementoPlaylist);
}

// Função para adicionar músicas à playlist
function adicionarMusicaNaPlaylist(playlistId) {
    const playlist = playlists.find(p => p.id === playlistId);
    const musicaSelecionada = prompt(
        `Escolha uma música para adicionar à playlist "${playlist.nome}":\n` +
        listaMusica.map((musica, index) => `${index + 1}. ${musica.titulo}`).join('\n')
    );

    const musicaIndex = parseInt(musicaSelecionada) - 1;

    if (musicaIndex >= 0 && musicaIndex < listaMusica.length) {
        playlist.musicas.push(listaMusica[musicaIndex]);
        localStorage.setItem('playlists', JSON.stringify(playlists));
        atualizarPlaylistsUI();
    } else {
        alert('Seleção inválida. Tente novamente.');
    }
}

// Atualiza a UI de playlists
function atualizarPlaylistsUI() {
    listaPlaylistsElement.innerHTML = '';
    playlists.forEach(playlist => criarElementoPlaylist(playlist));
}
