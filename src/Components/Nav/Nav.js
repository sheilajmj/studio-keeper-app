import React, { Component } from 'react';
import Context from '../../Context'
import ContactButton from '../Button/ContactButton';
import CatalogButton from '../Button/CatalogButton';
import EventButton from '../Button/EventButton';
import ForwardButton from '../Button/ForwardButton';
import BackButton from '../Button/BackButton';
import HomeButton from '../Button/HomeButton';


class Nav extends Component {
  static contextType = Context;

  render() {
    return (
      <div className="nav">
        <div>
        <ForwardButton /> <HomeButton /> <BackButton />
        </div>
        <br />
        <br />
        <div>
        <ContactButton /><CatalogButton /><EventButton />
        </div>
        <br />
        
      </div>
    );
  }
}

export default Nav;