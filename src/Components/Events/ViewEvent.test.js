import React from 'react';
import ReactDOM from 'react-dom';
import ViewEvent from './ViewEvent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ViewEvent />, div);
  ReactDOM.unmountComponentAtNode(div);
});