import React, { Component } from 'react';
import Context from '../../Context';

class ContactItem extends Component {
  static contextType = Context;

  handleEditClick = (id) => {
    this.context.history.push(`/contacts/edit/${id}`)
  }

  handleItemClick = (id) => {
    this.context.history.push(`/contacts/${id}`)
  }

  handleViewContact = (id) => {
    this.context.history.push(`/contacts/${id}`)
  }
  
  
  contactItemsList = this.context.contacts.map((item, index) => {
    return (
      <div key={item.contact_id} className="item-wrap">
        <ul className="item" onClick={(() => {this.handleItemClick(item.contact_id)})}>
          <li>
            Contact Type: {item.contact_type}
          </li>
          <li>
            Business Name: {item.business_name}
          </li>
          <li>
            Name: {item.name}
          </li>
          <li >
            Event Name: {item.event_name}
          </li>
          <li>
            Email: {item.email}
          </li>
          <li>
            Phone: {item.phone}
          </li>
          <li>
            Address: {item.address_street}
          </li>
          <li>
          {item.address_line2}
          </li>
          {item.address_city}{item.address_state}{item.address_zip}
          <li>
          </li>
          {item.address_country}
          <li>
          </li>
           website: {item.website}
          <li>
            Favorites: {item.favorites}
          </li>
          Notes: {item.notes}
        </ul>
        <button onClick={(() => { this.handleEditClick(item.contact_id) })}>Edit</button>
        <button type="button" value="viewContact" onClick={(() => {this.handleViewContact(item.contact_id)})}>View Contact</button>
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