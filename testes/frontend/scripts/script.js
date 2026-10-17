const pokemonsGrid = document.getElementById("pokemonsGrid");
let todosPokemons = [];

async function pegarPokemons() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
        const data = await response.json();

        todosPokemons = await Promise.all(
            data.results.map(async (pokemon) => {
                const response = await fetch(pokemon.url);
                return await response.json();
            })
        );

        renderizarPokemons();
    } catch (error) {
        console.log(error);
    };
};

function renderizarPokemons() {
    console.log(todosPokemons);
    todosPokemons.forEach(pokemon => {
        pokemonsGrid.innerHTML += `
            <div class="card col-3" style="width: 18rem;">
              <img src="${pokemon.sprites.other["official-artwork"].front_default}" class="card-img-top" alt="${pokemon.name}">
              <div class="card-body">
                <h5 class="card-title">${pokemon.name}</h5>
              </div>
            </div>
        `;
    });
};

pegarPokemons();