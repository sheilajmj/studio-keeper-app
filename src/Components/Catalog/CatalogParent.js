import React from 'react';
import CatalogItemContainer from './CatalogItemContainer'

function CatalogParent() {
  return (
    <main className='App'>
      <h1>This is the Catalog Parent</h1>
      <CatalogItemContainer />
    </main>
  );
}

export default CatalogParent;