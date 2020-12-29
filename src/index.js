import Paddle from "/src/paddle.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gameWidth = 1280;
const gameHeight = 720;

let paddle = new Paddle(gameWidth, gameHeight);

paddle.draw(ctx);
let lastTime = 0;
function gameLoop(timestmap) {
    let deltaTime = timestmap - lastTime;
    lastTime = timestmap;

    ctx.clearRect(0, 0, 1280, 720);
    paddle.update(deltaTime);
    paddle.draw(ctx);

    requestAnimationFrame(gameLoop);
}
gameLoop();
