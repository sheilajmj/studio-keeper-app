import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Context from './Context'
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
import catalog_items from './data-store-catalog'
import contacts from './data-store-contacts'
import events from './data-store-events'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catalog_items: catalog_items,
      contacts: contacts,
      events: events,
    }
    this.updateAppStateContacts = this.updateAppStateContacts.bind(this);
  }

  
  updateAppStateContacts(newContact){
    console.log("here is statecontacts before", this.state.contacts)
  const currentStateContacts = this.state.contacts
  currentStateContacts.push(newContact)
  this.setState({contacts:currentStateContacts})
  console.log("stateUpdated", this.state.contacts)
  }


  render() {
    const contextValue = {
      history: this.props.history,
      catalog_items: this.state.catalog_items,
      contacts: this.state.contacts,
      events: this.state.events,
      updateAppStateContacts: this.updateAppStateContacts,
    }
    

    return (
      <main className='App'>
        <Context.Provider value={contextValue}>
          <Route
            exact path={'/'}
            component={Home}
          />
          <Route
            exact path={'/catalog'}
            component={CatalogParent}
          />
          <Route
            exact path={'/catalog/add'}
            component={AddCatalogEntry}
          />
          <Route
            exact path={'/catalog/edit/:catalog_id'}
            component={EditCatalogEntry}
          />
          <Route
            exact path={'/contacts'}
            component={ContactsParent}
          />
          <Route
            exact path={'/contacts/add'}
            component={AddContact}
          />
          <Route
            exact path={'/contacts/edit/:contact_id'}
            component={EditContact}
          />
          <Route
            exact path={'/events'}
            component={EventParent}
          />
          <Route
            exact path={'/events/add'}
            component={AddEvent}
          />
          <Route
            exact path={'/events/edit/:event_id'}
            component={EditEvent}
          />
        </Context.Provider>
      </main>
    );
  };
};

export default withRouter(App);