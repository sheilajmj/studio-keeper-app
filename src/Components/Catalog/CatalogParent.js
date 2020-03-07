import React, { Component } from 'react';
import CatalogItem from './CatalogItem'
import StudioKeeperContext from '../../Context'
import PageParentHeader from '../Nav/PageParentHeader';
import CatalogApiService from '../../services/catalog-api-service'

class CatalogParent extends Component {
  static contextType = StudioKeeperContext

  componentDidMount() {
    CatalogApiService.getCatalogItems()
      .then(this.context.setCatalogItems)
      .catch(this.context.setError)
  }

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