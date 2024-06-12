const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


const tileSize = 20;

let snake = [{x: 10, y: 10}];

let score = 1;
let dx = 1;
let dy = 0;
let food = {x: 15, y:15 };
let gameOver = false;
let paused = true;
let dificuldade = 160;


function drawSnake(){

    ctx.fillStyle = '#00ff08'
    

    snake.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    })
}


function drawFood() {
    ctx.fillStyle = '#f00'

    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize)
}



function moveSnake(){
    if (!paused) {
        const head = { x : snake[0].x + dx, y: snake[0].y + dy};

        snake.unshift(head)
        

        if(head.x === food.x && head.y === food.y){
            gerateFood();
            pontos();
        } else {
            snake.pop()
        }
        if(checkCollision()){
            gameOver = true;

            setTimeout (() => {
                location.reload();
            }, 5000)
        }
    }
}

function gerateFood() {
    food.x = Math.floor(Math.random() * canvas.width / tileSize);
    food.y = Math.floor(Math.random() * canvas.height / tileSize);
    dificuldade -= 5
}

function clearCanvas() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

function update() {
    clearCanvas();
    drawFood();
    drawSnake();
    moveSnake();
    

    if(!gameOver) {
        setTimeout(update, dificuldade);
    } else {
        ctx.fillStyle = '#ffff';
        ctx.font = '30px Arial';
        ctx.fillText('game Over', canvas.width / 2 - 80, canvas.height / 2);
    }
}


function checkCollision() {
    const head = snake [0];
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x === head.x && snake[i].y === head.y){
            return true;
        }
    }

    return head.x < 0 || head.x >= canvas.width / tileSize || head.y < 0 ||
    head.y >= canvas.height / tileSize
}

document.addEventListener('keydown', e =>{
    if(!gameOver && !paused){
        switch (e.key){
            case 'ArrowUp' : 
            if(dy === 0){
                dx = 0;
                dy = -1;
            }
            break
            case 'ArrowDown':
                if(dy === 0){
                    dx = 0;
                    dy = 1;
                }
                break
            case 'ArrowLeft':
                if(dx === 0){
                    dx = -1;
                    dy = 0;
                }
                break
            case 'ArrowRight':
                if(dx === 0){
                    dx = 1;
                    dy = 0;
                }    
        }
    }
})

const pauseButton = document.getElementById('pauseButton');
pauseButton.addEventListener('click',() => {
    paused = !paused;


    pauseButton.textContent = paused ? 'Resume' : 'pause';
})

const bottaoStart = document.getElementById('startButton');
bottaoStart.addEventListener('click', () =>{
    paused = false;
})



function pontos() {
const pontos_jogo = document.querySelector('h2')
pontos_jogo.textContent = "Score : " + score++
}
update()

