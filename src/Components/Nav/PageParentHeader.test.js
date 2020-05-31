import React from 'react';
import ReactDOM from 'react-dom';
import PageParentHeader from './PageParentHeader';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PageParentHeader />, div);
  ReactDOM.unmountComponentAtNode(div);
});