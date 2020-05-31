import React from 'react';
import ReactDOM from 'react-dom';
import EditCatalogEntry from './EditCatalogEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditCatalogEntry />, div);
  ReactDOM.unmountComponentAtNode(div);
});