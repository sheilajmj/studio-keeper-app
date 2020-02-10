import React, { Component } from 'react';
import Context from '../../Context'
import Nav from '../Nav/Nav'

class EditContact extends Component {
    static contextType = Context;

    constructor(props) {
        super(props)
        this.state = {
          updateBoolean: false,
          updatedContact: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.createUpdateContact = this.createUpdateContact.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.selectedContactValues = this.selectedContactValues.bind(this)
        // this.setInitialDefaultState = this.setInitialDefaultState.bind(this)
        // this.makeSelectedContactArray = this.makeSelectedContactArray.bind(this)
        // this.selectedContactForm = this.selectedContactForm.bind(this)
      }

      handleChange(e) {
        const key = (e.target.name)
        const value = (e.target.value)
        this.setState(previousState => ({ updateContact: { ...previousState.updateContact, [key]: value }, updateBoolean: true }))
        this.setInitialDefaultState()
        }
        
        createUpdateContact() {
            console.log("updatecontact hit")
            const updateContact = this.state.updateContact
            console.log("UpdateContact", updateContact)
            this.context.updateAppStateContacts(updateContact)
          }

          handleSubmit(e){
            e.preventDefault()
            this.createUpdateContact(e)
          }

          selectedContactId = this.props.match.params.contact_id

          selectedContactArray = this.context.contacts
        //   .find(contact => contact.contact_id === this.selectedContactId)



    render() {
        console.log("This is my object array", this.selectedContactArray)
        return (
          <div>
            <Nav />
            <h2>Edit Contact</h2>
            {/* {this.selectedContactForm} */}
          </div>
        )
      }
}

export default EditContact;