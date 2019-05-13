var spinner = new Spinner().spin();
/**
 * Create and render the game board with DOM elements.
 * @param  {Number[][]} tableData 2D array containing the game board values.
 */
const renderBoard = tableData => {
  var gameDiv = document.getElementById('game');
  if (gameDiv.hasChildNodes()) {
    gameDiv.removeChild(document.getElementById('board'));
  }
  var table = document.createElement('table');
  table.id = 'board';
  table.className = 'board';
  var tableBody = document.createElement('tbody');
  tableData.forEach((rowData, r) => {
    var row = document.createElement('tr');

    rowData.forEach((cellData, c) => {
      var cell = document.createElement('td');
      var btn = document.createElement('button');
      var style = document.createElement('style');
      if (cellData == diskVals.AI) {
        btn.className = 'red';
      } else if (cellData == diskVals.HUMAN) {
        btn.className = 'blue';
      }
      btn.addEventListener('click', function() {
        playerClicked(c);
      });
      cell.appendChild(btn);
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  gameDiv.appendChild(table);
  document.body.appendChild(gameDiv);
};

/**
 * Fires when a Human play at certin columns.
 * calls the AI play function and checks the winning conditions after each play.
 */
const playerClicked = c => {
  try {
    game.playAt(c);
  } catch (err) {
    alert(err);
  }
  if (game.isWinner(c)) {
    renderBoard(game.board);
    setTimeout(() => {
      swal({
        title: 'Congrats you win!',
        buttons: ['cancel','Play Again']
      }).then(ok => {
        if (ok) {
          game.resetBoard();
          renderBoard(game.board);
        }
      });
    }, 0);

    return;
  }
  renderBoard(game.board);
  game.tooglePlayer();
  document.body.appendChild(spinner.el);
  setTimeout(() => {
    c = game.playAI();
    if (game.isWinner(c)) {
      renderBoard(game.board);
      setTimeout(() => {
        swal({
          title: 'AI win!',
          buttons: ['cancel','Play Again']
        }).then(ok => {
          if (ok) {
            game.resetBoard();
            renderBoard(game.board);
          }
        });
      }, 0);
    }
    renderBoard(game.board);
    game.tooglePlayer();
    document.body.removeChild(spinner.el);
  }, 0);
};
