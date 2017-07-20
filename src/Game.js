import React, { Component } from 'react';
import './styles/Game.css';

import { keys, LEFT, UP, RIGHT, DOWN, BOARD_ROWS } from './helpers/constants';

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
    if (37 <= e.keyCode && e.keyCode <= 40) {
      if (this.state.dir === RIGHT && keys[e.keyCode] === LEFT) return;
      if (this.state.dir === LEFT && keys[e.keyCode] === RIGHT) return;
      if (this.state.dir === UP && keys[e.keyCode] === DOWN) return;
      if (this.state.dir === DOWN && keys[e.keyCode] === UP) return;

      this.setState({ dir: keys[e.keyCode] });

      setTimeout(() => {console.log(this.state.dir)}, 500)
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
