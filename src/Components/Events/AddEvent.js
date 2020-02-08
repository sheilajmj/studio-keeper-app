import React, { Component } from 'react';
import Context from '../../Context'


class AddEvent extends Component {
  static contextType = Context;
  

  render() {
    return (
      <div className="item-wrap contact-edit">
        <form>
          <div className="form-space">
            <label htmlFor="event_type" className="event-edit">Event Type:</label>
            <input type="text" name="event_type" id="event_type" defaultValue="Event Type" />
          </div>
          <div className="form-space">
            <label htmlFor="name" className="event-edit">Name:</label>
            <input type="text" name="name" id="name" defaultValue="Event Name" />
          </div>
          <div className="form-space">
            <label htmlFor="location" className="event-edit">Location:</label>
            <input type="location" name="location" id="location" defaultValue="Location" />
          </div>
          <div className="form-space">
            <label htmlFor="event_dates" className="event-edit">Event Dates:</label>
            <input type="text" name="event_dates" id="event_dates" defaultValue="Event Dates" />
          </div>
          <div className="form-space">
            <label htmlFor="application_due_dates" className="event-edit">Application Due Dates:</label>
            <input type="text" name="application_due_dates" id="application_due_dates" defaultValue="Applicaiton Due Dates" />
          </div>
          <div className="form-space">
            <label htmlFor="contact" className="event-edit">Contact:</label>
            <input type="text" name="contact" id="contact" defaultValue="Contact" />
          </div>
          <div className="form-space">
            <label htmlFor="notes" className="event-edit">Notes:</label>
            <input type="text" name="notes" id="notes" defaultValue="Notes" />
          </div>
          <div className="form-space">
            <label htmlFor="submission_requirements" className="event-edit">Submission Requirements:</label>
            <input type="text" name="submission_requirements" id="submission_requirements" defaultValue="Submission Requirements" />
          </div>
          <div className="form-space">
            <label htmlFor="catalog_items" className="event-edit">Catalog Items:</label>
            <input type="text" name="catalog_items" id="catalog_items" defaultValue="Catalog Items" />
          </div>
          <button type="submit" value="submit">Submit</button>
        </form>
      </div>
    );
  }
  }



export default AddEvent;