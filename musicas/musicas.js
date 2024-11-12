const formCadastroMusica = document.getElementById('form_cadastro_musica');
const listaMusicaElement = document.getElementById('lista_m');

// Pega a lista de músicas do LocalStorage
let listaMusica = JSON.parse(localStorage.getItem('musicas') || "[]");

// Display de músicas
listaMusica.forEach(musica => {
    criarElemento(musica);
});

// Event listener de quando o cadastro é concluído
formCadastroMusica.addEventListener('submit', function(event) {
    event.preventDefault();

    // Coleta informação do cadastro
    const novaMusica = {
        titulo: document.getElementById('titulo_m').value,
        artista: document.getElementById('artista_m').value,
        genero: document.getElementById('genero_m').value,
        duracao: document.getElementById('duracao_m').value,
        link: document.getElementById('link_m').value
    };

    // Adiciona música
    listaMusica.push(novaMusica);

    // Salva lista no LocalStorage
    localStorage.setItem('musicas', JSON.stringify(listaMusica));

    // Cria lista e mostra na UI
    criarElemento(novaMusica);

    // Reseta o cadastro
    formCadastroMusica.reset();
});

// Cria lista para a música e bota no DOM
function criarElemento(musica) {
    const elementoMusica = document.createElement('li');
    elementoMusica.className = 'item_musica';

    // Título da música
    const tituloMusica = document.createElement('p');
    tituloMusica.textContent = musica.titulo;

    const artistaMusica = document.createElement('p');
    artistaMusica.textContent = musica.artista;

    const generoMusica = document.createElement('p');
    generoMusica.textContent = musica.genero;

    const duracaoMusica = document.createElement('p');
    duracaoMusica.textContent = musica.duracao;

    const linkMusica = document.createElement('p');
    linkMusica.textContent = musica.link;

    // Botão de deletar música
    const botaoDeletar = document.createElement('button');
    botaoDeletar.textContent = "Deletar música";
    
    // Adiciona event listener e remove música
    botaoDeletar.addEventListener('click', function() {
        // Remove da UI
        elementoMusica.remove();

        // Remove da lista e bota no localstorage
        listaMusica = listaMusica.filter(m => m !== musica);
        localStorage.setItem('musicas', JSON.stringify(listaMusica));
    });

    // Dá o título e o botão no "Músicas Cadastradas"
    elementoMusica.appendChild(tituloMusica);
    elementoMusica.appendChild(artistaMusica);
    elementoMusica.appendChild(generoMusica);
    elementoMusica.appendChild(duracaoMusica);
    elementoMusica.appendChild(linkMusica);
    elementoMusica.appendChild(botaoDeletar);

    // Append the list item to the unordered list
    listaMusicaElement.appendChild(elementoMusica);
}

    