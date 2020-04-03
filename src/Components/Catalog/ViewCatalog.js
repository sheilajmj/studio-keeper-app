import React, { Component } from 'react';
import StudioKeeperContext from '../../Context';
import CatalogContactsApiService from '../../services/catalog-contacts-api-service';
import CatalogEventsService from '../../services/catalog-events-api-service'
import CatalogApiService from '../../services/catalog-api-service'
import ContactsApiService from '../../services/contacts-api-service'
import PageParentHeader from '../Nav/PageParentHeader';
import CatalogImagesApiService from '../../services/images-api-service'
import EventsApiService from '../../services/events-api-service';

let moment = require('moment');

class ViewCatalog extends Component {
  static contextType = StudioKeeperContext
  constructor(props) {
    super(props);
    this.state = {
      selectedCatalogId: '',
      selectedCatalogItem: [],
      selectedCatalogItemImages: [],
      catalogContacts: [],
      catalogEvents: [],
      contactObjectsArray: [],
      eventObjectsArray: [],
    }
  };

  setSelectedCatalogItem = (item) => {
    this.setState({ selectedCatalogItem: item })
  }

  setSelectedCatalogItemImages = (response) => {
    this.setState({ selectedCatalogItemImages: response })
  }

  setCatalogContacts = (response) => {
    this.setState({ catalogContacts: response })
    this.catalogContactsReturn()
  };

  setCatalogEvents = (events) => {
    this.setState({ catalogEvents: events })
    this.catalogEventsReturn()
  }

  setContactObjectsArray = (contact) => {
    let existingContactObj = this.state.contactObjectsArray
    let unused = existingContactObj.splice(-1, 0, contact)
    this.setState({ contactObjectsArray: existingContactObj })
    return unused
  }

  setEventObjectsArray = (event) => {
    let existingEventsObjArray = this.state.catalogEvents
    console.log("existing", existingEventsObjArray)
    let unused = existingEventsObjArray.splice(-1, 0, event)
    console.log("existing 2", existingEventsObjArray)
    this.setState({ eventObjectsArray: existingEventsObjArray })
    return unused
  }

  componentDidMount = () => {

    CatalogContactsApiService.getCatalogAndContacts('catalog_id', this.props.match.params.id)
      .then(this.setCatalogContacts)
      .catch(this.context.setError)

    CatalogImagesApiService.getCatalogImages('catalog_id', this.props.match.params.id)
      .then(this.setSelectedCatalogItemImages)
      .catch(this.context.setError)

    CatalogEventsService.getCatalogAndEvents('catalog_id', this.props.match.params.id)
      .then(this.setCatalogEvents)
      .catch(this.context.setError)

    this.setSelectedCatalogId()

    CatalogApiService.getCatalogItem(this.props.match.params.id)
      .then(this.setSelectedCatalogItem)
      .catch(this.context.setError)
  }



  setSelectedCatalogId = () => {
    let selectedCatalogId = this.props.match.params.id
    this.setState({ selectedCatalogId: selectedCatalogId })
  }

  handleEditClick(id) {
    this.context.history.push(`/catalog/edit/${id}`)
  };

  handleBackToCatalog = () => {
    this.context.history.push('/catalog')
  };


  //deleting the selected catalog item
  handleDeleteClick = (id) => {
    let indexToDelete = this.context.catalog_items.findIndex(item => item.id === id)
    let catalogList = JSON.parse(JSON.stringify(this.context.catalog_items))
    catalogList.splice(indexToDelete, 1)
    let newCatalogList = catalogList
    this.context.updateAppStateCatalogDelete(newCatalogList)
    CatalogApiService.deleteCatalogItem(id)
    window.location.href = `/catalog`
  }

  //Contacts/Favorited By -- update contactObjectsArray in state with the data of relevant contact items.
  catalogContactsReturn = () => {
    let catalogContactsMap = this.state.catalogContacts.map((contact) => {
      // take contact item and request entire contact object
      ContactsApiService.getContact(contact.contact_id)
        .then(res => { this.setContactObjectsArray(res) })
        .catch(this.context.setError)
      return (contact.contact_id)

    })
    return catalogContactsMap
  }


