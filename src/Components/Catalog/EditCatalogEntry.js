import React, { Component } from 'react';
import Context from '../../Context';
import PageParentHeader from '../Nav/PageParentHeader';
import CatalogApiService from '../../services/catalog-api-service';

class EditCatalogEntry extends Component {
  static contextType = Context;

  constructor(props) {
    super(props)
    this.state = {
      updateBoolean: false,
      updatedCatalogEntry: {},
      entryToEdit: {}
    }
  }

  componentDidMount = () => {
    CatalogApiService.getCatalogItem(this.props.match.params.id)
      .then(this.setSelectedCatalogItem)
      .catch(this.context.setError)
  }

  setSelectedCatalogItem = (catalogItem) => {
    if (this.state.updateBoolean === false) {
      this.setState({ updatedCatalogEntry: catalogItem })
      this.setState({ entryToEdit: catalogItem })
    }
  }

  render() {
    this.handleSubmit = (e) => {
      e.preventDefault()
      this.context.updateAppStateCatalogUpdate(this.state.updatedCatalogEntry)
      CatalogApiService.updateCatalogItem(this.props.match.params, this.state.updatedCatalogEntry)
        .then(res => { window.location.href = `/catalog` })
    }

    this.handleChange = (e) => {
      const key = (e.target.name)
      const value = (e.target.value)
      this.setState(previousState => ({ updatedCatalogEntry: { ...previousState.updatedCatalogEntry, [key]: value }, updateBoolean: true }))
    }

    this.handleDateCreatedChange = (date) => {
      const key = "date_created"
      const value = date
      this.setState(previousState => ({ updatedCatalogEntry: { ...previousState.updatedCatalogEntry, [key]: value }, updateBoolean: true }))
    }

    this.handleCancel = (e) => {
      window.location.href = '/catalog'
    }

    this.handleDeleteCatalogItem = (id) => {
      let indexToDelete = this.context.catalog_items.findIndex(item => item.catalog_id === id)
      let catalogList = JSON.parse(JSON.stringify(this.context.catalog_items))
      catalogList.splice(indexToDelete, 1)
      let newCatalogList = catalogList
      this.context.updateAppStateCatalogDelete(newCatalogList)
      CatalogApiService.deleteCatalogItem(id)
        .then(res => { window.location.href = `/catalog` })
    }

    this.catalogItemFormReturn = () => {
      if (this.state.entryToEdit !== []) {
        this.selectedCatalogItemForm = [this.state.entryToEdit].map((item) => {
          if (!item) {
            return (
              <div></div>
            )
          }

          return (
            <div key={'catalog-item' + item.id} className="item-edit-wrap catalog-edit">
              <form onSubmit={this.handleSubmit}>
                <h3 className="add-item-header">Edit Catalog Entry</h3>
                <div className="form-space">
                  <label htmlFor="type" className="catalog-edit">Type:</label>
                  <input type="text" name="type" id="type" onChange={this.handleChange} value={item.type} required />
                </div>
                <div className="form-space">
                  <label htmlFor="collection" className="catalog-edit">Collection:</label>
                  <input type="text" name="collection" id="collection" onChange={this.handleChange} value={item.collection || ''} />
                </div>
                <div className="form-space">
                  <label htmlFor="name" className="catalog-edit">Name:</label>
                  <input type="text" name="name" id="name" onChange={this.handleChange} value={item.name} required />
                </div>
                <div className="form-space">
                  <label htmlFor="size" className="catalog-edit">Size:</label>
                  <input type="text" name="size" id="size" onChange={this.handleChange} value={item.size || ''} />
                </div>
                <div className="form-space">
                  <label htmlFor="medium" className="catalog-edit">Medium:</label>
                  <input type="text" name="medium" id="medium" onChange={this.handleChange} value={item.medium || ''} />
                </div>
                <div className="form-space">
                  <label htmlFor="price" className="catalog-edit">Price:</label>
                  <input type="text" name="price" id="price" onChange={this.handleChange} value={item.price || ''} />
                </div>
                <div className="form-space">
                  <div className="date-creatd">
                    <label htmlFor="date_created" className="catalog-edit">Date Created (mm/yyyy):</label>
                    <input type="text" name="date_created" id="date_created" onChange={this.handleChange} value={item.date_created || ''} />
                  </div>
                </div>
                <div className="form-space">
                  <label htmlFor="concept_statement" className="catalog-edit">Concept Statement:</label>
                  <br /><textarea type="text" className="catalog-textarea" name="concept_statement" id="concept_statement" onChange={this.handleChange} value={item.concept_statement || ''} />
                </div>
                <div className="form-space">
                  <label htmlFor="notes" className="catalog-edit">Notes:</label>
                  <br /><textarea type="text" className="catalog-textarea" name="notes" id="notes" onChange={this.handleChange} value={item.notes || ''} />
                </div>
                <div className="form-space">
                  <label htmlFor="subject" className="catalog-edit">Subject:</label>
                  <input type="text" name="subject" id="subject" onChange={this.handleChange} value={item.subject || ''} />
                </div>
                <div className="form-space">
                  <label htmlFor="quantity" className="catalog-edit">Quantity:</label>
                  <input type="text" name="quantity" id="quantity" onChange={this.handleChange} value={item.quantity || ''} />
                </div>
                <div className="form-space">
                  <label htmlFor="location" className="catalog-edit">Location:</label>
                  <input type="text" name="location" id="location" onChange={this.handleChange} value={item.location || ''} />
                </div>
                <div className="form-space">
                  <label htmlFor="sold_date" className="catalog-edit">Sold Date:</label>
                  <input type="text" name="sold_date" id="sold_date" onChange={this.handleChange} value={item.sold_date || ''} />
                </div>
                <div className="form-space">
                  <label htmlFor="sold_to" className="catalog-edit">Sold To:</label>
                  <input type="text" name="sold_to" id="sold_to" onChange={this.handleChange} value={item.sold_to || ''} />
                </div>
                <div className="form-space">
                  <label htmlFor="history" className="catalog-edit">History:</label>
                  <br /><textarea type="text" className="catalog-textarea" name="history" id="history" onChange={this.handleChange} value={item.history || ''} />
                </div>
                <div className="button-wrap">
                  <button className="submit-btn" type="submit" value="submit">Submit</button>
                  <button className="cancel-btn" type="button" value="cancel" onClick={(() => { this.handleCancel(item.catalog_id) })}>Cancel</button>
                  <br /><button className="delete-btn" type="button" value="delete" onClick={(() => { this.handleDeleteCatalogItem(item.id) })}>Delete Catalog Item</button>
                </div>
              </form>
            </div>
          );
        })
      }
      return this.selectedCatalogItemForm
    }

    return (
      <div>
        <PageParentHeader pageName="Catalog" />
        {this.catalogItemFormReturn()}
      </div>
    );
  }
}

export default EditCatalogEntry;