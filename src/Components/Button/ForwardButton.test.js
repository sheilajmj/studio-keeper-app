import React from 'react';
import ReactDOM from 'react-dom';
import ForwardButton from './ForwardButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ForwardButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});