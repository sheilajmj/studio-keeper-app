import React from 'react';
import ReactDOM from 'react-dom';
import AddCatalogEntry from './AddCatalogEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddCatalogEntry />, div);
  ReactDOM.unmountComponentAtNode(div);
});