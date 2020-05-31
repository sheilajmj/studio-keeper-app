import React from 'react';
import ReactDOM from 'react-dom';
import ContactItemList from './ContactItemList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ContactItemList />, div);
  ReactDOM.unmountComponentAtNode(div);
});