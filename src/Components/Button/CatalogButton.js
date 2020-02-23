import React, { Component } from 'react';
import Context from '../../Context'


class CatalogButton extends Component {
  static contextType = Context;

  handleCatalogClick = () => {
    this.context.history.push('/catalog')
  }

  render() {
    return (
        <button onClick={() => { this.handleCatalogClick() }}>Catalog</button>
    );
  }
}

export default CatalogButton;