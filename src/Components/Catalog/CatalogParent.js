import React, { Component } from 'react';
import CatalogItem from './CatalogItem'
import PageParentHeader from '../Nav/PageParentHeader';

class CatalogParent extends Component {
  render(){
  return (
    <section className='catalog'>
      <PageParentHeader pageName="Catalog" />
      <CatalogItem />
    </section>
  );
  }
}

export default CatalogParent;