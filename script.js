const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"]; // Valeurs des cartes
const cards = cardValues.concat(cardValues); // Doubler pour créer des paires
let score = 0;
let move = 0;
shuffleArray(cards); // Mélanger les cartes

const memoryGame = document.querySelector(".memory-game");
let flippedCards = [];
let matchedCards = [];

// Créer les cartes et les ajouter au jeu
cards.forEach((value, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = value;
  card.dataset.index = index;
  card.textContent = "?"; // Symbole caché
  card.addEventListener("click", handleCardClick);
  memoryGame.appendChild(card);
});

// Fonction de gestion des clics sur les cartes
function handleCardClick() {
  const card = this;

  // Ne rien faire si la carte est déjà retournée ou déjà trouvée
  if (
    card.classList.contains("flipped") ||
    card.classList.contains("matched")
  ) {
    return;
  }

  // Retourner la carte
  card.classList.add("flipped");
  card.textContent = card.dataset.value;

  flippedCards.push(card);

  // Vérifier si deux cartes sont retournées
  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

// Vérifier si les deux cartes retournées forment une paire
function checkMatch() {
  const [card1, card2] = flippedCards;
  move++;
  document.getElementById("move").textContent = `Move: ${move}`;
  if (card1.dataset.value === card2.dataset.value) {
    // Paires trouvées
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCards.push(card1, card2);
    score++;
    document.getElementById("score").textContent = `Score: ${score}`;
  } else {
    // Retourner les cartes face cachée si elles ne correspondent pas
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1.textContent = "?";
    card2.textContent = "?";
  }

  flippedCards = [];

  // Vérifier si toutes les paires ont été trouvées
  if (matchedCards.length === cards.length) {
    alert("Félicitations ! Vous avez gagné !");
  }
}

// Fonction pour mélanger un tableau (algorithme de Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
