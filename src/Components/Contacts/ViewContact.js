import React, { Component } from 'react';
import StudioKeeperContext from '../../Context'
// import ContactsApiService from '../../services/contacts-api-service'
import PageParentHeader from '../Nav/PageParentHeader';
import ContactsApiService from '../../services/contacts-api-service';
import CatalogContactsApiService from '../../services/catalog-contacts-api-service'
import ContactsEventsApiService from '../../services/contacts-events-api-service'
import EventsApiService from '../../services/events-api-service'
import CatalogImagesApiService from '../../services/images-api-service'

class ViewContact extends Component {
  static contextType = StudioKeeperContext
  constructor(props) {
    super(props);
    this.state = {
      selectedContactId: '',
      selectedContactItem: [],
      contactCatalogFavs: [],
      catalogFavsArray: [],
      contactEvents: [],
      eventObjectsArray: [],
    }
  };

  setSelectedContactItem = (item) => {
    this.setState({ selectedContactItem: item })
  }

  setContactCatalogFavs = (response) => {
    this.setState({contactCatalogFavs: response})
    this.catalogFavsReturn()
  }

  setCatalogFavsArray = (response) => {
    let existingCatalogFavsArray = this.state.catalogFavsArray
    console.log("existing", existingCatalogFavsArray)
    let unused = existingCatalogFavsArray.push(response)
    console.log("existing 2", existingCatalogFavsArray)
    this.setState({catalogFavsArray: existingCatalogFavsArray})
    this.catalogImageReturn()
    return unused
    
  }


  setContactEvents = (events) => {
    this.setState({ contactEvents: events })
    this.contactEventsReturn()
  }

  setEventObjectsArray = (event) => {
    let existingEventsObjArray = this.state.eventObjectsArray
    console.log("existing", existingEventsObjArray)
    let unused = existingEventsObjArray.splice(-1, 0, event)
    console.log("existing 2", existingEventsObjArray)
    this.setState({ eventObjectsArray: existingEventsObjArray })
    return unused
  }



  componentDidMount = () => {

    CatalogContactsApiService.getCatalogAndContacts('contact_id', this.props.match.params.id)
      .then(this.setContactCatalogFavs)
      .catch(this.context.setError)

    ContactsEventsApiService.getContactsAndEvents('contact_id', this.props.match.params.id)
      .then(this.setContactEvents)
      .catch(this.context.setError)

    this.setSelectedContactId()

    ContactsApiService.getContact(this.props.match.params.id)
      .then(this.setSelectedContactItem)
      .catch(this.context.setError)
  }

  handleEditClick = (id) => {
    this.context.history.push(`/contacts/edit/${id}`)
  }

  handleDeleteClick = (id) => {
    this.handleDeleteContact(id)
    this.context.history.push(`/contacts`)
  }

  handleBackToContacts = (e) => {
    this.context.history.push('/contacts')
  }

  setSelectedContactId = () => {
    let selectedContactId = this.props.match.params.id
    this.setState({ selectedContactId: selectedContactId })
  }

  handleEditClick = (id) => {
    this.context.history.push(`/contacts/edit/${id}`)
  }

  handleDeleteClick = (id) => {
    this.handleDeleteContact(id)
    this.context.history.push(`/contacts`)
  }

  handleBackToContacts = (e) => {
    this.context.history.push('/contacts')
  }

  handleDeleteContact = (id) => {
    let indexToDelete = this.context.contacts.findIndex(contact => contact.contact_id === id)
    let contactsList = JSON.parse(JSON.stringify(this.context.contacts))
    contactsList.splice(indexToDelete, 1)
    let newContactsList = contactsList
    this.context.updateAppStateContactsDelete(newContactsList)
  }


  //Catalog/Favorites -- update the FavsArray with images
  catalogFavsReturn = () => {
    let catalogFavsMap = this.state.contactCatalogFavs.map((catalog) => { 
      // take catalog item and request image 
      CatalogImagesApiService.getCatalogImages('catalog_id', catalog.catalog_id)
        .then(res => {this.setCatalogFavsArray(res)})
        .catch(this.context.setError)
        return(catalog.catalog_id)

    })
    return catalogFavsMap
  }

