import React, { Component } from 'react';
import StudioKeeperContext from '../../Context';
import PageParentHeader from '../Nav/PageParentHeader';
import ContactApiService from '../../services/contacts-api-service';
import ContactsApiService from '../../services/contacts-api-service';
import EventsApiService from '../../services/events-api-service';
import ContactsEventsApiService from '../../services/contacts-events-api-service';

class EditContact extends Component {
  static contextType = StudioKeeperContext
  constructor(props) {
    super(props);
    this.state = {
      updateBoolean: false,
      updatedContact: [],
      allEvents: [],
      eventsContactsIds: [],
      eventsOfContact: [],
      updatedEventsArray: [],
      updatedFavoritesArray: [],
      contactToEdit: [],
      errors: {}
    }
  }

  setSelectedContactItem = (contactItem) => {
    if (this.state.updateBoolean === false) {
      this.setState({ updatedContact: contactItem })
      this.setState({ contactToEdit: contactItem })
    }
  }

  setAllEvents = (events) => {
    this.setState({ allEvents: events })
  }

  setEventsContactsIds = (events) => {
    this.setState({ eventsContactsIds: events })
  }

  setEventsOfContact = (events) => {
    if (this.state.eventsOfContact === []) {
      this.setState({ eventsOfContact: events })
    }
  }

