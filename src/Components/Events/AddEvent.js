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
        event_type: "Event Type",
        name: "Event Name",
        website: "website",
        location: "Location",
        event_dates: "11/27/2019",
        application_due_dates: "Application Due Dates",
        notes: "Notes",
        submission_requirements: "some requirements",
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
              <input type="text" name="event_type" id="event_type" onChange={this.handleChange} placeholder={this.state.newEvent.event_type} />
            </div>
            <div className="form-space">
              <label htmlFor="name" className="event-edit">Name:</label>
              <input type="text" name="name" id="name" onChange={this.handleChange} placeholder={this.state.newEvent.name} />
            </div>
            <div className="form-space">
              <label htmlFor="website" className="event-edit">Website:</label>
              <input type="text" name="website" id="website" onChange={this.handleChange} placeholder={this.state.newEvent.website} />
            </div>
            <div className="form-space">
              <label htmlFor="location" className="event-edit">Location:</label>
              <input type="location" name="location" id="location" onChange={this.handleChange} placeholder={this.state.newEvent.location} />
            </div>
            <div className="form-space">
              <label htmlFor="event_dates" className="event-edit">Event Dates:</label>
              <input type="text" name="event_dates" id="event_dates" onChange={this.handleChange} placeholder={this.state.newEvent.event_dates} />
            </div>
            <div className="form-space">
              <label htmlFor="application_due_dates" className="event-edit">Application Due Dates:</label>
              <input type="text" className="application-due-date" name="application_due_dates" id="application_due_dates" onChange={this.handleChange} placeholder={this.state.newEvent.application_due_dates} />
            </div>
            <div className="form-space">
              <label htmlFor="notes" className="event-edit">Notes:</label>
              <textarea type="text" className="event-textarea" name="notes" id="notes" onChange={this.handleChange} placeholder={this.state.newEvent.notes} />
            </div>
            <div className="form-space">
              <label htmlFor="submission_requirements" className="event-edit">Submission Requirements:</label>
              <textarea type="text" className="event-textarea" name="submission_requirements" id="submission_requirements" onChange={this.handleChange} placeholder={this.state.newEvent.submission_requirements} />
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