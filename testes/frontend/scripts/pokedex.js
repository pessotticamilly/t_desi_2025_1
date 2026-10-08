const API_URL = "https://pokeapi.co/api/v2";
const POKEMON_PER_PAGE = 20;

let allPokemon = [];
let currentPokemon = [];
let currentPage = 1;
let currentType = "all";
let favorites = JSON.parse(localStorage.getItem("pokemonFavorites")) || [];

const pokemonGrid = document.querySelector("#pokemonGrid");
const loading = document.querySelector("#loading");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const pagination = document.querySelector("#pagination");
const totalPokemon = document.querySelector("#totalPokemon");
const typeFilters = document.querySelector("#typeFilters");
const filterButton = document.querySelector("#filterButton");
const detailImage = document.querySelector("#detailImage");
const detailNumber = document.querySelector("#detailNumber");
const detailName = document.querySelector("#detailName");
const detailTypes = document.querySelector("#detailTypes");
const detailHeight = document.querySelector("#detailHeight");
const detailWeight = document.querySelector("#detailWeight");
const detailAbility = document.querySelector("#detailAbility");
const detailDescription = document.querySelector("#detailDescription");
const stats = document.querySelector("#stats");
const evolution = document.querySelector("#evolution");
const favoriteDetail = document.querySelector("#favoriteDetail");
const detailsPanel = document.querySelector("#detailsPanel");
const closeDetails = document.querySelector("#closeDetails");

const typeNames = {
    normal: "Normal",
    fire: "Fire",
    water: "Water",
    electric: "Eletric",
    grass: "Grass",
    ice: "Ice",
    fighting: "Fighting",
    poison: "Poison",
    ground: "Ground",
    flying: "Flying",
    psychic: "Psychic",
    bug: "Bug",
    rock: "Rock",
    ghost: "Ghost",
    dragon: "Dragon",
    dark: "Dark",
    steel: "Steel",
    fairy: "Fairy"
};
const statNames = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp Atk",
    "special-defense": "Sp Def",
    speed: "Speed"
};

async function init() {
    try {
        showLoading();
        await getAllPokemon();
        await loadFirstPage();
        hideLoading();
    } catch (error) {
        console.error(error);
        hideLoading();
        pokemonGrid.innerHTML = `
            <p>Não foi possível carregar os Pokémon.</p>
        `;
    }
}

/* BUSCAR LISTA DE TODOS OS POKÉMON */
async function getAllPokemon() {
    const response = await fetch(`${API_URL}/pokemon?limit=1025`);
    const data = await response.json();

    allPokemon = data.results.map((pokemon, index) => {
        return {
            id: index + 1,
            name: pokemon.name,
            url: pokemon.url
        };
    }
    );

    currentPokemon = [...allPokemon];
    totalPokemon.textContent = `Total de Pokémon: ${allPokemon.length.toLocaleString("pt-BR")}`;
}

/* CARREGAR PÁGINA */
async function loadFirstPage() {
    currentPage = 1;
    await renderPokemon();
}

/* RENDERIZAR POKÉMON */
async function renderPokemon() {
    showLoading();
    pokemonGrid.innerHTML = "";

    const start = (currentPage - 1) * POKEMON_PER_PAGE;
    const end = start + POKEMON_PER_PAGE;
    const pagePokemon = currentPokemon.slice(start, end);

    if (pagePokemon.length === 0) {
        emptyState.classList.add("show");
        hideLoading();
        renderPagination();
        return;
    }

    emptyState.classList.remove("show");

    const pokemonDetails = await Promise.all(
        pagePokemon.map(pokemon => getPokemonDetails(pokemon.url))
    );

    pokemonDetails.forEach(pokemon => {
        const card = createPokemonCard(pokemon);
        pokemonGrid.appendChild(card);
    });

    renderPagination();
    hideLoading();
}

/* BUSCAR DETALHES DE UM POKÉMON */
async function getPokemonDetails(url) {
    const response = await fetch(url);
    return await response.json();
}

/* CRIAR CARD */
function createPokemonCard(pokemon) {
    const card = document.createElement("article");
    const mainType = pokemon.types[0].type.name;
    const isFavorite = favorites.includes(pokemon.id);

    card.className = "pokemon-card";
    card.innerHTML = `
        <div class="pokemon-image ${mainType}">

            <button
                class="favorite-button
                ${isFavorite ? "favorite" : ""}"
                data-favorite="${pokemon.id}"
            >
                ${isFavorite ? "♥" : "♡"}
            </button>


            <img
                src="${pokemon.sprites.other["official-artwork"]
            .front_default
        ||
        pokemon.sprites.front_default
        }"
                alt="${pokemon.name}"
            >

        </div>


        <div class="pokemon-info">

            <div class="pokemon-number">

                #${String(pokemon.id).padStart(3, "0")}

            </div>


            <h3 class="pokemon-name">

                ${pokemon.name}

            </h3>


            <div class="types">

                ${pokemon.types
            .map(type => createTypeBadge(
                type.type.name
            ))
            .join("")
        }

            </div>

        </div>
    `;


    /*
        Clicar no coração
    */

    const favoriteButton =
        card.querySelector(
            ".favorite-button"
        );


    favoriteButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            toggleFavorite(
                pokemon.id
            );

        }
    );


    /*
        Clicar no card
    */

    card.addEventListener(
        "click",
        () => {

            showPokemonDetails(
                pokemon
            );

        }
    );


    return card;

}

