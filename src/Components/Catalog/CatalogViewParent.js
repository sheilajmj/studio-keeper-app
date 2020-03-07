import React, { Component } from 'react';
// import CatalogItem from './CatalogItem'
import StudioKeeperContext from '../../Context'
import PageParentHeader from '../Nav/PageParentHeader';
import CatalogApiService from '../../services/catalog-api-service'
import ViewCatalog from './ViewCatalog';

class CatalogViewParent extends Component {
  static contextType = StudioKeeperContext

  componentDidMount() {
    CatalogApiService.getCatalogItem()
      .then(this.context.setCatalogItems)
      .catch(this.context.setError)
  }

  render(){
  return (
    <section className='catalog'>
      <PageParentHeader pageName="Catalog" />
      <ViewCatalog id={this.props.match.params.id} />    
</section>
  );
  }
}

export default CatalogViewParent;