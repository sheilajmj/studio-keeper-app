import React, { Component } from 'react';
import Context from '../../Context';

class Gallery extends Component {
  static contextType = Context;


    galleryItemsList = this.context.catalog_items.map((item) => {
  
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
          this.imageItems = <img className="gallery-img-item" src={require("../../assets/" + item)} alt="catalog item" />
        )
        }
      })
    return this.imageItems
    }
  
  
    //   this.favoritedByArray = this.context.contacts.filter(contact => contact.favorites.includes(item.catalog_id))
  
    //   this.favoritedByReturn = this.favoritedByArray.map(fav => {
    //     return {
    //       contact_id: fav.contact_id,
    //       name: fav.name,
    //       business_name: fav.business_name,
    //     }
    //   }
    //   )
    //   this.favoritedByReturnMapped = this.favoritedByReturn.map(fav => {
    //     return (
    //       <li><a href={`http://localhost:3000/contacts/` + fav.contact_id} target="_blank" rel="noopener noreferrer">{fav.name}</a></li>
    //     )
    //   })
  
      this.catalogImagesIncluded = () => {
        if (item.images) {
          return (<li className="gallery-img">
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
  
      return (
        <div key={item.catalog_id} className="item-wrap">
          <ul className="gallery" >
            {this.catalogImagesIncluded()}
            {this.catalogCollectionIncluded()}
            {this.catalogNameIncluded()}
          </ul>
        </div>
      )
    })
  

  

  
  render() {

    return (
      <div>
          <h1>Gallery</h1>
            <div className="flex-container">
            { this.galleryItemsList }
            </div>
      </div>
    );
  }
};




export default Gallery