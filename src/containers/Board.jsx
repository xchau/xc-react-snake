import React, { Component } from 'react';
import '../styles/Board.css';

import { INIT_SNAKE, ACTIVE, PAUSED } from '../helpers/constants';
import { styleBoard, styleCell } from '../helpers/styleHelpers';
import { placeFood } from '../helpers/food';
import { manipulateSnake, extendSnake } from '../helpers/snake';

import { Cell } from './Cell';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snake: INIT_SNAKE,
      board: [],
      cells: [],
      food: []
    };

    this._initBoard = this._initBoard.bind(this);
    this._renderBoard = this._renderBoard.bind(this);
    this._tick = this._tick.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick() {
    console.log('init');
    if (this.props.status === PAUSED) {
      this.props.updateStatus(ACTIVE);
      this.props.focusGame();

      setTimeout(this._tick, 250);
    }
    else {
      this.props.updateStatus(PAUSED);
    }
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
      if (newBoard[foodIdx] !== 1) {
        newBoard[foodIdx] = 2;
      }
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
    if (this.props.status === PAUSED) return;

    const dir = this.props.dir;
    const curSnake = this.state.snake;

    this.setState({
      snake: manipulateSnake(dir, this.state.snake),
      cells: this._renderBoard(this.state.board)
    }, () => {
      const ii = this.state.food.indexOf(curSnake[0]);

      // Handle snake/food collision
      if (ii > -1) {
        this.setState({
          food: [placeFood()]
        }, () => { // add snake len
          this.setState({
            snake: extendSnake(this.props.dir, curSnake)
          }, () => {
            console.log(this.state.snake);
          });
        });
      }
    });

    setTimeout(this._tick, 100);
  }

  componentWillMount() {
    let foodIdx = placeFood(),
        unique = false;

    while (!unique) {
      if (!this.state.snake.includes(foodIdx)) {
        this.setState({ food: [foodIdx] });
        unique = true;
      }
      else {
        foodIdx = placeFood();
      }
    }
  }

  componentDidMount() {
    this._initBoard();
  }

  render() {

    return <div className="board-container">
      <div
        className="board-box"
        style={styleBoard(this.props.boardSpecs, this.props.cellSpecs)}
      >
        { this.state.cells }
        {
          this.props.status === ACTIVE ?
            <button
              className="board-pause-button"
              onClick={this._handleClick}
            >
              Pause
            </button>
            :
            <div className="board-overlay">
              <button onClick={this._handleClick}>
                Snake!
              </button>
            </div>
        }
      </div>
    </div>
  }
}
