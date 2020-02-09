import React, { Component } from 'react';
import Context from '../../Context'


class BackButton extends Component {
  static contextType = Context;

handleBackClick = () => {
console.log("handleBackClick")
this.context.history.goBack()

}

render() {
  return (
    <button onClick={() => {this.handleBackClick()}}>Back</button>
  );
}
}

export default BackButton;