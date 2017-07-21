import React, { Component } from 'react';
import '../styles/Board.css';

import { INIT_SNAKE, ACTIVE, PAUSED, GAMEOVER } from '../helpers/constants';
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
      food: [],
      message: 'Start Game',
      interval: null
    };

    this._handleClick = this._handleClick.bind(this);
    this._initBoard = this._initBoard.bind(this);
    this._renderBoard = this._renderBoard.bind(this);
    this._tick = this._tick.bind(this);
    this._tickScore = this._tickScore.bind(this);
  }

  _handleClick() {
    if (this.props.status === PAUSED) {
      this.props.updateStatus(ACTIVE);
      this.props.focusGame();
      this._tickScore(true);

      setTimeout(this._tick, 250);
    }
    else {
      this.props.updateStatus(PAUSED);
      this._tickScore(false);

      if (this.state.message !== 'Resume') {
        this.setState({ message: 'Resume' });
      }
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
    if (this.props.status === PAUSED || this.props.status === GAMEOVER) return;

    const dir = this.props.dir;
    const curSnake = this.state.snake;

    this.setState({
      snake: manipulateSnake(dir, this.state.snake),
      cells: this._renderBoard(this.state.board)
    }, () => {
      // Handle snake-food & snake-snake collision
      const si = curSnake.slice(1).indexOf(curSnake[0]),
            ii = this.state.food.indexOf(curSnake[0]);

      if (si > -1) {
        this.props.updateStatus(GAMEOVER);
        this._tickScore(false);
        this.setState({ message: 'GAME OVER' });
      }

      if (ii > -1) {
        // Replace food
        this.setState({ food: [placeFood()] });

        // Extend snake + update score
        const score = this.props.score;

        this.props.updateScore((score * 1.02) + 50);

        this.setState({
          snake: extendSnake(this.props.dir, curSnake)
        });
      }
    });

    setTimeout(this._tick, 100);
  }

  _tickScore(ticking) {
    const decrement = () => {
      let score = this.props.score;

      score -= 4;
      this.props.updateScore(score);
    }

    if (ticking) {
      this.setState({
        interval: setInterval(() => decrement(), 1000)
      });
    }
    else {
      this.setState({
        interval: clearInterval(this.state.interval)
      });
    }
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
      <p className="board-score">
        {
          this.props.status !== GAMEOVER ?
            'Score: ' + Math.floor(this.props.score)
            :
            null
        }
      </p>
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
              {
                this.props.status !== GAMEOVER ?
                  <button onClick={this._handleClick}>
                    { this.state.message }
                  </button>
                  :
                  <div>
                    { this.state.message }
                    <p>
                      You got {Math.floor(this.props.score)} points!
                    </p>
                  </div>
              }
            </div>
        }
      </div>
    </div>
  }
}
