import Paddle from "/src/paddle.js";
import InputHandler from "/src/input.js";
import Ball from "/src/ball.js";
import { buildLevel, level1 } from "/src/levels.js";

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
};

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        new InputHandler(this.paddle, this);
    }
    start() {
        if (this.gamestate !== GAMESTATE.MENU) return;
        let bricks = buildLevel(this, level1);

        this.gameObjects = [this.ball, this.paddle, ...bricks];
        this.gamestate = GAMESTATE.RUNNING;
    }
    update(deltaTime) {
        if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU) return;
        this.gameObjects.forEach(object => object.update(deltaTime));
        this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion);
    }
    draw(ctx) {
        this.gameObjects.forEach(object => object.draw(ctx));

        if (this.gamestate === GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "White";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }
        if (this.gamestate === GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "White";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACEBAR To START", this.gameWidth / 2, this.gameHeight / 2);
        }
    }
    togglePause() {
        if (this.gamestate === GAMESTATE.MENU) return;
        if (this.gamestate === GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }
}
