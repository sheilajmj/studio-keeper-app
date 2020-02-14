import React, { Component } from 'react';
import Context from '../../Context'


class DeleteButton extends Component {
  static contextType = Context;

  handleDeleteClick = (id) => {
    this.handleDeleteContact(id)
  }


  handleDeleteContact = (id) => {
    let indexToDelete = this.context.contacts.findIndex(contact => contact.contact_id === id)
    let contacts = JSON.parse(JSON.stringify(this.context.contacts))
    let contactDeleted = contacts.splice(indexToDelete, 1)
    this.context.updateAppStateContactsDelete(contacts, contactDeleted)
    this.context.history.push(`/`)
  }



render() {
    this.handleDeleteClick = () => {
        console.log("params", this.props.match)
        // let contact_id = this.props.match.params.contact_id
        
        // let catalog_id = this.context.match.params.catalog_id
        // let event_id = this.context.match.params.event_id
    
        // if (contact_id){
        //     this.handleDeleteContact = (contact_id) => {
        //         let indexToDelete = this.context.contacts.findIndex(contact => contact.contact_id === contact_id)
        //         let contacts = JSON.parse(JSON.stringify(this.context.contacts))
        //         let contactDeleted = contacts.splice(indexToDelete, 1)
        //         this.context.updateAppStateContactsDelete(contacts, contactDeleted)
        //       }
        // }
    
    
    }
  return (
    <button className="nav-btn" onClick={() => {this.handleDeleteClick()}}>Delete</button>
  );
}
}

export default DeleteButton;