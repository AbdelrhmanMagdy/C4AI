// require('./global');
const getPossibleMoves = (board, cols) => {
    const moves = []
    cols.forEach(c => {
        for (let r = board.length - 1; r >= 0; r--) {
            if (board[r][c] == 0) {
                moves.push({
                    r: r,
                    c: c
                })
                break;
            }
        }
    });
    return moves
}

const maximizer = (_board, depth, alpha, beta) => {
    const board = [..._board]
    let maxIndex = 0
    const colsOrder = [...Array(board[0].length).keys()];
    const possibleMoves = getPossibleMoves(board, colsOrder)
    if (depth == 0 || !possibleMoves.length) {
        const utilityVal = utilityFn(board)
        return [utilityVal, null]
    }
    if (utilityFn(board) === Number.POSITIVE_INFINITY) {
        return [Number.POSITIVE_INFINITY, null]
    }
    if (utilityFn(board) === Number.NEGATIVE_INFINITY) {
        return [Number.NEGATIVE_INFINITY, null]
    }

    for (let i = 0; i < possibleMoves.length; i++) {
        board[possibleMoves[i].r][possibleMoves[i].c] = diskVals.AI
        const [minVal, _] = minimizer(board, depth - 1, alpha, beta)
        if (minVal > alpha) {
            alpha = minVal;
            maxIndex = possibleMoves[i].c
        }
        board[possibleMoves[i].r][possibleMoves[i].c] = diskVals.DEFAULT

        if (alpha >= beta) {
            return [alpha, maxIndex];
        }
    }
    return [alpha, maxIndex];
}

const minimizer = (_board, depth, alpha, beta) => {
    const board = [..._board]
    let minIndex = 0
    const colsOrder = [...Array(board[0].length).keys()];
    const possibleMoves = getPossibleMoves(board, colsOrder)
    if (depth == 0 || !possibleMoves.length) {
        const utilityVal = utilityFn(board)
        return [utilityVal, null]
    }
    if (utilityFn(board) === Number.POSITIVE_INFINITY) {
        return [Number.POSITIVE_INFINITY, null]
    }
    if (utilityFn(board) === Number.NEGATIVE_INFINITY) {
        return [Number.NEGATIVE_INFINITY, null]
    }

    for (let i = 0; i < possibleMoves.length; i++) {
        board[possibleMoves[i].r][possibleMoves[i].c] = diskVals.HUMAN
        const [maxVal, _] = maximizer(board, depth - 1, alpha, beta)
        if (maxVal < beta) {
            beta = maxVal;
            minIndex = possibleMoves[i].c
        }
        board[possibleMoves[i].r][possibleMoves[i].c] = diskVals.DEFAULT
        if (alpha >= beta) {
            return [beta, minIndex];
        }
    }
    return [beta, minIndex];
}


evalSlice = (slice) => {
    if (slice.reduce((a, b) => a + b, 0) === diskVals.HUMAN * 4) {
        return Number.NEGATIVE_INFINITY
    }
    if (slice.reduce((a, b) => a + b, 0) === diskVals.AI * 4) {
        return Number.POSITIVE_INFINITY
    }
    if (slice.findIndex(x => x === diskVals.HUMAN) < 0) {
        const sum = slice.reduce((a, b) => a + b, 0);
        return Math.pow(sum, 2);
    } else if (slice.findIndex(x => x === diskVals.AI) < 0) {
        const sum = slice.reduce((a, b) => a + b, 0) / 5
        return Math.pow(sum, sum);
    }
    return 0;
}

const utilityFn = (_board) => {
    const board = [..._board]
    const rows = board.length
    const cols = board[0].length
    // check horizontally winning
    let score = 0
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 3; c++) {
            const slice = board[r].slice(c, c + 4)
            score += evalSlice(slice)
            if (score == Number.POSITIVE_INFINITY) return score
        }
    }
    // check virtically winning
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 3; r++) {
            const slice = [board[r][c], board[r + 1][c], board[r + 2][c], board[r + 3][c]]
            score += evalSlice(slice)
            if (score === Number.POSITIVE_INFINITY) return score

        }
    }

    // check diagonally
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
    return score
    // const rand = Math.floor(Math.random(0, 10) * 10)
    // //      let v = templist[counter]
    // counter++;
    // console.log(' score: ' + rand)
    // return rand
}



var board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0],
    [5, 5, 1, 1, 5, 5, 0]
]
// const [score, pos] = maximizer(board, 5, Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY)
// console.log(pos)
// utilityFn(board)
// var smBoard = [
//     [0, 0, 0],
//     [0, 0, 1],
//     [0, 1, 1]
// ]

// const obj = new minMax(smBoard)
// const alpha = Number.NEGATIVE_INFINITY
// const beta = Number.POSITIVE_INFINITY
// var counter = 0
// //var  templist = [8,2,2,7,4,1,3,3,3 ,1,2,5,3,1,2, 9,9,9,1,8,9,9,1,0]
// //var util_list = [8,2,2,7,4,1,3,3,3 ,1,2,5,3,1,2,6,1,4, 9,9,9,1,8,9,9,1,0]
// console.log(obj.maximizer([...smBoard], 3, alpha, beta))
// console.log('counter: ', counter)