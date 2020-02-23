import React from 'react';
import EventItem from './EventItem'
import PageNav from '../Nav/PageNav'
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