import React, { Component } from 'react';
import Context from '../../Context'
import PageParentHeader from '../Nav/PageParentHeader';


class EditEvent extends Component {
  static contextType = Context;
  
  constructor(props){
    super(props)
    this.state={
      updateBoolean: false,
      updatedEvent: []
    }
  }

  componentDidMount = () =>{
    this.setInitialDefaultState()   
  }
  
  render() {

    this.selectedEventId = this.props.match.params.event_id
    this.selectedEventObject = this.context.events.find(event => event.event_id === this.selectedEventId)
    this.selectedEventArray = [this.selectedEventObject];
    if (!this.selectedEventArray){
      return <div></div>
    }
    // selectedEventItem = this.context.events.filter(item => item.event_id === this.selectedEventId)
  
    this.handleSubmit = (e) => {
      e.preventDefault()
      this.context.updateAppStateEventsUpdate(this.state.updatedEvent)
      this.context.history.push(`/events`)
    }

    this.setInitialDefaultState = () => {
      if(this.state.updateBoolean === false){
        this.setState({updatedEvent: this.selectedEventObject})
      }
    }

    this.handleChange = (e) => {
      const key = (e.target.name)
      const value = (e.target.value)
      this.setInitialDefaultState()
      this.setState(previousState => ({ updatedEvent: { ...previousState.updatedEvent, [key]: value }, updateBoolean: true }))
    }


    this.handleCancel = (e) => {
      this.context.history.push('/events')
    }

    this.handleDeleteEvent = (id) => {
        let indexToDelete = this.context.events.findIndex(event => event.event_id === id)
        let eventsList = JSON.parse(JSON.stringify(this.context.events))
        eventsList.splice(indexToDelete, 1)
        let newEventsList = eventsList
        this.context.updateAppStateEventsDelete(newEventsList)
        this.context.history.push(`/events`)
      }

      // this.handleCatalogItemsClick = (e) => {
      //   let catalog_id = e.target.value
      //   let currentCatalogItemsArray = this.state.updatedEvent.catalog_items
      //   let updatedCatalogItemsArray 
  
      //   if (!currentCatalogItemsArray.includes(catalog_id)){
      //     let catalogArrayLength = currentCatalogItemsArray.push(catalog_id)
      //     updatedCatalogItemsArray = currentCatalogItemsArray
      //     console.log(catalogArrayLength)
      //   }
  
      //   else{
      //     updatedCatalogItemsArray = currentCatalogItemsArray.filter((item) => catalog_id !== item)
      //   }
  
      //   this.setState({updatedCatalogItemsArray: updatedCatalogItemsArray})
      //   this.setState(previousState => ({ updatedEvent: { ...previousState.updatedEvent, catalog_items: updatedCatalogItemsArray}, updateBoolean: true }))
  
      // }

      // this.catalogFieldSelectionOptions = this.context.catalog_items.map((item) => {
      //   this.checkedValue = () => {
      //     if (this.selectedEventArray[0].catalog_items.includes(item.catalog_id)){
      //     return true
      //     }
      //   }
    
      //   this.catalogImgReturn = () => {
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
      //       <div key={'catalog-items' + item.catalog_id}  className="checkbox">
      //         <input type="checkbox" id={'catalog-items'+ item.catalog_id} name={"catalog-items"} value={item.catalog_id} onChange={this.handleCatalogItemsClick} defaultChecked={this.checkedValue()} />
      //       <label htmlFor={item.catalog_id}>
      //         {<a href={'/catalog/'+ item.catalog_id} target="_blank"  rel="noopener noreferrer">
      //             {this.catalogImgReturn()} 
      //             </a>}   
      //       </label> 
      //       </div>
      //     )
      //     })

    // this.contactFieldSelectionOptions = this.context.contacts.map((contact) => {

    //     this.checkValue = () => {
    //       if(this.selectedEventArray[0].contact.includes(contact.contact_id)){
    //         return true
    //       }
    //     }

    //     return (
    //       <div key={'contact'+ contact.contact_id} className="checkbox">
    //         <input type="checkbox" id={'contact' + contact.contact_id} name={"contacts"} value={contact.contact_id} onChange = {this.handleContactClick} defaultChecked={this.checkValue()} />
    //         <label htmlFor={contact.contact_id}> {<a href={'/contacts/' + contact.contact_id} target="_blank" rel="noopener noreferrer">{contact.name !== "" ? contact.name : contact.business_name }</a>}</label>
    //        </div>
    //     )
    //   })

          





    this.selectedEventForm = this.selectedEventArray.map((item) => {
      if(!item){
        return <div></div>
      }
      return (
        <div key={item.event_id} className="item-edit-wrap event-edit">
          <form onSubmit={this.handleSubmit}>
          <h3 className="add-item-header">Edit Event</h3>
            <div className="form-space">
              <label htmlFor="event_type" className="event-edit">Event Type:</label>
              <input type="text" name="event_type" id="event_type" onChange={this.handleChange} defaultValue={item.event_type} />
            </div>
            <div className="form-space">
              <label htmlFor="name" className="event-edit">Name:</label>
              <input type="text" name="name" id="name" onChange={this.handleChange} defaultValue={item.name} />
            </div>
            <div className="form-space">
              <label htmlFor="location" className="event-edit">Location:</label>
              <input type="location" name="location" id="location" onChange={this.handleChange} defaultValue={item.location} />
            </div>
            <div className="form-space">
              <label htmlFor="event_dates" className="event-edit">Event Dates:</label>
              <input type="text" name="event_dates" id="event_dates" onChange={this.handleChange} defaultValue={item.event_dates} />
            </div>
            <div className="form-space">
              <label htmlFor="application_due_dates" className="event-edit">Application Due Dates:</label>
              <input type="text" className="application-due-date" name="application_due_dates" id="application_due_dates" onChange={this.handleChange} defaultValue={item.application_due_dates} />
            </div>
            <div className="form-space">
              <label htmlFor="contact" className="event-edit">Contact:</label>
              {this.contactFieldSelectionOptions}
              {/* <input type="text" name="contact" id="contact" onChange={this.handleChange} defaultValue={item.contact} /> */}
            </div>
            <div className="form-space">
              <label htmlFor="notes" className="event-edit">Notes:</label>
              <textarea type="text" className="event-textarea" name="notes" id="notes" onChange={this.handleChange} defaultValue={item.notes} />
            </div>
            <div className="form-space">
              <label htmlFor="submission_requirements" className="event-edit">Submission Requirements:</label>
              <br /><textarea type="text"  className="event-textarea" name="submission_requirements" id="submission_requirements" onChange={this.handleChange} defaultValue={item.submission_requirements} />
            </div>
            <div className="form-space">
              <label htmlFor="catalog_items" className="event-edit">Catalog Items:</label>
              {this.catalogFieldSelectionOptions}
              {/* <input type="text" name="catalog_items" id="catalog_items" onChange={this.handleChange} defaultValue={item.catalog_items} /> */}
            </div>
            <div className="button-wrap">
            <button className="submit-btn" type="submit" value="submit">Submit</button>
            <button className="cancel-btn" type="button" value="cancel" onClick={(() => {this.handleCancel(item.event_id)})}>Cancel</button>
          <br /><button className="delete-btn" type="button" value="delete" onClick={(() => {this.handleDeleteEvent(item.event_id)})}>Delete Event</button>
            </div>
          </form>
        </div>
      );
    })
  
      return (
      <div>
        <PageParentHeader pageName="Events" />
        {this.selectedEventForm}
      </div>
    )
  }

}


export default EditEvent;