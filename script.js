const cards = document.querySelectorAll('.memory-card');
shuffle();
let hasFlipped = false;
let firstCard ,secondCard;
let lockCard = false;
let count = 0;


function flipCard(){

    if (lockCard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if(!hasFlipped){
        hasFlipped = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch(firstCard,secondCard);
}

function checkForMatch() {

    let isMatch = firstCard.dataset.alien === secondCard.dataset.alien;
    isMatch ? disableCards():unFlipCards();
}

function disableCards(){

    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);
    count = count + 1;
    console.log(count);
    if(count === 6){
        setTimeout(()=>{
        console.log("game-over")
        document.getElementsByClassName("memory-game")[0].style.display = "none";
        document.getElementsByClassName("play-again")[0].style.display = "block";
        count = 0;
        },1000)
    }
    resetBoard();

}

function unFlipCards(){

    lockCard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    },300);

}

function resetBoard(){
    [hasFlipped,lockCard] = [false,false];
    [firstCard,secondCard] = [null,null];
}

function shuffle() {
       cards.forEach(card => {
         let ramdomPos = Math.floor(Math.random() * 12);
         card.style.order = ramdomPos;
       });
     }

function pageReload(){
    location.reload();
}
    
cards.forEach(card => card.addEventListener('click',flipCard));


document.querySelector("img").addEventListener("click",function(){
    document.getElementsByClassName("play-card")[0].style.display = "none";
    document.getElementsByClassName("memory-game")[0].style.display = "flex";
  });

document.querySelector("button").addEventListener("click",function(){
   pageReload();
})