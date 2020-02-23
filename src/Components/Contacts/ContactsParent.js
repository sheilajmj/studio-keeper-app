import React, { Component } from 'react';
import Context from '../../Context'
import ContactItem from './ContactItem';
import PageParentHeader from '../Nav/PageParentHeader';

class ContactsParent extends Component {
  static contextType = Context;

  render(){
  return (
    <section className='contacts'>
        <PageParentHeader pageName={"Contacts"} />
        <ContactItem />
    </section>
  );
}
}

export default ContactsParent;