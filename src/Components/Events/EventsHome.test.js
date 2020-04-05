import React from 'react';
import ReactDOM from 'react-dom';
import EventsHome from './EventsHome';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EventsHome />, div);
  ReactDOM.unmountComponentAtNode(div);
});