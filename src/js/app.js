import "normalize.css";
import $ from 'jquery';
import "../styles/main.scss";
import { Game } from "./game.js";
import { Player } from "./player.js";
import { Scoreboard } from "./scoreboard.js";

// Initialize Players
const p1 = new Player(false, 'X'),
    p2 = new Player(true, 'O');
// Initialize Scoreboard
const scoreboard = new Scoreboard([p1, p2]);
scoreboard.init();
// Initialie Game
const game = new Game([p1, p2], scoreboard);
game.initializeGame();

// Cache DOM
const $resetButton = $('.js-reset-button');
const $quitButton = $('.js-quit-button');

//Bind button events
$resetButton.on('click', () => {
    game.resetGame();
});
