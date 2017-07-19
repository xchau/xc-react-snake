import { LEFT, UP, RIGHT, DOWN, BOARD_ROWS } from './constants';

export const arrangeSnake = (dir, snake) => {
  const newSnake = [].concat(snake);

  if (dir === LEFT) {
    newSnake[0] -= 1;

    if (newSnake[0] < 0) {
      newSnake[0] = BOARD_ROWS - 1;
    }
  }
  else if (dir === UP) {
    newSnake[0] -= BOARD_ROWS;

    if (newSnake[0] <= 0) {
      newSnake[0] = (BOARD_ROWS * BOARD_ROWS) - Math.abs(newSnake[0]);
    }
  }
  else if (dir === RIGHT) {
    newSnake[0] += 1;

    if ((newSnake[0] + BOARD_ROWS) ) {
      newSnake[0] = newSnake[0] - BOARD_ROWS;
    }
  }
  else if (dir === DOWN) {
    newSnake[0] += BOARD_ROWS;

    if (newSnake[0] > BOARD_ROWS) {
      newSnake[0] = newSnake[0] - (BOARD_ROWS * BOARD_ROWS);
    }
  }

  return newSnake;
};
