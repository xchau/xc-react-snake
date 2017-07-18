import React, { Component } from 'react';
import '../styles/Cell.css';

export const Cell = (props) => {
  const cssClass = props.type === 'snake' ?
    'cell-snake' : 'cell-normal';

  return (
    <div
      className={`cell ${cssClass}`}
      style={props.styles}
    />
  );
}
