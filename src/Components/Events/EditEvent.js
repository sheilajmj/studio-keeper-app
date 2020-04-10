import React, { Component } from 'react';
import Context from '../../Context'
import PageParentHeader from '../Nav/PageParentHeader';
import EventsApiService from '../../services/events-api-service';
import ContactsApiService from '../../services/contacts-api-service';
import ContactsEventsApiService from '../../services/contacts-events-api-service';

class EditEvent extends Component {
  static contextType = Context;

  constructor(props) {
    super(props)
    this.state = {
      updateBoolean: false,
      updatedEvent: [],
      eventToEdit: [],
      contactsEventsConnect: [],
      contacts: [],
      checkedContacts: [],
    }
  }

  setCheckedContacts = (id) => {
    let checkedContactsState = this.state.checkedContacts
    let splicedContacts = checkedContactsState.splice(-1, 0, id)
    this.setState({ checkedContacts: checkedContactsState })
    return splicedContacts
  }

  setSelectedEventItem = (eventItem) => {
    if (this.state.updateBoolean === false) {
      this.setState({ updatedEvent: eventItem })
      this.setState({ eventToEdit: eventItem })
    }
  }

  setContacts = (contacts) => {
    this.setState({ contacts: contacts })
  }


  setContactsEventsConnect = (contacts) => {
    this.setState({ contactsEventsConnect: contacts })
  }

  componentDidMount = () => {
    EventsApiService.getEventItem(this.props.match.params.id)
      .then(this.setSelectedEventItem)
      .catch(this.context.setError)

    ContactsApiService.getContacts()
      .then(this.setContacts)
      .then(this.context.setError)

    ContactsEventsApiService.getContactsAndEvents("event_id", this.props.match.params.id)
      .then(this.setContactsEventsConnect)
      .then(this.context.setError)
  }

  checkedContactValue = (contact_id) => {
    this.checkValue = () => {
      if (!this.state.contactsEventsConnect) {
        return
      }
      else {
        let contactCheckedItem = this.state.contactsEventsConnect.find((contact) => contact.contact_id === contact_id)
        if (contactCheckedItem) {
          return true
        }
      }
      return this.contactCheckedItem
    }
    return this.checkValue()
  }

  render() {
    this.handleSubmit = (e) => {
      e.preventDefault()
      this.context.updateAppStateEventsUpdate(this.state.updatedEvent)
      EventsApiService.updateEventItem(this.props.match.params, this.state.updatedEvent)
        .then(res => { window.location.href = `/events` })
    }

    this.handleChange = (e) => {
      const key = (e.target.name)
      const value = (e.target.value)
      this.setState(previousState => ({ updatedEvent: { ...previousState.updatedEvent, [key]: value }, updateBoolean: true }))
    }


    this.contactFieldSelectionOptions = () => {
      if (this.state.contacts === undefined) {
        return <div></div>
      }
      else {
        let contactReturn = this.state.contacts.map((contact) => {
          return (
            <div key={'contact' + contact.id} className="checkbox">
              <input type="checkbox" id={'contact' + contact.id} name={"contacts"} value={contact.id} onChange={this.handleContactClick} defaultChecked={this.checkedContactValue(contact.id)} />
              <label htmlFor={contact.id}> {<a href={'/contacts/' + contact.id} target="_blank" rel="noopener noreferrer">{contact.name ? contact.name : contact.business_name}</a>}</label>
            </div>
          )
        })
        return contactReturn
      }
    }



    this.handleCancel = (e) => {
      window.location.href = '/events'
    }

    this.handleDeleteEvent = (id) => {
      let indexToDelete = this.context.events.findIndex(event => event.event_id === id)
      let eventsList = JSON.parse(JSON.stringify(this.context.events))
      eventsList.splice(indexToDelete, 1)
      let newEventsList = eventsList
      this.context.updateAppStateEventsDelete(newEventsList)
      EventsApiService.deleteEventItem(id)
        .then(res => { window.location.href = `/events` })
    }

    this.selectedEventForm = () => {
      if (this.state.eventToEdit === undefined) {
        return <div></div>
      }
      if (this.state.eventToEdit !== {}) {
        let selectedEventItemForm = [this.state.eventToEdit].map((item) => {
          if (!item) {
            return (
              <div></div>
            )
          }
          return (
            <div key={item.id + item.name} className="item-edit-wrap event-edit">
              <form onSubmit={this.handleSubmit}>
                <h3 className="add-item-header">Edit Event</h3>
                <div className="form-space">
                  <label htmlFor="event_type" className="event-edit">Event Type:</label>
                  <input type="text" name="event_type" id="event_type" onChange={this.handleChange} placeholder={item.event_type} />
                </div>
                <div className="form-space">
                  <label htmlFor="name" className="event-edit">Name:</label>
                  <input type="text" name="name" id="name" onChange={this.handleChange} placeholder={item.name} />
                </div>
                <div className="form-space">
                  <label htmlFor="location" className="event-edit">Location:</label>
                  <input type="location" name="location" id="location" onChange={this.handleChange} placeholder={item.location} />
                </div>
                <div className="form-space">
                  <label htmlFor="event_dates" className="event-edit">Event Dates:</label>
                  <input type="text" name="event_dates" id="event_dates" onChange={this.handleChange} placeholder={item.event_dates} />
                </div>
                <div className="form-space">
                  <label htmlFor="application_due_dates" className="event-edit">Application Due Dates:</label>
                  <input type="text" className="application-due-date" name="application_due_dates" id="application_due_dates" onChange={this.handleChange} placeholder={item.application_due_dates} />
                </div>
                <div className="form-space">
                </div>
                <div className="form-space">
                  <label htmlFor="notes" className="event-edit">Notes:</label>
                  <textarea type="text" className="event-textarea" name="notes" id="notes" onChange={this.handleChange} placeholder={item.notes} />
                </div>
                <div className="form-space">
                  <label htmlFor="submission_requirements" className="event-edit">Submission Requirements:</label>
                  <br /><textarea type="text" className="event-textarea" name="submission_requirements" id="submission_requirements" onChange={this.handleChange} placeholder={item.submission_requirements} />
                </div>
                <div className="form-space">
                </div>
                <div className="button-wrap">
                  <button className="submit-btn" type="submit" value="submit">Submit</button>
                  <button className="cancel-btn" type="button" value="cancel" onClick={(() => { this.handleCancel(item.id) })}>Cancel</button>
                  <br /><button className="delete-btn" type="button" value="delete" onClick={(() => { this.handleDeleteEvent(item.id) })}>Delete Event</button>
                </div>
              </form>
            </div>
          );
        })
        return selectedEventItemForm
      }
    }


    return (
      <div>
        <PageParentHeader pageName="Events" />
        {this.selectedEventForm()}
      </div>
    )
  }

}


export default EditEvent;