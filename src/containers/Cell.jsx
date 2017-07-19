import React from 'react';
import '../styles/Cell.css';

export const Cell = (props) => {
  const cssClass = props.type === 'snake' ?
    'cell-snake' : 'cell-normal';

  return (
    <div
      id={props.id}
      className={`cell ${cssClass}`}
      style={props.styles}
    />
  );
}
