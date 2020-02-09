import React, { Component } from 'react';
import Context from '../../Context'
import Nav from '../Nav/Nav'
const { uuid } = require('uuidv4')


class AddEvent extends Component {
  static contextType = Context;
  
  constructor(props){
    super(props)
    this.state = {
      newEvent:{
        event_type: "Event Type", 
        name: "Event Name",
        location: "Location",
        event_dates: "Event Dates",
        application_due_dates: "Application Due Dates",
        contact: "Contact",
        notes: "Notes",
        catalog_items: "Catalog Items",
      }
    }
  }

  handleChange = (e) => {
    const key = (e.target.name)
    const value = (e.target.value)
    this.setState(previousState => ({newEvent: {...previousState.newEvent, [key]: value}}))
    this.setState(previousState => ({newEvent: {...previousState.newEvent, event_id: uuid()}}))
    }
  
    createNewEvent = () => {
      const newEvent = this.state.newEvent
      this.context.updateAppStateEvent(newEvent)
    }
  
  
    handleSubmit = (e) => {
      e.preventDefault()
      this.createNewEvent(e)
    }


  render() {
    return (
      <>
      <Nav />
      <div className="item-wrap contact-edit">
        <h2>Add Event</h2>

        <form onSubmit={this.handleSubmit}>
          <div className="form-space">
            <label htmlFor="event_type" className="event-edit">Event Type:</label>
            <input type="text" name="event_type" id="event_type" onChange={this.handleChange} defaultValue={this.state.newEvent.event_type} />
          </div>
          <div className="form-space">
            <label htmlFor="name" className="event-edit">Name:</label>
            <input type="text" name="name" id="name" onChange={this.handleChange} defaultValue={this.state.newEvent.name} />
          </div>
          <div className="form-space">
            <label htmlFor="location" className="event-edit">Location:</label>
            <input type="location" name="location" id="location" onChange={this.handleChange} defaultValue={this.state.newEvent.location} />
          </div>
          <div className="form-space">
            <label htmlFor="event_dates" className="event-edit">Event Dates:</label>
            <input type="text" name="event_dates" id="event_dates" onChange={this.handleChange} defaultValue={this.state.newEvent.event_dates} />
          </div>
          <div className="form-space">
            <label htmlFor="application_due_dates" className="event-edit">Application Due Dates:</label>
            <input type="text" name="application_due_dates" id="application_due_dates" onChange={this.handleChange} defaultValue={this.state.newEvent.application_due_dates} />
          </div>
          <div className="form-space">
            <label htmlFor="contact" className="event-edit">Contact:</label>
            <input type="text" name="contact" id="contact" onChange={this.handleChange} defaultValue={this.state.newEvent.contact} />
          </div>
          <div className="form-space">
            <label htmlFor="notes" className="event-edit">Notes:</label>
            <input type="text" name="notes" id="notes" onChange={this.handleChange} defaultValue={this.state.newEvent.notes} />
          </div>
          <div className="form-space">
            <label htmlFor="submission_requirements" className="event-edit">Submission Requirements:</label>
            <input type="text" name="submission_requirements" id="submission_requirements" onChange={this.handleChange} defaultValue={this.state.newEvent.submission_requirements} />
          </div>
          <div className="form-space">
            <label htmlFor="catalog_items" className="event-edit">Catalog Items:</label>
            <input type="text" name="catalog_items" id="catalog_items" onChange={this.handleChange} defaultValue={this.state.newEvent.catalog_items} />
          </div>
          <button type="submit" value="submit">Submit</button>
        </form>
      </div>
      </>
    );
  }
  }



export default AddEvent;