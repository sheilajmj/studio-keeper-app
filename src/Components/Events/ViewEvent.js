import React, { Component } from 'react';
import StudioKeeperContext from '../../Context'
import CatalogEventsService from '../../services/catalog-events-api-service'
import PageParentHeader from '../Nav/PageParentHeader'
import ContactsEventsApiService from '../../services/contacts-events-api-service'
import EventsApiService from '../../services/events-api-service'
import CatalogImagesApiService from '../../services/images-api-service'
import ContactsApiService from '../../services/contacts-api-service'

let moment = require('moment');


class ViewEvent extends Component {
  static contextType = StudioKeeperContext
  constructor(props) {
    super(props);
    this.state = {
      selectedEventId: '',
      selectedEventItem: [],
      eventCatalogIds: [],
      eventCatalogArray: [],
      eventContactIds: [],
      eventContactArray: []
    }
  }

  setSelectedEventId = () => {
    let selectedEventId = this.props.match.params.id
    this.setState({ selectedEventId: selectedEventId })
  }

  setSelectedEventItem = (item) => {
    this.setState({ selectedEventItem: item })
  }



  setEventCatalogIds = (response) => {
    this.setState({ eventCatalogIds: response })
    this.getEventCatalogArray()
  }

  setEventCatalogArray = (response) => {
    let eventCatalogArray = this.state.eventCatalogArray
    let unused = eventCatalogArray.push(response)
    this.setState({ eventCatalogArray: eventCatalogArray })
    this.catalogImageReturn()
    return unused
  }

  setEventContactIds = (ids) => {
    this.setState({ eventContactIds: ids })
    this.getEventContactArray()
  }

  setEventContactsArray = (contact) => {
    let eventContactArray = this.state.eventContactArray
    let unused = eventContactArray.push(contact)
    console.log("eventContactsArray2", eventContactArray)
    this.setState({ eventContactArray: eventContactArray })
    return unused
  }

  prettyDate = (date) => {
    let newDate = moment(`${date}`).format('L')
    return newDate
  }

  componentDidMount = () => {
    this.setSelectedEventId()

    ContactsEventsApiService.getContactsAndEvents('event_id', this.props.match.params.id)
      .then(this.setEventContactIds)
      .catch(this.context.setError)

    EventsApiService.getEventItem(this.props.match.params.id)
      .then(this.setSelectedEventItem)
      .catch(this.context.setError)

    CatalogEventsService.getCatalogAndEvents('event_id', this.props.match.params.id)
      .then(this.setEventCatalogIds)
      .catch(this.context.setError)
  }

  handleEditClick = (id) => {
    window.location.href=`/events/edit/${id}`
  }




  handleDeleteClick = (id) => {
    this.handleDeleteEvent(id)
  window.location.href=`/events`
  }

  handleBackToEvents = (e) => {
    window.location.href=`/events`
  }

  getEventCatalogArray = () => {
    let eventCatalogMap = this.state.eventCatalogIds.map((catalog) => {
      // take catalog id and request image 
      CatalogImagesApiService.getCatalogImages('catalog_id', catalog.catalog_id)
        .then(res => { this.setEventCatalogArray(res) })
        .catch(this.context.setError)
      return (catalog.catalog_id)

    })
    return eventCatalogMap
  }

  getEventContactArray = () => {
    let eventContactMap = this.state.eventContactIds.map((contact) => {
      ContactsApiService.getContact(contact.contact_id)
        .then(res => { this.setEventContactsArray(res) })
        .catch(this.context.setError)
      return (contact.contact_id)
    })
    return eventContactMap
  }


  catalogImageReturn = () => {
    let images = this.state.eventCatalogArray
    let imageMap
    if (images !== [{}]) {
      imageMap = images.flat().map((item) => {
        console.log("THIS IS ITEM", item)
        return (
          <a href={'localhost:3000/catalog/' + item.catalog_id} target="_blank" rel="noopener noreferrer">
            <img className="catalog-img-item" src={require("../../../public/assets/" + item.image_name)} alt="catalog item" />
          </a>)
      })
      console.log("imageMap", imageMap)
      return imageMap
    }

  }