  componentDidMount = () => {
    ContactApiService.getContact(this.props.match.params.id)
      .then(this.setSelectedContactItem)
      .catch(this.context.setError)

    EventsApiService.getEventItems()
      .then(this.setAllEvents)
      .catch(this.context.setError)

    ContactsEventsApiService.getContactsAndEvents("contact_id", this.props.match.params.id)
      .then(this.setEventsContactsIds)
      .catch(this.context.setError)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.handleValidation()) {
      this.context.updateAppStateContactsUpdate(this.state.updatedContact)
      ContactApiService.updateContactItem(this.props.match.params, this.state.updatedContact)
        .then(() => window.location.href = '/contacts')
    }
    else {
      console.log(this.state.errors)
    }
  }

  handleChange = (e) => {
    const key = (e.target.name)
    const value = (e.target.value)
    const { updatedContact } = this.state;
    updatedContact[key] = value;
    this.setState({ updatedContact })
  }

  setUpdatedArray = (e) => {
    let event_id = e.target.value
    let currentEventsArray = this.state.updatedContact.events
    let updatedEventsArray

    if (!currentEventsArray.includes(event_id)) {
      let eventArrayLength = currentEventsArray.push(event_id)
      updatedEventsArray = currentEventsArray
      return eventArrayLength
    }

    else {
      updatedEventsArray = currentEventsArray.filter((event) => event_id !== event)
    }

    this.setState({ updatedEventsArray: updatedEventsArray })
    this.setState(previousState => ({ updatedContact: { ...previousState.updatedContact, events: updatedEventsArray }, updateBoolean: true }))
  }

  handleEventClick = (e) => {
    this.setUpdatedArray(e);
  }

  //maps and sets the JSX for the edit contact form fields for rendering
  selectedContactForm = () => {
    if (this.state.contactToEdit !== {}) {
      let contactToEditArray = [this.state.contactToEdit]
      this.selectedContactItemForm = contactToEditArray.map((item) => {
        if (!item) {
          return (
            <div></div>
          )
        }

        this.handleCancel = (e) => {
          window.location.href = '/contacts'
        }

        this.handleDeleteContact = () => {
          let indexToDelete = this.context.contacts.findIndex(contact => contact.id === item.id)
          let contactsList = JSON.parse(JSON.stringify(this.context.contacts))
          contactsList.splice(indexToDelete, 1)
          let newContactsList = contactsList
          this.context.updateAppStateContactsDelete(newContactsList)
          ContactsApiService.deleteContactItem(item.id)
            .then(res => { window.location.href = `/contacts` })
        }

        //prepares the JSX for the contact name/business depending on contact type
        this.handleContactType = () => {
          if (!this.state.updatedContact) {
            return (
              <div></div>
            )
          }
          if (this.state.updatedContact.contact_type === "Business") {
            return (
              <>
                <div className="form-space">
                  <label htmlFor="business" className="contact-edit">Business:</label>
                  <input type="text" name="business_name" id="business" onChange={this.handleChange} value={item.business_name} required />
                </div>
                <div className="errorMsg">{this.state.errors.business}</div>
              </>
            )
          }
          else {
            return (
              <>
                <div className="form-space">
                  <label htmlFor="name" className="contact-edit">Name:</label>
                  <input type="text" name="name" id="name" onChange={this.handleChange} value={item.name} required />
                </div>
                <div className="errorMsg">{this.state.errors.name}</div>
                <div className="form-space">
                  <label htmlFor="title" className="contact-edit">Title:</label>
                  <input type="text" name="title" id="title" onChange={this.handleChange} placeholder='Title' />
                </div>
                <div className="errorMsg">{this.state.errors.title}</div>
                <div className="form-space">
                  <label htmlFor="business" className="contact-edit">Business:</label>
                  <input type="text" name="business_name" id="business" onChange={this.handleChange} value={item.business_name || ''} />
                </div>
                <div className="errorMsg">{this.state.errors.business}</div>
              </>
            )
          }
        }

        return (
          <div key={'edit-contact' + item.id} className="item-edit-wrap contact-edit">
            <form onSubmit={this.handleSubmit}>
              <h3 className="add-item-header">Edit Contact</h3>
              <label htmlFor="contact_type" className="contact-edit">Contact Type:</label>
              <select name="contact_type" onChange={this.handleChange}>
                <option value="Individual">Individual</option>
                <option value="Business">Business</option>
              </select>
              {this.handleContactType()}
              <div className="form-space">
                <label htmlFor="email" className="contact-edit">Email:</label>
                <input type="text" name="email" id="email" onChange={this.handleChange} value={item.email || ''} />
              </div>
              <div className="errorMsg">{this.state.errors.email}</div>
              <div className="form-space">
                <label htmlFor="phone" className="contact-edit">Phone:</label>
                <input type="text" name="phone" id="phone" onChange={this.handleChange} value={item.phone || ''} />
              </div>
              <div className="errorMsg">{this.state.errors.phone}</div>
              <div className="form-space">
                <label htmlFor="address_street" className="contact-edit">Address: (line 1)</label>
                <input type="text" name="address_street" id="address_street" onChange={this.handleChange} value={item.address_street || ''} />
              </div>
              <div className="errorMsg">{this.state.errors.address_street}</div>
              <div className="form-space">
                <label htmlFor="address_line2" className="contact-edit">Address: (line 2)</label>
                <input type="text" name="address_line2" id="address_line2" onChange={this.handleChange} value={item.address_line2 || ''} />
              </div>
              <div className="errorMsg">{this.state.errors.address_line2}</div>
              <div className="form-space">
                <label htmlFor="address_city" className="contact-edit">City:</label>
                <input type="text" name="address_city" id="address_city" onChange={this.handleChange} value={item.address_city || ''} />
              </div>
              <div className="errorMsg">{this.state.errors.address_city}</div>
              <div className="form-space">
                <label htmlFor="address_state" className="contact-edit">State:</label>
                <input type="text" name="business" id="address_state" onChange={this.handleChange} value={item.business || ''} />
              </div>
              <div className="errorMsg">{this.state.errors.address_state}</div>
              <div className="form-space">
                <label htmlFor="address_zip" className="contact-edit">Zip Code:</label>
                <input type="text" name="address_zip" id="address_zip" onChange={this.handleChange} value={item.address_zip || ''} />
              </div>
              <div className="errorMsg">{this.state.errors.address_zip}</div>
              <div className="form-space">
                <label htmlFor="address_country" className="contact-edit">Country:</label>
                <input type="text" name="address_country" id="address_country" onChange={this.handleChange} value={item.address_country || ''} />
              </div>
              <input type="text" name="address_country" id="address_country" onChange={this.handleChange} placeholder='Country' />
              <div className="form-space">
                <label htmlFor="website" className="contact-edit">Website:</label>
                <input type="text" name="website" id="website" onChange={this.handleChange} value={item.website || ''} />
              </div>
              <div className="errorMsg">{this.state.errors.website}</div>
              <div className="form-space">
                <label htmlFor="notes" className="contact-edit">Notes:</label>
                <br /><textarea type="text" className="contact-textarea" name="notes" id="notes" onChange={this.handleChange} value={item.notes || ''} />
              </div>
              <div className="button-wrap">
                <button type="submit" className="submit-btn" value="submit">Submit Changes</button><button type="button" className="cancel-btn" value="cancel" onClick={this.handleCancel}>Cancel</button>
                <br /><button type="button" className="delete-contact-btn" value="delete" onClick={this.handleDeleteContact}>Delete Contact</button>
              </div>
              <div className="errorMsg">{this.state.errors.notes}</div>
            </form>
          </div>
        );
      })
    }
    return this.selectedContactItemForm
  }

  //Form validation - triggered after submitting
  handleValidation() {
    let fields = this.state.updatedContact;
    let errors = {};
    let formIsValid = true;

    this.startTimeout = () => {
      setTimeout(() => { this.setState({ errors: {} }) }, 5000);
    }

    //name
    console.log(fields["name"], "NAME")
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
      this.startTimeout();
    }

    if (typeof fields["name"] !== "undefined" && fields["name"] !== null) {
      if (!fields["name"].match(/^[a-zA-Z0-9 ]*$/)) {
        formIsValid = false;
        errors["name"] = "Please avoid special characters.";
        this.startTimeout();
      }
    }

    //title
    if (typeof fields["title"] !== "undefined" && fields["title"] !== null) {
      if (!fields["title"].match(/^[a-zA-Z ]+$/)) {
        formIsValid = false;
        errors["title"] = "Please use letters only.";
        this.startTimeout();
      }
    }

    //business
    if (!fields["business"]) {
      formIsValid = false;
      errors["business"] = "Cannot be empty - please use letters only";
      this.startTimeout();
    }
    if (typeof fields["type"] !== "undefined" && fields["type"] !== null) {
      if (!fields["type"].match(/^[a-zA-Z ]+$/)) {
        formIsValid = false;
        errors["type"] = "Please use letters only.";
        this.startTimeout();
      }
    }

    //email
    if (typeof fields["email"] !== "undefined" && fields["email"] !== null) {
      if (!fields["email"].match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[x01-x08x0bx0cx0e-x1fx21x23-x5bx5d-\x7f]|\\[x01-x09x0bx0cx0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[x01-x08x0bx0cx0e-x1fx21-x5ax53-\x7f]|\\[x01-x09x0bx0cx0e-\x7f])+)])/)) {
        formIsValid = false;
        errors["email"] = "Please enter a valid email address.";
        this.startTimeout();
      }
    }

    //phone
    if (typeof fields["phone"] !== "undefined" && fields["phone"] !== null) {
      if (!fields["phone"].match(/^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/)) {
        formIsValid = false;
        errors["phone"] = "Please enter a valid phone number.";
        this.startTimeout();
      }
    }

    //address_street
    if (typeof fields["address_street"] !== "undefined" && fields["address_street"] !== null) {
      if (!fields["address_street"].match(/^[a-zA-Z0-9 ]*$/)) {
        formIsValid = false;
        errors["address_street"] = "Please use letters and numbers only.";
        this.startTimeout();
      }
    }

    //address_line2
    if (typeof fields["address_line2"] !== "undefined" && fields["address_line2"] !== null) {
      if (!fields["address_line2"].match(/^[a-zA-Z0-9 ]*$/)) {
        formIsValid = false;
        errors["address_line2"] = "Please use letters and numbers only.";
        this.startTimeout();
      }
    }

    //address_city
    if (typeof fields["address_city"] !== "undefined" && fields["address_city"] !== null) {
      if (!fields["address_city"].match(/^[a-zA-Z ]+$/)) {
        formIsValid = false;
        errors["address_city"] = "Please use letters only.";
        this.startTimeout();
      }
    }

    //address_state
    if (typeof fields["address_state"] !== "undefined" && fields["address_state"] !== null) {
      if (!fields["address_state"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["address_state"] = "Please use letters only.";
        this.startTimeout();
      }
    }

    //address_zip
    if (typeof fields["address_zip"] !== "undefined" && fields["address_zip"] !== null) {
      if (!fields["address_zip"].match(/^[0-9]{5}(?:-[0-9]{4})?$/)) {
        formIsValid = false;
        errors["address_zip"] = "Please enter a valid zipcode.";
        this.startTimeout();
      }
    }

    //address_country
    if (typeof fields["address_country"] !== "undefined" && fields["address_country"] !== null) {
      if (!fields["address_country"].match(/^[a-zA-Z ]+$/)) {
        formIsValid = false;
        errors["address_country"] = "Please use letters only.";
        this.startTimeout();
      }
    }

    //website
    if (typeof fields["website"] !== "undefined" && fields["website"] !== null) {
      if (!fields["website"].match(/^(?:http(s)?:\/\/)?[\w.-]+(?:.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/)) {
        formIsValid = false;
        errors["website"] = "Please enter a valid website.";
        this.startTimeout();
      }
    }

    //notes
    if (typeof fields["notes"] !== "undefined" && fields["notes"] !== null) {
      if (!fields["notes"].match(/[a-zA-Z0-9#.()/%&\s-?! ]{0,19}/)) {
        formIsValid = false;
        errors["notes"] = "Please do not use special characters.";
        this.startTimeout();
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }


  render() {

    return (
      <div>
        <PageParentHeader pageName="Contacts" />
        {this.selectedContactForm()}
      </div>
    );
  }
}


export default EditContact;
