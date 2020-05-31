import React from 'react';
import ReactDOM from 'react-dom';
import ViewContact from './ViewContact';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ViewContact />, div);
  ReactDOM.unmountComponentAtNode(div);
});