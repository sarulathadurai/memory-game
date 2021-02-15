const cards = document.querySelectorAll('.memory-card');
shuffle();
let hasFlipped = false;
let firstCard, secondCard;
let lockCard = false;
let count = 0;
let rightSound, wrongSound, life = 6;
let myMusic = new AddSound("Audio/Bounce-Light-2.mp3")
myMusic.play();

rightSound = new AddSound("Audio/Bells4.mp3");
wrongSound = new AddSound("Audio/Bells1.mp3");

function flipCard() {

    if (lockCard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlipped) {
        hasFlipped = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch(firstCard, secondCard);
}

function checkForMatch() {

    let isMatch = firstCard.dataset.alien === secondCard.dataset.alien;
    isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
    rightSound.play();
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    count++;
    setTimeout(()=>{rightSound.stop();},1300)
    if (count === 6) {
        window.location.href = "endGame.html"
        sessionStorage.setItem("life", life);
        count = 0;
    }
    resetBoard();

}

function unFlipCards() {
    let removeEl = document.getElementById("" + life);
    removeEl.parentNode.removeChild(removeEl);
    life--;
    wrongSound.play();
    lockCard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        if (life === 0) {
            window.location.href = "endGame.html"
            sessionStorage.setItem("life", life);
        }
        resetBoard();
    }, 300);

}

function resetBoard() {
    [hasFlipped, lockCard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
}

function pageReload() {
    location.reload();
}

function AddSound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));

document.querySelector("button").addEventListener("click", function () {
    pageReload();
})