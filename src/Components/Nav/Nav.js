import React, { Component } from 'react';
import Context from '../../Context'


class Nav extends Component {
  static contextType = Context;

  render() {
    return (
      <nav className="nav-wrap">
        <ul>
          <li>
          <a href="/contacts">Contacts</a>
          </li>
          <li>
          <a href="/catalog">Catalog</a>
          </li>
          <li>
          <a href="/events">Events</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;