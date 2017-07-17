import React, { Component } from 'react';
import './styles/Game.css';

import { initSnake } from './helpers/snake';

import Board from './containers/Board';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snake: {
        length: 1,
        tail: [],
        dir: '',
      },
      board: [],
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
  }

  _handleKeyPress(e) {
    console.log(e.keyCode);
  }

  createBoard(board) {
    this.setState({ board: initSnake(board, this.state.cellSpecs)});
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
          createBoard={this.createBoard}
        />
      </div>
    );
  }
}

export default Game;
