import React, { Component } from 'react';
import Context from '../../Context';

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

  eventItemsObject = this.context.events.map((item) => {
    //return contacts
    this.contactsLinkedArray = this.context.contacts.filter((contact) => {
      return (contact.contact_id === item.contact)
    })
    this.contactsLinkedReturn = this.contactsLinkedArray.map((contact) => {
      return (
        <div className="event-contacts"><a href={`http:///contacts/` + contact.contact_id} target="_blank" rel="noopener noreferrer">{contact.name}</a></div>

      )
    })
    //

    //get the catalog_id of the catalog_items listed in the Event in an array
    if (item.catalog_items !== null || item.catalog_items !== ""){
    this.eventCatalogItemsArray = item.catalog_items.split(', ')
    this.catalogObject = this.eventCatalogItemsArray.map((id) => {
      //get the catalog object of the contact favorite
      return (
        this.catalogObject = this.context.catalog_items.filter((item) => {
          return item.catalog_id === id
        })
      )
    })
  }
    this.catalogArray = this.catalogObject.flat()
    console.log("this is catalogArray", this.catalogArray)

    //turn the catalog object into a return value for the image
    this.catalogReturn = this.catalogArray.map((item) => {
        if (item.images !== null || item.images !== ""){
          this.imgReturn = [item.images.split(', ')[0]].map((image) => {
            return (
              <img className="catalog-img-item" src={require("../../assets/" + image)} alt="catalog item" />
            )
          })}
     

      return (
        <a href={'/catalog/' + item.catalog_id} target="_blank" rel="noopener noreferrer">
          {this.imgReturn}
        </a>
      )
    })


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
      <div key={item.event_id} className="item-wrap">
        {/* <button type="button" className="view-item" value="viewEvent" onClick={(() => {this.handleViewEvent(item.event_id)})}><img src={require("../../assets/viewItem.svg")} width="30px" alt="view item" /></button> */}
        <button type="button" className="edit-btn" onClick={(() => { this.handleEditClick(item.event_id) })}><img src={require("../../assets/pencil.svg")} width="30px" alt="edit icon" /></button>
        <ul className="item" onClick={(() => { this.handleItemClick(item.event_id) })}>
          {this.eventTypeIncluded()}
          {this.eventNameIncluded()}
          {this.eventWebIncluded()}
          {this.eventLocationIncluded()}
          {this.eventDatesIncluded()}
          {this.eventAppDatesIncluded()}

          {/* <li>
          <span className="event-labels">Affiliated Contacts:</span> {this.contactsLinkedReturn}
          </li>          
          <li>
          <span className="event-labels">Notes:</span> {item.notes}
          </li>          
          <li>
          <span className="event-labels">Submission Requirements:</span> {item.submission_requirements}
          </li>
          <li>
          <span className="event-labels">Catalog Items (items to show or sell at event):</span> {this.catalogReturn}
          </li> */}
        </ul>
      </div>
    );
  });

  render() {

    return (
      <div>
        {this.eventItemsObject}
      </div>
    );
  }
};




export default EventItem