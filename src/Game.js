import React, { Component } from 'react';
import './styles/Game.css';

import { LEFT, UP, RIGHT, DOWN } from './helpers/constants';

import Board from './containers/Board';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardSpecs: {
        rows: 20,
        cols: 20
      },
      cellSpecs: {
        height: 30,
        width: 30
      }
    };

    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
  }

  _handleKeyPress(e) {
    if (37 <= e.keyCode <= 40) {
      const snakeSpecs = Object.assign({}, this.state.snake);

      // snakeSpecs.dir = RIGHT;
      //
      // this.setState({ snake: snakeSpecs });
    }
  }

  createBoard(board) {
    // this.setState({ board: initSnake(board, this.state.cellSpecs)});
  }

  updateBoard(newBoard) {
    this.setState({ board: newBoard });
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
          boardSpecs={this.state.boardSpecs}
          cellSpecs={this.state.cellSpecs}
          createBoard={this.createBoard}
          updateBoard={this.updateBoard}
        />
      </div>
    );
  }
}

export default Game;
