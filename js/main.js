let game = new Game(gameDims.rows, gameDims.cols)
renderBoard(game.board)
swal({
    title: "Do you want to start first?",
    buttons: ["No", "Yes"],
})
.then((ok) => {
    if (ok) {
        game.resetBoard()
        renderBoard(game.board)
    } else {
        console.log(ok)
        game.resetBoard()
        renderBoard(game.board)
        startWithAI()
    }
});