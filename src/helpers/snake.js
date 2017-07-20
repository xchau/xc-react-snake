import { LEFT, UP, RIGHT, DOWN, BOARD_ROWS } from './constants';

export const manipulateSnake = (dir, snake) => {
  const newSnake = [].concat(snake);

  let x = newSnake[0] % BOARD_ROWS,
      y = Math.floor(newSnake[0] / BOARD_ROWS);

  switch (dir) {
    case LEFT: x = x <= 0 ? BOARD_ROWS - 1 : x - 1; break;
    case UP: y = y <= 0 ? BOARD_ROWS - 1 : y - 1; break;
    case RIGHT: x = x >= BOARD_ROWS - 1 ? 0 : x + 1; break;
    case DOWN: y = y >= BOARD_ROWS - 1 ? 0 : y + 1; break;
    default: return;
  }

  let prev = newSnake[0];
  let cur;

  for (let i = 1; i < newSnake.length; i++) {
    cur = newSnake[i];
    newSnake[i] = prev;
    prev = cur;
  }

  newSnake[0] = (BOARD_ROWS * y) + x; // reassign head;

  return newSnake;
};

export const extendSnake = (dir, snake) => {
  const newSnake = [].concat(snake),
        tail = newSnake[newSnake.length - 1];

  let x = tail % BOARD_ROWS,
      y = Math.floor(tail / BOARD_ROWS);

  for (let i = 0; i < 2; i++) {
    switch (dir) {
      case LEFT: x = x >= BOARD_ROWS - 1 ? 0 : x + 1; break;
      case UP: y = y >= BOARD_ROWS - 1 ? 0 : y + 1; break;
      case RIGHT: x = x <= 0 ? BOARD_ROWS - 1 : x - 1; break;
      case DOWN: y = y <= 0 ? BOARD_ROWS - 1 : y - 1; break;

      default: return;
    }

    newSnake.push((BOARD_ROWS * y) + x); // add tail;
  }

  return newSnake;
};
