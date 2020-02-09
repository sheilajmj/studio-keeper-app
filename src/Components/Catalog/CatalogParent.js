import React from 'react';
import CatalogItemContainer from './CatalogItemContainer'

function CatalogParent() {
  return (
    <main className='App'>
      <h1>Here is your Catalog</h1>
      <CatalogItemContainer />
    </main>
  );
}

export default CatalogParent;