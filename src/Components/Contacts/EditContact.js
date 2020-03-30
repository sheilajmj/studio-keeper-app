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
    super(props)
    this.state = {
      updateBoolean: false,
      updatedContact: [],
      allEvents: [],
      eventsContactsIds: [],
      eventsOfContact: [],
      updatedEventsArray: [],
      updatedFavoritesArray: [],
      contactToEdit: []
    }
  }


  setSelectedContactItem = (contactItem) => {
    if (this.state.updateBoolean === false) {
      this.setState({ updatedContact: contactItem })
      this.setState({ contactToEdit: contactItem })
    }
  }

  setAllEvents = (events) => {
    console.log("allevents", events)
      this.setState({ allEvents: events })
  }

  setEventsContactsIds = (events) => {
    console.log("eventscontacts", events)
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
    this.context.updateAppStateContactsUpdate(this.state.updatedContact)
    ContactApiService.updateContactItem(this.props.match.params, this.state.updatedContact)
    window.location.href = '/contacts'
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
      console.log(eventArrayLength)
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


  // this.setUpdatedFavoritesArray = (e) =>{
  //   let catalog_id = e.target.value
  //   let currentFavoritesArray = this.state.updatedContact.favorites
  //   let updatedFavoritesArray 

  //   if (!currentFavoritesArray.includes(catalog_id)){
  //     let favoritesArrayLength = currentFavoritesArray.push(catalog_id)
  //     updatedFavoritesArray = currentFavoritesArray
  //     console.log(favoritesArrayLength)
  //   }

  //   else{
  //     updatedFavoritesArray = currentFavoritesArray.filter((favorite) => catalog_id !== favorite)
  //   }

  //   this.setState({updatedFavoritesArray: updatedFavoritesArray})
  //   this.setState(previousState => ({ updatedContact: { ...previousState.updatedContact, favorites: updatedFavoritesArray}, updateBoolean: true }))

  // }

  // this.handleFavoritesClick = (e) => {
  //   this.setUpdatedFavoritesArray(e)
  // }

  handleCancel = (e) => {
    window.location.href = '/contacts'
  }

  handleDeleteContact = (id) => {
    let indexToDelete = this.context.contacts.findIndex(contact => contact.contact_id === id)
    let contactsList = JSON.parse(JSON.stringify(this.context.contacts))
    contactsList.splice(indexToDelete, 1)
    let newContactsList = contactsList
    this.context.updateAppStateContactsDelete(newContactsList)
    ContactsApiService.deleteContactItem(id)
    window.location.href = `/contacts`
  }


  // eventFieldSelectionOptions = () => {
  //   if (this.state.allEvents) {
  //     let eventsReturn = this.state.allEvents.map(event => {
  //       this.checkedValue = () => {
  //         let eventsMapped = this.state.eventsContactsIds.map((eventId) => {
  //           if (event.id === eventId.id ) {
  //             return true
  //           }
  //           else return false
  //         })
  //         return eventsMapped
  //       }

  //       return (
  //         <div key={'event' + event.id} className="checkbox">
  //           <input type="checkbox" id={event.id} name={"events"} value={event.id} onChange={this.handleEventClick} defaultChecked={this.checkedValue()} />
  //           <label htmlFor={event.id}> {<a href={'/events/' + event.id} target="_blank" rel="noopener noreferrer"> {event.name}</a>} </label>
  //         </div>
  //       )
  //     })
  //     return eventsReturn
  //   }
  //   else {
  //     return <div></div>
  //   }
  // }

  // this.favoritesFieldSelectionOptions = this.context.catalog_items.map((item) => {
  //   console.log(item, "what is item again?", "contactarray", this.selectedContactArray[0].favorites)
  //   this.checkedValue = () => {
  //     if (this.selectedContactArray[0].favorites.includes(item.catalog_id)){
  //     return true
  //     }
  //   }

  //   this.favoritesImgReturn = () => {
  //     if (item.images !== null || item.images !== "" ){
  //       this.imgReturn = [item.images.split(', ')[0]].map((image) => {
  //               return (
  //                 <img key={item.contact_id+image.name} className="catalog-img-item" src={require("../../assets/" + image)} alt="catalog item" />
  //                 )
  //             })
  //     }
  //     return this.imgReturn
  //   }       

  //     return(
  //       <div key={'favorite' + item.catalog_id}  className="checkbox">
  //         <input type="checkbox" id={item.catalog_id} name={"favorites"} value={item.catalog_id} onChange={this.handleFavoritesClick} defaultChecked={this.checkedValue()} />
  //       <label htmlFor={item.catalog_id}>
  //         {<a href={'/catalog/'+ item.catalog_id} target="_blank"  rel="noopener noreferrer">
  //             {this.favoritesImgReturn()} 
  //             </a>}   
  //       </label> 
  //       </div>
  //     )



  // })


  render() {





    this.selectedContactForm = () => {
      if (this.state.contactToEdit !== {}) {
        let contactToEditArray = [this.state.contactToEdit]
        this.selectedContactItemForm = contactToEditArray.map((item) => {
          if (!item) {
            return (
              <div></div>
            )
          }

          this.handleContactType = () => {
            if (!this.state.updatedContact) {
              return (
                <div></div>
              )
            }
            if (this.state.updatedContact.contact_type === "Business") {
              return (
                <div className="form-space">
                  <label htmlFor="business" className="contact-edit">Business:</label>
                  <input type="text" name="business_name" id="business" onChange={this.handleChange} defaultValue={item.business_name} />
                </div>
              )
            }
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
            <div key={item.id} className="item-edit-wrap contact-edit">
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
                {/* <div className="form-space">
                  <legend className="contact-edit">Event Affiliation:</legend>
                  {this.eventFieldSelectionOptions()}
                </div> */}
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
                  {this.favoritesFieldSelectionOptions}
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
      }
      return this.selectedContactItemForm
    }

    return (
      <div>
        <PageParentHeader pageName="Contacts" />
        {this.selectedContactForm()}
      </div>
    )
  }



}

export default EditContact;
