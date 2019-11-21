import React, { Component } from 'react';

import './clock.css';

export default class Clock extends Component {


  render() {
    const { timeProp } = this.props;

    return (
      <div className="clock">
        Local Time {timeProp}
      </div>
    )
  }
}