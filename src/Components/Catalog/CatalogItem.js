import React, { Component } from 'react';
import Context from '../../Context'
import CatalogApiService from '../../services/catalog-api-service'
import PageParentHeader from '../Nav/PageParentHeader'


class CatalogItem extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state={
      catalog_items: []
    }
  }


  handleEditClick(id) {
    this.context.history.push(`/catalog/edit/${id}`)
  }

  handleItemClick = (id) => {
    this.context.history.push(`/catalog/${id}`)
  }

  handleViewCatalog = (id) => {
    this.context.history.push(`/catalog/${id}`)
  }

  setCatalogItems = (items) => {
    this.setState({catalog_items: items})
  }

componentDidMount = () => {
  CatalogApiService.getCatalogItems()
  .then(this.setCatalogItems)
  .catch(this.context.setError)
}

  
  render() {
    if (this.state.catalog_items === {}){
      this.setCatalogItems(this.context.catalog_items)
    }

    if (this.state.catalog_items !== {}){
    this.catalogItemsList = this.state.catalog_items.map((item) => {
    
      this.handleImages = () => {    
      if (!item.images){
        item.images = ""
      }
      this.imageArray = item.images.split(', ')
      this.itemImagesArrayReturn = this.imageArray.map((item) => {
        if (item.images === ""){
          return (<></>)
        }
        else{
        return (
          this.imageItems = <img className="catalog-img-item" src={require("../../assets/" + item)} alt="catalog item" />
        )
        }
      })
    return this.imageItems
    }
  
  
      // this.favoritedByArray = this.context.contacts.filter(contact => contact.favorites.includes(item.id))
  
      // this.favoritedByReturn = this.favoritedByArray.map(fav => {
      //   return {
      //     contact_id: fav.contact_id,
      //     name: fav.name,
      //     business_name: fav.business_name,
      //   }
      // }
      // )
      // this.favoritedByReturnMapped = this.favoritedByReturn.map(fav => {
      //   return (
      //     <li><a href={`./contacts/` + fav.contact_id} target="_blank" rel="noopener noreferrer">{fav.name}</a></li>
      //   )
      // })
  
      this.catalogImagesIncluded = () => {
        if (item.images) {
          return (<li className="catalog-img">
            {this.handleImages()}
          </li>)
        }
      }
  
      this.catalogCollectionIncluded = () => {
        if (item.collection) {
          return (<li className="catalog-collection">
            <span className="catalog-labels">Collection:</span> {item.collection}
          </li>)
        }
      }
  
      this.catalogNameIncluded = () => {
        if (item.name) {
          return (<li className="catalog-name">
            <span className="catalog-labels">Name:</span>{item.name}
          </li>)
        }
      }
  
      this.catalogPriceIncluded = () => {
        if (item.price) {
          return (<li className="catalog-price">
            <span className="catalog-labels">Price:</span> {item.price}
          </li>)
        }
      }
  
      this.catalogQuantityIncluded = () => {
        if (item.quantity) {
          return (<li className="catalog-quantity">
            <span className="catalog-labels">Qty:</span> {item.quantity}
          </li>)
        }
      }
  
      return (
        <div key={'catalog'+item.id} className="item-wrap">
          {/* <button type="button" className="view-item" value="viewCatalog" onClick={(() => {this.handleViewCatalog(item.catalog_id)})}><img src={require("../../assets/viewItem.svg")} width="30px" alt="view item" /></button> */}
          <button className="edit-btn" onClick={(() => { this.handleEditClick(item.id) })}><img src={require("../../assets/pencil.svg")} width="30px" alt="edit icon" /></button>
          <ul className="item" onClick={(() => { this.handleItemClick(item.id) })}>
            {this.catalogImagesIncluded()}
            {this.catalogCollectionIncluded()}
            {this.catalogNameIncluded()}
            <div className="low-level">
              {this.catalogPriceIncluded()}
              {this.catalogQuantityIncluded()}
            </div>
          </ul>
        </div>
      )
    })
    }
  
    return (
      <section className='catalog-item'>
          <PageParentHeader pageName="Catalog" />

        {this.catalogItemsList}
      </section>
    );
  }
}


export default CatalogItem;



