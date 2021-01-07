export default class InputHandler {
    constructor(paddle, game) {
        document.addEventListener("keydown", Event => {
            switch (Event.key) {
                case "ArrowLeft":
                    paddle.moveLeft();
                    break;
                case "ArrowRight":
                    paddle.moveRight();
                    break;
                case "a":
                    paddle.moveLeft();
                    break;
                case "d":
                    paddle.moveRight();
                    break;
                case "Escape":
                    game.togglePause();
                    break;
            }
        });
        document.addEventListener("keyup", Event => {
            console.log(Event.key);
            switch (Event.key) {
                case "ArrowLeft":
                    if (paddle.speed < 0) paddle.stop();
                    break;
                case "ArrowRight":
                    if (paddle.speed > 0) paddle.stop();
                    break;
                case "a":
                    if (paddle.speed < 0) paddle.stop();
                    break;
                case "d":
                    if (paddle.speed > 0) paddle.stop();
                    break;
            }
        });
    }
}
