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

  fieldValueLabels = () => {
    //set this up to not show blank fields
  }


  contactItemsList = this.context.contacts.map((item, index) => {
    console.log("this is in contactItem ", this.context.contacts)

    //event name and link for contact
  //   if (item.events !== null || item.events !== ""){
  //   this.eventIds = JSON.stringify(item.events).split(', ')
  //   this.eventIdsToObjects = this.eventIds.map((ids) => {
  //     this.eventObjects = this.context.events.filter((events) => {
  //       return events.event_id === ids
  //     })
  //     return this.eventObjects
  //   })
  //   this.eventObjectReturnArray = this.eventIdsToObjects.map((event) => {
  //     this.eventObjectReturn = event.map((event) => {
  //       return (
  //         <a href={'/events/' + event.event_id} target="_blank" rel="noopener noreferrer"> {event.name}</a>
  //       )
  //     })
  //     return this.eventObjectReturn
  //   })
  // }


    this.contactNameIncluded = () => {
      if (item.name) {
        return (<li className="contact-name">
          <span className="contact-labels">Name:</span><span className="contact-content">{item.name}</span>
        </li>)
      }
    }

    this.contactTitleIncluded = () => {
      if (item.title) {
        return (<li>
          <span className="contact-labels">Title:</span> {item.title}
        </li>)
      }
    }

    this.contactBusinessIncluded = () => {
      if (item.business_name) {
        return (<li>
          <span className="contact-labels">Business:</span> {item.business_name}
        </li>)
      }
    }

    this.contactEmailIncluded = () => {
      if (item.email) {
        return (<li>
          <span className="contact-labels">Email:</span> <a href={"mailto:" + item.email} target="_blank" rel="noopener noreferrer"> {item.email} </a>
        </li>)
      }
    }

    this.contactPhoneIncluded = () => {
      if (item.phone) {
        return (<li>
          <span className="contact-labels">Phone:</span>
          <a href={"tel:" + item.phone} target="_blank" rel="noopener noreferrer">{item.phone}</a>
        </li>)
      }
    }

    this.contactWebIncluded = () => {
      if (item.website) {
        return (<li>
          <span className="contact-labels">Web:</span>
          <a href={item.website} target="_blank" rel="noopener noreferrer">{item.website}</a>
        </li>)
      }
    }


    return (
      <div key={"contact" + item.contact_id} className="item-wrap">
        <h1>Hello!</h1>
        {/* <button type="button" className="view-item" value="viewContact" onClick={(() => {this.handleViewContact(item.contact_id)})}><img src={require("../../assets/viewItem.svg")} width="30px" alt="view item" /> </button> */}
        <button className="edit-btn" onClick={(() => { this.handleEditClick(item.contact_id) })}><img src={require("../../assets/pencil.svg")} width="30px" alt="edit icon" /></button>
        <ul className="item" onClick={(() => { this.handleItemClick(item.contact_id) })}>
          {this.contactNameIncluded()}
          {this.contactTitleIncluded()}

          {/* <li>
          <span className="contact-labels">Contact Type:</span> {item.contact_type}
          </li> */}
          {this.contactBusinessIncluded()}
          {/* <li >
          <span className="contact-labels">Event Affiliation:</span> 
          {this.eventObjectReturnArray}
          </li> */}
          {this.contactEmailIncluded()}
          {this.contactPhoneIncluded()}
          {this.contactWebIncluded()}
        </ul>
      </div>
    );
  });

  render() {

    console.log("this is context", this.context.contacts)

    return (
      <div>
        <h1>Hi!</h1>
        {this.contactItemsList}
      </div>
    );
  }
};




export default ContactItem