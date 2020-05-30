import React, { Component } from 'react';
import Context from '../../Context';


class SearchBar extends Component {
  static contextType = Context;

  handleSubmitSearch = (e) => {
    e.preventDefault()
  }

  handleBackClick = () => {
    this.context.history.goBack()
  }

  handleForwardClick = () => {
    this.context.history.goForward()
  }

  render() {
    return (
      <div className="search-wrap">
        <form className="search" onSubmit={this.handleSubmitSearch}>
          <label htmlFor="search"></label>
          <input type="text" id="search" defaultValue="Search option is not ready"></input>
          <button type="submit" value="submit" className="submit-search">?</button>
        </form>
      </div>
    );
  }
}

export default SearchBar;