  //Events - update event object in state with the data of relevant event items
  catalogEventsReturn = () => {
    let catalogEventsMap = this.state.catalogEvents.map((events) => {
      //take event id and request entire event object
      EventsApiService.getEventItem(events.event_id)
        .then(res => { this.setEventObjectsArray(res) })
        .catch(this.context.setError)
      return (events.event_id)
    })
    console.log("MAP", catalogEventsMap)
    return catalogEventsMap
  }


  render() {

    // Catalog Images return block
    this.catalogImageReturn = () => {
      let images = this.state.selectedCatalogItemImages
      let imageMap
      if (images !== []) {
        imageMap = images.map((image) => {
          return (
            <img className="catalog-img-item-view" src={image.image_url} alt="catalog item" height="42px" width="42px" />
          )
        })
      }
      return imageMap
    }

    //Catalog Contacts/Favorited By return block
    this.contactDataReturn = () => {
      if (this.state.contactObjectsArray !== []) {
        let contacts = this.state.contactObjectsArray
        let contactsReturn = contacts.map((contact) => {
          return (
            <div key={`contact` + contact.id} className="favorited-by">
              {`${contact.name}` !== "" ? <a href={'/contacts/' + contact.id} target="_blank" rel="noopener noreferrer"> {contact.name} </a> : `${contact.business_name}` !== "" ? <a href={'/contacts/' + contact.id} target="_blank" rel="noopener noreferrer"> {contact.business_name} </a> : <a href={'/contacts/' + contact.id} target="_blank" rel="noopener noreferrer"> {contact.contact_id} </a>}
            </div>
          )
        })
        return contactsReturn
      }
    }

    this.eventDataReturn = () => {
      if (this.state.eventObjectsArray !== []) {
        let events = this.state.eventObjectsArray
        let eventsReturn = events.map((events) => {
          return (
            <a key={`event` + events.id} href={'/events/' + events.id} target="_blank" rel="noopener noreferrer"> {events.name}</a>
          )
        })
        return eventsReturn
      }
    }

    this.prettyDate = (date) => {
      let newDate = moment(`${date}`).format("MM/DD/YY")
      return newDate
    }
    // main catalog render block

    this.catalogItemRender = () => {
      let catalog_item = [this.state.selectedCatalogItem]
      if (!catalog_item) {
        return (<div></div>)
      }

      this.catalogMap = catalog_item.map((item) => {

        return (
          <div>
            <div className="flex-container bkg-color-tra">
              <div key={item.id} className="item-wrap">
                <button className="back-to-btn" type="button" value="backToCatalog" onClick={(() => { this.handleBackToCatalog(item.id) })}><img src={require("../../assets/back.svg")} alt="back icon" width="12px" /><span className="all-catalog-text">Catalog</span></button>
                <button className="edit-btn" onClick={(() => { this.handleEditClick(item.id) })}><img src={require("../../assets/pencil.svg")} width="30px" alt="edit icon" /></button>
                <div className="item catalog-item">

                  {this.catalogImageReturn()}

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
                    {/* <div className="catalog-view-favorited">
                    <span className="catalog-labels">Favorited By:</span>
                    {this.contactDataReturn()}
                  </div> */}
                  </div>
                  <div className="catalog-view-block4">
                    <div className="catalog-view-date">
                      <span className="catalog-labels">
                        Date Created: </span>{this.prettyDate(item.date_created)}
                    </div>
                    <div className="catalog-view-history">
                      <p className="catalog-labels">History:</p> {item.history}
                    </div>
                    {/* <div className="catalog-view-events">
                    <span className="catalog-labels">Events:</span>  {this.eventDataReturn()}
                  </div> */}
                    <span className="catalog-view-sold-frame">
                      <div className="catalog-view-sold-date">
                        <span className="catalog-labels">Sold Date:</span><br /> {this.prettyDate(item.sold_date)}
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
                  <button className="delete-btn" onClick={() => { this.handleDeleteClick(item.id) }}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        )
      })
      return this.catalogMap
    }
    return (
      <div>
        <PageParentHeader pageName="Catalog" />
        {this.catalogItemRender()}
      </div >
    )

  }
}
export default ViewCatalog