import React, { Component } from 'react';
import '../styles/Board.css';

import { styleBoard, styleCell } from '../helpers/styleHelpers';
import { LEFT, UP, RIGHT, DOWN } from '../helpers/constants';

import { Cell } from '../components/Cell';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeBoard: [],
    };

    this._renderSnake = this._renderSnake.bind(this);
  }

  _renderSnake() {
    let newBoard = this.props.board,
          snake = this.props.snake,
          boardSpecs = this.props.boardSpecs;

          console.log('initial: ' + newBoard[0][0].props.type);
          // console.log('state init: ' + this.state.activeBoard[0][0].props.type);

    for (const part of snake.body) {
      newBoard[part[0]][part[1]] = <Cell
        styles={styleCell(this.props.cellSpecs)}
        type="snake"
      />;
    }

    switch (snake.dir) {
      case LEFT:
        break;
      case UP:
        break;
      case RIGHT:
        snake.body[0][1] += 1;

        if (snake.body[0][1] >= boardSpecs.rows) {
          snake.body[0][1] = 0;
        }

        break;

      case DOWN:
        snake.body[0][0] += 1;

        if (snake.body[0][0] >= boardSpecs.cols) {
          snake.body[0][0] = 0;
        }

        break;
    }
    // console.log('state after: ' + this.state.initialBoard[0][0].props.type);
    // console.log('after: ' + newBoard[0][0].props.type);

    this.props.updateSnake(snake);
    this.props.updateBoard(newBoard);
    this.setState({activeBoard: newBoard})

    setTimeout(this._renderSnake, 500);
  }

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

    // this.setState({ initialBoard });
    this.props.updateBoard(initialBoard);
  }

  render() {
    return <div
      className="board-container"
      style={styleBoard(this.props.boardSpecs, this.props.cellSpecs)}
    >
      {this.state.activeBoard}

      <button
        className="board-start"
        onClick={this._renderSnake}
      >
        Start
      </button>
    </div>
  }
}
