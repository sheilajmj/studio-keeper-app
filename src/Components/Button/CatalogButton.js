import React, { Component } from 'react';
import Context from '../../Context'


class CatalogButton extends Component {
  static contextType = Context;

  handleEventsClick = () => {
    this.context.history.push('/catalog')
  }

  handleAddClick = (location) => {
    this.context.history.push(`/${location}/add`)
  }

  render() {
    return (
      <div>
        <button onClick={() => { this.handleEventsClick() }}>Catalog</button>
        <button className="eventOptions add-btn" onClick={(() => { this.handleAddClick('catalog') })}> + </button>
      </div>
    );
  }
}

export default CatalogButton;