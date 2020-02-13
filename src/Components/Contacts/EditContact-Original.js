import React, { Component } from 'react';
import StudioKeeperContext from '../../Context'
import Nav from '../Nav/Nav'

class EditContact extends Component {
  static contextType = StudioKeeperContext

  constructor(props) {
    super(props)
    this.state = {
      updateBoolean: false,
      updatedContact: []
    }
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


 

  render() {

    this.selectedContactId = this.props.match.params.contact_id
    this.selectedContactObject = this.context.contacts.find(contact => contact.contact_id === this.selectedContactId)
    this.selectedContactArray = [this.selectedContactObject]
    
    this.selectedContactObject = this.selectedContactArray.map((contact) => {
        return ({
          selectedContact: {
            contact_type: contact.contact_type,
            name: contact.name,
            business: contact.business,
            event: contact.event,
            email: contact.email,
            phone: contact.phone,
            address_street: contact.address_street,
            address_line2: contact.address_line2,
            address_city: contact.address_city,
            address_state: contact.address_state,
            address_zip: contact.address_zip,
            address_country: contact.address_country,
            website: contact.website,
            favorites: contact.favorites,
            notes: contact.notes,
          }
        })
      })

  
     this.setInitialDefaultState = () => {
       if (this.state.updateBoolean === false){
         this.setState({updateContact: this.selectedContactValues})
       }
     }
  
    this.selectedContactForm =  this.selectedContactArray.map((item) => {
      return (
        <div key={item.contact_id} className="item-wrap contact-edit">
          <form onSubmit={() => { this.handleSubmit() }}>
            <div className="form-space">
              <label htmlFor="contact_type">Contact Type:</label>
              <select name="contact_type" onChange={this.handleChange}>
                <option value="individual">Individual</option>
                <option value="business">Business</option>
                <option value="event">Event</option>
              </select>
            </div>
            <div className="form-space">
              <label htmlFor="name" className="contact-edit">Name:</label>
              <input type="text" name="name" id="name" onChange={this.handleChange} defaultValue={item.name} />
            </div>
            <div className="form-space">
              <label htmlFor="business" className="contact-edit">Business:</label>
              <input type="text" name="business" id="business" onChange={this.handleChange} defaultValue={item.business_name} />
            </div>
            <div className="form-space">
              <label htmlFor="event" className="contact-edit">Event Name:</label>
              <input type="text" name="event" id="event" onChange={this.handleChange} defaultValue={item.event_name} />
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
              <input type="text" name="notes" id="notes" defaultValue={item.notes} />
            </div>
            <button type="submit" value="submit">Submit</button>
          </form>
        </div>
      );
    })
  

    return (
      <div>
        <Nav />
        <h2>Edit Contact</h2>
        {this.selectedContactForm}
      </div>
    )
  }



}

export default EditContact;


// contact_type: "" ,
// name: "",
// business: "",
// event: "",
// email: "",
// phone: "",
// address_street: "",
// address_line2:  "",
// address_city: "",
// address_state: "",
// address_zip: "",
// address_country: "",
// website: "",
// favorites: "",
// notes: "",