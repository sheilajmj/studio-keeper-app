import React, { Component } from 'react';
import Context from '../../Context';
import ForwardButton from '../Button/ForwardButton';
import BackButton from '../Button/BackButton';

class EventItem extends Component {
  static contextType = Context;

  handleEditClick(id){
    this.context.history.push(`/events/edit/${id}`)
  }

  eventItemsList = this.context.events.map((item, index) => {
    return (
      <div key={item.event_id} className="item-wrap">
        <ul className="item">
          <li>
          Event Type: {item.event_type}
          </li>
          <li>
          Name: {item.name}
          </li>
          <li>
          Location: {item.location}
          </li>          
          <li>
          Event Dates: {item.event_dates}
          </li>          
          <li>
          Application Due Dates: {item.application_due_date}
          </li>          
          <li>
          contact (link to contact data): {item.contact}
          </li>          
          <li>
          Notes: {item.notes}
          </li>          
          <li>
          Submission Requirements: {item.submission_requirements}
          </li>
          <li>
          Catalog Items (items to show or sell or enter to the event): {item.catalog_items}
          </li>
        </ul>
        <button onClick={(() => { this.handleEditClick(item.event_id) })}>Edit</button>
    </div>
    );
  });

  render(){
  return(
    <div>
      <ForwardButton /><BackButton />
      {this.eventItemsList}
    </div>
  );
  }
};




export default EventItem