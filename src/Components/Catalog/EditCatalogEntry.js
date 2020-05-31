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
      entryToEdit: {},
      errors: {}
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

  //Form validation - triggered after submitting
  handleValidation() {
    let fields = this.state.updatedCatalogEntry;
    let errors = {};
    let formIsValid = true;

    this.startTimeout = () =>{
      setTimeout(() => {this.setState({ errors:{} })}, 5000);
      }

    //name
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
      this.startTimeout();
    }

    if (typeof fields["name"] !== "undefined" && fields["name"] !== null) {
      if (!fields["name"].match(/^[a-zA-Z ]+$/)) {
        formIsValid = false;
        errors["name"] = "Please use letters only.";
        this.startTimeout();
      }
    }

    //collection
    if (typeof fields["collection"] !== "undefined" && fields["collection"] !== null) {
      if (!fields["collection"].match(/^[a-zA-Z ]+$/)) {
        formIsValid = false;
        errors["collection"] = "Please use letters only.";
        this.startTimeout();
      }
    }

    //type
    if (!fields["type"]) {
      formIsValid = false;
      errors["type"] = "Cannot be empty - please use letters only";
      this.startTimeout();
    }
    if (typeof fields["type"] !== "undefined" && fields["type"] !== null) {
      if (!fields["type"].match(/^[a-zA-Z ]+$/)) {
        formIsValid = false;
        errors["type"] = "Please use letters only.";
        this.startTimeout();
      }
    }

    //medium
    if (typeof fields["medium"] !== "undefined" && fields["medium"] !== null) {
      if (!fields["medium"].match(/^[a-zA-Z ]+$/)) {
        formIsValid = false;
        errors["medium"] = "Please use letters only.";
        this.startTimeout();
      }
    }

    //size
    if (typeof fields["size"] !== "undefined" && fields["size"] !== null) {
      if (!fields["size"].match(/[a-zA-Z0-9#.()/%&\s-?! ]{0,19}/)) {
        formIsValid = false;
        errors["size"] = "Please do not use special characters.";
        this.startTimeout();
      }
    }

    //subject
    if (typeof fields["subject"] !== "undefined" && fields["subject"] !== null) {
      if (!fields["subject"].match(/^[a-zA-Z0-9 ]*$/)) {
        formIsValid = false;
        errors["subject"] = "Please use letters and numbers only.";
        this.startTimeout();
      }
    }

    //concept_statement
    if (typeof fields["concept_statement"] !== "undefined" && fields["concept_statement"] !== null) {
      if (!fields["concept_statement"].match(/[a-zA-Z0-9#.()/%&\s-?! ]{0,19}/)) {
        formIsValid = false;
        errors["concept_statement"] = "Please do not use special characters.";
        this.startTimeout();
      }
    }

    //price
    if (typeof fields["price"] !== "undefined" && fields["price"] !== null) {
      if (!fields["price"].match(/\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?/)) {
        formIsValid = false;
        errors["price"] = "Please use numbers";
        this.startTimeout();
      }
    }

     //location
    if (typeof fields["location"] !== "undefined" && fields["location"] !== null) {
      if (!fields["location"].match(/^[a-zA-Z0-9 ]*$/)) {
        formIsValid = false;
        errors["location"] = "Please use letters and numbers only.";
        this.startTimeout();
      }
    }

    //date_created
    if (typeof fields["date_created"] !== "undefined" && fields["date_created"] !== null) {
      if (!fields["date_created"].match(/^[0-3]?[0-9]\/[0-3]?[0-9]\/(?:[0-9]{2})?[0-9]{2}$/)) {
        formIsValid = false;
        errors["date_created"] = "Please enter MM/DD/YYYY format.";
        this.startTimeout();
      }
    }

    //history
    if (typeof fields["history"] !== "undefined" && fields["history"] !== null) {
      if (!fields["history"].match(/[a-zA-Z0-9#.()/%&\s-?! ]{0,19}/)) {
        formIsValid = false;
        errors["history"] = "Please do not use special characters.";
        this.startTimeout();
      }
    }

    //sold_date
    if (typeof fields["sold_date"] !== "undefined" && fields["sold_date"] !== null) {
      if (!fields["sold_date"].match(/^[0-3]?[0-9]\/[0-3]?[0-9]\/(?:[0-9]{2})?[0-9]{2}$/)) {
        formIsValid = false;
        errors["sold_date"] = "Please enter MM/DD/YYYY format.";
        this.startTimeout();
      }
    }

    //sold_to
    if (typeof fields["sold_to"] !== "undefined" && fields["sold_to"] !== null) {
      if (!fields["sold_to"].match(/^[a-zA-Z0-9 ]*$/)) {
        formIsValid = false;
        errors["sold_to"] = "Please use letters and numbers only.";
        this.startTimeout();
      }
    }

    //notes
    if (typeof fields["notes"] !== "undefined" && fields["notes"] !== null) {
      if (!fields["notes"].match(/[a-zA-Z0-9#.()/%&\s-?! ]{0,19}/)) {
        formIsValid = false;
        errors["notes"] = "Please do not use special characters.";
        this.startTimeout();
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.handleValidation()) {
      this.context.updateAppStateCatalogUpdate(this.state.updatedCatalogEntry)
      CatalogApiService.updateCatalogItem(this.props.match.params, this.state.updatedCatalogEntry)
        .then(res => { window.location.href = `/catalog` })
    }
    else {
      console.log(this.state.errors)
    }
  }

  handleChange = (e) => {
    const key = (e.target.name)
    const value = (e.target.value)
    this.setState(previousState => ({ updatedCatalogEntry: { ...previousState.updatedCatalogEntry, [key]: value }, updateBoolean: true }))
  }

  handleDateCreatedChange = (date) => {
    const key = "date_created"
    const value = date
    this.setState(previousState => ({ updatedCatalogEntry: { ...previousState.updatedCatalogEntry, [key]: value }, updateBoolean: true }))
  }

  handleCancel = (e) => {
    window.location.href = '/catalog'
  }

  handleDeleteCatalogItem = (id) => {
    let indexToDelete = this.context.catalog_items.findIndex(item => item.catalog_id === id)
    let catalogList = JSON.parse(JSON.stringify(this.context.catalog_items))
    catalogList.splice(indexToDelete, 1)
    let newCatalogList = catalogList
    this.context.updateAppStateCatalogDelete(newCatalogList)
    CatalogApiService.deleteCatalogItem(id)
      .then(res => { window.location.href = `/catalog` })
  }

  //maps the fields and sets the JSX for the edit form
  catalogItemFormReturn = () => {
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
                <label htmlFor="name" className="catalog-edit">Name:</label>
                <input type="text" name="name" id="name" onChange={this.handleChange} defaultValue={item.name} required />
              </div>
              <div className="errorMsg">{this.state.errors.name}</div>
              <div className="form-space">
                <label htmlFor="collection" className="catalog-edit">Collection:</label>
                <input type="text" name="collection" id="collection" onChange={this.handleChange} defaultValue={item.collection || ''} />
              </div>
              <div className="errorMsg">{this.state.errors.collection}</div>
              <div className="border"></div>
              <div className="form-space">
                <label htmlFor="type" className="catalog-edit">Type:</label>
                <input type="text" name="type" id="type" onChange={this.handleChange} defaultValue={item.type} required />
              </div>
              <div className="errorMsg">{this.state.errors.type}</div>
              <div className="form-space">
                <label htmlFor="medium" className="catalog-edit">Medium:</label>
                <input type="text" name="medium" id="medium" onChange={this.handleChange} defaultValue={item.medium || ''} />
              </div>
              <div className="errorMsg">{this.state.errors.medium}</div>
              <div className="form-space">
                <label htmlFor="size" className="catalog-edit">Size:</label>
                <input type="text" name="size" id="size" onChange={this.handleChange} defaultValue={item.size || ''} />
              </div>
              <div className="errorMsg">{this.state.errors.size}</div>
              <div className="form-space">
                <label htmlFor="subject" className="catalog-edit">Subject:</label>
                <input type="text" name="subject" id="subject" onChange={this.handleChange} defaultValue={item.subject || ''} />
              </div>
              <div className="errorMsg">{this.state.errors.subject}</div>
              <div className="form-space">
                <div className="form-space">
                  <label htmlFor="concept_statement" className="catalog-edit">Concept Statement:</label>
                  <br /><textarea type="text" className="catalog-textarea" name="concept_statement" id="concept_statement" onChange={this.handleChange} defaultValue={item.concept_statement || ''} />
                </div>
                <div className="errorMsg">{this.state.errors.concept_statement}</div>
                <div className="border"></div>
                <label htmlFor="price" className="catalog-edit">Price:</label>
                <input type="text" name="price" id="price" onChange={this.handleChange} defaultValue={item.price || ''} />
              </div>
              <div className="errorMsg">{this.state.errors.price}</div>
              <div className="form-space">
                <label htmlFor="quantity" className="catalog-edit">Quantity:</label>
                <input type="text" name="quantity" id="quantity" onChange={this.handleChange} defaultValue={item.quantity || ''} />
              </div>
              <div className="errorMsg">{this.state.errors.quantity}</div>
              <div className="form-space">
                <label htmlFor="location" className="catalog-edit">Location:</label>
                <input type="text" name="location" id="location" onChange={this.handleChange} defaultValue={item.location || ''} />
              </div>
              <div className="errorMsg">{this.state.errors.location}</div>
              <div className="border"></div>
              <div className="form-space">
                <div className="date-creatd">
                  <label htmlFor="date_created" className="catalog-edit">Date Created (mm/dd/yyyy):</label>
                  <input type="text" name="date_created" id="date_created" onChange={this.handleChange} defaultValue={item.date_created || ''} />
                </div>
                <div className="errorMsg">{this.state.errors.date_created}</div>
              </div>
              <div className="form-space">
                <label htmlFor="history" className="catalog-edit">History:</label>
                <br /><textarea type="text" className="catalog-textarea" name="history" id="history" onChange={this.handleChange} defaultValue={item.history || ''} />
              </div>
              <div className="errorMsg">{this.state.errors.history}</div>
              <div className="form-space">
                <label htmlFor="sold_date" className="catalog-edit">Sold Date (mm/dd/yyyy):</label>
                <input type="text" name="sold_date" id="sold_date" onChange={this.handleChange} defaultValue={item.sold_date || ''} />
              </div>
              <div className="errorMsg">{this.state.errors.sold_date}</div>
              <div className="form-space">
                <label htmlFor="sold_to" className="catalog-edit">Sold To:</label>
                <input type="text" name="sold_to" id="sold_to" onChange={this.handleChange} defaultValue={item.sold_to || ''} />
              </div>
              <div className="errorMsg">{this.state.errors.sold_to}</div>
              <div className="form-space">
                <label htmlFor="notes" className="catalog-edit">Notes:</label>
                <br /><textarea type="text" className="catalog-textarea" name="notes" id="notes" onChange={this.handleChange} defaultValue={item.notes || ''} />
              </div>
              <div className="errorMsg">{this.state.errors.notes}</div>
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


  render() {
    return (
      <div>
        <PageParentHeader pageName="Catalog" />
        {this.catalogItemFormReturn()}
      </div>
    );
  }
}

export default EditCatalogEntry;