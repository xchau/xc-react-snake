import React, { Component } from 'react';
import '../styles/Board.css';
import { styleBoard, styleCell } from '../helpers/stylingHelpers';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardSpecs: {
        rows: 20,
        cols: 20
      },
      board: []
    }
  }

  componentWillMount() {
    const board = [],
          rows = this.state.boardSpecs.rows,
          cols = this.state.boardSpecs.cols;

    for (let i = 0; i < rows; i++) {
      let row = [];

      for (let j = 0; j < cols; j++) {
        row.push(<div
          className="board-cell"
          style={styleCell(this.props.cellSpecs)}
        />);
      }

      board.push(row);
    }

    this.setState({board});
  }

  render() {
    return <div
      className="board-container"
      style={styleBoard(this.state.boardSpecs, this.props.cellSpecs)}
    >
      {this.state.board}
    </div>
  }
}
