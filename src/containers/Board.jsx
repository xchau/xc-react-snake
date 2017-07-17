import React, { Component } from 'react';
import '../styles/Board.css';

import { styleBoard, styleCell } from '../helpers/styleHelpers';

import Cell from './Cell';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    const board = [],
          rows = this.props.boardSpecs.rows,
          cols = this.props.boardSpecs.cols;

    for (let i = 0; i < rows; i++) {
      let row = [];

      for (let j = 0; j < cols; j++) {
        row.push(<Cell
          styles={styleCell(this.props.cellSpecs)}
          type="normal"
        />);
      }

      board.push(row);
    }

    this.props.createBoard(board);
  }

  render() {
    return <div
      className="board-container"
      style={styleBoard(this.props.boardSpecs, this.props.cellSpecs)}
    >
      {this.props.board}
    </div>
  }
}
