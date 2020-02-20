import React, { Component } from 'react';
import Context from '../../Context'
import Nav from '../Nav/Nav'


class EditEvent extends Component {
  static contextType = Context;
  
  constructor(props){
    super(props)
    this.state={
      updateBoolean: false,
      updatedEvent: []
    }
  }
  
  render() {

    this.selectedEventId = this.props.match.params.event_id
    this.selectedEventObject = this.context.events.find(event => event.event_id === this.selectedEventId)
    this.selectedEventArray = [this.selectedEventObject];
    // selectedEventItem = this.context.events.filter(item => item.event_id === this.selectedEventId)
  
    this.handleSubmit = (e) => {
      e.preventDefault()
      this.context.updateAppStateEventsUpdate(this.state.updatedEvent)
      this.context.history.push(`/events`)
    }

    this.setInitialDefaultState = () => {
      if(this.state.updateBoolean === false){
        this.setState({updatedEvent: this.selectedEventObject})
      }
    }

    this.handleChange = (e) => {
      const key = (e.target.name)
      const value = (e.target.value)
      this.setInitialDefaultState()
      this.setState(previousState => ({ updatedEvent: { ...previousState.updatedEvent, [key]: value }, updateBoolean: true }))
    }


    this.handleCancel = (e) => {
      this.context.history.push('/events')
    }

    this.handleDeleteEvent = (id) => {
        let indexToDelete = this.context.events.findIndex(event => event.event_id === id)
        let eventsList = JSON.parse(JSON.stringify(this.context.events))
        eventsList.splice(indexToDelete, 1)
        let newEventsList = eventsList
        this.context.updateAppStateEventsDelete(newEventsList)
        this.context.history.push(`/events`)
      }


    this.selectedEventForm = this.selectedEventArray.map((item) => {
      return (
        <div key={item.event_id} className="item-wrap event-edit">
          <form onSubmit={this.handleSubmit}>
            <div className="form-space">
              <label htmlFor="event_type" className="event-edit">Event Type:</label>
              <input type="text" name="event_type" id="event_type" onChange={this.handleChange} defaultValue={item.event_type} />
            </div>
            <div className="form-space">
              <label htmlFor="name" className="event-edit">Name:</label>
              <input type="text" name="name" id="name" onChange={this.handleChange} defaultValue={item.name} />
            </div>
            <div className="form-space">
              <label htmlFor="location" className="event-edit">Location:</label>
              <input type="location" name="location" id="location" onChange={this.handleChange} defaultValue={item.location} />
            </div>
            <div className="form-space">
              <label htmlFor="event_dates" className="event-edit">Event Dates:</label>
              <input type="text" name="event_dates" id="event_dates" onChange={this.handleChange} defaultValue={item.event_dates} />
            </div>
            <div className="form-space">
              <label htmlFor="application_due_dates" className="event-edit">Application Due Dates:</label>
              <input type="text" name="application_due_dates" id="application_due_dates" onChange={this.handleChange} defaultValue={item.application_due_dates} />
            </div>
            <div className="form-space">
              <label htmlFor="contact" className="event-edit">Contact:</label>
              <input type="text" name="contact" id="contact" onChange={this.handleChange} defaultValue={item.contact} />
            </div>
            <div className="form-space">
              <label htmlFor="notes" className="event-edit">Notes:</label>
              <input type="text" name="notes" id="notes" onChange={this.handleChange} defaultValue={item.notes} />
            </div>
            <div className="form-space">
              <label htmlFor="submission_requirements" className="event-edit">Submission Requirements:</label>
              <input type="text" name="submission_requirements" id="submission_requirements" onChange={this.handleChange} defaultValue={item.submission_requirements} />
            </div>
            <div className="form-space">
              <label htmlFor="catalog_items" className="event-edit">Catalog Items:</label>
              <input type="text" name="catalog_items" id="catalog_items" onChange={this.handleChange} defaultValue={item.catalog_items} />
            </div>
            <button type="submit" value="submit">Submit</button>
            <button type="button" value="delete" onClick={(() => {this.handleDeleteEvent(item.event_id)})}>Delete Event</button>
            <button type="button" value="cancel" onClick={(() => {this.handleCancel(item.event_id)})}>Cancel</button>
          </form>
        </div>
      );
    })
  
      return (
      <div>
        <Nav />
        <h2>Edit Event</h2>
        {this.selectedEventForm}
      </div>
    )
  }

}


export default EditEvent;