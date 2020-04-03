import React, { Component } from 'react';
import Context from '../../Context'


class DeleteButton extends Component {
  static contextType = Context;

  handleDeleteClick = (id) => {
    this.handleDeleteContact(id)
  }


  handleDeleteContact = (id) => {
    let indexToDelete = this.context.contacts.findIndex(contact => contact.contact_id === id)
    let contacts = JSON.parse(JSON.stringify(this.context.contacts))
    let contactDeleted = contacts.splice(indexToDelete, 1)
    this.context.updateAppStateContactsDelete(contacts, contactDeleted)
    this.context.history.push(`/`)
  }



  render() {
    return (
      <button className="nav-btn delete-btn" onClick={() => { this.handleDeleteClick() }}>Delete</button>
    );
  }
}

export default DeleteButton;