/* CRIAR BADGE DE TIPO */
function createTypeBadge(type) {
    return `
        <span class="type-badge type-${type}">
            ${typeNames[type]}
        </span>
    `;
}

/* FAVORITOS */
function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(favoriteId => favoriteId !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem("pokemonFavorites", JSON.stringify(favorites));
    renderPokemon();

    if (Number(favoriteDetail.dataset.id) === id) {
        updateDetailFavorite(id);
    }
}

/* PAINEL DE DETALHES */
async function showPokemonDetails(pokemon) {
    detailImage.src = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;
    detailImage.alt = pokemon.name;
    detailNumber.textContent = `#${String(pokemon.id).padStart(3, "0")}`;
    detailName.textContent = pokemon.name;
    detailTypes.innerHTML = pokemon.types.map(type => createTypeBadge(type.type.name)).join("");
    detailHeight.textContent = `${(pokemon.height / 10).toFixed(1).replace(".", ",")} m`;
    detailWeight.textContent = `${(pokemon.weight / 10).toFixed(1).replace(".", ",")} kg`;
    detailAbility.textContent = formatName(pokemon.abilities[0].ability.name);
    favoriteDetail.dataset.id = pokemon.id;

    updateDetailFavorite(pokemon.id);
    renderStats(pokemon.stats);

    try {
        const speciesResponse = await fetch(pokemon.species.url);
        const species = await speciesResponse.json();
        const description = species.flavor_text_entries.find(entry => entry.language.name === "en");
        if (description) {
            detailDescription.textContent = description.flavor_text.replace(/\f/g, " ").replace(/\n/g, " ");
        }

        await renderEvolution(species.evolution_chain.url);
    } catch (error) {
        console.error("Error loading evolutions:\n", error);
    }

    detailsPanel.classList.add("open");
}

/* TROCA DE ÍCONE AO FAVORITAR */
function updateDetailFavorite(id) {
    const isFavorite = favorites.includes(id);

    favoriteDetail.textContent = isFavorite ? "♥" : "♡";
}

/* STATUS */
function renderStats(pokemonStats) {
    stats.innerHTML = "";

    pokemonStats.forEach(stat => {
        const value = stat.base_stat;
        const percentage = Math.min((value / 150) * 100, 100);
        const statElement = document.createElement("div");

        statElement.className = "stat";
        statElement.innerHTML = `
            <span class="stat-name">
                ${statNames[stat.stat.name]}
            </span>
            <div class="stat-bar">
                <div class="stat-fill" style="width: ${percentage}%; background: ${getStatColor(stat.stat.name)};"></div>
            </div>
            <span class="stat-value">
                ${value}
            </span>
        `;

        stats.appendChild(statElement);
    });
}

/* COR DAS BARRAS */
function getStatColor(stat) {
    const colors = {
        hp: "#ef4b5d",
        attack: "#f28c32",
        defense: "#eabf35",
        "special-attack": "#36a9e1",
        "special-defense": "#35b8b8",
        speed: "#9b5de5"
    };

    return colors[stat] || "#777";
}

/* EVOLUÇÃO */
async function renderEvolution(url) {
    evolution.innerHTML = `<span>Loading...</span>`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const evolutionIds = extractEvolutionIds(data.chain);
        const evolutionPokemon = await Promise.all(
            evolutionIds.map(async id => {
                const response = await fetch(`${API_URL}/pokemon/${id}`);
                return response.json();
            })
        );

        evolution.innerHTML = "";
        evolutionPokemon.forEach((pokemon, index) => {
            const item = document.createElement("div");
            
            item.className = "evolution-item";
            item.innerHTML = `
                <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
                <strong>${pokemon.name}</strong>
                <small>#${String(pokemon.id).padStart(3, "0")}</small>
            `;
            
            item.addEventListener("click", () => {
                showPokemonDetails(pokemon);
            });
            
            evolution.appendChild(item);
            
            if (index < evolutionPokemon.length - 1) {
                const arrow = document.createElement("span");
                
                arrow.className = "evolution-arrow";
                arrow.textContent = "›";

                evolution.appendChild(arrow);
            }
        });
    } catch (error) {
        console.error(error);
        evolution.innerHTML = "<span>Without informations.</span>";
    }
}

