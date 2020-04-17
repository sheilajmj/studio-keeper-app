import React, { Component } from 'react';
import Context from '../../Context'
import PageParentHeader from '../Nav/PageParentHeader';
import CatalogApiService from '../../services/catalog-api-service';
import CatalogImagesApiService from '../../services/images-api-service'


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
    }
  }

  handleChange = (e) => {
    const key = (e.target.name)
    const value = (e.target.value)
    const { newCatalogEntry } = this.state;
    newCatalogEntry[key] = value;
    this.setState({ newCatalogEntry })
  }

  handleImageChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] })
    this.setState({ selectedFileName: event.target.files[0].name })
  }

  handleUploadImage = () => {
    if (this.state.selectedFile) {
      const fd = new FormData();
      fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
      fd.append('user_id', 1)
      fd.append('image_name', this.state.selectedFile.name)
      fd.append('catalog_id', this.state.newCatalogId)
      return CatalogImagesApiService.postCatalogImages(this.state.selectedFile, this.state.newCatalogId)
    }
  }

  setCatalogId = (res) => {
    this.setState({ newCatalogId: res.id })

  }

  createNewCatalogEntry = () => {
    if (this.state.newCatalogEntry) {
      const newCatalogEntry = this.state.newCatalogEntry
      this.context.updateAppStateCatalogCreate(newCatalogEntry)
      CatalogApiService.postCatalogItem(newCatalogEntry)
        .then((res) => {
          this.setCatalogId(res)
            if (this.state.selectedFile){
          return this.handleUploadImage().then(() => res)
            }
            else{
              return res
            }
        })
        .then(res => {window.location.href = `/catalog/${res.id}`
        })
    }
  }


  handleSubmit = (e) => {
    e.preventDefault()
    this.createNewCatalogEntry(e)
  }


  render() {

    return (
      <>
        <PageParentHeader pageName="Catalog" />
        <div className="item-edit-wrap catalog-edit">
          <form onSubmit={this.handleSubmit} encType="multipart/form-data" >
            <h3 className="add-item-header">Add Catalog Entry</h3>
            <div className="form-space">
              <label htmlFor="name" className="catalog-add">Name:</label>
              <input type="text" name="name" id="name" onChange={this.handleChange} placeholder='Piece Name' required/>
            </div>
            <div className="form-space">
              <label htmlFor="collection" className="catalog-add">Collection:</label>
              <input type="text" name="collection" id="collection" onChange={this.handleChange} placeholder='Collection Name' />
            </div>
            <div className="border"></div>
            <div className="form-space">
              <label htmlFor="type" className="catalog-add">Type:</label>
              <input type="text" name="type" id="type" onChange={this.handleChange} placeholder='ie. Drawing, Painting' required/>
            </div>
            <div className="form-space">
              <label htmlFor="medium" className="catalog-add">Medium:</label>
              <input type="text" name="medium" id="medium" onChange={this.handleChange} placeholder='Medium' />
            </div>
            <div className="form-space">
              <label htmlFor="size" className="catalog-add">Size:</label>
              <input type="text" name="size" id="size" onChange={this.handleChange} placeholder='Size or Dimensions' />
            </div>
            <div className="form-space">
              <label htmlFor="subject" className="catalog-add">Subject:</label>
              <input type="text" name="subject" id="subject" onChange={this.handleChange} placeholder='Subject' />
            </div>
            <div className="form-space">
              <label htmlFor="concept_statement" className="catalog-add">Concept Statement:</label>
              <br /><textarea type="text" className="catalog-textarea" name="concept_statement" id="concept_statement" onChange={this.handleChange} placeholder='Concept Statement' />
            </div>
            <div className="border"></div>
            <div className="form-space">
              <label htmlFor="price" className="catalog-add">Price:</label>
              <input type="text" name="price" id="price" onChange={this.handleChange} placeholder='5.00' />
            </div>
            <div className="form-space">
              <label htmlFor="quantity" className="catalog-add">Quantity:</label>
              <input type="text" name="quantity" id="quantity" onChange={this.handleChange} placeholder='ie. 5' />
            </div>
            <div className="form-space">
              <label htmlFor="location" className="catalog-add">Location:</label>
              <input type="text" name="location" id="location" onChange={this.handleChange} placeholder='Location stored or displayed' />
            </div>
            <div className="border"></div>
            <div className="form-space">
              <label htmlFor="date_created" className="catalog-add">Date Created:</label>
              <input type="text" name="date_created" id="date_created" onChange={this.handleChange} placeholder='01/01/2020' />
            </div>
            <div className="form-space">
              <label htmlFor="history" className="catalog-add">History:</label>
              <br /><textarea type="text" className="catalog-textarea" name="history" id="history" onChange={this.handleChange} placeholder='1/2/2020 Shown at Winter Festival' />
            </div>
            <div className="form-space">
              <label htmlFor="sold_date" className="catalog-add">Sold Date:</label>
              <input type="text" name="sold_date" id="sold_date" onChange={this.handleChange} placeholder='01/25/2020' />
            </div>
            <div className="form-space">
              <label htmlFor="sold_to" className="catalog-add">Sold To:</label>
              <input type="text" name="sold_to" id="sold_to" onChange={this.handleChange} placeholder='Jane Doe' />
            </div>
            <div className="form-space">
              <label htmlFor="notes" className="catalog-add">Notes:</label>
              <br /><textarea type="text" className="catalog-textarea" name="notes" id="notes" onChange={this.handleChange} placeholder='Notes' />
            </div>
            <div className="border"></div>
            <div className="form-space add-img-form">
              <label htmlFor="images" className="catalog-add">Images:</label>
              <input type="file" name="images" id="images" onChange={this.handleImageChange} />
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