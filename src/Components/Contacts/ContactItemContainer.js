import React, { Component } from 'react';
import ContactItem from './ContactItem'
import Context from '../../Context'

class ContactItemContainer extends Component {
  static contextType = Context;
  
  render(){
  return (
    <main className='App'>
      <ContactItem />
    </main>
  );
}
}

export default ContactItemContainer;