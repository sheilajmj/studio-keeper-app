import React, { Component } from 'react';
import Context from '../../Context'
import Nav from '../Nav/Nav'


class EditCatalogEntry extends Component {
  static contextType = Context;

  constructor(props){
    super(props)
    this.state={
      updateBoolean: false,
      updatedCatalogEntry: []
    }
  }

  render() {

    this.selectedCatalogId = this.props.match.params.catalog_id;
    this.selectedCatalogObject = this.context.catalog_items.find(catalog_item => catalog_item.catalog_id === this.selectedCatalogId);
    this.selectedCatalogArray = [this.selectedCatalogObject];

    this.handleSubmit = (e) => {
      e.preventDefault()
      this.context.updateAppStateCatalogUpdate( this.state.updatedCatalogEntry)
      this.context.history.push(`/catalog`)
    }
  
     this.setInitialDefaultState = () => {
       if (this.state.updateBoolean === false){
         this.setState({updatedCatalogEntry: this.selectedCatalogObject})
       }
     }

     this.handleChange = (e) => {
      const key = (e.target.name)
      const value = (e.target.value)
      this.setInitialDefaultState()
      this.setState(previousState => ({ updatedCatalogEntry: { ...previousState.updatedCatalogEntry, [key]: value }, updateBoolean: true }))
      }


    this.selectedCatalogItemForm = this.selectedCatalogArray.map((item) => {
      return (
        <div key={item.catalog_id} className="item-wrap catalog-edit">
          <form onSubmit={this.handleSubmit}>
            <div className="form-space">
              <label htmlFor="type" className="catalog-edit">Type:</label>
              <input type="text" name="type" id="type" onChange={this.handleChange} defaultValue={item.type} />
            </div>
            <div className="form-space">
              <label htmlFor="collection" className="catalog-edit">Collection:</label>
              <input type="text" name="collection" id="collection" onChange={this.handleChange} defaultValue={item.collection} />
            </div>
            <div className="form-space">
              <label htmlFor="size" className="catalog-edit">Size:</label>
              <input type="text" name="size" id="size" onChange={this.handleChange} defaultValue={item.size} />
            </div>
            <div className="form-space">
              <label htmlFor="medium" className="catalog-edit">Medium:</label>
              <input type="text" name="medium" id="medium" onChange={this.handleChange} defaultValue={item.medium} />
            </div>
            <div className="form-space">
              <label htmlFor="price" className="catalog-edit">Price:</label>
              <input type="text" name="price" id="price"  onChange={this.handleChange} defaultValue={item.price} />
            </div>
            <div className="form-space">
              <label htmlFor="date_created" className="date_created">Date Created:</label>
              <input type="text" name="date_created" id="date_created" onChange={this.handleChange} defaultValue={item.date_created} />
            </div>
            <div className="form-space">
              <label htmlFor="concept_statement" className="catalog-edit">Concept Statement:</label>
              <input type="text" name="concept_statement" id="concept_statement"  onChange={this.handleChange} defaultValue={item.concept_statement} />
            </div>
            <div className="form-space">
              <label htmlFor="notes" className="catalog-edit">Notes:</label>
              <input type="text" name="notes" id="notes" onChange={this.handleChange} defaultValue={item.notes} />
            </div>
            <div className="form-space">
              <label htmlFor="images" className="catalog-edit">Images:</label>
              <input type="text" name="images" id="images"  onChange={this.handleChange} defaultValue={item.images} />
            </div>
            <div className="form-space">
              <label htmlFor="subject" className="catalog-edit">Subject:</label>
              <input type="text" name="subject" id="subject"  onChange={this.handleChange} defaultValue={item.subject} />
            </div>
            <div className="form-space">
              <label htmlFor="quantity" className="catalog-edit">Quantity:</label>
              <input type="text" name="quantity" id="quantity"  onChange={this.handleChange} defaultValue={item.quantity} />
            </div>
            <div className="form-space">
              <label htmlFor="favorited_by" className="catalog-edit">Favorited By:</label>
              <input type="text" name="favorited_by" id="favorited_by"  onChange={this.handleChange} defaultValue={item.favorited_by} />
            </div>
            <div className="form-space">
              <label htmlFor="sold_to" className="catalog-edit">Sold To:</label>
              <input type="text" name="sold_to" id="sold_to"  onChange={this.handleChange} defaultValue={item.sold_to} />
            </div>
            <div className="form-space">
              <label htmlFor="history" className="catalog-edit">History:</label>
              <input type="text" name="history" id="history"  onChange={this.handleChange} defaultValue={item.history} />
            </div>
            <button type="submit" value="submit">Submit</button>
          </form>
        </div>
      );
    })
  

    return (
      <div>
        <Nav />
        <h2>Edit Catalog</h2>
        {this.selectedCatalogItemForm}
      </div>
    )
  }
}

export default EditCatalogEntry;