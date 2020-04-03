import React, { Component } from 'react';
import Context from '../../Context';
import PageParentHeader from '../Nav/PageParentHeader'
import ContactApiService from '../../services/contacts-api-service'

class ContactItem extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      contact_items: []
    }
  }


  handleEditClick = (id) => {
    this.context.history.push(`/contacts/edit/${id}`)
  }

  handleItemClick = (id) => {
    this.context.history.push(`/contacts/${id}`)
  }

  handleViewContact = (id) => {
    this.context.history.push(`/contacts/${id}`)
  }

  setContactItems = (items) => {
    this.setState({ contact_items: items })
  }

  componentDidMount = () => {
    ContactApiService.getContacts()
      .then(this.setContactItems)
      .catch(this.context.setError)
  }




  render() {
    if (this.state.contact_items === []) {
      this.setContactItems(this.context.contacts)
    }

    if (this.state.catalog_items !== []) {
      this.contactItemsList = this.context.contacts.map((item, index) => {

        this.contactNameIncluded = () => {
          if (item.name) {
            return (<li className="contact-name">
              <span className="contact-labels">Name:</span><span className="contact-content">{item.name}</span>
            </li>)
          }
        }

        this.contactTitleIncluded = () => {
          if (item.title) {
            return (<li>
              <span className="contact-labels">Title:</span> {item.title}
            </li>)
          }
        }

        this.contactBusinessIncluded = () => {
          if (item.business_name) {
            return (<li>
              <span className="contact-labels">Business:</span> {item.business_name}
            </li>)
          }
        }

        this.contactEmailIncluded = () => {
          if (item.email) {
            return (<li>
              <span className="contact-labels">Email:</span> <a href={"mailto:" + item.email} target="_blank" rel="noopener noreferrer"> {item.email} </a>
            </li>)
          }
        }

        this.contactPhoneIncluded = () => {
          if (item.phone) {
            return (<li>
              <span className="contact-labels">Phone:</span>
              <a href={"tel:" + item.phone} target="_blank" rel="noopener noreferrer">{item.phone}</a>
            </li>)
          }
        }

        this.contactWebIncluded = () => {
          if (item.website) {
            return (<li>
              <span className="contact-labels">Web:</span>
              <a href={item.website} target="_blank" rel="noopener noreferrer">{item.website}</a>
            </li>)
          }
        }


        return (
          <div key={"contact" + item.id} className="item-wrap set-ht-1">
            <button className="edit-btn" onClick={(() => { this.handleEditClick(item.id) })}><img src={require("../../assets/pencil.svg")} width="30px" alt="edit icon" /></button>
            <ul className="item" onClick={(() => { this.handleItemClick(item.id) })}>
              {this.contactNameIncluded()}
              {this.contactTitleIncluded()}
              {this.contactBusinessIncluded()}
              {this.contactEmailIncluded()}
              {this.contactPhoneIncluded()}
              {this.contactWebIncluded()}
            </ul>
          </div>
        );
      });
    }

    return (
      <section className='contacts'>
        <div>
          <PageParentHeader pageName={"Contacts"} />
          <div className="flex-container">
            {this.contactItemsList}
          </div>
        </div>
      </section>
    );
  }
};


export default ContactItem