import React, { Component } from 'react';
import Context from '../../Context'
import CatalogApiService from '../../services/catalog-api-service'
import PageParentHeader from '../Nav/PageParentHeader'
import CatalogImagesApiService from '../../services/images-api-service'

class CatalogItem extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      catalog_items: [],
      catalogItemImages: [],
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
    this.setState({ catalog_items: items })
  }

  setCatalogItemImages = (images) => {
    this.setState({ catalogItemImages: images })
  }


  componentDidMount = () => {
    CatalogApiService.getCatalogItems()
      .then(this.setCatalogItems)
      .catch(this.context.setError)

    CatalogImagesApiService.getCatalogImages()
      .then(this.setCatalogItemImages)
      .catch(this.context.setError)
  }


  handleImages = (id) => {
    if (this.state.catalogItemImages === []) {
      return <div></div>
    }
    else {
      if (this.state.catalogItemImages !== []) {
        let images = this.state.catalogItemImages
        let catalogImageFilter = images.filter(image => image.catalog_id === id)
        let catalogImageReturn = catalogImageFilter.map((image) => {
          return (
            <img key={`${image.image_url}`} className="catalog-img-item" src={image.image_url} alt="catalog item" />
          )
        })
        return catalogImageReturn
      }
    }
  }



  render() {
    if (this.state.catalog_items === {}) {
      this.setCatalogItems(this.context.catalog_items)
    }

    if (this.state.catalog_items !== {}) {
      this.catalogItemsList = this.state.catalog_items.map((item) => {


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
          <div key={'catalog' + item.id} className="item-wrap">
            <button className="edit-btn" type="button" onClick={(() => { this.handleEditClick(item.id) })}><img src={require("../../assets/pencil.svg")} width="30px" alt="edit icon" /></button>
            <ul className="item" onClick={(() => { this.handleItemClick(item.id) })}>
              {this.handleImages(item.id)}
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
        <div className="flex-container">
          {this.catalogItemsList}
        </div>
      </section>
    );
  }
}


export default CatalogItem;



