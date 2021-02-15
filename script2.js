let life = sessionStorage.getItem("life");
let result = document.getElementById("result"); 
let myMusic = new AddSound("Audio/Guitar-Mayhem-3.mp3")
myMusic.play();
myMusic.loop = true;

if(life>0){  
    result.innerHTML = `Hurray!! You Won!! Score : ${life}`
}else{
    result.innerHTML = "Game Over !!"
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