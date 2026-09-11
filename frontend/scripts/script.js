const comecar = document.getElementById("comecar");
let todosPokemons = [];

comecar.addEventListener("click", async () => {
    try {
        const response = await fetch ("https://pokeapi.co/api/v2/pokemon?limit=69");
        const dados = await response.json();

        todosPokemons = await Promise.all(
            dados.results.map(async (pokemon) => {
                const response = await fetch(pokemon.url);
                return await response.json();
            })
        );

        infosPokemon();
    } catch (error) {
        console.log(error);
    }; 
});

function infosPokemon() {
        todosPokemons.forEach(pokemon => {
            appeared.innerHTML += `
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <h5 class="modal-tittle">${pokemon.name}</h5>
                    <img src="${pokemon.sprites.other["official-artwork"].front_default}">
                </div>
            `;
        });
    }; 