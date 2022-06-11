import React, { useState } from "react";
import { useEffect } from "react";
// import ReactDOM from "react-dom/client";
import "../index.css";
import { calculateWinner } from "../util/util";

function Square(props) {
  return (
    <button
      className="square"
      style={{ width: "100px", height: "100px", fontSize: "50px" }}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

function Board(props) {
  const board = [];
  var i = 1;
  var row = [];
  const renderSquare = (i) => (
    <Square
      key={i.toString()}
      value={props.squares[i]}
      onClick={() => props.onClick(i)}
    />
  );

  while (i <= 9) {
    row.push(renderSquare(i - 1));
    if (i % 3 === 0) {
      // ... => expand operator
      let newrow = [...row];
      board.push(
        <div key={i.toString()} className="flex flex-row">
          {newrow}
        </div>
      );
      row = [];
    }
    i++;
  }
  return <div className="flex flex-col">{board}</div>;
}

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("");
  const [moves, SetMoves] = useState();

  const handleClick = (i) => {
    console.log("click No. " + i);
    const copyHistory = history.slice(0, stepNumber + 1);
    const current = copyHistory[copyHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(copyHistory.concat([{ squares: squares }]));
    setStepNumber(copyHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  useEffect(() => {
    const winner = calculateWinner(history[stepNumber].squares);

    if (winner) {
      setStatus("Winner " + winner);
    } else {
      setStatus("Next player: " + (xIsNext ? "X" : "O"));
    }
  }, [stepNumber]);

  return (
    <div className="flex flex-col h-full justify-start items-center space-y-8">
      <Board
        squares={history[stepNumber].squares}
        onClick={(i) => handleClick(i)}
      />
      <div className="">
        <div className="text-4xl font-bold underline">{status}</div>
        <ol className="">
          {history.map((gameState, index) => {
            const desc = index === 0 ? "Go to game start" : `Go to move # ${index}`;
            return (
              <li className="text-3xl" key={index}>
                <button onClick={() => jumpTo(index)}>{desc}</button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}