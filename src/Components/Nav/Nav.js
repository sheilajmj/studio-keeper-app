import React, { Component } from 'react';
import Context from '../../Context'
import ContactButton from '../Button/ContactButton';
import CatalogButton from '../Button/CatalogButton';
import EventButton from '../Button/EventButton';
import ForwardButton from '../Button/ForwardButton';
import BackButton from '../Button/BackButton';


class Nav extends Component {
  static contextType = Context;

  render() {
    return (
      <div>
        <ContactButton /><CatalogButton /><EventButton />
        <br />
        <ForwardButton /><BackButton />
      </div>
    );
  }
}

export default Nav;