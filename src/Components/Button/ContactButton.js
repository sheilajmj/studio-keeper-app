import React, { Component } from 'react';
import Context from '../../Context';


class ContactButton extends Component {
  static contextType = Context;

  handleContactsClick = () => {
    this.context.history.push('/contacts');
  }

  render() {
    return (
      <button onClick={() => { this.handleContactsClick() }}>Contacts</button>
    );
  }
}

export default ContactButton;