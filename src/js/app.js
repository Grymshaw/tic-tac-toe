import "normalize.css";
import $ from 'jquery';
import "../styles/main.scss";
import { Game } from "./game.js";
import { Player, ComputerPlayer } from "./player.js";
import { Scoreboard } from "./scoreboard.js";

(() => {
    // Cache DOM
    const $resetButton = $('.js-reset-button');
    const $quitButton = $('.js-quit-button');
    const $modeSelect = $('.js-mode-select');
    const $tokenSelect = $('.js-token-select');
    const $gameContainer = $('.js-game-container');
    const $selectSinglePlayer = $('.js-select-1p');
    const $selectTwoPlayer = $('.js-select-2p');
    const $chooseX = $('.js-select-x');
    const $chooseO = $('.js-select-o');

    // Initialize Variables
    let isSinglePlayer;
    let playerOneToken,
        playerTwoToken;
    let p1,
        p2;
    let scoreboard;
    let game;

    //Bind button events
    $gameContainer.on('nextPlayerTurn', () => {
        let currentPlayer = game.getCurrentPlayer();
        console.log('Next player\'s turn');
        console.log('current player: ' + currentPlayer);
        if(p2.isCPU() && currentPlayer === 1) {
            p2.makeMove();
        }
    });
    $selectSinglePlayer.on('click', () => {
        console.log('1P mode');
        isSinglePlayer = true;
        $modeSelect.addClass('hidden');
        $tokenSelect.removeClass('hidden');
    });
    $selectTwoPlayer.on('click', () => {
        console.log('2P mode');
        isSinglePlayer = false;
        $modeSelect.addClass('hidden');
        $tokenSelect.removeClass('hidden');
    });
    $chooseX.on('click', () => {
        console.log('X chosen');
        playerOneToken = 'X';
        playerTwoToken = 'O';
        $tokenSelect.addClass('hidden');
        $gameContainer.removeClass('hidden');
        setupGame();
    });
    $chooseO.on('click', () => {
        console.log('O chosen');
        playerOneToken = 'O';
        playerTwoToken = 'X';
        $tokenSelect.addClass('hidden');
        $gameContainer.removeClass('hidden');
        setupGame();
    });
    $resetButton.on('click', () => {
        game.resetGame();
    });



    function setupGame() {
        //Initialize players
        p1 = new Player(false, playerOneToken);
        p2 = isSinglePlayer ? new ComputerPlayer(playerTwoToken) : new Player(isSinglePlayer, playerTwoToken);
        // Initialize Scoreboard
        scoreboard = new Scoreboard([p1, p2]);
        scoreboard.init();
        // Initialize Game
        game = new Game([p1, p2], scoreboard);
        if(p2.isCPU()) {
            p2.setGameObject(game);
        }
        game.initializeGame();
    }
})();
