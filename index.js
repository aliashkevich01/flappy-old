const canvas=document.querySelector('#canvas');
const context=canvas.getContext("2d");
const gap=110;

const hero=new Image();
const pipeTop=new Image();
const pipeBot=new Image();
const background=new Image();
const ground=new Image();
let watermelon=new Image();


hero.src="floppa.png";
pipeTop.src="pipe1.png"
pipeBot.src="pipe2.png";
background.src="flappy_flop_bg.png";
ground.src="ground.png";
watermelon.src="ar.png"


let heroX=10;
let heroY=100;
let gravitySpeed=2;
let currentScore=0;
let pipes=[];
pipes[0]={

    x: canvas.width-50,
    y: 0
}


document.addEventListener('keydown', moveHero);
document.addEventListener('click', moveHero);

function moveHero(){
    heroY-=40;
}

function drawGame(){
    context.drawImage(background, 0, 0);
    for(let i=0;i<pipes.length;i++){
        context.drawImage(pipeTop, pipes[i].x, pipes[i].y);
        context.drawImage(pipeBot, pipes[i].x, pipes[i].y+pipeTop.height+gap);
        pipes[i].x--;

        if(pipes[i].x==110){
            pipes.push({
                x: canvas.width+50,
                y:Math.floor(Math.random()*pipeTop.height)-pipeTop.height,
            })
        }

        if(heroX + hero.width >= pipes[i].x&& heroX <= pipes[i].x + pipeTop.width
             && (heroY <= pipes[i].y + pipeTop.height || heroY + hero.height >= pipes[i].y + pipeTop.height + gap) || heroY + hero.height >= canvas.height - ground.height) 
            {
            location.reload();
            }
        if(pipes[i].x==5){
            currentScore++;
        }
    }

    context.drawImage(ground, 0,canvas.height-ground.height);
    context.drawImage(hero, heroX,heroY);
    requestAnimationFrame(drawGame);

    heroY+=gravitySpeed;
    context.fillStyle = "#000";
    context.font = "24px Roboto";
    context.fillText("Пройдено: " + currentScore, 10, canvas.height - 50);
}

drawGame();
