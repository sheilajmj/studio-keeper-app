import React, { Component } from 'react';
import Context from '../../Context';
import PageParentHeader from '../Nav/PageParentHeader';
import Collapsible from '../Collapsible/Collaplisble'

class EventItem extends Component {
  static contextType = Context;

  handleEditClick(id) {
    this.context.history.push(`/events/edit/${id}`)
  }

  handleItemClick = (id) => {
    this.context.history.push(`/events/${id}`)
  }

  handleViewEvent = (id) => {
    this.context.history.push(`/events/${id}`)
  }


  render() {  
    
  this.eventItemsObject = this.context.events.map((item) => {
    console.log("events items", item)
    if (!item){
      return <div></div>
    }


  
   
    //return contacts
    // this.contactsLinkedArray = this.context.contacts.filter((contact) => {
    //   return (contact.contact_id === item.contact)
    // })
    // this.contactsLinkedReturn = this.contactsLinkedArray.map((contact) => {
    //   return (
    //     <div className="event-contacts"><a href={`http:///contacts/` + contact.contact_id} target="_blank" rel="noopener noreferrer">{contact.name}</a></div>

    //   )
    // })
    //

  //   //get the catalog_id of the catalog_items listed in the Event in an array
  //   if (item.catalog_items !== null || item.catalog_items !== ""){
  //   this.eventCatalogItemsArray = item.catalog_items
  //   this.catalogObject = [this.eventCatalogItemsArray].map((id) => {
  //     //get the catalog object of the contact favorite
  //     return (
  //       this.catalogObject = this.context.catalog_items.filter((item) => {
  //         return item.catalog_id === id
  //       })
  //     )
  //   })
  // }
    // this.catalogArray = this.catalogObject.flat()

    this.eventTypeIncluded = () => {
      if (item.event_type) {
        return (<li>
          <span className="event-labels">Event Type:</span> {item.event_type}
        </li>)
      }
    }

    this.eventNameIncluded = () => {
      if (item.name) {
        return (<li>
          <span className="event-labels">Name:</span> {item.name}
        </li>)
      }
    }

    this.eventWebIncluded = () => {
      if (item.website) {
        return (<li>
          <span className="event-labels">Web:</span> {item.website}
        </li>)
      }
    }

    this.eventLocationIncluded = () => {
      if (item.location) {
        return (<li>
          <span className="event-labels">Location:</span> {item.location}
        </li>)
      }
    }

    this.eventDatesIncluded = () => {
      if (item.event_dates) {
        return (<li>
          <span className="event-labels">Event Dates:</span> {item.event_dates}
        </li>)
      }
    }
    this.eventAppDatesIncluded = () => {
      if (item.application_due_date) {
        return (<li>
          <span className="event-labels">Application Due Dates:</span> {item.application_due_date}
        </li>)
      }
    }
    this.eventLocationIncluded = () => {
      if (item.location) {
        return (<li>
          <span className="event-labels">Location:</span> {item.location}
        </li>)
      }
    }

    return (
      <div key={item.id} className="item-wrap">
        <button type="button" className="edit-btn" onClick={(() => { this.handleEditClick(item.id) })}><img src={require("../../assets/pencil.svg")} width="30px" alt="edit icon" /></button>
        <ul className="item" onClick={(() => { this.handleItemClick(item.id) })}>
          {this.eventTypeIncluded()}
          {this.eventNameIncluded()}
          {this.eventWebIncluded()}
          {this.eventLocationIncluded()}
          {this.eventDatesIncluded()}
          {this.eventAppDatesIncluded()}
        </ul>
      </div>
    );
  });


    return (
      <div>
        <PageParentHeader pageName="Events" />
        {this.eventItemsObject}
        <Collapsible title="this is a title" children="HOWDY!" />
      </div>
    );
  }
};




export default EventItem