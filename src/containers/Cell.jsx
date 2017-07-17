import React, { Component } from 'react';

export default class Cell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type || null,
      dir: this.props.dir || null
    };
  }

  render() {
    const cssClass = this.props.type === 'snake' ?
      'board-cell-snake' : 'board-cell-normal';

    return (
      <div
        className={cssClass}
        style={this.props.styles}
      />
    );
  }
}
