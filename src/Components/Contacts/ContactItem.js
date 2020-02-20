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
            Email: <a href={"mailto:" + item.email}> {item.email} </a>
          </li>
          <li>
            Phone:
            <a href={"tel:" + item.phone}>{item.phone}</a> 
          </li>
          <li>
          website: <a href={item.website} target="_blank"  rel="noopener noreferrer">{item.website}</a>
          </li>
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