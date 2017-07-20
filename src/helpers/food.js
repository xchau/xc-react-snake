import { BOARD_ROWS } from './constants';

export const placeFood = () => {
  return Math.floor(Math.random() * (BOARD_ROWS * BOARD_ROWS));
};
