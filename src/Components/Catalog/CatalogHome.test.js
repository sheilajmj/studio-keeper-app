import React from 'react';
import ReactDOM from 'react-dom';
import CatalogHome from './CatalogHome';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CatalogHome />, div);
  ReactDOM.unmountComponentAtNode(div);
});