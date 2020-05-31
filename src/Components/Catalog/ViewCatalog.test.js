import React from 'react';
import ReactDOM from 'react-dom';
import ViewCatalog from './ViewCatalog';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ViewCatalog />, div);
  ReactDOM.unmountComponentAtNode(div);
});