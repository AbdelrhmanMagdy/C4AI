const game = new Game(6,7,0)
game.board = [
    [0, 5, 0, 0, 0, 0, 0],
    [0, 1, 0, 5, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 1],
    [0, 1, 1, 1, 0, 5, 1],
    [5, 5, 5, 1, 5, 5, 5],
    [5, 5, 1, 5, 5, 5, 1]
]
renderBoard(game.board)


// let board = [
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 5, 0, 0, 1, 0, 0],
//     [0, 1, 5, 5, 1, 0, 0],
//     [0, 1, 5, 5, 1, 0, 0],
//     [0, 5, 1, 1, 5, 0, 0]
// ]
// require('./minMax')
// require('./global')
// let score = 0
// rows = board.length
// cols = board[0].length
// for (let r = 0; r < rows - 3; r++) {
//     for (let c = 0; c < cols - 3; c++) {
//         const slice = [board[r][c], board[r + 1][c + 1], board[r + 2][c + 2], board[r + 3][c + 3]]
//         score += evalSlice(slice)
//         if (score === Number.POSITIVE_INFINITY) return score
//     }
// }
// const revBoard = board.slice().map(r => r.slice().reverse())
// for (let r = 0; r < rows - 3; r++) {
//     for (let c = 0; c < cols - 3; c++) {
//         const slice = [revBoard[r][c], revBoard[r + 1][c + 1], revBoard[r + 2][c + 2], revBoard[r + 3][c + 3]]
//         score += evalSlice(slice)
//         if (score === Number.POSITIVE_INFINITY) return score
//     }
// }

// console.log(score)