import React from 'react';
import CatalogItem from './CatalogItem'
import Nav from '../Nav/Nav'


function CatalogParent() {
  return (
    <section className='catalog'>
      <Nav />
      <h2>Catalog</h2>
      <CatalogItem />
    </section>
  );
}

export default CatalogParent;