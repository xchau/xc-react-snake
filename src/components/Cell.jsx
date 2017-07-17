import React from 'react';

export const Cell = (props) => {
  const cssClass = props.type === 'snake' ?
    'board-cell-snake' : 'board-cell-normal';

  return (
    <div
      className={cssClass}
      style={props.styles}
    />
  );
}
