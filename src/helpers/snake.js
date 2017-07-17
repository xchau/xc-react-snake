import React from 'react';

import { styleCell } from './styleHelpers';

export const initSnake = (board, cellSpecs) => {
  board[0][0] = <div
    className="board-cell-snake"
    style={styleCell(cellSpecs)}
  />

  return board;
}
