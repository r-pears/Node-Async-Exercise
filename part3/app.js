let url = `https://pokeapi.co/api/v2`;

// Solution 1.
async function getAllPokemon() {
  let resp = await axios.get(`${url}/pokemon/?limit=2000`);
  console.log(resp.data);
}

getAllPokemon();

// Solution 2.
async function getRandom() {
  let allData = await axios.get(`${url}/pokemon/?limit=2000`);
  let randomPokemons = [];
  for (let i = 0; i < 3; i++) {
    let randomIndex = Math.floor(Math.random() * allData.data.results.length);
    let url = allData.data.results.splice(randomIndex, 1)[0].url;
    randomPokemons.push(url);
  }
  let pokemons = await Promise.all(
    randomPokemons.map(url => axios.get(url))
  );
  pokemons.forEach(pokemon => console.log(pokemon.data));
}

getRandom();

// Solution 3.
async function getInfo() {
  let allData = await axios.get(`${url}/pokemon/?limit=2000`);
  let randomPokemons = [];

  for (let i = 0; i < 3; i++) {
    let randomIndex = Math.floor(Math.random() * allData.data.results.length);
    let url = allData.data.results.splice(randomIndex, 1)[0].url;
    randomPokemons.push(url);
  }

  let pokeData = await Promise.all(
    randomPokemons.map(url => axios.get(url))
  );

  let speciesData = await Promise.all(
    pokeData.map(pokemon => axios.get(pokemon.data.species.url))
  )

  descriptions = speciesData.map(data => {
    let descObj = data.data.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    );
    return descObj ? descObj.flavor_text : `This Pokémon has no available description.`;
  })

  descriptions.forEach((desc, index) => {
    console.log(`${pokeData[index].data.name}: ${desc}`);
  })
}

getInfo();

// Solution 4.
let pokeArea = document.querySelector('#pokemon-section');

async function getPokemons() {
  pokeArea.innerHTML = '';

  let allData = await axios.get(`${url}/pokemon/?limit=2000`);
  let randomPokemons = [];

  for (let i = 0; i < 3; i++) {
    let randomIndex = Math.floor(Math.random() * allData.data.results.length);
    let url = allData.data.results.splice(randomIndex, 1)[0].url;
    randomPokemons.push(url);
  }

  let pokeData = await Promise.all(
    randomPokemons.map(url => axios.get(url))
  );

  let speciesData = await Promise.all(
    pokeData.map(pokemon => axios.get(pokemon.data.species.url))
  )

  speciesData.forEach((resp, index) => {
    let descObj = resp.data.flavor_text_entries.find(function (entry) {
      return entry.language.name === 'en';
    })
    let description = descObj ? descObj.flavor_text : `This Pokémon has no description.`;
    let name = pokeData[index].data.name;
    let img = pokeData[index].data.sprites.front_default;

    let newCard = document.createElement('div');
    newCard.classList.add('pokemon-card');
    newCard.innerHTML = `
      <h1>${name}</h1>
      <img src=${img} />
      <p>${description}</p>
    `
    pokeArea.append(newCard)
  })
}