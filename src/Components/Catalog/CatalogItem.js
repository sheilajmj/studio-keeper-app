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
    console.log("item in catalog item images", item.images )
     this.imageArray = item.images.split(', ')
     console.log("image array", this.imageArray)
      this.itemImagesArrayReturn = this.imageArray.map((item) => {
      return(
        <img src={require("../../assets/" + item)} alt="catalog item" height="42px" width="42px"/>
      )
      })

      this.favoritedByArray = this.context.contacts.filter(contact => contact.favorites.includes(item.catalog_id))

      this.favoritedByReturn = this.favoritedByArray.map(fav =>{ 
        return {
          contact_id: fav.contact_id,
          name: fav.name
        }
      }
      )
      this.favoritedByReturnMapped = this.favoritedByReturn.map(fav => {
        return (
          <li><a href={`http://localhost:3000/contacts/` + fav.contact_id} target="_blank"  rel="noopener noreferrer">{fav.name}</a></li>
        )
      })

    return (
      <div key={item.catalog_id} className="item-wrap">
        <ul className="item" onClick={(() => {this.handleItemClick(item.catalog_id)})}>
          <li>
            Type: {item.type}
          </li>
          <li>
            Collection: {item.collection}
          </li>
          <li>
            Size: {item.size}
          </li>
          <li>
            Medium: {item.medium}
          </li>
          <li>
            Price: {item.price}
          </li>
          <li>
            Date Created: {item.date_created}
          </li>
          <li>
            Concept Statement: {item.concept_statement}
          </li>
          <li>
            Notes: {item.notes}
          </li>
          <li>
            Images:
            {this.itemImagesArrayReturn}
          </li>
          <li>
            Subject: {item.subject}
          </li>
          <li>
            Quantity: {item.quantity}
          </li>
          <li>
            Favorited By: 
            <ul>
            {this.favoritedByReturnMapped}
            </ul>
          </li>
          <li>
            Sold To: {item.sold_to}
          </li>
          <li>
            History: {item.history}
          </li>
        </ul>
        <button onClick={(() => { this.handleEditClick(item.catalog_id) })}>Edit</button>
        <button type="button" value="viewCatalog" onClick={(() => {this.handleViewCatalog(item.catalog_id)})}>View Catalog Item</button>
      </div>
    )
  })


render(){

  return (
    <main className='App'>
      {this.catalogItemsList}
    </main>
  );
}
}


export default CatalogItem;



