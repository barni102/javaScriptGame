import Game from "/src/game.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gameWidth = 1280;
const gameHeight = 720;

let game = new Game(gameWidth, gameHeight);
game.start();

let lastTime = 0;

function gameLoop(timestmap) {
    let deltaTime = timestmap - lastTime;
    lastTime = timestmap;

    ctx.clearRect(0, 0, gameWidth, gameHeight);

    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
