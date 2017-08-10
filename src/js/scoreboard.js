import $ from 'jquery';

function Scoreboard(players) {
    // Initialize variables
    let p1,
        p2;
    // Cache DOM
    const $playerOneName = $('.js-p1-name'),
        $playerTwoName = $('.js-p2-name'),
        $playerOneScore = $('.js-p1-score'),
        $playerTwoScore = $('.js-p2-score');

    this.init = () => {
        p1 = players[0];
        p2 = players[1];
        if(p2.isCPU()) {
            $playerOneName.html('You');
            $playerTwoName.html('Computer');
        } else {
            $playerOneName.html('Player 1');
            $playerTwoName.html('Player 2');
        }
        this.render();
    };
    this.render = () => {
        $playerOneScore.html(p1.getWins());
        $playerTwoScore.html(p2.getWins());
        //TODO: change scoreboard to reflect each players' wins
    };
}

export { Scoreboard };
