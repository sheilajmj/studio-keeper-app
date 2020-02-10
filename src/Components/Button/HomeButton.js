import React, { Component } from 'react';
import Context from '../../Context'


class HomeButton extends Component {
  static contextType = Context;

handleBackClick = () => {
this.context.history.push('/')

}

render() {
  return (
    <button onClick={() => {this.handleBackClick()}}>Home</button>
  );
}
}

export default HomeButton;