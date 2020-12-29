import Paddle from "/src/paddle.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gameWidth = 1280;
const gameHeight = 720;

ctx.clearRect(0, 0, 1280, 720);

let paddle = new Paddle(gameWidth, gameHeight);

paddle.draw(ctx);
