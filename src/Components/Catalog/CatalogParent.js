import React from 'react';
import CatalogItem from './CatalogItem'
import PageParentHeader from '../Nav/PageParentHeader';


function CatalogParent() {
  return (
    <section className='catalog'>
      <PageParentHeader pageName="Catalog" />
      <CatalogItem />
    </section>
  );
}

export default CatalogParent;