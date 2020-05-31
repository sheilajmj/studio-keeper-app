import React, { Component } from 'react';
import Context from '../../Context';
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
      },
      errors: {}
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
    if (this.handleValidation()) {
      this.createNewEvent(e)
    }
    else {
      console.log(this.state.errors);
    }
  }

  //validates form data - triggered on submit
  handleValidation() {
    let fields = this.state.newEvent;
    let errors = {};
    let formIsValid = true;

    this.startTimeout = () =>{
      setTimeout(() => {this.setState({ errors:{} })}, 5000);
      }

    //name
    console.log(fields["name"], "NAME")
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
      this.startTimeout();
    }

    if (typeof fields["name"] !== "undefined" && fields["name"] !== null) {
      if (!fields["name"].match(/^[a-zA-Z0-9 ]*$/)) {
        formIsValid = false;
        errors["name"] = "Please avoid special characters.";
        this.startTimeout();
      }
    }

    //event_type
    if (typeof fields["event_type"] !== "undefined" && fields["event_type"] !== null) {
      if (!fields["event_type"].match(/^[a-zA-Z0-9 ]*$/)) {
        formIsValid = false;
        errors["event_type"] = "Please avoid special characters.";
        this.startTimeout();
      }
    }

    //website
    if (typeof fields["website"] !== "undefined" && fields["website"] !== null) {
      if (!fields["website"].match(/^(?:http(s)?:\/\/)?[\w.-]+(?:.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/)) {
        formIsValid = false;
        errors["website"] = "Please enter a valid website.";
        this.startTimeout();
      }
    }

    //location
    if (typeof fields["location"] !== "undefined" && fields["location"] !== null) {
      if (!fields["location"].match(/^[a-zA-Z0-9 ]*$/)) {
        formIsValid = false;
        errors["location"] = "Please use letters and numbers only.";
        this.startTimeout();
      }
    }

    //event_dates 
    if (typeof fields["event_dates"] !== "undefined" && fields["event_dates"] !== null) {
      if (!fields["event_dates"].match(/^[0-3]?[0-9]\/[0-3]?[0-9]\/(?:[0-9]{2})?[0-9]{2}$/)) {
        formIsValid = false;
        errors["event_dates"] = "Please enter MM/DD/YYYY format.";
        this.startTimeout();
      }
    }

    //application_due_dates
    if (typeof fields["application_due_dates"] !== "undefined" && fields["application_due_dates"] !== null) {
      if (!fields["application_due_dates"].match(/^[0-3]?[0-9]\/[0-3]?[0-9]\/(?:[0-9]{2})?[0-9]{2}$/)) {
        formIsValid = false;
        errors["application_due_dates"] = "Please enter MM/DD/YYYY format.";
        this.startTimeout();
      }
    }

    //notes
    if (typeof fields["notes"] !== "undefined" && fields["notes"] !== null) {
      if (!fields["notes"].match(/[a-zA-Z0-9#.()/%&\s-?!]{0,19}/)) {
        formIsValid = false;
        errors["notes"] = "Please do not use special characters.";
        this.startTimeout();
      }
    }

    //submission_requirements
    if (typeof fields["submission_requirements"] !== "undefined" && fields["submission_requirements"] !== null) {
      if (!fields["submission_requirements"].match(/[a-zA-Z0-9#.()/%&\s-?!]{0,19}/)) {
        formIsValid = false;
        errors["submission_requirements"] = "Please do not use special characters.";
        this.startTimeout();
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
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
            <div className="errorMsg">{this.state.errors.event_type}</div>
            <div className="form-space">
              <label htmlFor="name" className="event-edit">Name:</label>
              <input type="text" name="name" id="name" onChange={this.handleChange} placeholder='Event Name' required />
            </div>
            <div className="errorMsg">{this.state.errors.name}</div>
            <div className="form-space">
              <label htmlFor="website" className="event-edit">Website:</label>
              <input type="text" name="website" id="website" onChange={this.handleChange} placeholder='Website' />
            </div>
            <div className="errorMsg">{this.state.errors.website}</div>
            <div className="form-space">
              <label htmlFor="location" className="event-edit">Location:</label>
              <input type="location" name="location" id="location" onChange={this.handleChange} placeholder='Location' />
            </div>
            <div className="errorMsg">{this.state.errors.location}</div>
            <div className="form-space">
              <label htmlFor="event_dates" className="event-edit">Event Dates:</label>
              <input type="text" name="event_dates" id="event_dates" onChange={this.handleChange} placeholder='11/27/2019' />
            </div>
            <div className="errorMsg">{this.state.errors.event_dates}</div>
            <div className="form-space">
              <label htmlFor="application_due_dates" className="event-edit">Application Due Dates:</label>
              <input type="text" className="application-due-date" name="application_due_dates" id="application_due_dates" onChange={this.handleChange} placeholder='Application Due Dates' />
            </div>
            <div className="errorMsg">{this.state.errors.application_due_dates}</div>
            <div className="form-space">
              <label htmlFor="notes" className="event-edit">Notes:</label>
              <textarea type="text" className="event-textarea" name="notes" id="notes" onChange={this.handleChange} placeholder='Notes' />
            </div>
            <div className="errorMsg">{this.state.errors.notes}</div>
            <div className="form-space">
              <label htmlFor="submission_requirements" className="event-edit">Submission Requirements:</label>
              <textarea type="text" className="event-textarea" name="submission_requirements" id="submission_requirements" onChange={this.handleChange} placeholder="Submission Requirements" />
            </div>
            <div className="errorMsg">{this.state.errors.submission_requirements}</div>
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