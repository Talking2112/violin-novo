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

    // Coleta informações do cadastro
    const arquivo = document.getElementById('arquivo_m').files[0];
    if (!arquivo) {
        alert('Por favor, selecione um arquivo MP3 64k.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        // Cria um novo objeto musica com o arquivo convertido para base64
        const novaMusica = {
            titulo: document.getElementById('titulo_m').value,
            artista: document.getElementById('artista_m').value,
            genero: document.getElementById('genero_m').value,
            duracao: document.getElementById('duracao_m').value,
            mp3: e.target.result // Armazena o arquivo em base64
        };

        // Adiciona a nova música à lista
        listaMusica.push(novaMusica);

        // Salva a lista no LocalStorage
        localStorage.setItem('musicas', JSON.stringify(listaMusica));

        // Cria a lista e mostra na UI
        criarElemento(novaMusica);

        // Reseta o formulário
        formCadastroMusica.reset();
    };

    // Se um arquivo foi selecionado, ele é lido
    reader.readAsDataURL(arquivo);
});

// Função para criar o elemento da música
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

    // Adiciona o player de áudio
    const audioPlayer = document.createElement('audio');
    audioPlayer.controls = true;
    audioPlayer.src = musica.mp3;

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

    // Dá o título, o player de áudio e o botão na lista
    elementoMusica.appendChild(tituloMusica);
    elementoMusica.appendChild(artistaMusica);
    elementoMusica.appendChild(generoMusica);
    elementoMusica.appendChild(duracaoMusica);
    elementoMusica.appendChild(audioPlayer);
    elementoMusica.appendChild(botaoDeletar);

    // Adiciona o item à lista no DOM
    listaMusicaElement.appendChild(elementoMusica);
}
