import React from 'react';
import CatalogItemContainer from './CatalogItemContainer'
import Nav from '../Nav/Nav'


function CatalogParent() {
  return (
    <main className='App'>
      <Nav />
      <h1>Here is your Catalog</h1>

      <CatalogItemContainer />
    </main>
  );
}

export default CatalogParent;