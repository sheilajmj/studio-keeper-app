import React, { Component } from 'react';
import Context from '../../Context'


class ContactButton extends Component {
  static contextType = Context;

  handleContactsClick = () => {
    this.context.history.push('/contacts')
  }

  handleAddClick = (location) => {
    this.context.history.push(`/${location}/add`)
  }

  render() {
    return (
      <div>
        <button onClick={() => { this.handleContactsClick() }}>Contacts</button>
        <button className="contactOptions add-btn" onClick={(() => { this.handleAddClick('contacts') })}> + </button>
      </div>
    );
  }
}

export default ContactButton;