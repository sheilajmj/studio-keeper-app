import React, { Component } from 'react';
import Context from '../../Context'
import PageParentHeader from '../Nav/PageParentHeader';
import CatalogApiService from '../../services/catalog-api-service';
const { uuid } = require('uuidv4');

class AddCatalogEntry extends Component {
  static contextType = Context;

  constructor(props) {
    super(props)
    this.state = {
      newCatalogEntry: {
        type: "ie. Drawing, Painting",
        collection: "Collection Name",
        name: "Piece Name",
        size: "Size",
        medium: "Medium",
        price: "5.00",
        date_created: "01/01/2020",
        concept_statement: "Concept Statement",
        notes: "Notes",
        // images: null,
        subject: "Subject",
        quantity: "5",
        location: "upstairs",
        // favorited_by: "Jane Doe, John Doe",
        sold_date: "01/25/2020",
        sold_to: "Jane Doe",
        // events: "002, 003",
        history: "01/1/1900 Shown at Winter Festival",
      },
      image: ""
  }
}

  handleChange = (e) => {
    const key = (e.target.name)
    const value = (e.target.value)
    this.setState(previousState => ({ newCatalogEntry: { ...previousState.newCatalogEntry, [key]: value } }))
  }

  handleFileSelection  = (e) => {
    const image = e.target.name
    const value = e.target.files[0].name
    this.setState(previousState => ({ image: {...previousState.image, [image]: value } }))
    console.log("file name", e.target.files[0].name)

  }
 
  sendImage = () => {
    CatalogApiService.postCatalogImages(this.state.image)
  }

  render() {
    this.createNewCatalogEntry = () => {
      const newCatalogEntry = this.state.newCatalogEntry
      this.context.updateAppStateCatalogCreate(newCatalogEntry)
      CatalogApiService.postCatalogItem(newCatalogEntry)
      .then((res) => {window.location.href=`/catalog/${res.id}`})
    }

    this.handleSubmit = (e) => {
      e.preventDefault()
      this.createNewCatalogEntry(e)
      this.sendImage()
    }

    this.favoritedBySelectionBoxes = this.context.contacts.map(contact => {
        return (
          <div key={uuid()}>
            <input type="checkbox" id={"contact-"+contact.contact_id} name={contact.name} />
            <label htmlFor={contact.name}> {`${contact.name}` !== "" ? <a href={'/contacts/'+ contact.contact_id} target="_blank" rel="noopener noreferrer"> {contact.name} </a> : `${contact.business_name}` !== "" ? <a href={'/contacts/'+ contact.contact_id} target="_blank" rel="noopener noreferrer"> {contact.business_name} </a> : <a href={'/contacts/'+ contact.contact_id} target="_blank" rel="noopener noreferrer"> {contact.contact_id} </a>} </label>
          </div>
        )
      })

    this.eventsBySelectionBoxes = this.context.events.map(event => {
      return(
        <div key={uuid()}>
          <input type="checkbox" id={"event-"+event.event_id} name={event.name} />
          <label htmlFor={event.name}>{<a href={'/events/'+ event.event_id} >{event.name}</a>} </label>
        </div>
      )
    })  
    return (
      <>
      <PageParentHeader pageName="Catalog" />
        <div className="item-edit-wrap catalog-edit">
          <form onSubmit={this.handleSubmit}>
          <h3 className="add-item-header">Add Catalog Entry</h3>
          <div className="form-space">
              <label htmlFor="name" className="catalog-add">Name:</label>
              <input type="text" name="name" id="name" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.name} />
            </div>
            <div className="form-space">
              <label htmlFor="collection" className="catalog-add">Collection:</label>
              <input type="text" name="collection" id="collection" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.collection} />
            </div>
            <div className="border"></div>
            <div className="form-space">
              <label htmlFor="type" className="catalog-add">Type:</label>
              <input type="text" name="type" id="type" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.type} />
            </div>
            <div className="form-space">
              <label htmlFor="medium" className="catalog-add">Medium:</label>
              <input type="text" name="medium" id="medium" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.medium} />
            </div>
            <div className="form-space">
              <label htmlFor="size" className="catalog-add">Size:</label>
              <input type="text" name="size" id="size" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.size} />
            </div>
            <div className="form-space">
              <label htmlFor="subject" className="catalog-add">Subject:</label>
              <input type="text" name="subject" id="subject" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.subject} />
            </div>
            <div className="form-space">
              <label htmlFor="concept_statement" className="catalog-add">Concept Statement:</label>
              <br /><textarea type="text" className="catalog-textarea" name="concept_statement" id="concept_statement" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.concept_statement} />
            </div>
            <div className="border"></div>
            <div className="form-space">
              <label htmlFor="price" className="catalog-add">Price:</label>
              <input type="text" name="price" id="price" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.price} />
            </div>
            <div className="form-space">
              <label htmlFor="quantity" className="catalog-add">Quantity:</label>
              <input type="text" name="quantity" id="quantity" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.quantity} />
            </div>
            <div className="form-space">
              <label htmlFor="location" className="catalog-add">Location:</label>
              <input type="text" name="location" id="location" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.location} />
            </div>
            <div className="form-space">
              <p htmlFor="favorited_by" className="catalog-add">Favorited By:</p>
              {this.favoritedBySelectionBoxes}
            </div>
            <div className="border"></div>
            <div className="form-space">
              <label htmlFor="date_created" className="catalog-add">Date Created:</label>
              <input type="text" name="date_created" id="date_created" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.date_created} />
            </div>
            <div className="form-space">
              <label htmlFor="history" className="catalog-add">History:</label>
              <br /><textarea type="text" className="catalog-textarea" name="history" id="history" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.history} />
            </div>
            <div className="form-space">
              <label htmlFor="events" className="catalog-add">Events:</label>
              {this.eventsBySelectionBoxes}            
              </div>
              <div className="form-space">
              <label htmlFor="sold_date" className="catalog-add">Sold Date:</label>
              <input type="text" name="sold_date" id="sold_date" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.sold_date} />
            </div>
            <div className="form-space">
              <label htmlFor="sold_to" className="catalog-add">Sold To:</label>
              <input type="text" name="sold_to" id="sold_to" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.sold_to} />
            </div>
            <div className="form-space">
              <label htmlFor="notes" className="catalog-add">Notes:</label>
              <br/><textarea type="text" className="catalog-textarea" name="notes" id="notes" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.notes} />
            </div>
            <div className="border"></div>
            <div className="form-space">
            <p>(this upload image feature is currently just a placeholder)</p>
              <label htmlFor="images" className="catalog-add">Images:</label>
              <input type="file" name="images" id="images" onChange={this.handleFileSelection}  />
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

export default AddCatalogEntry;