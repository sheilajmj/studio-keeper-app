import React, { Component } from 'react';
import Context from '../../Context';
import PageParentHeader from '../Nav/PageParentHeader';
import ContactsApiService from '../../services/contacts-api-service';

class AddContact extends Component {
  static contextType = Context;
  constructor(props) {
    super(props)
    this.state = {
      newContact: {
        contact_type: 'Individual',
        name: null,
        title: null,
        business: null,
        email: null,
        phone: null,
        address_street: null,
        address_line2: null,
        address_city: null,
        address_state: null,
        address_zip: null,
        address_country: null,
        website: null,
        notes: null,
      },
      sent: false
    }
  }

  handleChange = (e) => {
    const key = (e.target.name)
    const value = (e.target.value)
    this.setState(previousState => ({ newContact: { ...previousState.newContact, [key]: value } }))
  }

  createNewContact = () => {
    const newContact = this.state.newContact
    this.context.updateAppStateContactsCreate(newContact)
    ContactsApiService.postContactItem(newContact)
      .then(res => { window.location.href = `/contacts/${res.id}` })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.createNewContact(e)
  }

  nameFieldPopulator = () => {
    if (this.state.newContact.contact_type === "Individual") {
      return (
        <>
          <div className="form-space">
            <label htmlFor="name" className="contact-edit">Name:</label>
            <input type="text" name="name" id="name" onChange={this.handleChange} placeholder='Name (required)' required/>
          </div>
          <div className="form-space">
            <label htmlFor="title" className="contact-edit">Title:</label>
            <input type="text" name="title" id="title" onChange={this.handleChange} placeholder='Title' />
          </div>
          <div className="form-space">
            <label htmlFor="business" className="contact-edit">Business:</label>
            <input type="text" name="business" id="business" onChange={this.handleChange} placeholder="Business Name" />
          </div>
        </>
      )
    }
    else if (this.state.newContact.contact_type === "Business") {
      return (
        <div className="form-space">
          <label htmlFor="business" className="contact-edit">Business Name:</label>
          <input type="text" name="business" id="business" onChange={this.handleChange} placeholder="Business Name (required)" required/>
        </div>

      )
    }
  }

  render() {
    return (
      <>
        <PageParentHeader pageName="Contacts" />
        <div className="item-edit-wrap contact-edit">
          <form onSubmit={this.handleSubmit}>
            <h3 className="add-item-header">Add Contact</h3>
            <div className="form-space">
              <label className="contact-edit" htmlFor="contact_type">Contact Type:</label>
              <select name="contact_type" onChange={this.handleChange} value='Individual'>
                <option value="Individual">Individual</option>
                <option value="Business">Business</option>
              </select>
            </div>
            {this.nameFieldPopulator()}
            <div className="form-space">
              <label htmlFor="email" className="contact-edit">Email:</label>
              <input type="text" name="email" id="email" onChange={this.handleChange} placeholder='email address' />
            </div>
            <div className="form-space">
              <label htmlFor="phone" className="contact-edit">Phone:</label>
              <input type="text" name="phone" id="phone" onChange={this.handleChange} placeholder='phone number' />
            </div>
            <div className="form-space">
              <label htmlFor="address_street" className="contact-edit">Address: (line 1)</label>
              <input type="text" name="address_street" id="address_street" onChange={this.handleChange} placeholder='1122 Default St.' />
            </div>
            <div className="form-space">
              <label htmlFor="address_line2" className="contact-edit">Address: (line 2)</label>
              <input type="text" name="address_line2" id="address_line2" onChange={this.handleChange} placeholder='Apartment 2' />
            </div>
            <div className="form-space">
              <label htmlFor="address_city" className="contact-edit">City:</label>
              <input type="text" name="address_city" id="address_city" onChange={this.handleChange} placeholder='Gotham City' />
            </div>
            <div className="form-space">
              <label htmlFor="address_state" className="contact-edit">State:</label>
              <input type="text" name="address_state" id="address_state" onChange={this.handleChange} placeholder='State' />
            </div>
            <div className="form-space">
              <label htmlFor="address_zip" className="contact-edit">Zip Code:</label>
              <input type="text" name="address_zip" id="address_zip" placeholder="Zip Code" />
            </div>
            <div className="form-space">
              <label htmlFor="address_country" className="contact-edit">Country:</label>
              <input type="text" name="address_country" id="address_country" onChange={this.handleChange} placeholder='Country' />
            </div>
            <div className="form-space">
              <label htmlFor="website" className="contact-edit">Website:</label>
              <input type="text" name="website" id="website" onChange={this.handleChange} placeholder='website' />
            </div>
            <div className="form-space">
              <label htmlFor="notes" className="contact-edit">Notes:</label>
              <br /><textarea type="text" className="contact-textarea" name="notes" id="notes" onChange={this.handleChange} placeholder="Notes" />
            </div>
            <div className="button-wrap">
              <button className="submit-btn" type="submit" value="submit">Submit</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}


export default AddContact;