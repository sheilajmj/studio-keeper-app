import React, { Component } from 'react';
import Context from '../../Context'


class ForwardButton extends Component {
  static contextType = Context;

handleForwardClick = () => {
this.context.history.goForward()

}

render() {
  return (
    <button onClick={() => {this.handleForwardClick()}}>Forward</button>
  );
}
}

export default ForwardButton;