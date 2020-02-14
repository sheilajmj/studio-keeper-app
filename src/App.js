import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import StudioKeeperContext from './Context'
import CatalogParent from './Components/Catalog/CatalogParent'
import AddCatalogEntry from './Components/Catalog/AddCatalogEntry'
import EditCatalogEntry from './Components/Catalog/EditCatalogEntry'
import ContactsParent from './Components/Contacts/ContactsParent'
import AddContact from './Components/Contacts/AddContact'
import EditContact from './Components/Contacts/EditContact'
import EventParent from './Components/Events/EventParent'
import AddEvent from './Components/Events/AddEvent'
import EditEvent from './Components/Events/EditEvent'
import Home from './Components/Home/Home'
let json_data = require('./db.json');

const catalog_items = json_data.catalog_items
const events = json_data.events
const contacts = json_data.contacts

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catalog_items: catalog_items,
      contacts: contacts,
      events: events,
      selectedContact:[]
    }
  }

   
  updateAppStateContactsCreate = (newContact) => {
    const currentStateContacts = JSON.parse(JSON.stringify(this.state.contacts))
    currentStateContacts.push(newContact)
    this.setState({contacts:currentStateContacts} )

  }

  updateAppStateContactsUpdate = (updatedContact) => {
      let contactId = updatedContact.contact_id
      let contacts = JSON.parse(JSON.stringify(this.state.contacts))
      let index = contacts.findIndex((contacts) => contacts.contact_id === contactId)
      let contactReplaced = contacts.splice(index, 1, updatedContact)
      this.setState({replacedContacts:contactReplaced, contacts:contacts})
 
  }

  updateAppStateContactsDelete = (newContactsList) => {
    console.log("this is new Contacts list", newContactsList)
    this.setState({contacts: newContactsList}, () => {console.log("setstate was called after delete")})
  }


  
  updateAppStateCatalogCreate = (newCatalogEntry) => {
    const currentStateCatalog = JSON.parse(JSON.stringify(this.state.catalog_items))
    currentStateCatalog.push(newCatalogEntry)
    this.setState({catalog_items:currentStateCatalog} )
  }

  updateAppStateCatalogUpdate = (updatedCatalogEntry) => {
    let catalogId = updatedCatalogEntry.catalog_id
    let catalog_items = JSON.parse(JSON.stringify(this.state.catalog_items))
    let index = catalog_items.findIndex((catalog_item) => catalog_item.catalog_id === catalogId)
    let catalogItemReplaced = catalog_items.splice(index, 1, updatedCatalogEntry)
    this.setState({replacedCatalogEntry:catalogItemReplaced, catalog_items:catalog_items})

}

  updateAppStateEventsCreate = (newEvent) => {
    const currentStateEvents = JSON.parse(JSON.stringify(this.state.events))
    currentStateEvents.push(newEvent)
    this.setState({events:currentStateEvents})    
  }

  updateAppStateEventsUpdate = (updatedEvent) => {
    let eventId = updatedEvent.event_id
    let events = JSON.parse(JSON.stringify(this.state.events))
    let index = events.findIndex((events) => events.event_id === eventId)
    let eventItemReplaced = events.splice(index, 1, updatedEvent)
    this.setState({replacedEventEntry:eventItemReplaced, events:events})

}

  render() {
    const contextValue = {
      history: this.props.history,
      catalog_items: this.state.catalog_items,
      contacts: this.state.contacts,
      events: this.state.events,
      updateAppStateContactsCreate: this.updateAppStateContactsCreate,
      updateAppStateCatalogCreate: this.updateAppStateCatalogCreate,
      updateAppStateEventsCreate: this.updateAppStateEventsCreate,
      updateAppStateContactsUpdate: this.updateAppStateContactsUpdate,
      updateAppStateCatalogUpdate: this.updateAppStateCatalogUpdate,
      updateAppStateEventsUpdate: this.updateAppStateEventsUpdate,
      updateAppStateContactsDelete: this.updateAppStateContactsDelete
    }
    

    return (
      <main className='App'>
        <h1>Studio Keeper</h1>
        <StudioKeeperContext.Provider value={contextValue}>
          <Switch>
          <Route
            path={'/catalog/edit/:catalog_id'}
            component={EditCatalogEntry}
          />
          <Route
            path={'/catalog/add'}
            component={AddCatalogEntry}
          />
          <Route
            path={'/catalog'}
            component={CatalogParent}
          />
          <Route
            exact path={'/contacts/edit/:contact_id'}
            render={(props) => <EditContact {...props} contextValue={this.contextValue} />}
          />          
          <Route
            exact path={'/contacts/add'}
            component={AddContact}
          />
          <Route
            exact path={'/contacts'}
            component={ContactsParent}
          />
          <Route
            path={'/events/edit/:event_id'}
            component={EditEvent}
          />
          <Route
            path={'/events/add'}
            component={AddEvent}
          />
          <Route
            path={'/events'}
            component={EventParent}
          />
          <Route
            exact path={'/'}
            component={Home}
          />
          </Switch>
        </StudioKeeperContext.Provider>
      </main>
    );
  };
};

export default withRouter(App);