  //Events - update event object in state with the data of relevant event items
  contactEventsReturn = () => {
    let contactEventsMap = this.state.contactEvents.map((events) => {
      //take event id and request entire event object
      EventsApiService.getEventItem(events.event_id)
      .then(res => {this.setEventObjectsArray(res)})
      .catch(this.context.setError)
      return(events.event_id)
    })
    console.log("MAP", contactEventsMap)
    return contactEventsMap
  }

    // Catalog Images return block
  catalogImageReturn = () => {
      let images = this.state.catalogFavsArray
      let imageMap
      if (images !== [{}]) {
        imageMap = images.flat().map((item) => {
          console.log("THIS IS ITEM", item)
          return (    
            <a href={'localhost:3000/catalog/' + item.catalog_id} target="_blank" rel="noopener noreferrer">               
                  <img className="catalog-img-item" src={require("../../../public/assets/" + item.image_name)} alt="catalog item" />
           </a>)
        })
      }
      return imageMap
    }

    eventDataReturn = () => {
      if(this.state.eventObjectsArray !== []){
        let events = this.state.eventObjectsArray
        let eventsReturn = events.map((events) => {
          return(
            <a key={`event` + events.id}href={'/events/' + events.id} target="_blank" rel="noopener noreferrer"> {events.name}</a>
          )
        })
        return eventsReturn
      }
    }


  render() {    
    this.selectedContactId = this.props.match.params.id
    this.contactObject = this.context.contacts.find(contact => parseFloat(contact.id) === parseFloat(this.selectedContactId))
    if (!this.contactObject) {
      return (
        <div></div>
      );
    }

    this.contactArray = [this.contactObject]

    console.log(this.context.contacts, "contacts from context - from within ViewContact")
    


    this.contactObjectRender = this.contactArray.map((item) => {

      this.contactTypeBusiness = () => {
        if (item.contact_type === "Business") {
          return ""
        }
        else {
          return (<li>
            <span className="contact-labels">Name:</span> {item.name}
          </li>
          )
        }

      }

      return (
        <div>
          <div key={item.id} className="item-wrap">
            <button className="back-to-btn" type="button" value="backToContacts" onClick={(() => { this.handleBackToContacts(item.id) })}><img src={require("../../assets/back.svg")} alt="back icon" width="12px" /> <span className="all-contact-text">All Contacts</span></button>
            <button className="edit-btn" onClick={(() => { this.handleEditClick(item.id) })}><img src={require("../../assets/pencil.svg")} width="30px" alt="edit icon" /></button>
            <ul className="item">
              <li>
                <span className="contact-labels">Contact Type:</span> {item.contact_type}
              </li>
              <li>
                <span className="contact-labels">Business Name:</span> {item.business_name}
              </li>
              {this.contactTypeBusiness()}
              <li>
                <p className="contact-labels">Event Affliation:</p>   {this.eventDataReturn()}
              </li>
              <li>
                <span className="contact-labels">Email:</span> <a href={"mailto:" + item.email} target="_blank" rel="noopener noreferrer"> {item.email} </a>
              </li>
              <li>
                <span className="contact-labels">Phone:</span>
                <a href={"tel:" + item.phone} target="_blank" rel="noopener noreferrer">{item.phone}</a>
              </li>
              <li>
                <p className="contact-labels">Address:</p>
                <p className="address-block">
                  <span className="address-center">
                    {item.address_street}<br />
                    {item.address_line2}<span>  </span>
                    {item.address_city}<span>, </span>{item.address_state}<span>  </span>{item.address_zip}<br />
                    {item.address_country}
                  </span>
                </p>
              </li>
              <li>
                <span className="contact-labels">website:</span> <a href={item.website} target="_blank" rel="noopener noreferrer">{item.website}</a>
              </li>
              <li>
      <p className="contact-labels">Favorites:</p> {this.catalogImageReturn()}
              </li>
              <li>
                <p className="contact-labels expand-field">Notes:</p>
                {item.notes}
              </li>
            </ul>
            <div className="button-wrap">
              <button className="delete-btn" onClick={() => { this.handleDeleteClick(item.contact_id) }}>Delete</button>
            </div>
          </div>
        </div>
      )
    })
    return (
      <section className='contacts'>
        <div>
          <PageParentHeader pageName={"Contacts"} />
          {this.contactObjectRender}
        </div>
      </section>
    )
  }
}
export default ViewContact