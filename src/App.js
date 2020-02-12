import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import StudioKeeperContext from './Context'
import CatalogParent from './Components/Catalog/CatalogParent'
import AddCatalogEntry from './Components/Catalog/AddCatalogEntry'
import EditCatalogEntry from './Components/Catalog/EditCatalogEntry'
import ContactsParent from './Components/Contacts/ContactsParent'
import AddContact from './Components/Contacts/AddContact'
import EditContact from './Components/Contacts/EditContact-Original'
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
    // this.updateAppStateContacts = this.updateAppStateContacts.bind(this);
  }

   
  updateAppStateContacts = (newContact) => {
    const currentStateContacts = this.state.contacts
    currentStateContacts.push(newContact)
    this.setState({contacts:currentStateContacts} )
    console.log("appStateUpdated - Contacts", this.state.contacts)
  }

  
  updateAppStateCatalog = (newCatalogEntry) => {
    const currentStateCatalog = this.state.catalog_items
    currentStateCatalog.push(newCatalogEntry)
    this.setState({catalog:currentStateCatalog} )
    console.log("appStateUpdated - Catalog", this.state.catalog_items)
  }

  updateAppStateEvent = (newEvent) => {
    const currentStateEvents = this.state.events
    currentStateEvents.push(newEvent)
    this.setState({events:currentStateEvents})
    console.log("appStateUpdated - Events", this.state.events)
  }

  render() {
    const contextValue = {
      history: this.props.history,
      catalog_items: this.state.catalog_items,
      contacts: this.state.contacts,
      events: this.state.events,
      updateAppStateContacts: this.updateAppStateContacts,
      updateAppStateCatalog: this.updateAppStateCatalog,
      updateAppStateEvent: this.updateAppStateEvent
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