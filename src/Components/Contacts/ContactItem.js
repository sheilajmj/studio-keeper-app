import React, { Component } from 'react';
import Context from '../../Context';

class ContactItem extends Component {
  static contextType = Context;

  handleEditClick = (id) => {
    this.context.history.push(`/contacts/edit/${id}`)
  }

  handleDeleteClick = (id) => {
    this.handleDeleteContact(id)
  }

  contactItemsList = this.context.contacts.map((item, index) => {
    return (
      <div key={item.contact_id} className="item-wrap">
        <ul className="item">
          <li>
            Name: {item.name}
          </li>
          <li>
            Business: {item.business_name}
          </li>
          <li>
            Phone: {item.phone}
          </li>
          <li>
            email: {item.email}
          </li>
        </ul>
        <button onClick={(() => { this.handleEditClick(item.contact_id) })}>Edit</button>
        <button onClick={() => { this.handleDeleteClick(item.contact_id) }}>Delete</button>
      </div>
    );
  });

  render() {

    this.handleDeleteContact = (id) => {
      let indexToDelete = this.context.contacts.findIndex(contact => contact.contact_id === id)
      let newContactsList = JSON.parse(JSON.stringify(this.context.contacts))
      newContactsList.splice(indexToDelete, 1)
      this.context.updateAppStateContactsDelete(newContactsList)
    }

    return (
      <div>
        {this.contactItemsList}
      </div>
    );
  }
};




export default ContactItem