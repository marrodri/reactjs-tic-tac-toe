import React, { useState } from "react";
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
    <Square value={props.squares[i]} onClick={() => props.onClick(i)} />
  );

  while (i <= 9) {
    row.push(renderSquare(i - 1));
    if (i % 3 === 0) {
      // ... => expand operator
      let newrow = [...row];
      board.push(<div className="flex flex-row">{newrow}</div>);
      row = [];
    }
    i++;
  }
  console.log("rendering board");
  return <div className="flex flex-col">{board}</div>;
}

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

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
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  // There's a bug here, it's in a infinite loop
  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li className="text-3xl" key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const winner = calculateWinner(history[stepNumber].squares);
  let status;
  if (winner) {
    status = "Winner " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    <div className="flex flex-col h-full justify-start items-center space-y-8">
      <Board
        squares={history[stepNumber].squares}
        onClick={(i) => handleClick(i)}
      />
      <div className="">
        <div className="text-4xl font-bold underline">{status}</div>
        <ol class="">{moves}</ol>
      </div>
    </div>
  );
}
