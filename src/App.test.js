import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<BrowserRouter><App /></BrowserRouter>, div)
  ReactDom.unmountComponentAtNode(div)
});
