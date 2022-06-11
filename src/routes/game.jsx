import React, { useState } from "react";
// import ReactDOM from "react-dom/client";
import "../index.css";
import { calculateWinner } from "../functions/calculateWinner";

function Square(props) {
  return (
    <button
      className="square"
      style={{ width: "100px", height: "100px", fontSize:"50px" }}
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
      let newrow = [...row];
      board.push(<div className="row-board">{newrow}</div>);
      row = [];
    }
    i++;
  }
  console.log("rendering board");
  return <div>{board}</div>;
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
    <div className="game relative inset-1/2" >
      <div>
        <Board 
          squares={history[stepNumber].squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div className="text-4xl font-bold underline">{status}</div>
        <ol class="">{moves}</ol>
      </div>
    </div>
  );
}

// class GameDefunct extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			history: [{
// 				squares: Array(9).fill(null),
// 			}],
// 			stepNumber: 0,
// 			xIsNext: true,
// 		};
// 	}

// 	handleClick(i) {
// 		const history = this.state.history.slice(0,
// 			this.state.stepNumber + 1);
// 		const current = history[history.length - 1];
// 		const squares = current.squares.slice();
// 		if (calculateWinner(squares) || squares[i]) {
// 			return;
// 		}
// 		squares[i] = this.state.xIsNext ? 'X' : 'O';
// 		this.setState({
// 			history: history.concat([{
// 				squares: squares,
// 			}]),
// 			stepNumber: history.length,
// 			xIsNext: !this.state.xIsNext,
// 		});
// 	}

// 	jumpTo(step) {
// 		this.setState({
// 			stepNumber: step,
// 			xIsNext: (step % 2) === 0,
// 		});
// 	}

// 	render() {
// 		const history = this.state.history;
// 		const current = history[this.state.stepNumber];
// 		const winner = calculateWinner(current.squares);

// 		const moves = history.map((step, move) => {
// 			const desc = move ?
// 				'Go to move #' + move : 'Go to game start';
// 			return (
// 				<li key={move}>
// 					<button onClick={() => this.jumpTo(move)}>{desc}</button>
// 				</li>
// 			);
// 		})

// 		let status;
// 		if (winner) {
// 			status = 'Winner ' + winner;
// 		} else {
// 			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
// 		}

// 		return (
// 			<div className='game'>
// 				<div>
// 					<Board
// 						squares={current.squares}
// 						onClick={(i) => this.handleClick(i)}
// 					/>
// 				</div>
// 				<div className='game-info'>
// 					<div className='text-3xl font-bold underline'>{status}</div>
// 					<ol>{moves}</ol>
// 				</div>
// 			</div>
// 		)
// 	}
// }
