import React, { Component } from 'react';
import Context from '../../Context'

class CatalogItem extends Component {
  static contextType = Context;

  handleEditClick(id) {
    this.context.history.push(`/catalog/edit/${id}`)
  }

  catalogItemsList = this.context.catalog_items.map((item, index) => {
    return (
      <div key={item.catalog_id} className="item-wrap">
        <ul className="item">
          <li>
            Type: {item.type}
          </li>
          <li>
            Collection: {item.collection}
          </li>
          <li>
            Size: {item.size}
          </li>
          <li>
            Medium: {item.medium}
          </li>
          <li>
            Price: {item.price}
          </li>
          <li>
            Date Created: {item.date_created}
          </li>
          <li>
            Concept Statement: {item.concept_statement}
          </li>
          <li>
            Notes: {item.notes}
          </li>
          <li>
            Images: {item.images}
          </li>
          <li>
            Subject: {item.subject}
          </li>
          <li>
            Quantity: {item.quantity}
          </li>
          <li>
            Favorited By: {item.favorited_by}
          </li>
          <li>
            Sold To: {item.sold_to}
          </li>
          <li>
            History: {item.history}
          </li>
        </ul>
        <button onClick={(() => { this.handleEditClick(item.catalog_id) })}>Edit</button>
      </div>
    )
  })


render(){

  return (
    <main className='App'>
      {this.catalogItemsList}
    </main>
  );
}
}


export default CatalogItem;