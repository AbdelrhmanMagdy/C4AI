class Game {
    constructor(numRows, numColumns, fill){
        const array = new Array(numRows); 
        for(let i = 0; i < numRows; i++) {
            array[i] = new Array(numColumns).fill(fill); 
        }
        this._board = array; 
        this._playerAI = true;
        this._diskType = diskVals.HUMAN; 
    }
    
    get board() {
        return this._board;
    }
    set board(val) {
        this._board = val;
    }
    get rows() {
        return this._board.length
    }
    get cols() {
        return this._board[0].length
    }
    get playerAI() {
        return this._playerAI
    }
    set playerAI(val) {
        this._playerAI = val
    }
    get diskType() {
        return this._diskType
    }
    set diskType(val) {
        this._diskType = val
    }
    tooglePlayer() {
        this.playerAI = !this.playerAI
        this.diskType==diskVals.AI? this.diskType  = diskVals.HUMAN : this.diskType = diskVals.AI;
    }
    playAt(col) {
        if (col>=this.cols){
            throw new Error('Invalid column index!')
        }
        for(let r=this.rows-1; r>=0; r--){
            if (this.board[r][col]==diskVals.DEFAULT){
                this.board[r][col] =  this.diskType
                return;
            }
        }
        throw new Error('Column max depth excedded!')

    }

    playAI(){
        const [score, pos] = maximizer(this.board, gameDepth, Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY)
        try{
            this.playAt(pos)
        }catch{
            this.playAI()
        }
        return pos
    }

    utility(){
        return Math.floor(Math.random() * this.cols);
    }
    resetBoard(){
        for(let i = 0; i < this.rows; i++) {
            this.board[i].fill(0); 
        }    
    }
    isWinner(col){
        let row = 0
        for(let r=0; r<this.rows; r++){
            if (this.board[r][col]!=0){
                row = r;
                break;
            }
        }

        // check horizontally winning
        for(let r=0; r<this.rows-3; r++){
            if (this.board[r][col]==this.diskType&&this.board[r+1][col]==this.diskType&&this.board[r+2][col]==this.diskType&&this.board[r+3][col] == this.diskType){
                return true
            }
        }
        // check vertically winning
        for(let c=0; c<this.cols-3; c++){
            if (this.board[row][c]==this.diskType&&this.board[row][c+1]==this.diskType&&this.board[row][c+2]==this.diskType&&this.board[row][c+3]== this.diskType){
                return true
            }
        }
        // check diagonally winning
        let r_temp = row
        let c_temp = col
        // right diagonal
        while(r_temp<this.rows-1 && c_temp>0){
            r_temp++;
            c_temp--;
        }
        while(r_temp-3>=0 && c_temp+3<this.cols){
            if(this.board[r_temp][c_temp]==this.diskType&&this.board[r_temp-1][c_temp+1]==this.diskType&&this.board[r_temp-2][c_temp+2]==this.diskType&&this.board[r_temp-3][c_temp+3]==this.diskType){
                return true
            }
            r_temp--;
            c_temp++;
        }
        // left diagonal
        r_temp = row
        c_temp = col
        while(r_temp<this.rows-1 && c_temp<this.cols-1){
            r_temp++;
            c_temp++;
        }
        while(r_temp-3>=0 && c_temp-3>=0){
            if(this.board[r_temp][c_temp]==this.diskType&&this.board[r_temp-1][c_temp-1]==this.diskType&&this.board[r_temp-2][c_temp-2]==this.diskType&&this.board[r_temp-3][c_temp-3]==this.diskType){
                return true
            }
            r_temp--;
            c_temp--;
        }

        return false;
    }

}



