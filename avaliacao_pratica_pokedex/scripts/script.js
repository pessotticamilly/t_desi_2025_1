const API_URL = "https://pokeapi.co/api/v2/pokemon";
const POKEMON_LIMIT_URL = 20;
const POKEMON_PER_PAGE = 50;
let allPokemon = [];
let filteredPokemon = [];
let currentPage = 1;

const pokemonGrid = document.querySelector("#pokemonGrid");
const loading = document.querySelector("#loading");
const errorMessage = document.querySelector("#errorMessage");
const pagination = document.querySelector("#pagination");
const searchInput = document.querySelector("#searchInput");
const typeFilter = document.querySelector("#typeFilter");
const statFilter = document.querySelector("#statFilter");
const statValue = document.querySelector("#statValue");
const resultCount = document.querySelector("#resultCount");
const modalTitle = document.querySelector("#pokemonModalLabel");
const modalBody = document.querySelector("#modalBody");

const pokemonModal = new bootstrap.Modal(
    document.querySelector("#pokemonModal")
);

// BUSCAR TODOS OS POKÉMON
async function getAllPokemon() {
    try {
        loading.classList.remove("d-none");
        errorMessage.classList.add("d-none");

        // Primeiro buscamos a lista de Pokémon
        const response = await fetch(`${API_URL}?limit=${POKEMON_LIMIT_URL}`);

        if (!response.ok) {
            throw new Error("Erro ao buscar Pokémon.");
        }

        const data = await response.json();
        const pokemonList = data.results;

        // Buscamos os detalhes em lotes
        const batchSize = 50;

        for (let i = 0; i < pokemonList.length; i += batchSize) {
            const batch = pokemonList.slice(i, i + batchSize);
            const batchData = await Promise.all(
                batch.map(async (pokemon) => {
                    const response = await fetch(pokemon.url);
                    return await response.json();
                })
            );

            allPokemon.push(...batchData);
            resultCount.textContent = `Carregando ${allPokemon.length} Pokémon...`;
        }

        // Ordena pelo número
        allPokemon.sort((a, b) => a.id - b.id);

        // Inicialmente todos estão disponíveis
        filteredPokemon = [...allPokemon];

        // Preenche o filtro de tipos
        createTypeFilter();
        // Mostra os Pokémon
        renderPokemon();
        // Cria paginação
        renderPagination();
    } catch (error) {
        console.error(error);
        errorMessage.classList.remove("d-none");
    } finally {
        loading.classList.add("d-none");
    }
}

// CRIAR FILTRO DE TIPOS
function createTypeFilter() {
    const types = [];

    allPokemon.forEach(pokemon => {
        pokemon.types.forEach(typeData => {
            const typeName = typeData.type.name;
            if (!types.includes(typeName)) {
                types.push(typeName);
            }
        });
    });

    types.sort();
    types.forEach(type => {
        const option = document.createElement("option");

        option.value = type;
        option.textContent = capitalize(type);
        typeFilter.appendChild(option);
    });
}

// FILTRAR POKÉMON
function filterPokemon() {
    const search = searchInput.value.toLowerCase().trim();
    const selectedType = typeFilter.value;
    const selectedStat = statFilter.value;
    const minimumValue = Number(statValue.value);

    filteredPokemon = allPokemon.filter(pokemon => {
        // PESQUISA
        const matchesSearch = pokemon.name.toLowerCase().includes(search) || pokemon.id.toString().includes(search);

        if (!matchesSearch) {
            return false;
        }

        // TIPO
        if (selectedType !== "all") {
            const hasType = pokemon.types.some(typeData => typeData.type.name === selectedType);

            if (!hasType) {
                return false;
            }
        }

        // ATRIBUTO
        if (selectedStat !== "all" && statValue.value !== "") {
            const stat = pokemon.stats.find(statData => statData.stat.name === selectedStat);
            const value = stat.base_stat;

            if (value < minimumValue) {
                return false;
            }
        }

        return true;
    });

    currentPage = 1;
    renderPokemon();
    renderPagination();
}

