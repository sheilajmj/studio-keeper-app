import React from 'react';
import ReactDOM from 'react-dom';
import ContactButton from './ContactButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ContactButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});