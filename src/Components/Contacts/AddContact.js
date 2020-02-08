import React, { Component } from 'react';
import Context from '../../Context'


class AddContact extends Component {
  static contextType = Context;

  
  
  render() {
    return(
      <div className="item-wrap contact-add">
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
            <input type="text" name="name" id="name" defaultValue="Name" />
          </div>
          <div className="form-space">
            <label htmlFor="business" className="contact-edit">Business:</label>
            <input type="text" name="business" id="business" defaultValue="Business" />
          </div>
          <div className="form-space">
            <label htmlFor="event" className="contact-edit">Event Name:</label>
            <input type="text" name="event" id="event" defaultValue="Event Name" />
          </div>
          <div className="form-space">
            <label htmlFor="email" className="contact-edit">Email:</label>
            <input type="text" name="email" id="email" defaultValue="jDoe@email.com" />
          </div>
          <div className="form-space">
            <label htmlFor="phone" className="contact-edit">Phone:</label>
            <input type="text" name="phone" id="phone" defaultValue="123-456-7890" />
          </div>
          <div className="form-space">
            <label htmlFor="address_street" className="contact-edit">Address: (line 1)</label>
            <input type="text" name="address_street" id="address_street" defaultValue="1122 Default St." />
          </div>
          <div className="form-space">
            <label htmlFor="address_line2" className="contact-edit">Address: (line 2)</label>
            <input type="text" name="address_line2" id="address_line2" defaultValue="Apartment 2" />
          </div>
          <div className="form-space">
            <label htmlFor="address_city" className="contact-edit">City:</label>
            <input type="text" name="address_city" id="address_city" defaultValue="City" />
          </div>
          <div className="form-space">
            <label htmlFor="address_state" className="contact-edit">State:</label>
            <input type="text" name="address_state" id="business" defaultValue="State" />
          </div>
          <div className="form-space">
            <label htmlFor="address_zip" className="contact-edit">Zip Code:</label>
            <input type="text" name="address_zip" id="address_zip" defaultValue="Zip Code" />
          </div>
          <div className="form-space">
            <label htmlFor="address_country" className="contact-edit">Country:</label>
            <input type="text" name="address_country" id="address_country" defaultValue="Country" />
          </div>
          <div className="form-space">
            <label htmlFor="website" className="contact-edit">Website:</label>
            <input type="text" name="website" id="website" defaultValue="http://website.com" />
          </div>
          <div className="form-space">
            <label htmlFor="favorites" className="contact-edit">Favorites:</label>
            <input type="text" name="favorites" id="favorites" defaultValue="Favorites" />
          </div>
          <div className="form-space">
            <label htmlFor="notes" className="contact-edit">Notes:</label>
            <input type="text" name="notes" id="notes" defaultValue="Notes" />
          </div>
          <button type="submit" value="submit">Submit</button>
        </form>
      </div>
    );
  }
}


export default AddContact;