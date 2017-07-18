import React, { Component } from 'react';
import '../styles/Board.css';

import { styleBoard, styleCell } from '../helpers/styleHelpers';

import { Cell } from './Cell';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snake: [0],
      board: []
    };

    this._initBoard = this._initBoard.bind(this);
    this._renderBoard = this._renderBoard.bind(this);
  }

  _initBoard() {
    const board = [],
          rows = this.props.boardSpecs.rows,
          cols = this.props.boardSpecs.cols;

    for (let i = 0; i < rows * cols; i++) {
      board.push(0);
    }

    this.setState({
      board: this._renderBoard(board)
    });
  }

  _renderBoard(board) {
    // Render snake
    for (const idx of this.state.snake) {
      board[idx] = 1;
    }

    let cells = board.map((value, idx) => {
      if (value) {
        return value = <Cell
          key={idx}
          styles={styleCell(this.props.cellSpecs)}
          type="snake" />;
      }
      else {
        return value = <Cell
          key={idx}
          styles={styleCell(this.props.cellSpecs)}
          type="normal" />;
      }
    });

    return cells;
  }

  componentDidMount() {
    this._initBoard();
  }

  render() {
    return <div
      className="board-container"
      style={styleBoard(this.props.boardSpecs, this.props.cellSpecs)}
    >
      {this.state.board}
    </div>
  }
}
