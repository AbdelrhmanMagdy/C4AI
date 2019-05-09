const diskVals = {
    DEFAULT: 0,
    AI: 1,
    HUMAN: 2
}
class minMax {
    getPossibleMoves(board, cols) {
        const moves = []
        cols.forEach(c => {
            for (let r = board.length - 1; r >= 0; r--) {
                if (board[r][c] == 0) {
                    moves.push({r:r,c:c})
                    break;
                }
            }
        });
        return moves
    }

    maximizer(board, depth, alpha, beta) {
        let maxIndex = 0
        const colsOrder = [0, 1, 2]
        const possibleMoves = this.getPossibleMoves(board, colsOrder)
        if (depth == 0 || !possibleMoves.length) {
            const utilityVal = this.utilityFn()
            return [utilityVal, null]
        }
        for (let i = 0 ; i < possibleMoves.length ; i++)
        {
            board[possibleMoves[i].r][possibleMoves[i].c] = diskVals.AI
            const [minVal,_] =  this.minimizer(board, depth-1, alpha, beta)
            if (minVal > alpha) {
                alpha = minVal;
                maxIndex =  possibleMoves[i].c
            }
            board[possibleMoves[i].r][possibleMoves[i].c] = diskVals.DEFAULT

//            console.log( 'max ' +'depth= ' + depth.toString() + '     i= '+ i.toString() + '     alpha= ' + alpha.toString()+ '     beta= '  + beta.toString())
            if (alpha >= beta) {
                // console.log('Min Breaked at depth: '+depth.toString(), 'beta: '+beta)
                return [alpha, maxIndex];
            }
        }
        // console.log('max depth: '+depth.toString(), 'alpha: '+alpha)

        return [alpha, maxIndex];
    }

    minimizer(board, depth, alpha, beta) {
        let minIndex = 0
        const colsOrder = [0, 1, 2]
        const possibleMoves = this.getPossibleMoves(board ,colsOrder)
        if (depth == 0 || !possibleMoves.length) {
            const utilityVal = this.utilityFn()
            return [utilityVal, null]
        }
        for (let i = 0 ; i < possibleMoves.length ; i++)
        {
            board[possibleMoves[i].r][possibleMoves[i].c] = diskVals.HUMAN
            //beta = Math.min(beta, this.maximizer(board, depth-1, alpha, beta))
            const [maxVal,_ ]=  this.maximizer(board, depth-1, alpha, beta)
            if (maxVal < beta) {
                beta = maxVal;
                minIndex =  possibleMoves[i].c
            }
            board[possibleMoves[i].r][possibleMoves[i].c] = diskVals.DEFAULT

            //console.log('min ' +'depth= ' + depth.toString() + '     i= '+ i.toString() + '     alpha= ' + alpha.toString()+ '     beta= '  + beta.toString())
            if (alpha >= beta) {
                // console.log('Min Breaked at depth: '+depth.toString(), 'beta: '+beta)
                return [beta,minIndex];
            }
        }
        // console.log('min depth: '+depth.toString(), 'beta: '+beta)
        return [beta,minIndex];
    }
    utilityFn() {
        
        const rand = Math.floor(Math.random(0,10)*10)
  //      let v = templist[counter]
        counter++;
        console.log(' score: '+ rand)
        return rand
    }

}


var board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 0]
]
var smBoard = [
    [0, 0, 0],
    [0, 0, 1],
    [0, 1, 1]
]

const obj = new minMax(smBoard)
const alpha = Number.NEGATIVE_INFINITY
const beta = Number.POSITIVE_INFINITY
var counter = 0
//var  templist = [8,2,2,7,4,1,3,3,3 ,1,2,5,3,1,2, 9,9,9,1,8,9,9,1,0]
//var util_list = [8,2,2,7,4,1,3,3,3 ,1,2,5,3,1,2,6,1,4, 9,9,9,1,8,9,9,1,0]
console.log(obj.maximizer([...smBoard], 3, alpha, beta))
console.log('counter: ', counter)