const symbols = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍋', '🍓', '🥝'];
let cards = [...symbols, ...symbols];
let flippedCards = [];
let matched = 0;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';
  cards = shuffle(cards);
  cards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.innerText = '';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains('flipped')) return;

  this.innerText = this.dataset.symbol;
  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    matched += 2;
    flippedCards = [];
    if (matched === cards.length) {
      setTimeout(() => alert('🎉 You Win!'), 500);
    }
  } else {
    setTimeout(() => {
      card1.innerText = '';
      card2.innerText = '';
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 800);
  }
}

createBoard();