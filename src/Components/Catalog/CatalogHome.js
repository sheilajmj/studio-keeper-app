import React, { Component } from 'react';
import Context from '../../Context'
import CatalogApiService from '../../services/catalog-api-service'
import CatalogImagesApiService from '../../services/images-api-service'

class CatalogHome extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      catalog_items: null,
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
    this.setCatalogHomeItems()
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
    if(this.state.catalogItemImages === []){
      return <div></div>
    }
    else{
    if (this.state.catalogItemImages !== []) {
      let images = this.state.catalogItemImages
      let catalogImageFilter = images.filter(image => image.catalog_id === id)
      let catalogImageReturn = catalogImageFilter.map((image) => {
        console.log("image url", image.image_url)
        return (
          <img key={`${image.image_url}`} className="catalog-img-item align-center" src={image.image_url} alt="catalog item" />
        )
      })
    return catalogImageReturn
    }
  }
  }
  

  catalogCollectionIncluded = (item) => {
    if (item.collection) {
      return (<div className="catalog-collection">
        <span className="catalog-labels">Collection:</span> {item.collection}
      </div>)
    }
  }

  catalogNameIncluded = (item) => {
    if (item.name) {
      return (<div className="catalog-name">
        <span className="catalog-labels">Name:</span>{item.name}
      </div>)
    }
  }

  setCatalogHomeItems = () => {
    if(this.state.catalog_items !== null){
    this.setState({ catalogHomeItems: [this.state.catalog_items[0], this.state.catalog_items[1], this.state.catalog_items[2]] })
    console.log("CatalogHOmeItems", this.state.catalogHomeItems)
  }
}




  render() {
    this.catalogHomeReturn = () => {
      if (this.state.catalog_items === null){
        return <div></div>
      }
      if(!this.state.catalogHomeItems){
        return <div></div>
      }
      let catalogHomeMap = this.state.catalogHomeItems.map((item) => {
      return (
        <div key={'catalog' + item.id} className="item-wrap">
          <button className="edit-btn" type="button" onClick={(() => { this.handleEditClick(item.id) })}><img src={require("../../assets/pencil.svg")} width="30px" alt="edit icon" /></button>
          <div className="home-item" onClick={(() => { this.handleItemClick(item.id) })}>
            <div className="gallery-img-wrap">
            {this.handleImages(item.id)}
            </div>
            <div className="gallery-text-wrap">
            {this.catalogNameIncluded(item)}
            {this.catalogCollectionIncluded(item)}
            </div>
          </div>
        </div>
      )
    })
    return catalogHomeMap
  }


    return (
      <section className='catalog-item'>
        <div className="flex-container">
          {this.catalogHomeReturn()}
        </div>
      </section>
    );
  }
}


export default CatalogHome;



