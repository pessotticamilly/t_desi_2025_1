const pokemonsGrid = document.getElementById("pokemons-grid");
let allPokemons = []

async function getAllPokemons() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
        const data = await response.json();
        
        allPokemons = await Promise.all(data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            return await response.json();
        }));

        renderPokemons();
    } catch (error) {
        console.log(error);
    };
};

function renderPokemons() {
    allPokemons.forEach(pokemon => {
        pokemonsGrid.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="${pokemon.sprites.other["official-artwork"].front_default}" class="card-img-top" alt="${pokemon.name}">
                <div class="card-body">
                    <h5 class="card-title">${pokemon.name}</h5>
                </div>
            </div>
        `;
    });
};

getAllPokemons();