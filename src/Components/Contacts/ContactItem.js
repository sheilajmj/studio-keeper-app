import React, { Component } from 'react';
import { contactItems } from '../../data-store-contacts'
import Context from '../../Context'


class ContactItem extends Component {
  static contextType = Context;

  handleEditClick(id) {
    this.context.history.push(`/contacts/edit/${id}`)
  }

  contactItemsList = contactItems.map((item, index) => {
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
      </div>
    );
  });
  render() {
    return (
      <div>
        {this.contactItemsList}
      </div>
    );
  }
};




export default ContactItem