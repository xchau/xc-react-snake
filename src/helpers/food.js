import { BOARD_ROWS } from './constants';

export const placeFood = (board) => {
  let foodLocation = Math.floor(Math.random() * ((BOARD_ROWS * BOARD_ROWS) - 3) + 3);

  board[foodLocation] = 2;
};
