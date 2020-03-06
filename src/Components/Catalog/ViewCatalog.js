import React, { Component } from 'react';
import StudioKeeperContext from '../../Context'
import PageParentHeader from '../Nav/PageParentHeader';
import CatalogApiService from '../../services/catalog-api-service'

class ViewCatalog extends Component {
  static contextType = StudioKeeperContext

  componentDidMount() {
    CatalogApiService.getCatalogItems()
      .then(this.context.setCatalogItems)
      .catch(this.context.setError)
  }

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

  render() {
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

    this.favoritedByReturn = this.favoritedByArray.map(fav => {
      return {
        contact_id: fav.contact_id,
        name: fav.name,
        business_name: fav.business_name,
      }
    }
    )
    this.favoritedByReturnMapped = this.favoritedByReturn.map(contact => {
      return (
        <div key={`contact` + contact.contact_id} className="favorited-by">
        {`${contact.name}` !== "" ? <a href={'/contacts/'+ contact.contact_id} target="_blank" rel="noopener noreferrer"> {contact.name} </a> : `${contact.business_name}` !== "" ? <a href={'/contacts/'+ contact.contact_id} target="_blank" rel="noopener noreferrer"> {contact.business_name} </a> : <a href={'/contacts/'+ contact.contact_id} target="_blank" rel="noopener noreferrer"> {contact.contact_id} </a>}       
        </div>
        )
    })
    console.log("this is before the ITEM error ", this.context.catalog_items)

    this.catalogObjectRender = this.catalogArray.map((item) => {

      // if (!item.events){ 
      //   item.events = []
      // }

      // this.eventArray = item.events
      

      // this.eventObjectReturnArray = this.eventArray.map((event) => {
      //     return (
      //       <a key={`event` + event.event_id}href={'/events/' + event.event_id} target="_blank" rel="noopener noreferrer"> {event.name}</a>
      //     )
      // })

   

      
      // if(!item.images){item.images = ""}

      // this.imageArray = item.images.split(', ')

      // this.itemImagesArrayReturn = this.imageArray.map((item) => {
      //   if (item === ""){
      //     return (<div key={uuid()}></div>)
      //   }
      //   else{
      //   return (
      //     <img className="catalog-img-item-view" src={require("../../assets/" + item)} alt="catalog item" height="42px" width="42px" />
      //   )
      // }
      // })

      // this.catalogImagesIncluded = () => {
      //   if (item.images) {
      //     return (<div className="catalog-view-img">
      //       {this.itemImagesArrayReturn}
      //     </div>)
      //   }
      // }
    
  
  
      console.log("this is item", item)
      return (
        <div>
          <div key={item.catalog_id} className="item-wrap">
          <button className="back-to-btn" type="button" value="backToCatalog" onClick={(() => { this.handleBackToCatalog(item.catalog_id) })}><img src={require("../../assets/back.svg")} alt="back icon" width="12px"/><span className="all-catalog-text">Catalog</span></button>
          <button className="edit-btn" onClick={(() => { this.handleEditClick(item.catalog_id) })}><img src={require("../../assets/pencil.svg")} width="30px" alt="edit icon" /></button>
            <div className="item catalog-item">
  
              {this.catalogImagesIncluded()}
       
              <div className="catalog-view-block1">
              <div className="catalog-view-name">
                  <span className="catalog-labels">Name:</span>{item.name}
                </div>
                <div className="catalog-view-collection">
                  <span className="catalog-labels">Collection:</span> {item.collection}
                </div>
              </div>
              <div className="catalog-view-block2">
                <div className="catalog-view-type">
                  <span className="catalog-labels">Type:</span> {item.type}
                </div>
                <div className="catalog-view-medium">
                  <span className="catalog-labels">Medium:</span> {item.medium}
                </div>
                <div className="catalog-view-size">
                  <span className="catalog-labels">
                    Size: </span>{item.size}
                </div>
                <div className="catalog-view-subject expand-field-catalog">
                  <p className="catalog-labels">Subject:</p>{item.subject}
                </div>
                <div className="catalog-view-concept expand-field-catalog">
                  <p className="catalog-labels">Concept Statement:</p>
                  {item.concept_statement}
                </div>
              </div>
              <div className="catalog-view-block3">
                <div className="catalog-view-price">
                  <span className="catalog-labels">Price:</span>{item.price}
                </div>
                <div className="catalog-view-quantity">
                  <span className="catalog-labels">Quantity:</span>{item.quantity}
                </div>
                <div className="catalog-view-location">
                  <span className="catalog-labels">Location:</span>{item.location}
                </div>
                <div className="catalog-view-favorited">
                  <span className="catalog-labels">Favorited By:</span>
                    {this.favoritedByReturnMapped}
                </div>
              </div>
              <div className="catalog-view-block4">
                <div className="catalog-view-date">
                  <span className="catalog-labels">
                    Date Created: </span>{item.date_created}
                </div>
                <div className="catalog-view-history">
                  <p className="catalog-labels">History:</p> {item.history}
                </div>
                <div className="catalog-view-events">
                  <span className="catalog-labels">Events:</span>  {this.eventObjectReturnArray}
                </div>
                <span className="catalog-view-sold-frame">
                  <div className="catalog-view-sold-date">
                    <span className="catalog-labels">Sold Date:</span><br /> {item.sold_date}
                  </div>
                  <div className="catalog-view-sold">
                    <span className="catalog-labels">Sold To:</span><br /> {item.sold_to}
                  </div>
                </span>
                <div className="catalog-view-note">
                  <p className="catalog-labels">
                    Notes:
                  </p>
                  {item.notes}
                </div>
              </div>
            </div>
            <div className="button-wrap">
            <button className="delete-btn" onClick={() => { this.handleDeleteClick(item.catalog_id) }}>Delete</button>
            </div>
            </div>


        </div>
      )
    })
    return (
      <div>
        <PageParentHeader pageName="Catalog"/>
        {this.catalogObjectRender}
      </div>
    )


  }
}
export default ViewCatalog