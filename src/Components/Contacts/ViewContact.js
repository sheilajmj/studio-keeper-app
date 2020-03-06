import React, { Component } from 'react';
import StudioKeeperContext from '../../Context'
import PageParentHeader from '../Nav/PageParentHeader'
import ContactsApiService from '../../services/contacts-api-service'

class ViewContact extends Component {
  static contextType = StudioKeeperContext

  componentDidMount() {
    ContactsApiService.getContact()
      .then(this.context.setContacts)
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

  render() {
    this.selectedContactId = this.props.match.params.contact_id
    this.contactObject = this.context.contacts.find(contact => contact.contact_id === this.selectedContactId)
    this.contactArray = [this.contactObject]
    this.handleDeleteContact = (id) => {
      let indexToDelete = this.context.contacts.findIndex(contact => contact.contact_id === id)
      let contactsList = JSON.parse(JSON.stringify(this.context.contacts))
      contactsList.splice(indexToDelete, 1)
      let newContactsList = contactsList
      this.context.updateAppStateContactsDelete(newContactsList)
    }

    this.contactObjectRender = this.contactArray.map((item) => {
    
    //get event name and link for contact
    if (item.events !== []){
      console.log(item.events, "item.events in ViewContact", typeof item.events, "type of")
      this.eventIds = item.events
      this.eventIdsToObjects = this.eventIds.map((ids) => {
        this.eventObjects = this.context.events.filter((events) => {
          return events.event_id === ids
        })
        return this.eventObjects
      })
      this.eventObjectReturnArray = this.eventIdsToObjects.map((event) => {
        this.eventObjectReturn = event.map((event) => {
          return (
          <div className="event-name">
            <a href={'/events/' + event.event_id} target="_blank" rel="noopener noreferrer"> {event.name}</a>
            </div>
            
          )
        })
        return this.eventObjectReturn
      })
    }


    //get the catalog_id of the favorites in an array
    if (item.favorites !== null || item.favorites !== ""){
      this.contactFavoritesIdArray = item.favorites
      this.favoritesObject = this.contactFavoritesIdArray.map((id) => {
          //get the catalog object of the contact favorite
        return (
          this.catalogObject = this.context.catalog_items.filter((item) => {
          return item.catalog_id === id
        })
        )
        })
      }
      this.favoritesArray = this.favoritesObject.flat()
        
        //turn the catalog object into a return value for the image
      this.favoritesReturn = this.favoritesArray.map((item) => {       
         if (item.images !== null || item.images !== ""){
            this.imgReturn = [item.images.split(', ')[0]].map((image) => {
            return (
              <div className="favorites-imgs">
              <img key={item.contact_id+image.name} className="catalog-img-item" src={require("../../assets/" + image)} alt="catalog item" />
              </div>
            )
          })
        }
      
        return (
          <a href={'/catalog/' + item.catalog_id} target="_blank" rel="noopener noreferrer">
            {this.imgReturn}
            </a>
        )
      })


      this.contactTypeBusiness = () => {
        if (item.contact_type === "Business"){
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
            <PageParentHeader pageName="Contacts" />
            <div key={item.contact_id} className="item-wrap">
            <button className="back-to-btn" type="button" value="backToContacts" onClick={(() => { this.handleBackToContacts(item.contact_id) })}><img src={require("../../assets/back.svg")} alt="back icon" width="12px"/> <span className="all-contact-text">All Contacts</span></button>
            <button className="edit-btn" onClick={(() => { this.handleEditClick(item.contact_id) })}><img src={require("../../assets/pencil.svg")} width="30px" alt="edit icon" /></button>
              <ul className="item">
                <li>
                  <span className="contact-labels">Contact Type:</span> {item.contact_type}
                </li>
                <li>
                  <span className="contact-labels">Business Name:</span> {item.business_name}
                </li>
                {this.contactTypeBusiness()}
                <li>
                  <p className="contact-labels">Event Affliation:</p>   {this.eventObjectReturnArray}
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
                  <p className="contact-labels">Favorites:</p> {this.favoritesReturn}
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
        <div>
          {this.contactObjectRender}
        </div>
      )


    }
}
  export default ViewContact