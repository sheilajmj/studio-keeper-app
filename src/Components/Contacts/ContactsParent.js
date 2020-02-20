import React, { Component } from 'react';
import Context from '../../Context'
import Nav from '../Nav/Nav'
import ContactItemContainer from './ContactItemContainer';


class ContactsParent extends Component {
  static contextType = Context;

  render(){
  return (
    <main className='App'>
      <Nav />
      <h2>Contacts</h2>
        <ContactItemContainer />
    </main>
  );
}
}

export default ContactsParent;