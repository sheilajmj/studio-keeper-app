import React from 'react';
import ReactDOM from 'react-dom';
import CatalogButton from './CatalogButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CatalogButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});