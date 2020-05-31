import React from 'react';
import ReactDOM from 'react-dom';
import EditContact from './EditContact';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditContact />, div);
  ReactDOM.unmountComponentAtNode(div);
});