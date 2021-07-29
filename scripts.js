const cards = document.querySelectorAll('.memory-card');
cards.forEach(card => {
    card.addEventListener('click', flipCard)
}
);

shuffle(); // shuffles the cards
shuffle();
let hasFlippedFirstCard = false;
let lockBoard = false;  // determines if the user can click on cards
let firstCard, secondCard;


function flipCard() {
    if (lockBoard) return; // the player is not allowed at this moment to click on cards
    this.classList.add('flip');
    if (!hasFlippedFirstCard) {
        // this must be the first card flipped
        hasFlippedFirstCard = true;
        firstCard = this;  // identifies the first card picked  
    } else {
        if (this === firstCard) {
            return; //  do not allow the same card to be clicked twice
        }
        // this must be the second click
        secondCard = this;
        hasFlippedFirstCard = false; // as the second card has been clicked 

        checkForMatch();

    }

}
function checkForMatch() {
    if (firstCard.dataset.country === secondCard.dataset.country) {
        keepCardFaceUp();
    } else { // there is no match
        // give a little time to show the mismatch to the player
        flipBackCards();

    }
}

function keepCardFaceUp() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function flipBackCards() {
    lockBoard = true; // the two cards are not a match - no more clicks until they have been flipped back!!
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        //lockBoard = false; // cards have been flipped back player may resume clicking
        resetBoard();
    }, 1500);
}

function resetBoard() {
    hasFlippedFirstCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);

        card.style.order = randomPos; // NOTE the use of order and the flex grid !!!
    })
}


