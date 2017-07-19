import React, { Component } from 'react';
import '../styles/Board.css';

import { LEFT, UP, RIGHT, DOWN } from '../helpers/constants';
import { styleBoard, styleCell } from '../helpers/styleHelpers';
import { arrangeSnake } from '../helpers/snake';

import { Cell } from './Cell';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snake: [375],
      board: [],
      cells: []
    };

    this._initBoard = this._initBoard.bind(this);
    this._renderBoard = this._renderBoard.bind(this);
    this._tick = this._tick.bind(this);
  }

  _initBoard() {
    const board = [],
          rows = this.props.boardSpecs.rows,
          cols = this.props.boardSpecs.cols;

    for (let i = 0; i < rows * cols; i++) {
      board.push(0);
    }

    this.setState({
      board: board,
      cells: this._renderBoard(board)
    });
  }

  _renderBoard(board) {
    const newBoard = [].concat(board);

    // Render snake
    for (const idx of this.state.snake) {
      newBoard[idx] = 1;
    }
    // console.log(this.state.snake[0]);
    // console.log(newBoard.slice(0, 3));

    let cells = newBoard.map((value, idx) => {
      if (value) {
        return value = <Cell
          key={idx}
          styles={styleCell(this.props.cellSpecs)}
          type="snake" />;
      }
      else {
        return value = <Cell
          id={idx}
          key={idx}
          styles={styleCell(this.props.cellSpecs)}
          type="normal" />;
      }
    });

    return cells;
  }

  _tick() {
    const dir = this.props.dir;

    switch (dir) {
      case LEFT:
        this.setState({
          snake: arrangeSnake(dir, this.state.snake)
        });

        break;

      case UP:
        this.setState({
          snake: arrangeSnake(dir, this.state.snake)
        });

        break;

      case RIGHT:
        this.setState({
          snake: arrangeSnake(dir, this.state.snake)
        });

        break;

      case DOWN:
        this.setState({
          snake: arrangeSnake(dir, this.state.snake)
        });

        break;
    }

    this.setState({
      cells: this._renderBoard(this.state.board)
    });
    setTimeout(() => {
      return this._tick()
    }, 300);
  }

  componentDidMount() {
    this._initBoard();
  }

  render() {
    return <div
      className="board-container"
      style={styleBoard(this.props.boardSpecs, this.props.cellSpecs)}
    >
      {this.state.cells}

      <button
        className="board-start-button"
        onClick={this._tick}
      >
        Start
      </button>
    </div>
  }
}
