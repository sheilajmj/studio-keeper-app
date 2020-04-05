import React from 'react';
import ReactDOM from 'react-dom';
import AddContact from './AddContact';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddContact />, div);
  ReactDOM.unmountComponentAtNode(div);
});