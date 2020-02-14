import React, { Component } from 'react';
import Context from '../../Context'


class BackButton extends Component {
  static contextType = Context;

handleBackClick = () => {
this.context.history.goBack()

}

render() {
  return (
    <button className="nav-btn" onClick={() => {this.handleBackClick()}}>Back</button>
  );
}
}

export default BackButton;