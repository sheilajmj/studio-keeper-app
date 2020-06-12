import React, { Component } from 'react';
import Context from '../../Context';
import PageParentHeader from '../Nav/PageParentHeader';
import CatalogApiService from '../../services/catalog-api-service';
import CatalogImagesApiService from '../../services/images-api-service';


class AddCatalogEntry extends Component {
  static contextType = Context;

  constructor(props) {
    super(props)
    this.state = {
      newCatalogEntry: {
        type: null,
        collection: null,
        name: null,
        size: null,
        medium: null,
        price: null,
        date_created: null,
        concept_statement: null,
        notes: null,
        subject: null,
        quantity: null,
        location: null,
        sold_date: null,
        sold_to: null,
        history: null,
      },
      selectedFile: null,
      selectedFileName: null,
      errors: {}
    }
  }

  //Form validation - triggered after submitting
  handleValidation = () => {
    let fields = this.state.newCatalogEntry;
    let errors = {};
    let formIsValid = true;

    this.startTimeout = () => {
      setTimeout(() => { this.setState({ errors: {} }) }, 5000);
    }

    //name
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
      this.startTimeout();
    }

    if (typeof fields["name"] !== "undefined" && fields["name"] !== null) {
      if (!fields["name"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["name"] = "Please use letters only.";
        this.startTimeout();
      }
    }

    //collection
    if (typeof fields["collection"] !== "undefined" && fields["collection"] !== null) {
      if (!fields["collection"].match(/^[a-zA-Z]+$/)) {
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
      if (!fields["type"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["type"] = "Please use letters only.";
        this.startTimeout();
      }
    }

    //medium
    if (typeof fields["medium"] !== "undefined" && fields["medium"] !== null) {
      if (!fields["medium"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["medium"] = "Please use letters only.";
        this.startTimeout();
      }
    }

    //size
    if (typeof fields["size"] !== "undefined" && fields["size"] !== null) {
      if (!fields["size"].match(/[a-zA-Z0-9#.()/%&\s-?!]{0,19}/)) {
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
      if (!fields["concept_statement"].match(/[a-zA-Z0-9#.()/%&\s-?!]{0,19}/)) {
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

    //quantity
    if (typeof fields["quantity"] !== "undefined" && fields["quantity"] !== null) {
      if (!fields["quantity"].match(/^[a-zA-Z0-9 ]*$/)) {
        formIsValid = false;
        errors["quantity"] = "Please use letters and numbers only.";
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
      if (!fields["history"].match(/[a-zA-Z0-9#.()/%&\s-?!]{0,19}/)) {
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
      if (!fields["notes"].match(/[a-zA-Z0-9#.()/%&\s-?!]{0,19}/)) {
        formIsValid = false;
        errors["notes"] = "Please do not use special characters.";
        this.startTimeout();
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleChange = (e) => {
    const key = (e.target.name);
    const value = (e.target.value);
    const { newCatalogEntry } = this.state;
    newCatalogEntry[key] = value;
    this.setState({ newCatalogEntry });
  }

  //Gets the image value from the form
  handleImageChange = (event) => {
    if (event.target.files[0]) {
      if (event.target.files[0].type !== "image/jpeg" && event.target.files[0].type !== "image/png") {
        console.log(event.target.files[0].type, "TYPE")
        let errors = this.state.errors
        errors["image"] = "File must be a png or jpg only";
        this.setState({ errors: errors })
      }
      else {
        let errors = this.state.errors
        errors["image"] = "";
        this.setState({ errors: errors })
        this.setState({ selectedFile: event.target.files[0] });
        this.setState({ selectedFileName: event.target.files[0].name });
      }
    }
  }

  //Builds the form data with image file
  handleUploadImage = () => {
    if (this.state.selectedFile) {
      const fd = new FormData();
      fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
      fd.append('user_id', 1);
      fd.append('image_name', this.state.selectedFile.name);
      fd.append('catalog_id', this.state.newCatalogId);
      return CatalogImagesApiService.postCatalogImages(this.state.selectedFile, this.state.newCatalogId);
    }
  }

  setCatalogId = (res) => {
    this.setState({ newCatalogId: res.id });
  }

  //Sends and updates state with the new catalog entry
  createNewCatalogEntry = () => {
    if (this.state.newCatalogEntry) {
      const newCatalogEntry = this.state.newCatalogEntry;
      this.context.updateAppStateCatalogCreate(newCatalogEntry);
      CatalogApiService.postCatalogItem(newCatalogEntry)
        .then((res) => {
          this.setCatalogId(res)
          if (this.state.selectedFile) {
            return this.handleUploadImage().then(() => res);
          }
          else {
            return res;
          }
        })
        .then(res => {
          window.location.href = `/catalog/${res.id}`
        })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.handleValidation()) {
      this.createNewCatalogEntry(e);
    }
    else {
      console.log(this.state.errors);
    }

  }

  render() {
    return (
      <>
        <PageParentHeader pageName="Catalog" />
        <div className="item-edit-wrap catalog-edit">
          <form noValidate onSubmit={this.handleSubmit} encType="multipart/form-data" >
            <h3 className="add-item-header">Add Catalog Entry</h3>
            <div className="form-space">
              <label htmlFor="name" className="catalog-add">Name:</label>
              <input type="text" name="name" id="name" onChange={this.handleChange} placeholder='Piece Name' required />
            </div>
            <div className="errorMsg">{this.state.errors.name}</div>
            <div className="form-space">
              <label htmlFor="collection" className="catalog-add">Collection:</label>
              <input type="text" name="collection" id="collection" onChange={this.handleChange} placeholder='Collection Name' />
            </div>
            <div className="errorMsg">{this.state.errors.collection}</div>
            <div className="border"></div>
            <div className="form-space">
              <label htmlFor="type" className="catalog-add">Type:</label>
              <input type="text" name="type" id="type" onChange={this.handleChange} placeholder='ie. Drawing, Painting' required />
            </div>
            <div className="errorMsg">{this.state.errors.type}</div>
            <div className="form-space">
              <label htmlFor="medium" className="catalog-add">Medium:</label>
              <input type="text" name="medium" id="medium" onChange={this.handleChange} placeholder='Medium' />
            </div>
            <div className="errorMsg">{this.state.errors.medium}</div>
            <div className="form-space">
              <label htmlFor="size" className="catalog-add">Size:</label>
              <input type="text" name="size" id="size" onChange={this.handleChange} placeholder='Size or Dimensions' />
            </div>
            <div className="errorMsg">{this.state.errors.size}</div>
            <div className="form-space">
              <label htmlFor="subject" className="catalog-add">Subject:</label>
              <input type="text" name="subject" id="subject" onChange={this.handleChange} placeholder='Subject' />
            </div>
            <div className="errorMsg">{this.state.errors.subject}</div>
            <div className="form-space">
              <label htmlFor="concept_statement" className="catalog-add">Concept Statement:</label>
              <br /><textarea type="text" className="catalog-textarea" name="concept_statement" id="concept_statement" onChange={this.handleChange} placeholder='Concept Statement' />
            </div>
            <div className="errorMsg">{this.state.errors.concept_statement}</div>
            <div className="border"></div>
            <div className="form-space">
              <label htmlFor="price" className="catalog-add">Price:</label>
              <input type="text" name="price" id="price" onChange={this.handleChange} placeholder='5.00' />
            </div>
            <div className="errorMsg">{this.state.errors.price}</div>
            <div className="form-space">
              <label htmlFor="quantity" className="catalog-add">Quantity:</label>
              <input type="text" name="quantity" id="quantity" onChange={this.handleChange} placeholder='ie. 5' />
            </div>
            <div className="errorMsg">{this.state.errors.quantity}</div>
            <div className="form-space">
              <label htmlFor="location" className="catalog-add">Location:</label>
              <input type="text" name="location" id="location" onChange={this.handleChange} placeholder='Location stored or displayed' />
            </div>
            <div className="errorMsg">{this.state.errors.location}</div>
            <div className="border"></div>
            <div className="form-space">
              <label htmlFor="date_created" className="catalog-add">Date Created:</label>
              <input type="text" name="date_created" id="date_created" onChange={this.handleChange} placeholder='01/01/2020' />
            </div>
            <div className="errorMsg">{this.state.errors.date_created}</div>
            <div className="form-space">
              <label htmlFor="history" className="catalog-add">History:</label>
              <br /><textarea type="text" className="catalog-textarea" name="history" id="history" onChange={this.handleChange} placeholder='1/2/2020 Shown at Winter Festival' />
            </div>
            <div className="errorMsg">{this.state.errors.history}</div>
            <div className="form-space">
              <label htmlFor="sold_date" className="catalog-add">Sold Date:</label>
              <input type="text" name="sold_date" id="sold_date" onChange={this.handleChange} placeholder='01/25/2020' />
            </div>
            <div className="errorMsg">{this.state.errors.sold_date}</div>
            <div className="form-space">
              <label htmlFor="sold_to" className="catalog-add">Sold To:</label>
              <input type="text" name="sold_to" id="sold_to" onChange={this.handleChange} placeholder='Jane Doe' />
            </div>
            <div className="errorMsg">{this.state.errors.sold_to}</div>
            <div className="form-space">
              <label htmlFor="notes" className="catalog-add">Notes:</label>
              <br /><textarea type="text" className="catalog-textarea" name="notes" id="notes" onChange={this.handleChange} placeholder='Notes' />
            </div>
            <div className="errorMsg">{this.state.errors.notes}</div>
            <div className="border"></div>
            <div className="form-space add-img-form">
              <label htmlFor="images" className="catalog-add">Images:</label>
              <input type="file" name="images" id="images" onChange={this.handleImageChange} />
            </div>
            <div className="errorMsg">{this.state.errors.image}</div>
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