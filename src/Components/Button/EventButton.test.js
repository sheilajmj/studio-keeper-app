import React from 'react';
import ReactDOM from 'react-dom';
import EventButton from './EventButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EventButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});