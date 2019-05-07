const renderBoard = (tableData) => {
    var gameDiv = document.getElementById('game');
    if (gameDiv.hasChildNodes()){
        gameDiv.removeChild(document.getElementById('board'))
    }
    var table = document.createElement('table');
    table.id = 'board';
    table.className = 'board';
    var tableBody = document.createElement('tbody');
    tableData.forEach((rowData, r) => {
        var row = document.createElement('tr');
        
        rowData.forEach((cellData, c) => {
            var cell = document.createElement('td');
            var btn = document.createElement('button')
            var style = document.createElement('style')
            if (cellData == 1){
                btn.className = 'red';
            }else if(cellData == 2){
                btn.className = 'blue'
            }
            btn.addEventListener("click", function(){ playerClicked(c) });
            cell.appendChild(btn)
            row.appendChild(cell);
        });
        
        tableBody.appendChild(row);
    });
    
    table.appendChild(tableBody);
    gameDiv.appendChild(table)
    document.body.appendChild(gameDiv);
}

const playerClicked = (c) => {
    try{
        game.playAt(c)
    }catch(err){
        alert(err)
    }
    if (game.isWinner(c)){
        renderBoard(game.board)
        setTimeout(()=>{alert('You Win!');game.resetBoard();renderBoard(game.board)}, 0)
        
        return;
    }
    renderBoard(game.board)
    game.tooglePlayer()

    c = game.playAI()
    if (game.isWinner(c)){
        renderBoard(game.board)
        setTimeout(()=>{alert('You Lose!');game.resetBoard();renderBoard(game.board)}, 0)
    }
    renderBoard(game.board)
    game.tooglePlayer()

}