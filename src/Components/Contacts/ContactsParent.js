import React, { Component } from 'react';
import Context from '../../Context'
import ContactItem from './ContactItem';
import PageParentHeader from '../Nav/PageParentHeader';
import ContactsApiService from '../../services/contacts-api-service'

class ContactsParent extends Component {
  static contextType = Context;

  componentDidMount() {
    ContactsApiService.getContacts()
      .then(this.context.setContacts)
      .catch(this.context.setError)
  }


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