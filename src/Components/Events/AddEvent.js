import React, { Component } from 'react';
import Context from '../../Context'
import PageParentHeader from '../Nav/PageParentHeader';
import EventsApiService from '../../services/events-api-service';


class AddEvent extends Component {
  static contextType = Context;

  constructor(props) {
    super(props)
    this.state = {
      newEvent: {
        event_type: null,
        name: null,
        website: null,
        location: null,
        event_dates: null,
        application_due_dates: null,
        notes: null,
        submission_requirements: null,
      }
    }
  }

  handleChange = (e) => {
    const key = (e.target.name)
    const value = (e.target.value)
    this.setState(previousState => ({ newEvent: { ...previousState.newEvent, [key]: value } }))
  }

  createNewEvent = () => {
    let newEvent = this.state.newEvent
    this.context.updateAppStateEventsCreate(newEvent)
    EventsApiService.postEventItem(newEvent)
      .then((res) => { window.location.href = `/events/${res.id}` })
  }


  handleSubmit = (e) => {
    e.preventDefault()
    this.createNewEvent(e)
  }


  render() {

    return (
      <>
        <PageParentHeader pageName="Events" />
        <div className="item-edit-wrap event-edit">
          <form onSubmit={this.handleSubmit}>
            <h3 className="add-item-header">Add Event</h3>
            <div className="form-space">
              <label htmlFor="event_type" className="event-edit">Event Type:</label>
              <input type="text" name="event_type" id="event_type" onChange={this.handleChange} placeholder='Event Type' />
            </div>
            <div className="form-space">
              <label htmlFor="name" className="event-edit">Name:</label>
              <input type="text" name="name" id="name" onChange={this.handleChange} placeholder='Event Name' required/>
            </div>
            <div className="form-space">
              <label htmlFor="website" className="event-edit">Website:</label>
              <input type="text" name="website" id="website" onChange={this.handleChange} placeholder='Website' />
            </div>
            <div className="form-space">
              <label htmlFor="location" className="event-edit">Location:</label>
              <input type="location" name="location" id="location" onChange={this.handleChange} placeholder='Location' />
            </div>
            <div className="form-space">
              <label htmlFor="event_dates" className="event-edit">Event Dates:</label>
              <input type="text" name="event_dates" id="event_dates" onChange={this.handleChange} placeholder='11/27/2019' />
            </div>
            <div className="form-space">
              <label htmlFor="application_due_dates" className="event-edit">Application Due Dates:</label>
              <input type="text" className="application-due-date" name="application_due_dates" id="application_due_dates" onChange={this.handleChange} placeholder='Application Due Dates' />
            </div>
            <div className="form-space">
              <label htmlFor="notes" className="event-edit">Notes:</label>
              <textarea type="text" className="event-textarea" name="notes" id="notes" onChange={this.handleChange} placeholder='Notes' />
            </div>
            <div className="form-space">
              <label htmlFor="submission_requirements" className="event-edit">Submission Requirements:</label>
              <textarea type="text" className="event-textarea" name="submission_requirements" id="submission_requirements" onChange={this.handleChange} placeholder="Submission Requirements" />
            </div>
            <div className="button-wrap">
              <button className="submit-btn" type="submit" value="submit">Submit</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}



export default AddEvent;