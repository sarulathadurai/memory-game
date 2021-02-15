let life = sessionStorage.getItem("life");
let result = document.getElementById("result"); 
if(life>0){  
    result.innerHTML = `Hurray!! You Won!! Aliens are restored back.Score : ${life}`
}else{
    result.innerHTML = `Hurray!! Aliens are restored back.Score : ${life}`
    result.innerHTML = "Game Over !!"
}
