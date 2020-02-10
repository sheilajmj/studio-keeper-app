import React, { Component } from 'react';
import Context from '../../Context'
import Nav from '../Nav/Nav'


class EditCatalogEntry extends Component {
  static contextType = Context;

  selectedCatalogId = this.props.match.params.catalog_id

  selectedCatalogItem = this.context.catalog_items.filter(item => item.catalog_id === this.selectedCatalogId)

  selectedCatalogItemForm = this.selectedCatalogItem.map((item) => {
    return (
      <div key={item.catalog_id} className="item-wrap catalog-edit">
        <form>
          <div className="form-space">
            <label htmlFor="type" className="catalog-edit">Type:</label>
            <input type="text" name="type" id="type" defaultValue={item.type} />
          </div>
          <div className="form-space">
            <label htmlFor="collection" className="catalog-edit">Collection:</label>
            <input type="text" name="collection" id="collection" defaultValue={item.collection} />
          </div>
          <div className="form-space">
            <label htmlFor="size" className="catalog-edit">Size:</label>
            <input type="text" name="size" id="size" defaultValue={item.size} />
          </div>
          <div className="form-space">
            <label htmlFor="medium" className="catalog-edit">Medium:</label>
            <input type="text" name="medium" id="medium" defaultValue={item.medium} />
          </div>
          <div className="form-space">
            <label htmlFor="price" className="catalog-edit">Price:</label>
            <input type="text" name="price" id="price" defaultValue={item.price} />
          </div>
          <div className="form-space">
            <label htmlFor="date_created" className="date_created">Date Created:</label>
            <input type="text" name="date_created" id="date_created" defaultValue={item.date_created} />
          </div>
          <div className="form-space">
            <label htmlFor="concept_statement" className="catalog-edit">Concept Statement:</label>
            <input type="text" name="concept_statement" id="concept_statement" defaultValue={item.concept_statement} />
          </div>
          <div className="form-space">
            <label htmlFor="notes" className="catalog-edit">Notes:</label>
            <input type="text" name="notes" id="notes" defaultValue={item.notes} />
          </div>
          <div className="form-space">
            <label htmlFor="images" className="catalog-edit">Images:</label>
            <input type="text" name="images" id="images" defaultValue={item.images} />
          </div>
          <div className="form-space">
            <label htmlFor="subject" className="catalog-edit">Subject:</label>
            <input type="text" name="subject" id="subject" defaultValue={item.subject} />
          </div>
          <div className="form-space">
            <label htmlFor="quantity" className="catalog-edit">Quantity:</label>
            <input type="text" name="quantity" id="quantity" defaultValue={item.quantity} />
          </div>
          <div className="form-space">
            <label htmlFor="favorited_by" className="catalog-edit">Favorited By:</label>
            <input type="text" name="favorited_by" id="favorited_by" defaultValue={item.favorited_by} />
          </div>
          <div className="form-space">
            <label htmlFor="sold_to" className="catalog-edit">Sold To:</label>
            <input type="text" name="sold_to" id="sold_to" defaultValue={item.sold_to} />
          </div>
          <div className="form-space">
            <label htmlFor="history" className="catalog-edit">History:</label>
            <input type="text" name="history" id="history" defaultValue={item.history} />
          </div>
          <button type="submit" value="submit">Submit</button>
        </form>
      </div>
    );
  })

  render() {
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