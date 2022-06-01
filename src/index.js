import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';



class SquareDefunct extends React.Component {
	//setting and initializing the state
	//super is needed for defining the constructor of a subclass.
	// now its useless, I just have it for reference. 
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		value: null,
	// 	};
	// }

	render() {
		return (
			// the square is a class already defined from the framework,
			// without it, it shows small circular buttons. The props of this
			// class, are passed with the renderSquare method, at the Board class.
			// the props name are defined from its parent class; 'value' name
			//and value is named and defined in the Board class.
			// the => function, will make it as a single use function.
			//not using the =>, will run automatic the instructions inside the
			// bracket.
			<button className="square"
				onClick={() => this.props.onClick()}
			>
				{this.props.value}
			</button>
		);
	}
}

// function component. 
// this is useful if an object is rendered and doesnt
// have its own state.
function Square(props) {
	return (<button className="square"
		//the ()=> is dismissed because now this is a function as a whole
		//and not a class waiting for a click
		onClick={props.onClick
		}>
		{props.value}
	</button>);
}

class Board extends React.Component {


	//
	// handleClick(i) {
	// 	const squares = this.state.squares.slice();
	// 	if(calculateWinner(squares) || squares[i]){
	// 		return ;
	// 	}
	// 	squares[i] = this.state.xIsNext ? 'X' : 'O';
	// 	this.setState({
	// 		squares: squares,
	// 		xIsNext: !this.state.xIsNext,
	// });
	// }

	// the i is a property(prop) for the Square class.
	//it seems that a method is needed for rendering an html element.
	//TODO: question. check later with ben, if this is mandatory.


	// props to pass
	// squares[i] = 'x';
	// index of the square.
	// value to pass.
	renderSquare(i) {
		return (
			<Square
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
			/>
		);
		// the code below can be used as a decor UI element.
		// return <Square />;
	}

	render() {
		return (
			<div>
				<div className="board-row">
					{/* keyword 'this.' helps to select and run the methods
					that are defined in this same class, check later
					if its possible, to use methods from other 
					component classes. */}
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber: 0,
			xIsNext: true,
		};
	}

	handleClick(i) {
		const history = this.state.history.slice(0, 
			this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares: squares,
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		});
	}


	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		const moves = history.map((step, move) => {
			const desc = move ?
				'Go to move #' + move : 'Go to game start';
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
			);
		})


		let status;
		if (winner) {
			status = 'Winner ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}


		return (
			<div className='game'>
				<div>
					<Board
						squares={current.squares}
						onClick={(i) => this.handleClick(i)}
					/>
				</div>
				<div className='game-info'>
					<div>status</div>
					<ol>{moves}</ol>
				</div>
			</div>
		)
	}

}

// other functions =================




// ==============================

// TODO: what is createRoot the same as the runApp from flutter.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);


function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] &&
			squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return (null);
}

