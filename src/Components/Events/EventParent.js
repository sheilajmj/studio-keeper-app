import React from 'react';
import EventItem from './EventItem'
import PageParentHeader from '../Nav/PageParentHeader';

function EventParent() {
  return (
    <section className='event'>
      <PageParentHeader pageName="Events" />
      <EventItem />
    </section>
  );
}

export default EventParent;