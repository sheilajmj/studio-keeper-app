import React, { Component } from 'react';
import Context from '../../Context';


class PageNav extends Component {
  static contextType = Context;

  handleBackClick = () => {
    this.context.history.goBack()
  }

  handleForwardClick = () => {
    this.context.history.goForward()
  }

  render() {
    return (
      <div className="page-nav">
        <ul>
          <li>
            <button className="nav-bk" onClick={() => { this.handleBackClick() }}></button>
          </li>
          <h2 className="pageName color-pk"><a className="pageName-link color-pk" href={`/` + this.props.pageName.toLowerCase()}>{this.props.pageName}</a></h2>
          <li>
            <button className="nav-fw" onClick={() => { this.handleForwardClick() }}></button>
          </li>
        </ul>
      </div>
    );
  }
}

export default PageNav;