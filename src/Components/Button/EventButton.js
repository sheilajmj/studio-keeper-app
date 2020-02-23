import React, { Component } from 'react';
import Context from '../../Context'


class EventButton extends Component {
  static contextType = Context;

  handleEventsClick = () => {
    this.context.history.push('/events')
  }

  render() {
    return (
        <button onClick={() => { this.handleEventsClick() }}>Events</button>
    );
  }
}

export default EventButton;