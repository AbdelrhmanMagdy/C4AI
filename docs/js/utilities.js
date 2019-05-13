/**
 * Functions fires based on event listeners in DOM elements
 */

saveState = () => {
    localStorage.setItem('gameState', JSON.stringify({
        board: game.board
    }));
    swal({
        title: "Your game saved successfully!",
        icon: "success",
    });
}

loadState = () => {
    game.board = JSON.parse(localStorage.getItem('gameState')).board
    renderBoard(game.board)
    swal({
        title: "Your last game loaded successfully!",
        icon: "success",
    });
}

selectDifficulty = (level, label) => {
    gameDepth = level
    const btn = document.getElementById('lvlDiff');
    btn.innerHTML = label + ' <span class="caret"></span>';
    swal({
        title: "your difficulty level is " + label + '!',
        icon: "success",
    });
}

restart = () => {
    swal({
            title: "Are you sure?",
            text: "Once restart, you will not be able to recover your last game!",
            icon: "warning",
            buttons: ["Cancel", "Restart"],
            dangerMode: true,
        })
        .then((ok) => {
            if (ok) {
                game.resetBoard()
                renderBoard(game.board)
            }
        });
}

setBoardSize = (r, c) => {
    const btn = document.getElementById('boardSize');
    btn.innerHTML = `${r}x${c} <span class="caret"></span>` ;
    game = new Game(r, c)
    renderBoard(game.board)
}