  render() {


    // this.eventObject = this.context.events.find(item => parseInt(item.id) === parseInt(this.selectedEventId))
    //   if(!this.eventObject){
    //     return <div key={uuid()}></div>
    //   }


    this.handleDeleteEvent = (id) => {
      let indexToDelete = this.context.events.findIndex(item => item.id === id)
      let eventsList = JSON.parse(JSON.stringify(this.context.events))
      eventsList.splice(indexToDelete, 1)
      let newEventsList = eventsList
      this.context.updateAppStateEventsDelete(newEventsList)
      EventsApiService.deleteEventItem(id)
      window.location.href='/events'
    }

    this.selectedEventReturn = () => {
      if (this.state.selectedEventItem !== []) {
        let selectedEventMap = [this.state.selectedEventItem].map((item) => {




          // //contacts linked 

          // this.contactsLinkedArray = this.context.contacts.filter(contact => contact.events.includes(this.selectedEventId))
          // this.contactsLinkedReturn = this.contactsLinkedArray.map(contact => {
          //   return {
          //     contact_id: contact.contact_id,
          //     name: contact.name,
          //     business_name: contact.business_name,
          //   }
          // }
          // )


          this.contactsLinkedReturnMapped = () => {
            console.log("in return map", this.state.eventContactArray)
            if (this.state.eventContactArray) {
              let arrayMap = this.state.eventContactArray.map(contact => {
                console.log('made it in')
                return (
                  <div key={`contact` + contact.id} className="favorited-by">
                    {`${contact.name}` !== "" ? <a href={'/contacts/' + contact.id} target="_blank" rel="noopener noreferrer"> {contact.name} </a> : `${contact.business_name}` !== "" ? <a href={'/contacts/' + contact.id} target="_blank" rel="noopener noreferrer"> {contact.business_name} </a> : <a href={'/contacts/' + contact.id} target="_blank" rel="noopener noreferrer"> {contact.contact_id} </a>}
                  </div>
                )
              })
              return arrayMap
            }
          }
          return (
            <div key={`event` + item.id}>
              <PageParentHeader pageName="Events" />
              <div className="item-wrap">
                <button type="button" className="back-to-btn" value="backToEvents" onClick={(() => { this.handleBackToEvents(item.event_id) })}><img src={require("../../assets/back.svg")} alt="back icon" width="12px" /><span className="all-events-text">All Events</span></button>
                <button className="edit-btn" type="button" onClick={(() => { this.handleEditClick(item.id) })}><img src={require("../../assets/pencil.svg")} width="30px" alt="edit icon" /></button>
                <ul className="item event-view">
                  <li>
                    <span className="event-labels">Event Type:</span> {item.event_type}
                  </li>
                  <li>
                    <span className="event-labels">Name:</span> {item.name}
                  </li>
                  <li>
                    <span className="event-labels">Website:</span> {item.website}
                  </li>
                  <li>
                    <span className="event-labels">Location:</span> {item.location}
                  </li>
                  <li>
                    <span className="event-labels">Event Dates:</span> {this.prettyDate(item.event_dates)}
                  </li>
                  <div className="border"></div>
                  <li>
                    <span className="event-labels">Application Due Dates:</span> {this.prettyDate(item.application_due_date)}
                  </li>
                  <li>
                    <p className="event-labels">Submission Requirements:</p> {item.submission_requirements}
                  </li>
                  <li>
                    <span className="event-labels">Affiliated Contacts:</span> {this.contactsLinkedReturnMapped()}
                  </li>
                  <li>
                    <p className="event-labels">Notes:</p> {item.notes}
                  </li>
                  <li>
                    <div className="border"></div>
                    <p className="event-labels">Catalog Items (items to show or sell at event):</p> {this.catalogImageReturn()}
                  </li>
                </ul>
                <div className="button-wrap">
                  <button className="delete-btn" onClick={() => { this.handleDeleteClick(item.id) }}>Delete</button>
                </div>
              </div>
            </div>
          );
        })
        return selectedEventMap
      }
    }

    return (
      <div>
        {this.selectedEventReturn()}
      </div>
    )


  }
}
export default ViewEvent