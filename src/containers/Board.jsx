import React, { Component } from 'react';
import '../styles/Board.css';

import { styleBoard, styleCell } from '../helpers/styleHelpers';
import { LEFT, UP, RIGHT, DOWN } from '../helpers/constants';

import { Cell } from '../components/Cell';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // snake: this.props.snake
    };

    this._handleHead = this._handleHead.bind(this);
    this._renderSnake = this._renderSnake.bind(this);
  }

  _handleHead(board) {
    const head = this.props.snake.head;

    board[head[0]][head[1]] = <Cell
      styles={styleCell(this.props.cellSpecs)}
      type="snake"
    />;

    return board;
  }

  _renderSnake() {
    const snake = this.props.snake;
    const boardSpecs = this.props.boardSpecs;

    switch (snake.dir) {
      case LEFT:
        break;
      case UP:
        break;
      case RIGHT:
        snake.head[1] += 1;

        if (snake.head[1] >= boardSpecs.rows) {
          snake.head[1] = 0;
        }

        break;

      case DOWN:
        snake.head[0] += 1;

        if (snake.head[0] >= boardSpecs.cols) {
          snake.head[0] = 0;
        }

        break;
    }

    const newBoard = this._handleHead(this.props.board);

    this.props.updateSnake(snake);
    this.props.updateBoard(newBoard);

    setTimeout(this._renderSnake, 500);
  }

  // shouldComponentUpdate(nextProps) {
  //   return this.state.snake.dir !== nextProps.snake.dir;
  // }

  componentWillMount() {
    const initialBoard = [],
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

      initialBoard.push(row);
    }

    this.props.updateBoard(this._handleHead(initialBoard));
  }

  render() {
    return <div
      className="board-container"
      style={styleBoard(this.props.boardSpecs, this.props.cellSpecs)}
    >
      {this.props.board}

      <button
        className="board-start"
        onClick={this._renderSnake}
      >
        Start
      </button>
    </div>
  }
}
