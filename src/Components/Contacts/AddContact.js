import React, { Component } from 'react';
import Context from '../../Context'
import Nav from '../Nav/Nav'
class AddContact extends Component {
  static contextType = Context;

  constructor(props){
    super(props)
    this.state = {
      newContact: {
      contact_type: "Contact Type",
      name: "Name",
      business: "Business",
      event: "Event Name",
      email: "jdoe@email.com",
      phone: "123-456-7890",
      address_street: "1122 Default St.",
      address_line2:  "Apartment 2",
      address_city: "Gotham City",
      address_state: "State",
      address_zip: "Zip Code",
      address_country: "Country",
      website: "http://website.com",
      favorites: "Favorites",
      notes: "Notes",
      }
    } 
  }

  handleChange= (e) => {
  const key = (e.target.name)
  const value = (e.target.value)
  this.setState(previousState => ({newContact: {...previousState.newContact, [key]: value}}))
  }

  createNewContact = () => {
    const newContact = this.state.newContact
    this.context.updateAppStateContacts(newContact)
  }


  handleSubmit = (e) => {
    e.preventDefault()
    this.createNewContact(e)
  }
  
  
  render() {
    return(
      <>
      <Nav />
      <div className="item-wrap contact-add">
        <h2>Add New Contact</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-space">
            <label htmlFor="contact_type">Contact Type:</label>
            <select name="contact_type" onChange={this.handleChange} value={this.state.newContact.contact_type}>
              <option value="type-individual">Individual</option>
              <option value="type-business">Business</option>
              <option value="type-event">Event</option>
              <option value="type-vendor">Vendor</option>
            </select>
          </div>
          <div className="form-space">
            <label htmlFor="name" className="contact-edit">Name:</label>
            <input type="text" name="name" id="name" onChange={this.handleChange} defaultValue={this.state.newContact.name} />
          </div>
          <div className="form-space">
            <label htmlFor="business" className="contact-edit">Business:</label>
            <input type="text" name="business" id="business" onChange={this.handleChange} defaultValue={this.state.newContact.business} />
          </div>
          <div className="form-space">
            <label htmlFor="event" className="contact-edit">Event Name:</label>
            <input type="text" name="event" id="event" onChange={this.handleChange} defaultValue={this.state.newContact.event} />
          </div>
          <div className="form-space">
            <label htmlFor="email" className="contact-edit">Email:</label>
            <input type="text" name="email" id="email" onChange={this.handleChange} defaultValue={this.state.newContact.email} />
          </div>
          <div className="form-space">
            <label htmlFor="phone" className="contact-edit">Phone:</label>
            <input type="text" name="phone" id="phone" onChange={this.handleChange} defaultValue={this.state.newContact.phone} />
          </div>
          <div className="form-space">
            <label htmlFor="address_street" className="contact-edit">Address: (line 1)</label>
            <input type="text" name="address_street" id="address_street" onChange={this.handleChange} defaultValue={this.state.newContact.address_street} />
          </div>
          <div className="form-space">
            <label htmlFor="address_line2" className="contact-edit">Address: (line 2)</label>
            <input type="text" name="address_line2" id="address_line2" onChange={this.handleChange} defaultValue={this.state.newContact.address_line2}/>
          </div>
          <div className="form-space">
            <label htmlFor="address_city" className="contact-edit">City:</label>
            <input type="text" name="address_city" id="address_city" onChange={this.handleChange} defaultValue={this.state.newContact.address_city} />
          </div>
          <div className="form-space">
            <label htmlFor="address_state" className="contact-edit">State:</label>
            <input type="text" name="address_state" id="address_state" onChange={this.handleChange} defaultValue={this.state.newContact.address_state} />
          </div>
          <div className="form-space">
            <label htmlFor="address_zip" className="contact-edit">Zip Code:</label>
            <input type="text" name="address_zip" id="address_zip" defaultValue="Zip Code" />
          </div>
          <div className="form-space">
            <label htmlFor="address_country" className="contact-edit">Country:</label>
            <input type="text" name="address_country" id="address_country" onChange={this.handleChange} defaultValue={this.state.newContact.address_country} />
          </div>
          <div className="form-space">
            <label htmlFor="website" className="contact-edit">Website:</label>
            <input type="text" name="website" id="website" onChange={this.handleChange} defaultValue={this.state.newContact.website} />
          </div>
          <div className="form-space">
            <label htmlFor="favorites" className="contact-edit">Favorites:</label>
            <input type="text" name="favorites" id="favorites" onChange={this.handleChange} defaultValue={this.state.newContact.favorites} />
          </div>
          <div className="form-space">
            <label htmlFor="notes" className="contact-edit">Notes:</label>
            <input type="text" name="notes" id="notes" onChange={this.handleChange} defaultValue={this.state.newContact.notes} />
          </div>
          <button type="submit" value="submit">Submit</button>
        </form>
      </div>
      </>
    );
  }
}


export default AddContact;