// Selecionando os elementos do DOM
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultContainer = document.getElementById('resultContainer');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('errorMessage');

// Evento de clique no botão de busca (Interatividade)
searchBtn.addEventListener('click', () => {
    const pokemonName = searchInput.value.trim().toLowerCase();
    
    if (pokemonName === '') {
        showError('Por favor, digite o nome de um Pokémon.');
        return;
    }

    fetchData(pokemonName);
});

// Função 1: Buscar os dados na API (async/await + try/catch)
async function fetchData(pokemon) {
    // Estado de carregando e limpando tela
    showLoading(true);
    errorElement.classList.add('hidden');
    resultContainer.innerHTML = '';

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        
        // Tratamento se o Pokémon não for encontrado (Erro 404)
        if (!response.ok) {
            throw new Error('Pokémon não encontrado. Verifique o nome e tente novamente.');
        }

        const data = await response.json();
        renderData(data); // Chama a função para exibir

    } catch (error) {
        showError(error.message);
    } finally {
        // Remove o estado de carregando independentemente de sucesso ou erro
        showLoading(false);
    }
}

// Função 2: Renderizar os dados no DOM (HTML no main)
function renderData(pokemon) {
    // Criando a estrutura HTML do card
    const cardHTML = `
        <div class="card">
            <img src="${pokemon.sprites.front_default}" alt="Imagem do ${pokemon.name}">
            <h2>${pokemon.name}</h2>
            <p><strong>Número:</strong> #${pokemon.id}</p>
            <p><strong>Peso:</strong> ${(pokemon.weight / 10).toFixed(1)} kg</p>
        </div>
    `;

    // Injetando no main
    resultContainer.innerHTML = cardHTML;
}

// Funções auxiliares para feedback visual
function showLoading(isLoading) {
    if (isLoading) {
        loadingElement.classList.remove('hidden');
    } else {
        loadingElement.classList.add('hidden');
    }
}

function showError(message) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}