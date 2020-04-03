import React, { Component } from 'react';
import Context from '../../Context'


class HomeButton extends Component {
  static contextType = Context;

  handleHomeClick = () => {
    this.context.history.push('/')

  }

  render() {
    return (
      <button className="nav-btn" onClick={() => { this.handleHomeClick() }}>Home</button>
    );
  }
}

export default HomeButton;