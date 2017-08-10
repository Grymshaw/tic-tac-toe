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

export { Player };
