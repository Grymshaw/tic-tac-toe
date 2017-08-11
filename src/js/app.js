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
    const $innerWrapper = $('.js-board-overlay');
    const $selectSinglePlayer = $('.js-select-1p');
    const $selectTwoPlayer = $('.js-select-2p');
    const $chooseX = $('.js-select-x');
    const $chooseO = $('.js-select-o');
    const turnIndicatorP1 = $('.js-turn-indicator-p1');
    const turnIndicatorP2 = $('.js-turn-indicator-p2');

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
        if(currentPlayer === 0) {
            turnIndicatorP1.removeClass('hidden');
            turnIndicatorP2.addClass('hidden');
        } else {
            turnIndicatorP1.addClass('hidden');
            turnIndicatorP2.removeClass('hidden');
        }
        if(p2.isCPU() && currentPlayer === 1) {
            p2.makeMove();
        }
    });
    $selectSinglePlayer.on('click', () => {
        isSinglePlayer = true;
        $modeSelect.addClass('hidden');
        $tokenSelect.removeClass('hidden');
    });
    $selectTwoPlayer.on('click', () => {
        isSinglePlayer = false;
        $modeSelect.addClass('hidden');
        $tokenSelect.removeClass('hidden');
    });
    $chooseX.on('click', () => {
        playerOneToken = 'X';
        playerTwoToken = 'O';
        $tokenSelect.addClass('hidden');
        $gameContainer.removeClass('hidden');
        setupGame();
    });
    $chooseO.on('click', () => {
        playerOneToken = 'O';
        playerTwoToken = 'X';
        $tokenSelect.addClass('hidden');
        $gameContainer.removeClass('hidden');
        setupGame();
    });
    $resetButton.on('click', () => {
        game.resetGame();
    });
    // $quitButton.on('click', () => {
    //     setupGame();
    //     $innerWrapper.addClass('hidden');
    //     $gameContainer.addClass('hidden');
    //     $modeSelect.removeClass('hidden');
    // });



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
