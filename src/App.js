import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import StudioKeeperContext from './Context'
import CatalogParent from './Components/Catalog/CatalogParent'
import AddCatalogEntry from './Components/Catalog/AddCatalogEntry'
import EditCatalogEntry from './Components/Catalog/EditCatalogEntry'
import ViewCatalog from './Components/Catalog/ViewCatalog'
import ContactsParent from './Components/Contacts/ContactsParent'
import AddContact from './Components/Contacts/AddContact'
import EditContact from './Components/Contacts/EditContact'
import ViewContact from './Components/Contacts/ViewContact'
import EventParent from './Components/Events/EventParent'
import AddEvent from './Components/Events/AddEvent'
import EditEvent from './Components/Events/EditEvent'
import ViewEvent from './Components/Events/ViewEvent'
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
      selectedContact:[],
      updateValue: true,
    }
  }

   
  updateAppStateContactsCreate = (newContact) => {
    const currentStateContacts = JSON.parse(JSON.stringify(this.state.contacts))
    currentStateContacts.push(newContact)
    this.setState({contacts:currentStateContacts, } )

  }

  updateAppStateContactsUpdate = (updatedContact) => {
      let contactId = updatedContact.contact_id
      let contacts = JSON.parse(JSON.stringify(this.state.contacts))
      let index = contacts.findIndex((contacts) => contacts.contact_id === contactId)
      let contactReplaced = contacts.splice(index, 1, updatedContact)
      this.setState({replacedContacts:contactReplaced, contacts:contacts})
 
  }

  updateAppStateContactsDelete = (newContactsList) => {
    this.setState({contacts: newContactsList})

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

  updateAppStateCatalogDelete = (newCatalogList) => {
    this.setState({catalog_items: newCatalogList})
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
updateAppStateEventsDelete = (newEventsList) => {
  this.setState({events: newEventsList})

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
      updateAppStateContactsDelete: this.updateAppStateContactsDelete,
      updateAppStateCatalogDelete: this.updateAppStateCatalogDelete,
      updateAppStateEventsDelete: this.updateAppStateEventsDelete,
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
            exact path={'/catalog/:catalog_id'}
            component ={ViewCatalog}
            />
          <Route
            path={'/catalog'}
            component={CatalogParent}
          />
          <Route
            exact path={'/contacts/edit/:contact_id'}
            component={EditContact} 
          />          
          <Route
            exact path={'/contacts/add'}
            component={AddContact}
          />
          <Route
            exact path={'/contacts/:contact_id'}
            component ={ViewContact}
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
            exact path={'/events/:event_id'}
            component ={ViewEvent}
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