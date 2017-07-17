import React, { Component } from 'react';
import './styles/Game.css';

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
      cellSpecs: {
        height: 30,
        width: 30
      }
    }

    this._handleKey = this._handleKey.bind(this);
  }

  _handleKey(e) {
    console.log(e.keyCode);
  }

  render() {
    return (
      <div
        className="game-container"
        onKeyDown={this._handleKey}
        tabIndex={0} // allows non-form elements to register kb events
      >
        <Board
          cellSpecs={this.state.cellSpecs}
        />
      </div>
    );
  }
}

export default Game;
