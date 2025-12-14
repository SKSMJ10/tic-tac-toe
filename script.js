const gameboard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getBoard = () => board;

  const resetBoard = () => {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };

  const convertMove = function (place) {
    const row = Math.floor((place - 1) / 3);
    const col = (place - 1) % 3;
    return [row, col];
  };

  const setMove = function (place, player) {
    const [row, col] = convertMove(place);
    if (board[row][col] != "") {
      console.log("Already occupied!");
      return 0;
    }
    board[row][col] = player.symbol();
    return 1;
  };

  return { getBoard, resetBoard, setMove, convertMove };
})();

const makePlayer = (name, symbol) => {
  return {
    name: () => name,
    symbol: () => symbol,
  };
};

const gameController = (() => {
  const pOne = makePlayer("Player One", "X");
  const pTwo = makePlayer("Player Two", "O");
  let win = false;
  let currP = pOne;
  const winningMoves = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const showBoard = () => {
    grid = gameboard.getBoard();
    for (let index = 0; index < grid.length; index++) {
      console.log(`${grid[index][0]} | ${grid[index][1]} | ${grid[index][2]}`);
      console.log("----------");
    }
  };

  const makeMove = (userMove) => {
    if (userMove <= 0 || userMove > 9) {
      console.log("Not a valid move!");
      return;
    } else {
      const check = gameboard.setMove(userMove, currP);
      if (!check) {
        return;
      }

      console.log(`${currP.name()} placed at ${userMove}`);
      showBoard();

      if (checkWin(currP)) {
        console.log(`${currP.name()} wins!`);
        gameboard.resetBoard();
        return;
      }

      currP = currP == pOne ? pTwo : pOne;
    }
  };

  const checkWin = (player) => {
    const boardState = gameboard.getBoard();

    const result = winningMoves.some((combo) => {
      return combo.every((place) => {
        const [row, col] = gameboard.convertMove(place);
        return boardState[row][col] == player.symbol();
      });
    });
    return result;
  };

  return { showBoard, makeMove };
})();