/* PEGAR IDS DA EVOLUÇÃO */
function extractEvolutionIds(chain) {
    const ids = [];

    function traverse(node) {
        const match = node.species.url.match(/\/pokemon-species\/(\d+)\//);

        if (match) {
            ids.push(Number(match[1]));
        }

        node.evolves_to.forEach(child => {
            traverse(child);
        });
    }

    traverse(chain);
    return ids;
}

/* PESQUISA */
searchInput.addEventListener("input", filterPokemon);

function filterPokemon() {
    const search = searchInput.value.toLowerCase().trim();

    currentPokemon = allPokemon.filter(pokemon => {
        const matchesSearch = pokemon.name.toLowerCase().includes(search) || pokemon.id.toString().includes(search);
        return matchesSearch;
    });

    applyTypeFilter();
}

/* FILTRO POR TIPO */
function applyTypeFilter() {
    if (currentType === "all") {
        currentPokemon = allPokemon.filter(pokemon => {
            const search = searchInput.value.toLowerCase().trim();
            return (pokemon.name.toLowerCase().includes(search) || pokemon.id.toString().includes(search));
        });
    } else {
        filterByType();
        return;
    }

    applySort();
}

/* FILTRAR POR TIPO */
async function filterByType() {
    showLoading();

    const search = searchInput.value.toLowerCase().trim();
    const searched = allPokemon.filter(pokemon => {
        return (pokemon.name.toLowerCase().includes(search) || pokemon.id.toString().includes(search));
    });
    const details = await Promise.all(
        searched.map(pokemon => getPokemonDetails(pokemon.url))
    );

    currentPokemon = details.filter(pokemon => pokemon.types.some(type => type.type.name === currentType)).map(pokemon => {
        return {
            id: pokemon.id,
            name: pokemon.name,
            url: `${API_URL}/pokemon/${pokemon.id}`
        };
    });

    applySort();
    currentPage = 1;
    renderPokemon();
}

/* ORDENAÇÃO */
sortSelect.addEventListener("change", () => {
    applySort();
    currentPage = 1;
    renderPokemon();
});

function applySort() {
    const sort = sortSelect.value;

    if (sort === "number") {
        currentPokemon.sort((a, b) => a.id - b.id);
    }

    if (sort === "name") {
        currentPokemon.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "name-desc") {
        currentPokemon.sort((a, b) => b.name.localeCompare(a.name));
    }
}

/* PAGINAÇÃO */
function renderPagination() {
    pagination.innerHTML = "";

    const totalPages = Math.ceil(currentPokemon.length / POKEMON_PER_PAGE);

    if (totalPages <= 1) {
        return;
    }

    /* Botão anterior */
    const previous = createPageButton("‹");

    previous.disabled = currentPage === 1;
    previous.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderPokemon();
        }
    });

    pagination.appendChild(previous);

    /* Números*/
    const maxButtons = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start < maxButtons - 1) {
        start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
        const button = createPageButton(i);

        if (i === currentPage) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            currentPage = i;
            renderPokemon();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        pagination.appendChild(button);
    }

    /* Última página */
    if (end < totalPages) {
        const dots = document.createElement("span");

        dots.textContent = "...";
        pagination.appendChild(
            dots
        );

        const last = createPageButton(totalPages);

        last.addEventListener("click", () => {
            currentPage = totalPages;
            renderPokemon();
        });

        pagination.appendChild(last);
    }

    /* Próximo */
    const next = createPageButton("›");

    next.disabled = currentPage === totalPages;
    next.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPokemon();
        }
    });

    pagination.appendChild(next);
}

function createPageButton(text) {
    const button = document.createElement("button");

    button.className = "page-button";
    button.textContent = text;

    return button;
}

/* FILTRO VISUAL */
filterButton.addEventListener("click", () => {
    typeFilters.classList.toggle("show");
});

document.querySelectorAll(".type-filter").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".type-filter").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        currentType = button.dataset.type;

        if (currentType === "all") {
            currentPokemon = [...allPokemon];
            filterPokemon();
        } else {
            filterPokemon();
        }
    });
});

/* MENU FAVORITOS */
document.querySelector("#menuFavorites").addEventListener("click", () => {
    currentPokemon = allPokemon.filter(pokemon => favorites.includes(pokemon.id));
    currentPage = 1;
    renderPokemon();
});

/* MENU TODOS */
document.querySelector("#menuAll").addEventListener("click", () => {
    currentType = "all";
    currentPokemon = [...allPokemon];
    searchInput.value = ""; 7
    currentPage = 1;
    renderPokemon();
});

/* FECHAR DETALHES */
closeDetails.addEventListener("click", () => {
    detailsPanel.classList.remove("open");
});

/* FAVORITO NO PAINEL */
favoriteDetail.addEventListener("click", () => {
    const id = Number(favoriteDetail.dataset.id);
    toggleFavorite(id);
});

/* UTILIDADES */
function formatName(name) {
    return name.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function showLoading() {
    loading.classList.add("show");
}

function hideLoading() {
    loading.classList.remove("show");
}

/* INICIAR */
init();