import { LEFT, UP, RIGHT, DOWN, BOARD_ROWS } from './constants';

const rightLimits = (lim, obj) => {
  let cur = lim - 1;

  for (let i = 0; i < lim; i++) {
    obj[cur] = cur;
    cur += lim;
  }

  return obj;
}

const leftLimits = (lim, obj) => {
  for (let i = 0; i < lim * lim; i += lim) {
    obj[i] = i;
  }

  return obj
}

console.log(leftLimits(BOARD_ROWS, {}));

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

    if (newSnake[0] > rightLimits[newSnake[0]]) {
      console.log('test');
      newSnake[0] = newSnake[0] - BOARD_ROWS;
    }
  }
  else if (dir === DOWN) {
    newSnake[0] += BOARD_ROWS;

    if (newSnake[0] > BOARD_ROWS) {
      newSnake[0] = newSnake[0] - ((BOARD_ROWS * BOARD_ROWS) - BOARD_ROWS);
    }
  }

  return newSnake;
};
