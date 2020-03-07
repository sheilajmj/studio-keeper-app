import React, { Component } from 'react';
import StudioKeeperContext from '../../Context'
// import ContactsApiService from '../../services/contacts-api-service'
import PageParentHeader from '../Nav/PageParentHeader';

class ViewContact extends Component {
  static contextType = StudioKeeperContext


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
     
    this.handleEditClick = (id) => {
      this.context.history.push(`/contacts/edit/${id}`)
    }
  
    this.handleDeleteClick = (id) => {
      this.handleDeleteContact(id)
      this.context.history.push(`/contacts`)
    }
  
    this.handleBackToContacts = (e) => {
      this.context.history.push('/contacts')
    }
  

    this.selectedContactId = this.props.match.params.id
    this.contactObject = this.context.contacts.find(contact => parseFloat(contact.id) === parseFloat(this.selectedContactId))
    if (!this.contactObject) {
      return (
          <div></div>
      );
  }
  
    this.contactArray = [this.contactObject]

    console.log(this.context.contacts, "contacts from context - from within ViewContact")
    this.handleDeleteContact = (id) => {
      let indexToDelete = this.context.contacts.findIndex(contact => contact.contact_id === id)
      let contactsList = JSON.parse(JSON.stringify(this.context.contacts))
      contactsList.splice(indexToDelete, 1)
      let newContactsList = contactsList
      this.context.updateAppStateContactsDelete(newContactsList)
    }

    this.contactObjectRender = this.contactArray.map((item) => {
    
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
            <div key={item.id} className="item-wrap">
            <button className="back-to-btn" type="button" value="backToContacts" onClick={(() => { this.handleBackToContacts(item.id) })}><img src={require("../../assets/back.svg")} alt="back icon" width="12px"/> <span className="all-contact-text">All Contacts</span></button>
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