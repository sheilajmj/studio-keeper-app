import React, { Component } from 'react';
import Context from '../../Context'


class AddButton extends Component {
  static contextType = Context;

  handleAddClick = (location) => {
    this.context.history.push(`/${location}/add`)
  }

  render() {
    return (
      <button className={`add-btn bkg-color-tra`} onClick={(() => { this.handleAddClick(`${this.props.pageName.toLowerCase()}`) })}></button>
    );
  }
}

export default AddButton;