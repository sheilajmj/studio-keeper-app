import React, { Component } from 'react';
import { contactItems } from '../../data-store-contacts'
import Context from '../../Context'


class EditContact extends Component {
  static contextType = Context;

  selectedContactId = this.props.match.params.contact_id

  selectedContactItem = contactItems.filter(item => item.contact_id === this.selectedContactId)

  selectedContactItemForm = this.selectedContactItem.map((item) => {
    return (
      <div key={item.contact_id} className="item-wrap contact-edit">
        <form>
          <div className="form-space">
            <label htmlFor="contact_type">Contact Type:</label>
            <select name="contact_type">
              <option value="individual">Individual</option>
              <option value="business">Business</option>
              <option value="event">Event</option>
            </select>
          </div>
          <div className="form-space">
            <label htmlFor="name" className="contact-edit">Name:</label>
            <input type="text" name="name" id="name" defaultValue={item.name} />
          </div>
          <div className="form-space">
            <label htmlFor="business" className="contact-edit">Business:</label>
            <input type="text" name="business" id="business" defaultValue={item.business_name} />
          </div>
          <div className="form-space">
            <label htmlFor="event" className="contact-edit">Event Name:</label>
            <input type="text" name="event" id="event" defaultValue={item.event_name} />
          </div>
          <div className="form-space">
            <label htmlFor="email" className="contact-edit">Email:</label>
            <input type="text" name="email" id="email" defaultValue={item.email} />
          </div>
          <div className="form-space">
            <label htmlFor="phone" className="contact-edit">Phone:</label>
            <input type="text" name="phone" id="phone" defaultValue={item.phone} />
          </div>
          <div className="form-space">
            <label htmlFor="address_street" className="contact-edit">Address: (line 1)</label>
            <input type="text" name="address_street" id="address_street" defaultValue={item.address_street} />
          </div>
          <div className="form-space">
            <label htmlFor="address_line2" className="contact-edit">Address: (line 2)</label>
            <input type="text" name="address_line2" id="address_line2" defaultValue={item.address_line2} />
          </div>
          <div className="form-space">
            <label htmlFor="address_city" className="contact-edit">City:</label>
            <input type="text" name="address_city" id="address_city" defaultValue={item.address_city} />
          </div>
          <div className="form-space">
            <label htmlFor="address_state" className="contact-edit">State:</label>
            <input type="text" name="business" id="address_state" defaultValue={item.business} />
          </div>
          <div className="form-space">
            <label htmlFor="address_zip" className="contact-edit">Zip Code:</label>
            <input type="text" name="address_zip" id="address_zip" defaultValue={item.address_zip} />
          </div>
          <div className="form-space">
            <label htmlFor="address_country" className="contact-edit">Country:</label>
            <input type="text" name="address_country" id="address_country" defaultValue={item.address_country} />
          </div>
          <div className="form-space">
            <label htmlFor="website" className="contact-edit">Website:</label>
            <input type="text" name="website" id="website" defaultValue={item.website} />
          </div>
          <div className="form-space">
            <label htmlFor="favorites" className="contact-edit">Favorites:</label>
            <input type="text" name="favorites" id="favorites" defaultValue={item.favorites} />
          </div>
          <div className="form-space">
            <label htmlFor="notes" className="contact-edit">Notes:</label>
            <input type="text" name="notes" id="notes" defaultValue={item.notes} />
          </div>
          <button type="submit" value="submit">Submit</button>
        </form>
      </div>
    );
  })

  render() {
    return (
      <div>
        {this.selectedContactItemForm}
      </div>
    )
  }



}

export default EditContact;