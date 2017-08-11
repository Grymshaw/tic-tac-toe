import $ from 'jquery';
// import Player from './player.js';

function Game(playersArray, scoreboardObject) {
    // Initialize Variables
    const players = playersArray;
    const scoreboard = scoreboardObject;
    let board,
        currentPlayer,
        isGameOver;
    // Cache DOM
    const $gameTiles = $('.game-board__tile'),
        $gameContainer = $('.game-container'),
        $innerWrapper = $('.js-board-overlay'),
        $overlayText = $('.js-overlay-text');
    // Bind events
    $.each($gameTiles, (index, el) => {
        $(el).on('click', () => {
            // don't do anything if not player's turn against CPU
            if( (!players[0].isCPU() && !players[1].isCPU()) ||
                (players[1].isCPU() && currentPlayer === 0) ) {
                let col = index % 3;
                let row = Math.floor(index / 3);
                this.makeMove(players[currentPlayer], col, row);
            }
        });
    });

    this.initializeGame = () => {
        isGameOver = false;
        board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.render();
        this.nextPlayer( Math.round(Math.random()) );
    };

    this.makeMove = (player, x, y) => {
        // only make move if cell is empty
        if(board[y][x] === null) {
            board[y][x] = player.getToken();
            let winningToken = this.checkGameOver();
            this.render();
            if(isGameOver) {
                this.endGame(winningToken);
            } else {
                this.nextPlayer( (currentPlayer + 1) % 2 );
            }
        }
    };

    this.checkGameOver = () => {
        let winningToken;
        //check rows
        for(let i = 0; i < 3 && !isGameOver; i++) {
            if(board[i][0] !== null && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
                winningToken = board[i][0];
            }
        }
        //check columns
        for(let i = 0; i < 3 && !isGameOver; i++) {
            if(board[0][i] !== null && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
                winningToken = board[0][i];
            }
        }
        //check diagonals
        if( (board[0][0] !== null && board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
            (board[0][2] !== null && board[0][2] === board[1][1] && board[1][1] === board[2][0]) ) {
            winningToken = board[1][1];
        }

        // Check if it's a draw if no winner
        let isDraw;
        if(!winningToken) {
            isDraw = board.reduce((acc, row) => {
                return acc && row.reduce((acc, cell) => {
                    return acc && cell !== null;
                }, true);
            }, true);
        }

        if(isDraw) {
            winningToken = ' ';
        }
        if(winningToken) {
            isGameOver = true;
        }
        return winningToken;
    };

    this.render = () => {
        if(isGameOver) {
            $innerWrapper.addClass('hidden');
        }
        board.map((val, i) => {
            val.map((val, j) => {
                let index = 3 * i + j;
                $($gameTiles[index]).html(board[i][j]);
            });
        });
    };

    this.endGame = (token) => {
        // Reveal overlay and adjust overlay text
        $innerWrapper.removeClass('hidden');
        $overlayText.html(`
            Game over.<br/>
            ${token === ' ' ? 'Draw' : `${token}'s win!`}
        `);
        // Increment winner's score
        if (players[0].getToken() === token)
            players[0].incrementWins();
        else if (players[1].getToken() === token)
            players[1].incrementWins();
        scoreboard.render();
    };

    this.resetGame = () => {
        board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.nextPlayer( Math.round(Math.random()) );
        this.render();
        isGameOver = false;
    };

    this.nextPlayer = (index) => {
        currentPlayer = index;
        $gameContainer.trigger('nextPlayerTurn');
    };

    this.getCurrentPlayer = () => {
        return currentPlayer;
    };

    this.getBoard = () => {
        return board;
    };

}

export { Game };
