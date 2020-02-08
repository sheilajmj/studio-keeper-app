import React, { Component } from 'react';
import Context from '../../Context'


class AddCatalogEntry extends Component {
  static contextType = Context;

  
  render() {
      return (
        <div className="item-wrap catalog-add">
          <form>
            <div className="form-space">
              <label htmlFor="type" className="catalog-add">Type:</label>
              <input type="text" name="type" id="type" defaultValue="Type" />
            </div>
            <div className="form-space">
              <label htmlFor="collection" className="catalog-add">Collection:</label>
              <input type="text" name="collection" id="collection" defaultValue="Collection" />
            </div>
            <div className="form-space">
              <label htmlFor="size" className="catalog-add">Size:</label>
              <input type="text" name="size" id="size" defaultValue="Size" />
            </div>
            <div className="form-space">
              <label htmlFor="medium" className="catalog-add">Medium:</label>
              <input type="text" name="medium" id="medium" defaultValue="Medium" />
            </div>
            <div className="form-space">
              <label htmlFor="price" className="catalog-add">Price:</label>
              <input type="text" name="price" id="price" defaultValue="$5.00" />
            </div>
            <div className="form-space">
              <label htmlFor="date_created" className="catalog-add">Date Created:</label>
              <input type="text" name="date_created" id="date_created" defaultValue="01/01/1900" />
            </div>
            <div className="form-space">
              <label htmlFor="concept_statement" className="catalog-add">Concept Statement:</label>
              <input type="text" name="concept_statement" id="concept_statement" defaultValue="Concept Statement" />
            </div>
            <div className="form-space">
              <label htmlFor="notes" className="catalog-add">Notes:</label>
              <input type="text" name="notes" id="notes" defaultValue="Notes" />
            </div>
            <div className="form-space">
              <label htmlFor="images" className="catalog-add">Images:</label>
              <input type="text" name="images" id="images" defaultValue="Images" />
            </div>
            <div className="form-space">
              <label htmlFor="subject" className="catalog-add">Subject:</label>
              <input type="text" name="subject" id="subject" defaultValue="Subject" />
            </div>
            <div className="form-space">
              <label htmlFor="quantity" className="catalog-add">Quantity:</label>
              <input type="text" name="quantity" id="quantity" defaultValue="Quantity" />
            </div>
            <div className="form-space">
              <label htmlFor="favorited_by" className="catalog-add">Favorited By:</label>
              <input type="text" name="favorited_by" id="favorited_by" defaultValue="Jane Doe, John Doe" />
            </div>
            <div className="form-space">
              <label htmlFor="sold_to" className="catalog-add">Sold To:</label>
              <input type="text" name="sold_to" id="sold_to" defaultValue="Jane Doe" />
            </div>
            <div className="form-space">
              <label htmlFor="history" className="catalog-add">History:</label>
              <input type="text" name="history" id="history" defaultValue="01/1/1900 Shown at Winter Festival " />
            </div>
            <button type="submit" value="submit">Submit</button>
          </form>
        </div>
      );
  }
}

export default AddCatalogEntry;