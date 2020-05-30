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
      sent: false,
      errors: {}
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
      .then(res => { window.location.href = `/contacts` })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.handleValidation()) {
      this.createNewContact(e);
    }
    else {
      console.log(this.state.errors);
    }

  }

  nameFieldPopulator = () => {
    if (this.state.newContact.contact_type === "Individual") {
      return (
        <>
          <div className="form-space">
            <label htmlFor="name" className="contact-edit">Name:</label>
            <input type="text" name="name" id="name" onChange={this.handleChange} placeholder='Name (required)' required />
          </div>
          <div className="errorMsg">{this.state.errors.name}</div>
          <div className="form-space">
            <label htmlFor="title" className="contact-edit">Title:</label>
            <input type="text" name="title" id="title" onChange={this.handleChange} placeholder='Title' />
          </div>
          <div className="errorMsg">{this.state.errors.title}</div>
          <div className="form-space">
            <label htmlFor="business" className="contact-edit">Business (required):</label>
            <input type="text" name="business" id="business" onChange={this.handleChange} placeholder="Business Name" />
          </div>
          <div className="errorMsg">{this.state.errors.business}</div>
        </>
      )
    }
    else if (this.state.newContact.contact_type === "Business") {
      return (
        <>
          <div className="form-space">
            <label htmlFor="business" className="contact-edit">Business Name:</label>
            <input type="text" name="business" id="business" onChange={this.handleChange} placeholder="Business Name (required)" required />
          </div>
          <div className="errorMsg">{this.state.errors.business}</div>
        </>
      );
    }
  }

  handleValidation() {
    let fields = this.state.newContact;
    let errors = {};
    let formIsValid = true;

    //name
    console.log(fields["name"], "NAME")
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }

    if (typeof fields["name"] !== "undefined" && fields["name"] !== null) {
      if (!fields["name"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["name"] = "Please use letters only.";
      }
    }

    //title
    if (typeof fields["title"] !== "undefined" && fields["title"] !== null) {
      if (!fields["title"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["title"] = "Please use letters only.";
      }
    }

    //business
    if (!fields["business"]) {
      formIsValid = false;
      errors["business"] = "Cannot be empty - please use letters only";
    }
    if (typeof fields["type"] !== "undefined" && fields["type"] !== null) {
      if (!fields["type"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["type"] = "Please use letters only.";
      }
    }

    //email
    if (typeof fields["email"] !== "undefined" && fields["email"] !== null) {
      if (!fields["email"].match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[x01-x08x0bx0cx0e-x1fx21x23-x5bx5d-\x7f]|\\[x01-x09x0bx0cx0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[x01-x08x0bx0cx0e-x1fx21-x5ax53-\x7f]|\\[x01-x09x0bx0cx0e-\x7f])+)])/)) {
        formIsValid = false;
        errors["email"] = "Please enter a valid email address.";
      }
    }
    

    //phone
    if (typeof fields["phone"] !== "undefined" && fields["phone"] !== null) {
      if (!fields["phone"].match(/(\(\d{3}\)|\d{3})-?\d{3}-?\d{4}$/)) {
        formIsValid = false;
        errors["phone"] = "Please enter a valid phone number.";
      }
    }

    //address_street
    if (typeof fields["address_street"] !== "undefined" && fields["address_street"] !== null) {
      if (!fields["address_street"].match(/^[a-zA-Z0-9 ]*$/)) {
        formIsValid = false;
        errors["address_street"] = "Please use letters and numbers only.";
      }
    }

    //address_line2
    if (typeof fields["address_line2"] !== "undefined" && fields["address_line2"] !== null) {
      if (!fields["address_line2"].match(/^[a-zA-Z0-9 ]*$/)) {
        formIsValid = false;
        errors["address_line2"] = "Please use letters and numbers only.";
      }
    }

    //address_city
    if (typeof fields["address_city"] !== "undefined" && fields["address_city"] !== null) {
      if (!fields["address_city"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["address_city"] = "Please use letters only.";
      }
    }

    //address_state
       if (typeof fields["address_state"] !== "undefined" && fields["address_state"] !== null) {
      if (!fields["address_state"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["address_state"] = "Please use letters only.";
      }
    }

    //address_zip
    if (typeof fields["address_zip"] !== "undefined" && fields["address_zip"] !== null) {
      if (!fields["address_zip"].match(/^[0-9]{5}(?:-[0-9]{4})?$/)) {
        formIsValid = false;
        errors["address_zip"] = "Please enter a valid zipcode.";
      }
    }

    //address_country
    if (typeof fields["address_country"] !== "undefined" && fields["address_country"] !== null) {
      if (!fields["address_country"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["address_country"] = "Please use letters only.";
      }
    }

    //website
    if (typeof fields["website"] !== "undefined" && fields["website"] !== null) {
      if (!fields["website"].match(/^(?:http(s)?:\/\/)?[\w.-]+(?:.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/)) {
        formIsValid = false;
        errors["website"] = "Please enter a valid email address.";
      }
    }

    //notes
    if (typeof fields["notes"] !== "undefined" && fields["notes"] !== null) {
      if (!fields["notes"].match(/[a-zA-Z0-9#.()/%&\s-?!]{0,19}/)) {
        formIsValid = false;
        errors["notes"] = "Please do not use special characters.";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
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
            <div className="errorMsg">{this.state.errors.email}</div>
            <div className="form-space">
              <label htmlFor="phone" className="contact-edit">Phone:</label>
              <input type="text" name="phone" id="phone" onChange={this.handleChange} placeholder='phone number' />
            </div>
            <div className="errorMsg">{this.state.errors.phone}</div>
            <div className="form-space">
              <label htmlFor="address_street" className="contact-edit">Address: (line 1)</label>
              <input type="text" name="address_street" id="address_street" onChange={this.handleChange} placeholder='1122 Default St.' />
            </div>
            <div className="errorMsg">{this.state.errors.address_street}</div>
            <div className="form-space">
              <label htmlFor="address_line2" className="contact-edit">Address: (line 2)</label>
              <input type="text" name="address_line2" id="address_line2" onChange={this.handleChange} placeholder='Apartment 2' />
            </div>
            <div className="errorMsg">{this.state.errors.address_line2}</div>
            <div className="form-space">
              <label htmlFor="address_city" className="contact-edit">City:</label>
              <input type="text" name="address_city" id="address_city" onChange={this.handleChange} placeholder='Gotham City' />
            </div>
            <div className="errorMsg">{this.state.errors.address_city}</div>
            <div className="form-space">
              <label htmlFor="address_state" className="contact-edit">State:</label>
              <input type="text" name="address_state" id="address_state" onChange={this.handleChange} placeholder='State' />
            </div>
            <div className="errorMsg">{this.state.errors.address_state}</div>
            <div className="form-space">
              <label htmlFor="address_zip" className="contact-edit">Zip Code:</label>
              <input type="text" name="address_zip" id="address_zip" placeholder="Zip Code" />
            </div>
            <div className="errorMsg">{this.state.errors.address_zip}</div>
            <div className="form-space">
              <label htmlFor="address_country" className="contact-edit">Country:</label>
              <input type="text" name="address_country" id="address_country" onChange={this.handleChange} placeholder='Country' />
            </div>
            <div className="errorMsg">{this.state.errors.address_country}</div>
            <div className="form-space">
              <label htmlFor="website" className="contact-edit">Website:</label>
              <input type="text" name="website" id="website" onChange={this.handleChange} placeholder='website' />
            </div>
            <div className="errorMsg">{this.state.errors.website}</div>
            <div className="form-space">
              <label htmlFor="notes" className="contact-edit">Notes:</label>
              <br /><textarea type="text" className="contact-textarea" name="notes" id="notes" onChange={this.handleChange} placeholder="Notes" />
            </div>
            <div className="errorMsg">{this.state.errors.notes}</div>
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