// RENDERIZAR POKÉMON
function renderPokemon() {
    pokemonGrid.innerHTML = "";

    // CALCULAR PAGINAÇÃO
    const start = (currentPage - 1) * POKEMON_PER_PAGE;
    const end = start + POKEMON_PER_PAGE;
    const pokemonToShow = filteredPokemon.slice(start, end);

    // CONTADOR
    resultCount.textContent = `${filteredPokemon.length} Pokémon encontrados`;

    // NENHUM RESULTADO
    if (pokemonToShow.length === 0) {
        pokemonGrid.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center">
                    Nenhum Pokémon encontrado.
                </div>
            </div>
        `;
        return;
    }

    // CRIAR CARDS
    pokemonToShow.forEach(pokemon => {
        const card = createPokemonCard(pokemon);
        pokemonGrid.appendChild(card);
    });
}

// CRIAR CARD
function createPokemonCard(pokemon) {
    const col = document.createElement("div");
    col.classList.add("col");

    // Primeiro tipo do Pokémon
    const mainType = pokemon.types[0].type.name;

    // Número formatado
    const number = String(pokemon.id).padStart(3, "0");
    col.innerHTML = `
        <article class="pokemon-card type-${mainType} h-100">
            <div class="card-body text-center d-flex flex-column">
                <div class="text-end">
                    <span class="pokemon-number">#${number}</span>
                </div>
                <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}" class="pokemon-image">
                <h2 class="pokemon-name mt-auto mb-2">${capitalize(pokemon.name)}</h2>
                <div>
                    ${pokemon.types.map(typeData => `
                        <span class="type-badge">${typeData.type.name}</span>
                    `).join("")}
                </div>
            </div>
        </article>
    `;

    // CLIQUE NO CARD
    col.addEventListener("click", () => openPokemonModal(pokemon));

    return col;
}

// ABRIR MODAL
function openPokemonModal(pokemon) {
    const number = String(pokemon.id).padStart(3, "0");
    modalTitle.textContent = `#${number} ${capitalize(pokemon.name)}`;

    // TIPOS
    const typesHTML = pokemon.types.map(typeData => {
        const type = typeData.type.name;
        return `<span class="modal-type type-${type}">${type}</span>`;
    }).join("");

    // HABILIDADES
    const abilitiesHTML = pokemon.abilities.map(abilityData => capitalize(abilityData.ability.name)).join(", ");

    // STATUS
    const statsHTML = pokemon.stats.map(statData => {
        const statName = formatStatName(statData.stat.name);
        const value = statData.base_stat;
        const percentage = Math.min((value / 255) * 100, 100);

        return `
            <div class="stat-row">
                <div class="stat-label">
                    <span>${statName}</span>
                    <strong>${value}</strong>
                </div>
                <div class="stat-bar">
                    <div class="stat-bar-fill" style="width: ${percentage}%" ></div>
                </div>
            </div>
        `;
    }).join("");

    // CONTEÚDO DO MODAL
    modalBody.innerHTML = `
        <div class="row align-items-center">
            <div class="col-12 col-md-5 text-center">
                <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}" class="modal-pokemon-image">
                <div class="mt-2">
                    ${typesHTML}
                </div>
            </div>
            <!-- INFORMAÇÕES -->
            <div class="col-12 col-md-7">
                <div class="row text-center mb-4">
                    <div class="col-6">
                        <strong>Altura</strong>
                        <p>${pokemon.height / 10} m</p>
                    </div>
                    <div class="col-6">
                        <strong>Peso</strong>
                        <p>${pokemon.weight / 10} kg</p>
                    </div>
                </div>
                <h3 class="fs-5">Habilidades</h3>
                <p>${abilitiesHTML}</p>
            </div>
        </div>
        <hr>
        <h3 class="fs-5 mb-3">Status</h3>
        ${statsHTML}
    `;

    pokemonModal.show();
}

// PAGINAÇÃO
function renderPagination() {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(filteredPokemon.length / POKEMON_PER_PAGE);

    if (totalPages <= 1) {
        return;
    }

    // ANTERIOR
    const previous = document.createElement("li");
    previous.classList.add("page-item");

    if (currentPage === 1) {
        previous.classList.add("disabled");
    }

    previous.innerHTML = `
        <button class="page-link" aria-label="Página anterior">
            &laquo;
        </button>
    `;

    previous.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderPokemon();
            renderPagination();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    });

    pagination.appendChild(previous);

    // NÚMEROS DAS PÁGINAS
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
        const item = document.createElement("li");

        item.classList.add(
            "page-item"
        );

        if (page === currentPage) {
            item.classList.add(
                "active"
            );
        }

        item.innerHTML = `
            <button class="page-link">
                ${page}
            </button>
        `;

        item.addEventListener(
            "click",
            () => {
                currentPage = page;
                renderPokemon();
                renderPagination();
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );

        pagination.appendChild(item);
    }

    // PRÓXIMA
    const next = document.createElement("li");

    next.classList.add(
        "page-item"
    );

    if (currentPage === totalPages) {
        next.classList.add(
            "disabled"
        );
    }

    next.innerHTML = `
        <button class="page-link" aria-label="Próxima página">
            &raquo;
        </button>
    `;

    next.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPokemon();
            renderPagination();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    });

    pagination.appendChild(next);
}

// FORMATAR NOME
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// FORMATAR NOME DO STATUS
function formatStatName(stat) {
    const names = {
        "hp": "HP",
        "attack": "Ataque",
        "defense": "Defesa",
        "special-attack": "Ataque Especial",
        "special-defense": "Defesa Especial",
        "speed": "Velocidade"
    };

    return names[stat] || stat;
}

// EVENTOS DOS FILTROS
searchInput.addEventListener("input", filterPokemon);
typeFilter.addEventListener("change", filterPokemon);
statFilter.addEventListener("change", filterPokemon);
statValue.addEventListener("input", filterPokemon);

// INICIAR A APLICAÇÃO
getAllPokemon();