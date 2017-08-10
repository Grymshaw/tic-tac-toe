import "normalize.css";
import $ from 'jquery';
import "../styles/main.scss";
import { Game } from "./game.js";
import { Player, ComputerPlayer } from "./player.js";
import { Scoreboard } from "./scoreboard.js";

// Initialize Players
const p1 = new Player(false, 'X');
const p2 = new ComputerPlayer('O');
// Initialize Scoreboard
const scoreboard = new Scoreboard([p1, p2]);
scoreboard.init();
// Initialize Game
const game = new Game([p1, p2], scoreboard);
p2.setGameObject(game);

// Cache DOM
const $resetButton = $('.js-reset-button');
const $quitButton = $('.js-quit-button');
const $gameContainer = $('.game-container');
//Bind button events
$gameContainer.on('nextPlayerTurn', () => {
    console.log('Next player\'s turn');
    console.log('current player: ' + game.getCurrentPlayer());
    if(game.getCurrentPlayer() === 1) {
        // setTimeout(() => {
            p2.makeMove();
        // }, 2000);
    }
});
$resetButton.on('click', () => {
    game.resetGame();
});


game.initializeGame();
