import React, { Component } from 'react';
import Context from '../../Context'
import Nav from '../Nav/Nav'


class AddCatalogEntry extends Component {
  static contextType = Context;

  constructor(props){
    super(props)
    this.state = {
      newCatalogEntry: {
      type: "ie. Drawing",
      collection: "Collection",
      size: "Size",
      medium: "Medium",
      price: "$5.00",
      date_created: "01/01/2020",
      concept_statement: "Concept Statement",
      notes:  "Notes",
      images: "Images",
      subject: "Subject",
      quantity: "Quantity",
      favorited_by: "Jane Doe, John Doe",
      sold_to: "Jane Doe",
      history: "01/1/1900 Shown at Winter Festival",
      }
    }
  }

  handleChange = (e) => {
  const key = (e.target.name)
  const value = (e.target.value)
  this.setState(previousState => ({newCatalogEntry: {...previousState.newCatalogEntry, [key]: value}}))
  }

  createNewCatalogEntry = () => {
    const newCatalogEntry = this.state.newCatalogEntry
    this.context.updateAppStateCatalog(newCatalogEntry)
  }


  handleSubmit = (e) => {
    e.preventDefault()
    this.createNewCatalogEntry(e)
  }
  


  render() {
    return (
        <>
        <Nav />
        <div className="item-wrap catalog-add">
          <h2>Add Catalog Entry</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-space">
              <label htmlFor="type" className="catalog-add">Type:</label>
              <input type="text" name="type" id="type" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.type} />
            </div>
            <div className="form-space">
              <label htmlFor="collection" className="catalog-add">Collection:</label>
              <input type="text" name="collection" id="collection" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.collection} />
            </div>
            <div className="form-space">
              <label htmlFor="size" className="catalog-add">Size:</label>
              <input type="text" name="size" id="size" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.size} />
            </div>
            <div className="form-space">
              <label htmlFor="medium" className="catalog-add">Medium:</label>
              <input type="text" name="medium" id="medium" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.medium} />
            </div>
            <div className="form-space">
              <label htmlFor="price" className="catalog-add">Price:</label>
              <input type="text" name="price" id="price" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.price} />
            </div>
            <div className="form-space">
              <label htmlFor="date_created" className="catalog-add">Date Created:</label>
              <input type="text" name="date_created" id="date_created" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.date_created} />
            </div>
            <div className="form-space">
              <label htmlFor="concept_statement" className="catalog-add">Concept Statement:</label>
              <input type="text" name="concept_statement" id="concept_statement" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.concept_statement} />
            </div>
            <div className="form-space">
              <label htmlFor="notes" className="catalog-add">Notes:</label>
              <input type="text" name="notes" id="notes" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.notes} />
            </div>
            <div className="form-space">
              <label htmlFor="images" className="catalog-add">Images:</label>
              <input type="text" name="images" id="images" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.images} />
            </div>
            <div className="form-space">
              <label htmlFor="subject" className="catalog-add">Subject:</label>
              <input type="text" name="subject" id="subject" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.subject} />
            </div>
            <div className="form-space">
              <label htmlFor="quantity" className="catalog-add">Quantity:</label>
              <input type="text" name="quantity" id="quantity" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.quantity} />
            </div>
            <div className="form-space">
              <label htmlFor="favorited_by" className="catalog-add">Favorited By:</label>
              <input type="text" name="favorited_by" id="favorited_by" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.favorited_by} />
            </div>
            <div className="form-space">
              <label htmlFor="sold_to" className="catalog-add">Sold To:</label>
              <input type="text" name="sold_to" id="sold_to" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.sold_to} />
            </div>
            <div className="form-space">
              <label htmlFor="history" className="catalog-add">History:</label>
              <input type="text" name="history" id="history" onChange={this.handleChange} defaultValue={this.state.newCatalogEntry.history} />
            </div>
            <button type="submit" value="submit">Submit</button>
          </form>
        </div>
        </>
        );
    }
  }
  
export default AddCatalogEntry;