import React, { Component } from 'react';
import Context from '../../Context'
import ForwardButton from '../Button/ForwardButton';
import BackButton from '../Button/BackButton';


class EditEvent extends Component {
  static contextType = Context;
  
  
  selectedEventId = this.props.match.params.event_id

  selectedEventItem = this.context.events.filter(item => item.event_id === this.selectedEventId)

  selectedEventItemForm = this.selectedEventItem.map((item) => {
    return (
      <div key={item.event_id} className="item-wrap contact-edit">
        <form>
          <div className="form-space">
            <label htmlFor="event_type" className="event-edit">Event Type:</label>
            <input type="text" name="event_type" id="event_type" defaultValue={item.event_type} />
          </div>
          <div className="form-space">
            <label htmlFor="name" className="event-edit">Name:</label>
            <input type="text" name="name" id="name" defaultValue={item.name} />
          </div>
          <div className="form-space">
            <label htmlFor="location" className="event-edit">Location:</label>
            <input type="location" name="location" id="location" defaultValue={item.location} />
          </div>
          <div className="form-space">
            <label htmlFor="event_dates" className="event-edit">Event Dates:</label>
            <input type="text" name="event_dates" id="event_dates" defaultValue={item.event_dates} />
          </div>
          <div className="form-space">
            <label htmlFor="application_due_dates" className="event-edit">Application Due Dates:</label>
            <input type="text" name="application_due_dates" id="application_due_dates" defaultValue={item.application_due_dates} />
          </div>
          <div className="form-space">
            <label htmlFor="contact" className="event-edit">Contact:</label>
            <input type="text" name="contact" id="contact" defaultValue={item.contact} />
          </div>
          <div className="form-space">
            <label htmlFor="notes" className="event-edit">Notes:</label>
            <input type="text" name="notes" id="notes" defaultValue={item.notes} />
          </div>
          <div className="form-space">
            <label htmlFor="submission_requirements" className="event-edit">Submission Requirements:</label>
            <input type="text" name="submission_requirements" id="submission_requirements" defaultValue={item.submission_requirements} />
          </div>
          <div className="form-space">
            <label htmlFor="catalog_items" className="event-edit">Catalog Items:</label>
            <input type="text" name="catalog_items" id="catalog_items" defaultValue={item.catalog_items} />
          </div>
          <button type="submit" value="submit">Submit</button>
        </form>
      </div>
    );
  })

  render() {
    return (
      <div>
        <h2>Edit Event</h2>
        {this.selectedEventItemForm}
        <ForwardButton /><BackButton />
      </div>
    )
  }

}


export default EditEvent;