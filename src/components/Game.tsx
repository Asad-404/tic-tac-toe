import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const [history, setHistory] = useState<(string | null)[][]>([
    Array(9).fill(null),
  ]);

  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: (string | null)[]) {
    setXIsNext((prev) => !prev);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(idx: number) {
    setCurrentMove(idx);
    setXIsNext(idx % 2 === 0);
  }

  const moves = history.map((_, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move # ${move}`;
    } else {
      description = "Go to start the game";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="flex justify-center">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <div>{moves}</div>
    </div>
  );
}
