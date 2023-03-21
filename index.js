// Import stylesheets
import './style.css';

// Write Javascript code!
// Configuração inicial do jogo
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
const gridSize = 10;
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;
let snake = [{ x: 5, y: 5 }];
let direction = "right";
let food = {};

// Função para desenhar a cobrinha
function drawSnake() {
  snake.forEach((segment) => {
    ctx.fillStyle = "#000";
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });
}

// Função para mover a cobrinha
function moveSnake() {
  let head = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }
  if (head.x < 0) {
    head.x = gridWidth - 1;
  }
  if (head.x >= gridWidth) {
    head.x = 0;
  }
  if (head.y < 0) {
    head.y = gridHeight - 1;
  }
  if (head.y >= gridHeight) {
    head.y = 0;
  }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    createFood();
  } else {
    snake.pop();
  }
}

// Função para desenhar a comida
function drawFood() {
  ctx.fillStyle = "#f00";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Função para criar uma nova comida em uma posição aleatória
function createFood() {
  food = {
    x: Math.floor(Math.random() * gridWidth),
    y: Math.floor(Math.random() * gridHeight),
  };
}

// Função para atualizar o estado do jogo
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveSnake();
  drawSnake();
// desenha a cobrinha
drawSnake();
// desenha a comida
drawFood();
// agendador para a próxima atualização do jogo
setTimeout(update, 100);
}

// Função para lidar com eventos de teclado
function handleKeyDown(event) {
switch (event.key) {
case "ArrowUp":
if (direction !== "down") {
direction = "up";
}
break;
case "ArrowDown":
if (direction !== "up") {
direction = "down";
}
break;
case "ArrowLeft":
if (direction !== "right") {
direction = "left";
}
break;
case "ArrowRight":
if (direction !== "left") {
direction = "right";
}
break;
}
}

// Configuração inicial do jogo
createFood();
document.addEventListener("keydown", handleKeyDown);
update();