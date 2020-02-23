import React, { Component } from 'react';
import StudioKeeperContext from '../../Context'
import Nav from '../Nav/Nav'
import PageParentHeader from '../Nav/PageParentHeader';

class ViewEvent extends Component {
  static contextType = StudioKeeperContext

  handleEditClick = (id) => {
    this.context.history.push(`/events/edit/${id}`)
  }
  
  handleDeleteClick = (id) => {
    this.handleDeleteEvent(id)
    this.context.history.push(`/events`)
  }

  handleBackToEvents = (e) => {
    this.context.history.push('/events')
  }

  render(){
    this.selectedEventId = this.props.match.params.event_id
    this.eventObject = this.context.events.find(event => event.event_id === this.selectedEventId)
    this.eventArray = [this.eventObject]
    this.handleDeleteEvent = (id) => {
        let indexToDelete = this.context.events.findIndex(event => event.event_id === id)
        let eventsList = JSON.parse(JSON.stringify(this.context.events))
        eventsList.splice(indexToDelete, 1)
        let newEventsList = eventsList
        this.context.updateAppStateEventsDelete(newEventsList)
      }

    this.eventObjectRender = this.eventArray.map((item) => {
      this.contactsLinkedArray = this.context.contacts.filter((contact) => {
        return (contact.contact_id === item.contact) 
      })
      this.contactsLinkedReturn = this.contactsLinkedArray.map((contact) => {
        return (
          <div className="event-contacts"><a href={`http://localhost:3000/contacts/` + contact.contact_id} target="_blank" rel="noopener noreferrer">{contact.name}</a></div>
  
        )
      })
  
       //get the catalog_id of the catalog_items listed in the Event in an array
    this.eventCatalogItemsArray = item.catalog_items.split(', ')
    this.catalogObject = this.eventCatalogItemsArray.map((id) => {
        //get the catalog object of the contact favorite
      return (
        this.catalogObject = this.context.catalog_items.filter((item) => {
        return item.catalog_id === id
      })
      )
      })
    this.catalogArray = this.catalogObject.flat()

      //turn the catalog object into a return value for the image
    this.catalogReturn = this.catalogArray.map((item) => {
      return (
        <a href={'localhost:3000/catalog/' + item.catalog_id} target="_blank" rel="noopener noreferrer">
          {this.imageFav = item.images.split(', ').map((image) => {
            return (
              <img className="catalog-img-item" src={require("../../assets/" + image)} alt="catalog item" />
            )
          })}
          </a>
      )
    })

      return (
        <div><PageParentHeader pageName="Events" />
        <div key={item.event_id} className="item-wrap">
        <button type="button" className="back-to-btn" value="backToEvents" onClick={(() => { this.handleBackToEvents(item.event_id) })}><img src={require("../../assets/back.svg")} alt="back icon" width="12px"/><span className="all-events-text">All Events</span></button>
        <button className="edit-btn" type="button" onClick={(() => { this.handleEditClick(item.event_id) })}><img src={require("../../assets/pencil.svg")} width="30px" alt="edit icon" /></button>
          <ul className="item event-view">
            <li>
            <span className="event-labels">Event Type:</span> {item.event_type}
            </li>
            <li>
            <span className="event-labels">Name:</span> {item.name}
            </li>
            <li>
            <span className="event-labels">Website:</span> {item.website}
            </li>
            <li>
            <span className="event-labels">Location:</span> {item.location}
            </li>          
            <li>
            <span className="event-labels">Event Dates:</span> {item.event_dates}
            </li>
            <div className="border"></div>           
            <li>
            <span className="event-labels">Application Due Dates:</span> {item.application_due_date}
            </li>   
            <li>
            <p className="event-labels">Submission Requirements:</p> {item.submission_requirements}
            </li>
            <li>
            <span className="event-labels">Affiliated Contacts:</span> {this.contactsLinkedReturn}
            </li>          
            <li>
            <p className="event-labels">Notes:</p> {item.notes}
            </li>          
            <li>
            <div className="border"></div>   
            <p className="event-labels">Catalog Items (items to show or sell at event):</p> {this.catalogReturn}
            </li>
          </ul>
          <div className="button-wrap">
          <button className="delete-btn" onClick={() => { this.handleDeleteClick(item.event_id) }}>Delete</button>
          </div>
      </div>
      </div>
      );
    })
    return(
        <div>
            {this.eventObjectRender}
        </div>
    )

     
  }
}
  export default ViewEvent