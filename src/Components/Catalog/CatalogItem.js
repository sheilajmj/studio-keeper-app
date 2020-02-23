import React, { Component } from 'react';
import Context from '../../Context'

class CatalogItem extends Component {
  static contextType = Context;

  handleEditClick(id) {
    this.context.history.push(`/catalog/edit/${id}`)
  }

  handleItemClick = (id) => {
    this.context.history.push(`/catalog/${id}`)
  }

  handleViewCatalog = (id) => {
    this.context.history.push(`/catalog/${id}`)
  }

  catalogItemsList = this.context.catalog_items.map((item) => {
    console.log("item in catalog item images", item.images)
    this.imageArray = item.images.split(', ')
    console.log("image array", this.imageArray)
    this.itemImagesArrayReturn = this.imageArray.map((item) => {
      return (
        <img className="catalog-img-item" src={require("../../assets/" + item)} alt="catalog item" />
      )
    })

    this.favoritedByArray = this.context.contacts.filter(contact => contact.favorites.includes(item.catalog_id))

    this.favoritedByReturn = this.favoritedByArray.map(fav => {
      return {
        contact_id: fav.contact_id,
        name: fav.name,
        business_name: fav.business_name,
      }
    }
    )
    this.favoritedByReturnMapped = this.favoritedByReturn.map(fav => {
      return (
        <li><a href={`http://localhost:3000/contacts/` + fav.contact_id} target="_blank" rel="noopener noreferrer">{fav.name}</a></li>
      )
    })

    this.catalogImagesIncluded = () => {
      if (item.images) {
        return (<li clasName="catalog-img">
          {this.itemImagesArrayReturn}
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
      <div key={item.catalog_id} className="item-wrap">
        {/* <button type="button" className="view-item" value="viewCatalog" onClick={(() => {this.handleViewCatalog(item.catalog_id)})}><img src={require("../../assets/viewItem.svg")} width="30px" alt="view item" /></button> */}
        <button className="edit-btn" onClick={(() => { this.handleEditClick(item.catalog_id) })}><img src={require("../../assets/pencil.svg")} width="30px" alt="edit icon" /></button>
        <ul className="item" onClick={(() => { this.handleItemClick(item.catalog_id) })}>
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


  render() {

    return (
      <section className='catalog-item'>
        {this.catalogItemsList}
      </section>
    );
  }
}


export default CatalogItem;



