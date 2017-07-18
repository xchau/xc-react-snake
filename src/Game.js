import React, { Component } from 'react';
import './styles/Game.css';

import { LEFT, UP, RIGHT, DOWN } from './helpers/constants';

import Board from './containers/Board';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snake: {
        body: [[0, 0]],
        dir: RIGHT,
      },
      board: [],
      boardSpecs: {
        rows: 20,
        cols: 20
      },
      cellSpecs: {
        height: 30,
        width: 30
      },
    };

    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.updateSnake = this.updateSnake.bind(this);
  }

  _handleKeyPress(e) {
    if (LEFT <= e.keyCode && e.keyCode <= DOWN) {
      console.log(e.keyCode);

      const snakeSpecs = Object.assign({}, this.state.snake);

      snakeSpecs.dir = e.keyCode;

      this.setState({ snake: snakeSpecs });
    }
  }

  updateBoard(board) {
    console.log(board[0][1].props.type);
    this.setState({ board });
  }

  updateSnake(snake) {
    // console.log(snake.body);
    this.setState({ snake });
  }

  componentDidMount() {
    this.refs.game.focus();
  }

  render() {
    return (
      <div
        className="game-container"
        onKeyDown={this._handleKeyPress}
        ref="game"
        tabIndex={0} // allows non-form elements to register kb events
      >
        <Board
          board={this.state.board}
          boardSpecs={this.state.boardSpecs}
          cellSpecs={this.state.cellSpecs}
          updateBoard={this.updateBoard}
          updateSnake={this.updateSnake}
          snake={this.state.snake}
        />
      </div>
    );
  }
}

export default Game;
