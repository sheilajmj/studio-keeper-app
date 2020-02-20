import React, { Component } from 'react';
import StudioKeeperContext from '../../Context'
import Nav from '../Nav/Nav'

class ViewCatalog extends Component {
  static contextType = StudioKeeperContext

  handleEditClick = (id) => {
    this.context.history.push(`/catalog/edit/${id}`)
  }
  
  handleDeleteClick = (id) => {
    this.handleDeleteCatalogItem(id)
    this.context.history.push(`/catalog`)
  }

  handleBackToCatalog = (e) => {
    this.context.history.push('/catalog')
  }

  render(){
    this.selectedCatalogId = this.props.match.params.catalog_id
    this.catalogObject = this.context.catalog_items.find(item => item.catalog_id === this.selectedCatalogId)
    this.catalogArray = [this.catalogObject]
    this.handleDeleteCatalogItem = (id) => {
        let indexToDelete = this.context.catalog_items.findIndex(item => item.catalog_id === id)
        let catalogList = JSON.parse(JSON.stringify(this.context.catalog_items))
        catalogList.splice(indexToDelete, 1)
        let newCatalogList = catalogList
        this.context.updateAppStateCatalogDelete(newCatalogList)
      }
    
      this.favoritedByArray = this.context.contacts.filter(contact => contact.favorites.includes(this.selectedCatalogId))

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


   
      this.catalogObjectRender = this.catalogArray.map((item) => {

        this.imageArray = item.images.split(', ')
        this.itemImagesArrayReturn = this.imageArray.map((item) => {
        return(
          <img src={require("../../assets/" + item)} alt="catalog item" height="42px" width="42px"/>
        )
        })

        return(
            <div>
                <div key={item.catalog_id} className="item-wrap">
            <ul className="item">
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
            Images: {this.itemImagesArrayReturn}
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
            <button onClick={() => { this.handleDeleteClick(item.catalog_id) }}>Delete</button>
            <button type="button" value="backToCatalog" onClick={(() => {this.handleBackToCatalog(item.catalog_id)})}>Back to Catalog</button>

          </div>
        );
      
            </div>
          )
    })
    return(
        <div>
            <Nav />
            {this.catalogObjectRender}
        </div>
    )

     
  }
}
  export default ViewCatalog