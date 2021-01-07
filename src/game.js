import Paddle from "/src/paddle.js";
import InputHandler from "/src/input.js";
import Ball from "/src/ball.js";
import Brick from "/src/brick.js";

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }
    start() {
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);

        let bricks = [];
        for (let i = 0; i < 10; i++) {
            bricks.push(new Brick(this, { x: i * 52, y: 30 }));
        }
        this.gameObjects = [this.ball, this.paddle, ...bricks];

        new InputHandler(this.paddle);
    }
    update(deltaTime) {
        this.gameObjects.forEach(object => object.update(deltaTime));
    }
    draw(ctx) {
        this.gameObjects.forEach(object => object.draw(ctx));
    }
}
