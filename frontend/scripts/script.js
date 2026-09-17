const comecar = document.getElementById("comecar");
let todosPokemons = [];

comecar.addEventListener("click", async () => {
    audioAventura.play();
    
    document.querySelector("main img").style.display = "none";
    comecar.style.display = "none";
    buscar.style.display = "block";

    try {
        document.querySelector("main img").style.display = "none";
        comecar.style.display = "none";

        const response = await fetch ("https://pokeapi.co/api/v2/pokemon?limit=136");
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

function infosPokemon(lista = todosPokemons) {
    appeared.innerHTML = "";

    lista.forEach((pokemon) => {

        const indexReal = todosPokemons.findIndex(p => p.id === pokemon.id);

        appeared.innerHTML += `
            <button type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#modalPokemon" onclick="mostrarDetalhes(${indexReal})">
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

    const tiposComEmoji = pokemon.types.map(t => 
        emojisTipos[t.type.name] || t.type.name).join(", ");

    const hp = pokemon.stats[0].base_stat;
    const atk = pokemon.stats[1].base_stat;
    const def = pokemon.stats[2].base_stat;
    const speed = pokemon.stats[5].base_stat;

    document.getElementById("imagem").src = `${pokemon.sprites.front_default}`;
    document.getElementById("modalPokemonLabel").innerText = (pokemon.name);
    document.getElementById("tipo").innerText = "Tipo 🧬: " + tiposComEmoji + ".";

    const primeiroTipo = pokemon.types[0].type.name;
    document.getElementById("modalPokemon").classList.add(primeiroTipo);
    const modalElemento = document.getElementById("modalPokemon");
    
    modalElemento.addEventListener('hidden.bs.modal', () => {
        modalElemento.className = "modal fade"; 
    });

    document.getElementById("peso").innerText = "Peso ⚖️: " + (pokemon.weight / 10) + " Kg.";
    document.getElementById("altura").innerText = "Altura 📏: " + (pokemon.height / 10) + " m.";

    document.getElementById("vida").innerText = "HP (Pontos de vida ❤️): " + hp + " pts.";
    document.getElementById("ataque").innerText = "ATK (Ataque ⚔️): " + atk + " pts.";
    document.getElementById("defesa").innerText = "DEF (Defesa 🛡️): " + def + " pts.";
    document.getElementById("velocidade").innerText = "SPEED (Velocidade 👟): " + speed + " pts.";
};

const buscar = document.getElementById("pesquisa");
buscar.addEventListener("input", filtro);

function filtro(event) {
    if (event) event.preventDefault();
    
    const pesquisando = buscar.value.toLowerCase();

    const pokemonsFiltrados = todosPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().startsWith(pesquisando)
    );
    infosPokemon(pokemonsFiltrados);
};

const emojisTipos = {
    grass: "🌿 Planta",
    fire: "🔥 Fogo",
    water: "💧 Água",
    electric: "⚡ Elétrico",
    psychic: "🔮 Psíquico",
    rock: "🪨 Pedra",
    normal: "⚪ Normal",
    dragon: "🐉 Dragão",
    flying: "🕊️ Voador",
    ice: "❄️ Gelo",
    fighting: "🥊 Lutador",
    ground: "🏜️ Terrestre",
    poison: "🧪 Venenoso",
    bug: "🐛 Inseto",
    steel: "⚙️ Aço",
    fairy: "🧚 Fada",
    dark: "🌙 Sombrio",
    ghost: "👻 Fantasma"
};