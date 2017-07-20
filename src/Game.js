import React, { Component } from 'react';
import './styles/Game.css';

import { keys, codes, RIGHT, BOARD_ROWS } from './helpers/constants';

import Board from './containers/Board';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardSpecs: {
        rows: BOARD_ROWS,
        cols: BOARD_ROWS
      },
      cellSpecs: {
        height: 30,
        width: 30
      },
      dir: RIGHT
    };

    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  _handleKeyPress(e) {
    const difference = Math.abs(codes[this.state.dir] - e.keyCode);

    // disallows non-arrow, same, opposite keys
    if (keys[e.keyCode] && difference !== 0 && difference !== 2) {
      this.setState({ dir: keys[e.keyCode] });
      this.refs.game.blur();

      // prevents turning in opposite dir w/ quick inputs
      setTimeout(() => {
        this.refs.game.focus();
        console.log(this.state.dir)
      }, 70);
    }
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
          dir={this.state.dir}
        />
      </div>
    );
  }
}

export default Game;
