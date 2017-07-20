import React, { Component } from 'react';
import '../styles/Board.css';

import { INIT_SNAKE } from '../helpers/constants';
import { styleBoard, styleCell } from '../helpers/styleHelpers';
import { placeFood } from '../helpers/food';
import { manipulateSnake } from '../helpers/snake';

import { Cell } from './Cell';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snake: INIT_SNAKE,
      board: [],
      cells: [],
      food: [placeFood()]
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
    for (const snakeIdx of this.state.snake) {
      newBoard[snakeIdx] = 1;
    }

    // Render food
    for (const foodIdx of this.state.food) {
      newBoard[foodIdx] = 2;
    }

    let cells = newBoard.map((value, idx) => {
      if (value === 1) {
        return value = <Cell
          key={idx}
          styles={styleCell(this.props.cellSpecs)}
          type="snake" />;
      }
      else if (value > 1) {
        return value = <Cell
          key={idx}
          styles={styleCell(this.props.cellSpecs)}
          type="food" />;
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

    this.setState({
      snake: manipulateSnake(dir, this.state.snake),
      cells: this._renderBoard(this.state.board)
    });

    setTimeout(this._tick, 100);
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
        // onClick={this._tick}
        onClick={() => {
          console.log(this.state.food);
        }}
      >
        Start
      </button>
    </div>
  }
}
