import React, { Component } from 'react';
import StudioKeeperContext from '../../Context';
import PageParentHeader from '../Nav/PageParentHeader';
import ContactsApiService from '../../services/contacts-api-service';
import CatalogContactsApiService from '../../services/catalog-contacts-api-service';
import ContactsEventsApiService from '../../services/contacts-events-api-service';
import EventsApiService from '../../services/events-api-service';
import CatalogImagesApiService from '../../services/images-api-service';

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
  }

  setSelectedContactItem = (item) => {
    this.setState({ selectedContactItem: item })
  }

  setContactCatalogFavs = (response) => {
    this.setState({ contactCatalogFavs: response })
    this.catalogFavsReturn()
  }

  setCatalogFavsArray = (response) => {
    let existingCatalogFavsArray = this.state.catalogFavsArray
    let unused = existingCatalogFavsArray.push(response)
    this.setState({ catalogFavsArray: existingCatalogFavsArray })
    this.catalogImageReturn()
    return unused
  }

  setContactEvents = (events) => {
    this.setState({ contactEvents: events })
    this.contactEventsReturn()
  }

  setEventObjectsArray = (event) => {
    let existingEventsObjArray = this.state.eventObjectsArray
    let unused = existingEventsObjArray.splice(-1, 0, event)
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

    this.setSelectedContactValues()

    ContactsApiService.getContact(this.props.match.params.id)
      .then(this.setSelectedContactItem)
      .catch(this.context.setError)
  }



  handleBackToContacts = (e) => {
    this.context.history.push('/contacts')
  }

  setSelectedContactValues = () => {
    let selectedContactId = this.props.match.params.id
    let contactObject = this.context.contacts.find(contact => parseFloat(contact.id) === parseFloat(selectedContactId))
    let contactArray = [contactObject]
    this.setState({ selectedContactId: selectedContactId})
    this.setState({ contactArray: contactArray })  
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
    ContactsApiService.deleteContactItem(id)
      .then(res => { window.location.href = `/contacts` })
  }


  catalogFavsReturn = () => {
    let catalogFavsMap = this.state.contactCatalogFavs.map((catalog) => {
      CatalogImagesApiService.getCatalogImages('catalog_id', catalog.catalog_id)
        .then(res => { this.setCatalogFavsArray(res) })
        .catch(this.context.setError)
      return (catalog.catalog_id)
    })
    return catalogFavsMap
  }

  contactEventsReturn = () => {
    let contactEventsMap = this.state.contactEvents.map((events) => {
      EventsApiService.getEventItem(events.event_id)
        .then(res => { this.setEventObjectsArray(res) })
        .catch(this.context.setError)
      return (events.event_id)
    })
    return contactEventsMap
  }

  catalogImageReturn = () => {
    let images = this.state.catalogFavsArray
    let imageMap
    if (images !== [{}]) {
      imageMap = images.flat().map((item) => {
        return (
          <a key={'catalogImg' + item.id} href={'/catalog/' + item.catalog_id} target="_blank" rel="noopener noreferrer">
          </a>)
      })
    }
    return imageMap
  }

  eventDataReturn = () => {
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

  contactObjectRender = () => {
    if (!this.state.contactArray){
      return <div></div>
    }
    if(this.state.contactArray){
    let contactObject = this.state.contactArray.map((item) => {

      this.handleEditClick = () => {
        this.context.history.push(`/contacts/edit/${item.id}`)
      }
      this.handleDeleteClick = () => {
        this.handleDeleteContact(item.id)
      }

    this.contactTypeBusiness = () => {
      if (item.contact_type === "Business") {
        return ""
      }
      else {
        return (<li>
          <span key={'name' + item.id} className="contact-labels">Name:</span> {item.name}
        </li>
        )
      }
    }

    return (
      <div key={item.id}>
        <div className="flex-container bkg-color-tra">
          <div className="item-wrap">
            <button className="back-to-btn" type="button" value="backToContacts" onClick={this.handleBackToContacts}><img src={require("../../assets/back.svg")} alt="back icon" width="12px" /> <span className="all-contact-text">All Contacts</span></button>
            <button className="edit-btn" onClick={this.handleEditClick}><img src={require("../../assets/pencil.svg")} width="30px" alt="edit icon" /></button>
            <ul className="item">
              <li>
                <span className="contact-labels">Contact Type:</span> {item.contact_type}
              </li>
              <li>
                <span className="contact-labels">Business Name:</span> {item.business_name}
              </li>
              {this.contactTypeBusiness()}
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
                {item.notes}
              </li>
            </ul>
            <div className="button-wrap">
              <button className="delete-btn" onClick={this.handleDeleteClick}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  })
  return contactObject
  }
  else{
    return (<div></div>)
  }
}

  render() {
    return (
      <section className='contacts'>
        <div>
          <PageParentHeader pageName={"Contacts"} />
          {this.contactObjectRender()}
        </div>
      </section>
    );
  }
}

export default ViewContact