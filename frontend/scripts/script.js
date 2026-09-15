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
    todosPokemons.forEach((pokemon, index) => {
        appeared.innerHTML += `
            <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#modalPokemon" onclick="mostrarDetalhes(${index})">
                <div class="card" style="width: 18rem;">
                <img src="${pokemon.sprites.other["official-artwork"].front_default}" class="card-img-top" alt="Arte do Pokémon">
                    <div class="card-body">
                        <h5 class="card-title">${pokemon.name}</h5>
                    </div>
                </div>
            </button>
        `;
    });
};

function mostrarDetalhes(index) {
    const pokemon = todosPokemons[index];
    const tipos = pokemon.types.map(t => t.type.name).join(", ");
    const hp = pokemon.stats[0].base_stat;
    const atk = pokemon.stats[1].base_stat;
    const def = pokemon.stats[2].base_stat;
    const speed = pokemon.stats[5].base_stat;

    document.getElementById("imagem").src = `${pokemon.sprites.front_default}`;
    document.getElementById("modalPokemonLabel").innerText = (pokemon.name);
    document.getElementById("tipo").innerText = "Tipo 🧬: " + tipos + ".";
    document.getElementById("peso").innerText = "Peso ⚖️: " + (pokemon.weight / 10) + " Kg.";
    document.getElementById("altura").innerText = "Altura 📏: " + (pokemon.height / 10) + " m.";

    document.getElementById("vida").innerText = "HP (Pontos de vida ❤️): " + hp + " pts.";
    document.getElementById("ataque").innerText = "ATK (Ataque ⚔️): " + atk + " pts.";
    document.getElementById("defesa").innerText = "DEF (Defesa 🛡️): " + def + " pts.";
    document.getElementById("velocidade").innerText = "SPEED (Velocidade 👟): " + speed + " pts.";
};