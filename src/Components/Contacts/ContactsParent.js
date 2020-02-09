import React, { Component } from 'react';
import ContactItemContainer from './ContactItemContainer'
import Context from '../../Context'
import Nav from '../Nav/Nav'

class ContactsParent extends Component {
  static contextType = Context;

  render(){
  return (
    <main className='App'>
      <Nav />
      <h2>Here are your Contacts</h2>
      <ContactItemContainer />
    </main>
  );
}
}

export default ContactsParent;