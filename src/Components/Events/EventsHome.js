import React, { Component } from 'react';
import Context from '../../Context';

let moment = require('moment');

class EventsHome extends Component {
  static contextType = Context;

  handleEditClick(id) {
    window.location.href = `/events/edit/${id}`
  }

  handleItemClick = (id) => {
    window.location.href = `/events/${id}`
  }

  handleViewEvent = (id) => {
    this.context.history.push(`/events/${id}`)
  }

  prettyDate = (date) => {
    let newDate = moment(`${date}`).format('L')
    return newDate
  }
  //maps the event items data and sets the JSX for rendering
  eventItemsObject = () => {
    let eventItems = this.context.events.map((item) => {
      if (item === undefined) {
        return <div></div>
      }

      this.eventNameIncluded = () => {
        if (item.name) {
          return (<li>
            <span className="event-labels">Name:</span> {item.name}
          </li>)
        }
      }

      this.eventWebIncluded = () => {
        if (item.website) {
          return (<li>
            <span className="event-labels">Web:</span> {item.website}
          </li>)
        }
      }

      this.eventDatesIncluded = () => {
        if (item.event_dates) {
          return (<li>
            <span className="event-labels">Event Dates:</span> {this.prettyDate(item.event_dates)}
          </li>)
        }
      }

      return (
        <div key={item.id} className="item-wrap">
          <button type="button" className="edit-btn" onClick={(() => { this.handleEditClick(item.id) })}><img src={require("../../assets/pencil.svg")} width="30px" alt="edit icon" /></button>
          <ul className="item" onClick={(() => { this.handleItemClick(item.id) })}>
            {this.eventNameIncluded()}
            {this.eventWebIncluded()}
            {this.eventDatesIncluded()}
          </ul>
        </div>
      );
    });
    return eventItems
  }

  render() {
    return (
      <div>
        <div className="flex-container">
          {this.eventItemsObject()}
        </div>
      </div>
    );
  }
}


export default EventsHome