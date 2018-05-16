import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={()=>this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={()=>this.props.onClick(i)}/>;
  }

  render() {
    return (
      <div>
        <div className="board-row">
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
        squares: Array(9).fill(null)
      }],
      isNext: true
    };
  }

  handle(i) {
    const length = this.state.history.length;
    const curSquares = this.state.history[length - 1].squares.slice();

    curSquares[i] = this.state.isNext? 'X' : "O";

    this.setState({
      history: this.state.history.concat([{
        squares: curSquares,
      }]),
      isNext: !this.state.isNext
    });
  }

  getHistory() {
    const steps = this.state.history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button  onClick={() => {console.log("Click Me...");}}>{desc}</button>
        </li>
      );
    })

    return steps;
  }

  render() {
    const status = 'Next player: ' + (this.state.isNext? 'X' : "O");
    const length = this.state.history.length;

    const curSquares = this.state.history[length - 1].squares;
    
    const steps = this.getHistory();
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={curSquares} onClick={(i) => this.handle(i)}/>
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{steps}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
