const startScreen = document.querySelector('.startScreen');

const area = document.querySelector('.area');

const score = document.querySelector('.score');



document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);



let keys = {ArrowUp : false, ArrowDown : false, ArrowRight : false, ArrowLeft: false}
let player = { speed : 8, score :0 };




function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key);
}



function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key);
}

//  touchfire

function isCollide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) ||
     (aRect.right < bRect.left) || (aRect.left > bRect.right));
}

// endgame function
function endGame(){

    player.startScreen = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML =`Game Over your final Score is: ${player.score + 2} <br>press here to restart the game`
    
    
}



// moving lines function

function moveEnemy(car){

    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){


        if(isCollide(car,item)){
             console.log("Boom Hit");
              endGame();
        }

       
        if(item.y >= 750){
            item.y = -300;
            item.style.left = Math.floor(Math.random() *350) + "px";
        }
     item.y +=player.speed;
 
     item.style.top = item .y+ "px";
 
    });    
 }


// moving lines function

function moveLines(){

    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item){
        if(item.y>=700){
            item.y -= 750;
        }
     item.y +=player.speed;
 
     item.style.top = item .y+ "px";
 
    });
 }
 

// play game

function gamePlay(){
    // console.log("hey i'm Clicked.");
    score.classList.remove('hide');
    area.classList.remove('hide');

    let car = document.querySelector('.car');
    let road = area.getBoundingClientRect();
    // console.log(road);

   
    if(player.startScreen){

        moveLines();
        moveEnemy(car);
        if(keys.ArrowUp && player.y > (road.top+70 )){ player.y -= player.speed;}
        if(keys.ArrowDown && player.y <(road.bottom-70)){ player.y += player.speed;}

        if(keys.ArrowLeft && player.x>0){ player.x -= player.speed;}
        if(keys.ArrowRight && player.x< (road.width-50)){ player.x += player.speed;}
        
        car.style.top = player.y + "px";
        car.style.left = player.x +"px";

        window.requestAnimationFrame(gamePlay);
        console.log(player.score++);
        player.score++;
        score.innerText= 'Score: '+ player.score;
    }
}


// start game from here

startScreen.addEventListener('click',startGame);


function randomColor(){

    function c(){
        let hex = Math.floor(Math.random()* 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();
}


function startGame(){
     
     startScreen.classList.add('hide'); 
     area.innerHTML="";  

    player.startScreen = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for(let x=0; x<5; x++){

    let roadLine = document.createElement('div');
    roadLine.setAttribute('class','lines');
    roadLine.y = (x*150);
    roadLine.style.top = roadLine.y + "px";
    area.appendChild(roadLine);

    }

    let car = document.createElement('div');
    car.setAttribute('class','car');
    // car.innerText = 'hey i am your car';
    area.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    // console.log("top position " +car.offsetTop);
    // console.log("left position " +car.offsetLeft);
    for(let x=0; x<3; x++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class','enemy');
        enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random() *350) + "px";
        enemyCar.y = ((x+1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        area.appendChild(enemyCar);
    
        }
}



