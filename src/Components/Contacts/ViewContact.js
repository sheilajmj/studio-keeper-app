import React, { Component } from 'react';
import StudioKeeperContext from '../../Context'
import Nav from '../Nav/Nav'

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

  render(){
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
        return(
            <div>
                <div key={item.contact_id} className="item-wrap">
            <ul className="item">
              <li>
                Name: {item.name}
              </li>
              <li>
                Business: {item.business_name}
              </li>
              <li>
                Phone: {item.phone}
              </li>
              <li>
                email: {item.email}
              </li>
            </ul>
            <button onClick={(() => { this.handleEditClick(item.contact_id) })}>Edit</button>
            <button onClick={() => { this.handleDeleteClick(item.contact_id) }}>Delete</button>
            <button type="button" value="backToContacts" onClick={(() => {this.handleBackToContacts(item.contact_id)})}>Back to Contacts</button>

          </div>
        );
      
            </div>
          )
    })
    return(
        <div>
            <Nav />
            {this.contactObjectRender}
        </div>
    )

     
  }
}
  export default ViewContact