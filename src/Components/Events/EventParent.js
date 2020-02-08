import React from 'react';
import EventItemContainer from './EventItemContainer'

function EventParent() {
  return (
    <main className='App'>
      <h2>Here is the  Events Page</h2>
      <EventItemContainer />
    </main>
  );
}

export default EventParent;