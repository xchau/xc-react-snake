import React from 'react';

import { styleCell } from './styleHelpers';

import Cell from '../containers/Cell';

export const initSnake = (board, cellSpecs) => {
  board[0][0] = <Cell
    styles={styleCell(cellSpecs)}
    type="snake"
  />

  return board;
}
