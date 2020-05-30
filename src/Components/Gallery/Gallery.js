import React, { Component } from 'react';
import Context from '../../Context';
import CatalogImagesApiService from '../../services/images-api-service';
import CatalogApiService from '../../services/catalog-api-service';

class Gallery extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      catalogItemImages: [],
    }
  };

  setCatalogItemImages = (response) => {
    this.setState({ catalogItemImages: response })
  }
  setCatalogItems = (item) => {
    this.setState({ catalogItems: item })
  }

  componentDidMount = () => {
    CatalogImagesApiService.getCatalogImages()
      .then(this.setCatalogItemImages)
      .catch(this.context.setError)

    CatalogApiService.getCatalogItems()
      .then(this.setCatalogItems)
      .catch(this.context.setError)

  }

  handleCatalogImages = (catalog_id) => {
    let imageFilter = this.state.catalogItemImages.filter((images) => images.catalog_id === catalog_id)

    this.imageFilterReturn = () => {
      let imageMap = imageFilter.map((image) => {
        return (
          <img key={image.name+image.catalog_id} className="gallery-img-item gallery-item" src={image.image_url} alt="catalog item" />
        )
      })
      return imageMap
    }
    return this.imageFilterReturn()
  }

  catalogCollectionIncluded = (collection) => {
    if (collection) {
      return (
        <div className="catalog-collection gallery-item">
          <p>Collection: <span className="font-wt-str">{collection}</span></p>
        </div>
      )
    }
  }

  catalogNameIncluded = (name) => {
    if (name) {
      return (
        <div className="catalog-name gallery-item">
          <p>Name: <span className="font-wt-str">{name}</span></p>
        </div>
      )
    }
  }

  galleryItemsList = () => {
    if (this.state.catalogItems && this.state.catalogItemImages) {
      this.catalogItemsMap = this.state.catalogItems.map((item) => {
        return (
          <div key={item.id} className="item-wrap">
            <div className="gallery-img-wrap">
              {this.handleCatalogImages(item.id)}
            </div>
            <div className="gallery-text-wrap">
              {this.catalogCollectionIncluded(item.collection)}
              {this.catalogNameIncluded(item.name)}
            </div>
          </div>
        )
      })
      return this.catalogItemsMap
    }
    else {
      return <div></div>
    }
  }

  render() {
    return (
      <div className="bkg-color-dk">
        <h1 className="color-white gallery-title">Gallery</h1>
        <div className="flex-container">
          {this.galleryItemsList()}
        </div>
      </div>
    );
  }
}

export default Gallery