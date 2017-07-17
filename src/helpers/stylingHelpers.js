'use strict';

export const styleBoard = (boardSpecs, cellSpecs) => {
  return {
    height: boardSpecs.rows * cellSpecs.height,
    width: boardSpecs.cols * cellSpecs.width
  };
};

export const styleCell = (cellSpecs) => {
  return {
    height: cellSpecs.height,
    width: cellSpecs.height
  };
};
