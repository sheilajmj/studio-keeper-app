import React from 'react';
import EventItemContainer from './EventItemContainer'
import ForwardButton from '../Button/ForwardButton';
import BackButton from '../Button/BackButton';

function EventParent() {
  return (
    <main className='App'>
      <h2>Here are your Events</h2>
      <EventItemContainer />
      <ForwardButton /> <BackButton />
    </main>
  );
}

export default EventParent;