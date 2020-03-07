import React, { Component } from 'react';
import Context from '../../Context'
import PageParentHeader from '../Nav/PageParentHeader';
const { uuid } = require('uuidv4')


class AddEvent extends Component {
  static contextType = Context;

  constructor(props) {
    super(props)
    this.state = {
      newEvent: {
        event_type: "Event Type",
        name: "Event Name",
        website: "website",
        location: "Location",
        event_dates: "Event Dates",
        application_due_dates: "Application Due Dates",
        contact: "Contact",
        notes: "Notes",
        submission_requirements: "some requirements",
        catalog_items: "Catalog Items",
      }
    }
  }

  handleChange = (e) => {
    const key = (e.target.name)
    const value = (e.target.value)
    this.setState(previousState => ({ newEvent: { ...previousState.newEvent, [key]: value } }))
    this.setState(previousState => ({ newEvent: { ...previousState.newEvent, event_id: uuid() } }))
  }

  createNewEvent = () => {
    const newEvent = this.state.newEvent
    this.context.updateAppStateEventsCreate(newEvent)
  }


  handleSubmit = (e) => {
    e.preventDefault()
    this.createNewEvent(e)
    this.context.history.push(`/events`)
  }


  render() {
    this.contactsBySelectionBoxes = this.context.contacts.map(contact => {
      if(!contact){
        return<div></div>
      }

      return (
        <div key={uuid()}>
          <input type="checkbox" id={"contact-" + contact.contact_id} name={contact.name} />
          <label htmlFor={contact.name}> {`${contact.name}` !== "" ? <a href={'/contacts/' + contact.contact_id} target="_blank" rel="noopener noreferrer"> {contact.name} </a> : `${contact.business_name}` !== "" ? <a href={'/contacts/' + contact.contact_id} target="_blank" rel="noopener noreferrer"> {contact.business_name} </a> : <a href={'/contacts/' + contact.contact_id} target="_blank" rel="noopener noreferrer"> {contact.contact_id} </a>} </label>
        </div>
      )
    })

    this.catalogItemsBySelectionBoxes = this.context.catalog_items.map(item => {
      if (!item){
        return <div></div>
      }

      this.catalogImgReturn = () => {
        if (item.images !== null || item.images !== "") {
          this.catalogItemsImages = [item.images.split(', ')[0]].map((item) => {
            return (
              <img key={item.contact_id+item.name} className="catalog-img-item" src={require("../../assets/" + item)} alt="catalog item" />
            )
          })
        }
        return this.catalogItemsImages
      }

        return (
          <div key={'catalog-items' + item.catalog_id} className="checkbox">
            <input type="checkbox" id={'catalog-items' + item.catalog_id} name={"catalog-items"} value={item.catalog_id} onChange={this.handleCatalogItemsClick} defaultChecked={false} />
            <label htmlFor={item.catalog_id}>
              {<a href={'/catalog/' + item.catalog_id} target="_blank" rel="noopener noreferrer">
                {this.catalogImgReturn()}
              </a>}
            </label>
          </div>
        )
      })
    

    return (
      <>
        <PageParentHeader pageName="Events" />
        <div className="item-edit-wrap event-edit">
          <form onSubmit={this.handleSubmit}>
            <h3 className="add-item-header">Add Event</h3>
            <div className="form-space">
              <label htmlFor="event_type" className="event-edit">Event Type:</label>
              <input type="text" name="event_type" id="event_type" onChange={this.handleChange} defaultValue={this.state.newEvent.event_type} />
            </div>
            <div className="form-space">
              <label htmlFor="name" className="event-edit">Name:</label>
              <input type="text" name="name" id="name" onChange={this.handleChange} defaultValue={this.state.newEvent.name} />
            </div>
            <div className="form-space">
              <label htmlFor="website" className="event-edit">Website:</label>
              <input type="text" name="website" id="website" onChange={this.handleChange} defaultValue={this.state.newEvent.website} />
            </div>
            <div className="form-space">
              <label htmlFor="location" className="event-edit">Location:</label>
              <input type="location" name="location" id="location" onChange={this.handleChange} defaultValue={this.state.newEvent.location} />
            </div>
            <div className="form-space">
              <label htmlFor="event_dates" className="event-edit">Event Dates:</label>
              <input type="text" name="event_dates" id="event_dates" onChange={this.handleChange} defaultValue={this.state.newEvent.event_dates} />
            </div>
            <div className="form-space">
              <label htmlFor="application_due_dates" className="event-edit">Application Due Dates:</label>
              <input type="text" className="application-due-date" name="application_due_dates" id="application_due_dates" onChange={this.handleChange} defaultValue={this.state.newEvent.application_due_dates} />
            </div>
            <div className="form-space">
              <label htmlFor="contact" className="event-edit">Contact:</label>
              {this.contactsBySelectionBoxes}
            </div>
            <div className="form-space">
              <label htmlFor="notes" className="event-edit">Notes:</label>
              <textarea type="text" className="event-textarea" name="notes" id="notes" onChange={this.handleChange} defaultValue={this.state.newEvent.notes} />
            </div>
            <div className="form-space">
              <label htmlFor="submission_requirements" className="event-edit">Submission Requirements:</label>
              <textarea type="text" className="event-textarea" name="submission_requirements" id="submission_requirements" onChange={this.handleChange} defaultValue={this.state.newEvent.submission_requirements} />
            </div>
            <div className="form-space">
              <label htmlFor="catalog_items" className="event-edit">Catalog Items:</label>
              {this.catalogItemsBySelectionBoxes}
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



export default AddEvent;