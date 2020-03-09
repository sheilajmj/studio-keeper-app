import React, { Component } from 'react';
import StudioKeeperContext from '../../Context'
import EventsCatalogService from '../../services/events-catalog-api-service'
import PageParentHeader from '../Nav/PageParentHeader'
const { uuid } = require('uuidv4');

class ViewEvent extends Component {
  static contextType = StudioKeeperContext
  constructor(props){
    super(props);
    this.state = {
    eventCatalogItems: []
    }
}


  handleEditClick = (id) => {
    this.context.history.push(`/events/edit/${id}`)
  }

  handleDeleteClick = (id) => {
    this.handleDeleteEvent(id)
    this.context.history.push(`/events`)
  }

  handleBackToEvents = (e) => {
    this.context.history.push('/events')
  }

  setCatalogItems = (response) => {
    this.setState({eventCatalogItems: response})
   }

  render() {

    this.selectedEventId = this.props.match.params.id

    this.eventObject = this.context.events.find(item => parseInt(item.id) === parseInt(this.selectedEventId))
      if(!this.eventObject){
        return <div key={uuid()}></div>
      }

    this.eventArray = [this.eventObject]
    this.handleDeleteEvent = (id) => {
      let indexToDelete = this.context.events.findIndex(item => item.id === id)
      let eventsList = JSON.parse(JSON.stringify(this.context.events))
      eventsList.splice(indexToDelete, 1)
      let newEventsList = eventsList
      this.context.updateAppStateEventsDelete(newEventsList)
    }

    this.eventObjectRender = this.eventArray.map((item) => {
      if (!item){
        return(
        <div key={uuid()}></div>
        )
      }

      //catalog items



      let key = "event_id"
      let value = this.selectedEventId
      EventsCatalogService.getCatalogAndEvents(key, value)
        .then((res) => {
          this.setCatalogItems(res)})
        .catch(this.context.setError)


      let catalogItems = this.state.eventCatalogItems
          
      this.catalogItemsRender = () => {if (!catalogItems){
        return <div></div>
        }
      
        catalogItems.map((id) => {

            this.catalogObject = this.context.catalog_items.filter((item) => {
              return item.id === id
            })
            return this.catalogObject
          })

          this.catalogItemsArray = this.catalogItemsRender.flat()
          this.catalogReturn = this.catalogItemsRender.map((item) => {  
            if (item[0].images !== null || item[0].images !== "") {
              this.imgReturn = [item[0].images.split(', ')[0]].map((image) => {
                return (
                  <img key={"img" + item.image} className="catalog-img-item" src={require("../../assets/" + image)} alt="catalog item" />
                )
              })
            }
        
            return (
              <a key={'catalog' + item.id} href={'/catalog/' + item[0].id} target="_blank" rel="noopener noreferrer">
                {this.imgReturn}
              </a>
            )
          })
      }
  


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

      // this.contactsLinkedReturnMapped = this.contactsLinkedReturn.map(contact => {
      //   return (
      //     <div key={`contact` + contact.contact_id} className="favorited-by">
      //       {`${contact.name}` !== "" ? <a href={'/contacts/' + contact.contact_id} target="_blank" rel="noopener noreferrer"> {contact.name} </a> : `${contact.business_name}` !== "" ? <a href={'/contacts/' + contact.contact_id} target="_blank" rel="noopener noreferrer"> {contact.business_name} </a> : <a href={'/contacts/' + contact.contact_id} target="_blank" rel="noopener noreferrer"> {contact.contact_id} </a>}
      //     </div>
      //   )
      // })

      return (
        <div key={`event` + item.event_id}>
          <PageParentHeader pageName="Events" />
          <div className="item-wrap">
            <button type="button" className="back-to-btn" value="backToEvents" onClick={(() => { this.handleBackToEvents(item.event_id) })}><img src={require("../../assets/back.svg")} alt="back icon" width="12px" /><span className="all-events-text">All Events</span></button>
            <button className="edit-btn" type="button" onClick={(() => { this.handleEditClick(item.event_id) })}><img src={require("../../assets/pencil.svg")} width="30px" alt="edit icon" /></button>
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
                <span className="event-labels">Event Dates:</span> {item.event_dates}
              </li>
              <div className="border"></div>
              <li>
                <span className="event-labels">Application Due Dates:</span> {item.application_due_date}
              </li>
              <li>
                <p className="event-labels">Submission Requirements:</p> {item.submission_requirements}
              </li>
              <li>
                <span className="event-labels">Affiliated Contacts:</span> {this.contactsLinkedReturnMapped}
              </li>
              <li>
                <p className="event-labels">Notes:</p> {item.notes}
              </li>
              <li>
                <div className="border"></div>
                <p className="event-labels">Catalog Items (items to show or sell at event):</p> {this.catalogReturn}
              </li>
            </ul>
            <div className="button-wrap">
              <button className="delete-btn" onClick={() => { this.handleDeleteClick(item.event_id) }}>Delete</button>
            </div>
          </div>
        </div>
      );
    })
    return (
      <div>
        {this.eventObjectRender}
      </div>
    )


  }
}
export default ViewEvent