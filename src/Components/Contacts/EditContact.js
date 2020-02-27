import React, { Component } from 'react';
import StudioKeeperContext from '../../Context'
import PageParentHeader from '../Nav/PageParentHeader'

class EditContact extends Component {
  static contextType = StudioKeeperContext

  constructor(props) {
    super(props)
    this.state = {
      updateBoolean: false,
      updatedContact: [],
      updatedEventsArray: [],
      }
  }

  componentDidMount = () =>{
    this.setInitialDefaultState()
    setTimeout(() => {}, 3000 )
    
  }

  render() {

    this.selectedContactId = this.props.match.params.contact_id;
    this.selectedContactObject = this.context.contacts.find(contact => contact.contact_id === this.selectedContactId);
    this.selectedContactArray = [this.selectedContactObject];

    this.handleSubmit = (e) => {
      e.preventDefault()
      this.context.updateAppStateContactsUpdate(this.state.updatedContact)
      this.context.history.push(`/contacts`)
    }

    this.setInitialDefaultState = () => {
      if (this.state.updateBoolean === false) {
        this.setState({ updatedContact: this.selectedContactObject })
        this.setState({ updateBoolean: true})
      }
    }


    this.handleChange = (e) => {
      const key = (e.target.name)
      const value = (e.target.value)
      this.setState(previousState => ({ updatedContact: { ...previousState.updatedContact, [key]: value }, updateBoolean: true }))
    }

    this.setUpdatedArray = (e) =>{
      let event_id = e.target.value
      let currentEventsArray = this.state.updatedContact.events
      let updatedEventsArray 

      if (!currentEventsArray.includes(event_id)){
        let eventArrayLength = currentEventsArray.push(event_id)
        updatedEventsArray = currentEventsArray
      }

      else{
        updatedEventsArray = currentEventsArray.filter((event) => event_id !== event)
      }

      this.setState({updatedEventsArray: updatedEventsArray})
      this.setState(previousState => ({ updatedContact: { ...previousState.updatedContact, events: updatedEventsArray}, updateBoolean: true }))

    }


    this.handleEventClick = (e) => {
      this.setUpdatedArray(e);  
      }
     
    this.handleCancel = (e) => {
      this.context.history.push('/contacts')
    }

    this.handleDeleteContact = (id) => {
      let indexToDelete = this.context.contacts.findIndex(contact => contact.contact_id === id)
      let contactsList = JSON.parse(JSON.stringify(this.context.contacts))
      contactsList.splice(indexToDelete, 1)
      let newContactsList = contactsList
      this.context.updateAppStateContactsDelete(newContactsList)
      this.context.history.push(`/contacts`)
    }





    this.eventFieldSelectionOptions = this.context.events.map(event => {
   //I need to set my checkbox selected if the event_id is already in the array.
   
      return (
        <div key={'event' + event.event_id} className="checkbox">
          <input type="checkbox" id={event.event_id} name={"events"} value={event.event_id} onChange={this.handleEventClick} defaultChecked={true}  />
          <label htmlFor={event.event_id}> {<a href={'/events/'+ event.event_id} target="_blank"  rel="noopener noreferrer"> {event.name}</a>} </label>
        </div>
      )
    })

    this.selectedContactForm = this.selectedContactArray.map((item) => {
      this.handleContactType = () => {
        if (this.state.updatedContact.contact_type === "Business") {
          return (
            <div className="form-space">
              <label htmlFor="business" className="contact-edit">Business:</label>
              <input type="text" name="business_name" id="business" onChange={this.handleChange} defaultValue={item.business_name} />
            </div>
          )}
          else {
          return (
            <>
            <div className="form-space">
              <label htmlFor="name" className="contact-edit">Name:</label>
              <input type="text" name="name" id="name" onChange={this.handleChange} defaultValue={item.name} />
            </div>
            <div className="form-space">
              <label htmlFor="business" className="contact-edit">Business:</label>
              <input type="text" name="business_name" id="business" onChange={this.handleChange} defaultValue={item.business_name} />
            </div>
            </>
              )
        }
      }

      return (
        <div key={item.contact_id} className="item-edit-wrap contact-edit">
          <form onSubmit={this.handleSubmit}>
            <h3 className="add-item-header">Edit Contact</h3>
            {/* <div className="form-space contact-edit"> */}
            <label htmlFor="contact_type" className="contact-edit">Contact Type:</label>
            <select name="contact_type" onChange={this.handleChange}>
              <option value="Individual">Individual</option>
              <option value="Business">Business</option>
            </select>
            {/* </div> */}
            {this.handleContactType()}
            {/* <div className="form-space">
              <label htmlFor="event" className="contact-edit">Event Name:</label>
              <input type="text" name="event" id="event" onChange={this.handleChange} defaultValue={item.event_name} />
            </div> */}
            <div className="form-space">
            <legend className="contact-edit">Event Affiliation: (THIS IS BUGGY!)</legend>
            <fieldset>
            {this.eventFieldSelectionOptions}
            </fieldset>
                    
            </div>
            <div className="form-space">
              <label htmlFor="email" className="contact-edit">Email:</label>
              <input type="text" name="email" id="email" onChange={this.handleChange} defaultValue={item.email} />
            </div>
            <div className="form-space">
              <label htmlFor="phone" className="contact-edit">Phone:</label>
              <input type="text" name="phone" id="phone" onChange={this.handleChange} defaultValue={item.phone} />
            </div>
            <div className="form-space">
              <label htmlFor="address_street" className="contact-edit">Address: (line 1)</label>
              <input type="text" name="address_street" id="address_street" onChange={this.handleChange} defaultValue={item.address_street} />
            </div>
            <div className="form-space">
              <label htmlFor="address_line2" className="contact-edit">Address: (line 2)</label>
              <input type="text" name="address_line2" id="address_line2" onChange={this.handleChange} defaultValue={item.address_line2} />
            </div>
            <div className="form-space">
              <label htmlFor="address_city" className="contact-edit">City:</label>
              <input type="text" name="address_city" id="address_city" onChange={this.handleChange} defaultValue={item.address_city} />
            </div>
            <div className="form-space">
              <label htmlFor="address_state" className="contact-edit">State:</label>
              <input type="text" name="business" id="address_state" onChange={this.handleChange} defaultValue={item.business} />
            </div>
            <div className="form-space">
              <label htmlFor="address_zip" className="contact-edit">Zip Code:</label>
              <input type="text" name="address_zip" id="address_zip" defaultValue={item.address_zip} />
            </div>
            <div className="form-space">
              <label htmlFor="address_country" className="contact-edit">Country:</label>
              <input type="text" name="address_country" id="address_country" defaultValue={item.address_country} />
            </div>
            <div className="form-space">
              <label htmlFor="website" className="contact-edit">Website:</label>
              <input type="text" name="website" id="website" defaultValue={item.website} />
            </div>
            <div className="form-space">
              <label htmlFor="favorites" className="contact-edit">Favorites:</label>
              <input type="text" name="favorites" id="favorites" defaultValue={item.favorites} />
            </div>
            <div className="form-space">
              <label htmlFor="notes" className="contact-edit">Notes:</label>
              <br /><textarea type="text" className="contact-textarea" name="notes" id="notes" defaultValue={item.notes} />
            </div>
            <div className="button-wrap">
              <button type="submit" className="submit-btn" value="submit">Submit Changes</button><button type="button" className="cancel-btn" value="cancel" onClick={(() => { this.handleCancel(item.contact_id) })}>Cancel</button>
              <br /><button type="button" className="delete-contact-btn" value="delete" onClick={(() => { this.handleDeleteContact(item.contact_id) })}>Delete Contact</button>
            </div>
          </form>
        </div>
      );
    })

    return (
      <div>
        <PageParentHeader pageName="Contacts" />
        {this.selectedContactForm}
      </div>
    )
  }



}

export default EditContact;
