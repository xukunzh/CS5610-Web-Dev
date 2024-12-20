import { useContext } from "react";
import { Cell } from "./Cell";
import { MinesweeperContext } from "../context/MinesweeperContext";

export function Board() {
  const {
    difficulty,
    difficultySettings,
    gameOver,
    isWin,
    resetGame,
    boardState,
    correctFlagsOnMines,
  } = useContext(MinesweeperContext);
  const { rows, cols, mines } = difficultySettings[difficulty];

  if (!boardState || Object.keys(boardState).length === 0) {
    return <div>Loading...</div>;
  }

  const board = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(<Cell key={`${i}-${j}`} row={i} col={j} />);
    }
    board.push(
      <div key={`row-${i}`} className="row">
        {row}
      </div>
    );
  }

  return (
    <div className="board-container">
      <div className="game-header">
        <button onClick={resetGame}>Reset Game</button>
        <div className="mine-counter">
          Mines remaining: {mines - correctFlagsOnMines}
        </div>
        {gameOver && (
          <div className="game-status">{isWin ? "You Won!" : "Game Over!"}</div>
        )}
      </div>
      <div className="board">{board}</div>
    </div>
  );
}
