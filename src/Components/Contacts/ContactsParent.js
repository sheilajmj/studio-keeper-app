import React from 'react';
import ContactItemContainer from './ContactItemContainer'

function ContactsParent() {
  return (
    <main className='App'>
      <h2>Here is the Contacts page!</h2>
      <ContactItemContainer />
    </main>
  );
}

export default ContactsParent;