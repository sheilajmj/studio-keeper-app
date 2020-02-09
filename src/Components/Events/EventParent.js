import React from 'react';
import EventItemContainer from './EventItemContainer'
import Nav from '../Nav/Nav'

function EventParent() {
  return (
    <main className='App'>
      <Nav />
      <h2>Here are your Events</h2>
      <EventItemContainer />>
    </main>
  );
}

export default EventParent;