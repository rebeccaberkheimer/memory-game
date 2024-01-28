const select = document.getElementById("difficulty");
const cardContainer = document.querySelector(".card-container");
const button = document.getElementById("start");
const backgroundImages = [
  "earthgood.png",
  "jupiterpng.png",
  "mars2.png",
  "mercurygood.png",
  "neptune.png",
  "saturnpng.png",
  "uranus.png",
  "venusgood.png",
];
let flippedCards = [];
let matches = 0;
let startTime;
let endTime;

function resetTimer() {
  startTime = null;
  endTime = null;
}

function shuffleBackgroundImages(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // follows shuffling algorithm
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards; // destructure flippedCards array, card1 and card2 are the two elements of the flippedCards array
  const back1 = card1.querySelector(".cardBack").style.backgroundImage;
  const back2 = card2.querySelector(".cardBack").style.backgroundImage;
  if (back1 == back2) {
    flippedCards = []; // reset for next flips
    matches++;
    if (matches === select.value / 2) {
      endTime = new Date().getTime();
      const elapsed = Math.floor((endTime - startTime) / 1000);
      const timeDisplay = document.createElement("label");
      const winDisplay = document.createElement("label");
      winDisplay.textContent = "You Found All Matches!";
      timeDisplay.textContent = "It took you " + elapsed + " seconds!";
      winDisplay.classList.add("winDisplay");
      cardContainer.innerHTML = "";
      cardContainer.appendChild(winDisplay);
      cardContainer.appendChild(timeDisplay);
    }
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    flippedCards = [];
  }
}

function play(event) {
  const selectValue = select.value;
  cardContainer.innerHTML = ""; // ensures cards don't add on each time
  resetTimer();
  // handle shuffling the background images in all cases
  let availableBackgrounds = [...backgroundImages]; // copy over backgroundImages array
  if (availableBackgrounds.length < selectValue / 2) {
    // if there are less images than needed pairs
    availableBackgrounds = [...backgroundImages, ...backgroundImages];
    shuffleBackgroundImages(availableBackgrounds);
  }
  const imagePairs = availableBackgrounds.slice(0, selectValue / 2); // use as many pairs as each value needs
  const allPairs = [...imagePairs, ...imagePairs]; // array of pairs
  shuffleBackgroundImages(allPairs); // shuffle pairs

  for (let i = 0; i < selectValue; i++) {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardFront = document.createElement("div");
    cardFront.classList.add("cardFront");
    cardFront.style.backgroundImage = "url(question.png)";

    const cardBack = document.createElement("div");
    cardBack.classList.add("cardBack");
    cardBack.style.backgroundImage = `url(${allPairs[i]})`;

    card.appendChild(cardBack);
    card.appendChild(cardFront);
    cardContainer.appendChild(card);
    card.addEventListener("click", function () {
      if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.toggle("flipped");
        flippedCards.push(this); // put the flipped card into the flippedCards array
      }
      if (flippedCards.length == 2) {
        setTimeout(checkMatch, 700); // pause and let user see the second card before checking for the match
      }
    });
    startTime = new Date().getTime();
    matches = 0; // reset matches at the end of each game
  }
}

button.addEventListener("click", play);
