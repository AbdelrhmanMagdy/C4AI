class minMax {
    constructor(board, depth) {
        this._board = board;
        this._depth = depth;
    }
    get board() {
        return this._board
    }

    getPossibleMoves(cols) {
        const moves = []
        cols.forEach(c => {
            for (let r = this.board.length - 1; r >= 0; r--) {
                if (this.board[r][c] == 0) {
                    moves.push([r, c])
                    break;
                }
            }
        });
        return moves
    }

    maximizer(depth, alpha, beta) {
        const colsOrder = [0, 1, 2]
        const possibleMoves = this.getPossibleMoves(colsOrder)
        if (depth == 0 || !possibleMoves.length) {
            const utilityVal = this.utilityFn()
            return utilityVal
        }
        for (let j = 0 ; j < 3 ; j++)
        {
            alpha = Math.max(alpha, this.minimizer(depth-1, alpha, beta))
//            console.log( 'max ' +'depth= ' + depth.toString() + '     i= '+ i.toString() + '     alpha= ' + alpha.toString()+ '     beta= '  + beta.toString())
            if (alpha >= beta) {
                // console.log('Min Breaked at depth: '+depth.toString(), 'beta: '+beta)
                return alpha;
            }
        }
        // possibleMoves.forEach(move => {
        //     alpha = Math.max(alpha, this.minimizer(depth-1, alpha, beta))
        //     console.log('depth= ' + depth.toString() + '     i= '+ i.toString() + '     alpha= ' + alpha.toString()+ '     beta= '  + beta.toString())
        //     i++
        //     if (alpha >= beta) {
        //         // console.log('Max Breaked at depth: '+depth.toString(), 'alpha: '+alpha)
        //         return alpha;
        //     }
        // });
        // console.log('max depth: '+depth.toString(), 'alpha: '+alpha)

        return alpha;
    }

    minimizer(depth, alpha, beta) {
        let i = 0
        const colsOrder = [0, 1, 2]
        const possibleMoves = this.getPossibleMoves(colsOrder)
        if (depth == 0 || !possibleMoves.length) {
            const utilityVal = this.utilityFn()
            return utilityVal
        }
        for (let j = 0 ; j < 3 ; j++)
        {
            beta = Math.min(beta, this.maximizer(depth-1, alpha, beta))
            //console.log('min ' +'depth= ' + depth.toString() + '     i= '+ i.toString() + '     alpha= ' + alpha.toString()+ '     beta= '  + beta.toString())
            if (alpha >= beta) {
                // console.log('Min Breaked at depth: '+depth.toString(), 'beta: '+beta)
                return beta;
            }
        }
        // possibleMoves.forEach(move => {
        //     beta = Math.min(beta, this.maximizer(depth-1, alpha, beta))
        //     if (alpha >= beta) {
        //         // console.log('Min Breaked at depth: '+depth.toString(), 'beta: '+beta)
        //         return beta;
        //     }
        // });
        // console.log('min depth: '+depth.toString(), 'beta: '+beta)
        return beta;
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
    [0, 0, 0],
    [0, 0, 0]
]

const obj = new minMax(smBoard)
const alpha = Number.NEGATIVE_INFINITY
const beta = Number.POSITIVE_INFINITY
var counter = 0
//var  templist = [8,2,2,7,4,1,3,3,3 ,1,2,5,3,1,2, 9,9,9,1,8,9,9,1,0]
//var util_list = [8,2,2,7,4,1,3,3,3 ,1,2,5,3,1,2,6,1,4, 9,9,9,1,8,9,9,1,0]
console.log(obj.maximizer(3, alpha, beta))
console.log('counter: ', counter)