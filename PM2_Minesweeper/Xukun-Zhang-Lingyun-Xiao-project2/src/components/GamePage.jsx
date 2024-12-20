import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MinesweeperContext } from "../context/MinesweeperContext";
import { Board } from "./Board";

export function GamePage() {
  const { difficulty } = useParams();
  const { setDifficulty, resetGame } = useContext(MinesweeperContext);
  const {
    saveGameData,
    loadPreviousGameData,
    clearGameHistory,
    localStorageData,
  } = useContext(MinesweeperContext);

  useEffect(() => {
    if (["easy", "medium", "hard"].includes(difficulty)) {
      setDifficulty(difficulty);
      setTimeout(() => {
        resetGame();
      }, 0);
    }
  }, [difficulty, setDifficulty, resetGame]);

  return (
    <div className="game-page">
      <h1>
        Minesweeper -{" "}
        {difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1)}
      </h1>
      <Board />
      <button onClick={saveGameData}>Save Your Data</button>
      {localStorageData ? (
        <div>
          <button onClick={loadPreviousGameData}>
            Load Your Previous Game
          </button>
        </div>
      ) : null}
      {localStorageData ? (
        <button onClick={clearGameHistory}>Clear game history</button>
      ) : null}
    </div>
  );
}
