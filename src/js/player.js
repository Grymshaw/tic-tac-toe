import $ from 'jquery';

function Player(isComputer, gamePiece) {
    const isCPU = isComputer,
        token = gamePiece;
    let wins = 0;
    this.getWins = () => {
        return wins;
    };
    this.incrementWins = () => {
        wins += 1;
    };
    this.isCPU = () => {
        return isCPU;
    };
    this.getToken = () => {
        return token;
    };
}


function ComputerPlayer(gamePiece) {
    Player.call(this, true, gamePiece);
    const MOVE_DELAY = 750;
    // const $gameContainer = $('.game-container');
    this.gameObject = null;
    this.setGameObject = (gameObject) => {
        this.gameObject = gameObject;
    };
    this.makeMove = () => {
        const possibleMoves = this.gameObject.getBoard().reduce((acc, row, y) => {
            let openCells = row.reduce((cells, cell, x) => {
                if(cell === null) {
                    cells.push([x,y]);
                }
                return cells;
            }, []);
            return acc.concat(openCells);
        }, []);
        const move = possibleMoves[ Math.floor(Math.random() * possibleMoves.length) ];
        setTimeout(() => {
            this.gameObject.makeMove(this, move[0], move[1]);
        }, MOVE_DELAY);
    };
}
ComputerPlayer.prototype = Object.create(Player.prototype);
ComputerPlayer.prototype.constructor = ComputerPlayer;


export { Player, ComputerPlayer };
