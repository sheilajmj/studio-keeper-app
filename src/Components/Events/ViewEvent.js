import React, { Component } from 'react';
import StudioKeeperContext from '../../Context'
import Nav from '../Nav/Nav'

class ViewEvent extends Component {
  static contextType = StudioKeeperContext

  handleEditClick = (id) => {
    this.context.history.push(`/events/edit/${id}`)
  }
  
  handleDeleteClick = (id) => {
    this.handleDeleteEvent(id)
    this.context.history.push(`/events`)
  }

  handleBackToevents = (e) => {
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
        return(
            <div>
                <div key={item.event_id} className="item-wrap">
            <ul className="item">
                <li>
                    Event Type: {item.event_type}
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
                <li>
                  {item.address_city}{item.address_state}{item.address_zip}
                </li>
                <li>
                  {item.address_country}
                </li>
                <li>
                  website: {item.website}
                </li>
                <li>
                  Favorites: {item.favorites}
                </li>
                <li>
                  Notes: {item.notes}
                </li>
            </ul>
            <button onClick={(() => { this.handleEditClick(item.event_id) })}>Edit</button>
            <button onClick={() => { this.handleDeleteClick(item.event_id) }}>Delete</button>
            <button type="button" value="backToEvents" onClick={(() => {this.handleBackToEvents(item.event_id)})}>Back to Events</button>
          </div>
        </div>
      )
    })
    return(
        <div>
            <Nav />
            {this.eventObjectRender}
        </div>
    )

     
  }
}
  export default ViewEvent