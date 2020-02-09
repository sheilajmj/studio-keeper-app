import React, { Component } from 'react';
import Context from '../../Context'


class EventButton extends Component {
  static contextType = Context;

  handleEventsClick = () => {
    this.context.history.push('/events')
  }

  handleAddClick = (location) => {
    this.context.history.push(`/${location}/add`)
  }

  render() {
    return (
      <div>
        <button onClick={() => { this.handleEventsClick() }}>Events</button>
        <button className="eventOptions add-btn" onClick={(() => { this.handleAddClick('events') })}> + </button>
      </div>
    );
  }
}

export default EventButton;