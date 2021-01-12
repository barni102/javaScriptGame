import Paddle from "/src/paddle.js";
import InputHandler from "/src/input.js";
import Ball from "/src/ball.js";
import { buildLevel, levels } from "/src/levels.js";

const GAMESTATE = {
    PAUSED: "Pause",
    RUNNING: "Running",
    MENU: "Menu",
    GAMEOVER: "Gameover",
    NEWLEVEL: "NewLevel",
    WIN: "Win",
};

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.bricks = [];
        this.livesImg = [];
        this.lives = 3;
        this.levels = levels;
        this.currentLevel = 0;
        new InputHandler(this.paddle, this);
    }

    start() {
        if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL) {
            return;
        }

        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();

        this.gameObjects = [this.ball, this.paddle];
        this.gamestate = GAMESTATE.RUNNING;
    }
    update(deltaTime) {
        console.log(this.gamestate);
        if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;
        if (
            this.gamestate === GAMESTATE.PAUSED ||
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.GAMEOVER ||
            this.gamestate === GAMESTATE.WIN
        )
            return;

        if (this.bricks.length === 0) {
            this.currentLevel++;
            this.gamestate = GAMESTATE.NEWLEVEL;
            if (this.currentLevel == this.levels.length) {
                this.gamestate = GAMESTATE.WIN;
            }
            this.start();
        }

        [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime));
        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
    }
    draw(ctx) {
        [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));
        ctx.font = "30px Arial";
        ctx.fillText("Level " + (this.currentLevel + 1 + " / " + this.levels.length), 100, 50);
        ctx.font = "30px Arial";
        ctx.fillText("Lives " + ("3 / " + this.lives), 1180, 50);

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
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "White";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACEBAR To START", this.gameWidth / 2, this.gameHeight / 2);
        }
        if (this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "White";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
        }
        if (this.gamestate === GAMESTATE.WIN) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();
            ctx.font = "30px Arial";
            ctx.fillStyle = "White";
            ctx.textAlign = "center";
            ctx.fillText(
                "Congrtulation you beat the game",
                this.gameWidth / 2,
                this.gameHeight / 2
            );
        }
    }
    togglePause() {
        if (this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.WIN) return;
        if (this.gamestate === GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }
}
