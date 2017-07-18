import { LEFT, UP, RIGHT, DOWN,
  BOARD_ROWS, BOARD_COLS
} from './constants';

export const arrangeSnake = (dir, snake) => {
  const newSnake = [].concat(snake);

  if (dir === RIGHT) {
    newSnake[0] += 1;
    // console.log(newSnake[0]);

    if (newSnake[0] >= BOARD_ROWS) {
      newSnake[0] = 0;
    }
  }
  console.log(newSnake[0]);
  return newSnake;
};
