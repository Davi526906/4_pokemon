async function buscarPokemon() {
  const input = document.getElementById("pokemon").value.trim();
  if (!input) return;

  try {
      const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`);
      
      if (!resposta.ok) {
          alert("Pokémon não encontrado!");
          return;
      }

      const pokemon = await resposta.json();

      // Nome e ID
      document.getElementById("nome").textContent = `${pokemon.name} #${pokemon.id}`;
      
      // Imagem
      document.getElementById("imagem").src = pokemon.sprites.front_default || "";

      // Tipo, altura e peso
      document.getElementById("tipo").textContent = pokemon.types[0].type.name;
      document.getElementById("altura").textContent = `${pokemon.height / 10} m`;
      document.getElementById("peso").textContent = `${pokemon.weight / 10} kg`;

      // Estatísticas (Stats da PokéAPI)
      atualizarBarra("hp", pokemon.stats[0].base_stat);   // HP
      atualizarBarra("atk", pokemon.stats[1].base_stat);  // Ataque
      atualizarBarra("def", pokemon.stats[2].base_stat);  // Defesa
      atualizarBarra("spd", pokemon.stats[5].base_stat);  // Velocidade

  } catch (error) {
      console.error("Erro ao buscar Pokémon:", error);
  }
}

function atualizarBarra(id, valor) {
  const valElement = document.getElementById(`${id}-val`);
  const barElement = document.getElementById(`${id}-bar`);

  if (valElement) {
      valElement.textContent = valor;
  }
  
  if (barElement) {
      // Calcula a porcentagem considerando 150 como um teto comum para stats base
      const porcentagem = Math.min((valor / 150) * 100, 100);
      barElement.style.width = `${porcentagem}%`;
  }
}