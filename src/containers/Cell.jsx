import React from 'react';
import '../styles/Cell.css';

export const Cell = (props) => {
  // let cssClass;
  //
  // switch (props.type) {
  //   case 'snake': cssClass = 'cell-snake'; break;
  //   case 'food' : cssClass = 'cell-food'; break;
  //   default: cssClass = null;
  // }

  const cssClass = props.type === 'snake' ?
    'cell-snake' : 'cell';

  return (
    <div
      id={props.id}
      className={cssClass}
      style={props.styles}
    >
      {
        props.type === 'food' ? <div className="food"></div> : null
      }
    </div>
  );
}
