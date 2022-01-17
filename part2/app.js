let url = `https://deckofcardsapi.com/api/deck`;

// Solution 1.
async function getNewCard() {
  let response = await axios.get(`${url}/new/draw/`);
  let { suit, value } = response.data.cards[0];
  console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
}

getNewCard();

// Solution 2.
async function drawNewDeck() {
  let firstCard = await axios.get(`${url}/new/draw/`);
  let deckId = firstCard.data.deck_id;
  let secondCard = await axios.get(`${url}/${deckId}/draw/`);
  [firstCard, secondCard].forEach(card => {
    let { suit, value } = card.data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  })
}

drawNewDeck();

// Solution 3.
let cardSection = document.querySelector('#result');
let thisDeckId = null;
let drawCardBtn = document.querySelector('#drawBtn');

async function before() {
  let deck = await axios.get(`${url}/new/shuffle/`);
  thisDeckId = deck.data.deck_id;
}

async function drawCard() {
  let card = await axios.get(`${url}/${thisDeckId}/draw/`);

  let cardImg = card.data.cards[0].image;
  let angle = Math.random() * 90 - 45;
  let newX = Math.random() * 100 - 20;
  let newY = Math.random() * 100 - 20;

  let newImg = document.createElement('img');
  newImg.setAttribute('src', cardImg);
  newImg.setAttribute('style', `transform: translate(${newX}px, ${newY}px) rotate(${angle}deg)`);
  cardSection.append(newImg);

  if (card.data.remaining === 0) {
    drawCardBtn.classList.add('display-none');
  }
}

before();