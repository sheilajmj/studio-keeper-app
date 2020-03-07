import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import StudioKeeperContext from './Context'
import CatalogParent from './Components/Catalog/CatalogParent'
import AddCatalogEntry from './Components/Catalog/AddCatalogEntry'
import EditCatalogEntry from './Components/Catalog/EditCatalogEntry'
// import ViewCatalog from './Components/Catalog/ViewCatalog'
import ContactItemList from './Components/Contacts/ContactItemList'
import AddContact from './Components/Contacts/AddContact'
import EditContact from './Components/Contacts/EditContact'
import ViewContact from './Components/Contacts/ViewContact'
import EventParent from './Components/Events/EventParent'
import AddEvent from './Components/Events/AddEvent'
import EditEvent from './Components/Events/EditEvent'
import ViewEvent from './Components/Events/ViewEvent'
import Home from './Components/Home/Home'
import LandingPage from './Components/LandingPage/LandingPage'
import Nav from './Components/Nav/Nav'
import Gallery from './Components/Gallery/Gallery'
import SignInForm from './Components/SignInForm/SignInForm'
import ContactsApiService from './services/contacts-api-service'
import CatalogApiService from './services/catalog-api-service'
import CatalogViewParent from './Components/Catalog/CatalogViewParent'
// let json_data = require('./db.json');

// const catalog_items = json_data.catalog_items
// const events = json_data.events
// const contacts = json_data.contacts

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catalog_items: [],
      contacts: [],
      events: [],
      selectedContact: [],
      updateValue: true,
    }
  }

  updateAppStateContactsCreate = (newContact) => {
    const currentStateContacts = JSON.parse(JSON.stringify(this.state.contacts))
    currentStateContacts.push(newContact)
    this.setState({ contacts: currentStateContacts, })

  }

  updateAppStateContactsUpdate = (updatedContact) => {
    let contactId = updatedContact.contact_id
    let contacts = JSON.parse(JSON.stringify(this.state.contacts))
    let index = contacts.findIndex((contacts) => contacts.contact_id === contactId)
    let contactReplaced = contacts.splice(index, 1, updatedContact)
    this.setState({ replacedContacts: contactReplaced, contacts: contacts })

  }

  updateAppStateContactsDelete = (newContactsList) => {
    this.setState({ contacts: newContactsList })

  }

  updateAppStateCatalogCreate = (newCatalogEntry) => {
    const currentStateCatalog = JSON.parse(JSON.stringify(this.state.catalog_items))
    currentStateCatalog.push(newCatalogEntry)
    this.setState({ catalog_items: currentStateCatalog })
  }

  updateAppStateCatalogUpdate = (updatedCatalogEntry) => {
    let catalogId = updatedCatalogEntry.catalog_id
    let catalog_items = JSON.parse(JSON.stringify(this.state.catalog_items))
    let index = catalog_items.findIndex((catalog_item) => catalog_item.catalog_id === catalogId)
    let catalogItemReplaced = catalog_items.splice(index, 1, updatedCatalogEntry)
    this.setState({ replacedCatalogEntry: catalogItemReplaced, catalog_items: catalog_items })
  }

  updateAppStateCatalogDelete = (newCatalogList) => {
    this.setState({ catalog_items: newCatalogList })
  }

  updateAppStateEventsCreate = (newEvent) => {
    const currentStateEvents = JSON.parse(JSON.stringify(this.state.events))
    currentStateEvents.push(newEvent)
    this.setState({ events: currentStateEvents })
  }

  updateAppStateEventsUpdate = (updatedEvent) => {
    let eventId = updatedEvent.event_id
    let events = JSON.parse(JSON.stringify(this.state.events))
    let index = events.findIndex((events) => events.event_id === eventId)
    let eventItemReplaced = events.splice(index, 1, updatedEvent)
    this.setState({ replacedEventEntry: eventItemReplaced, events: events })
  }
  updateAppStateEventsDelete = (newEventsList) => {
    this.setState({ events: newEventsList })
  }

  setCatalogItems = (catalogItems) => {
    console.log("hit set catalog Items")
    this.setState({catalog_items: catalogItems })
  }

  setContacts = (contacts) => {
    this.setState({contacts: contacts})
    console.log("hit set contacts in App")
  }


  componentDidMount() {
    ContactsApiService.getContacts()
      .then(this.setContacts)
      .catch(this.context.setError)

    CatalogApiService.getCatalogItems()
        .then(this.setCatalogItems)
        .catch(this.context.setError)

    
      
    console.log(this.state, "state")
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
      setCatalogItems: this.setCatalogItems,
      setContacts: this.setContacts,
    }


    return (
      <>     <StudioKeeperContext.Provider value={contextValue}>
        <header>
          <h1>
            <a href="/" className="header">Studio Keeper</a>
          </h1>
        <Nav />
        </header>
        <main className='app'>
          <Switch>
            <Route
              path={'/catalog/edit/:id'}
              component={EditCatalogEntry}
            />
            <Route
              path={'/catalog/add'}
              component={AddCatalogEntry}
            />
            <Route
              exact path={'/catalog/:id'}
              component={CatalogViewParent}
            />
            <Route
              path={'/catalog'}
              component={CatalogParent}
            />
            <Route
              exact path={'/contacts/edit/:id'}
              component={EditContact}
            />
            <Route
              exact path={'/contacts/add'}
              component={AddContact}
            />
            <Route
              exact path={'/contacts/:id'}
              component={ViewContact}
            />
            <Route
              exact path={'/contacts'}
              component={ContactItemList}
            />
            <Route
              path={'/events/edit/:id'}
              component={EditEvent}
            />
            <Route
              path={'/events/add'}
              component={AddEvent}
            />
            <Route
              exact path={'/events/:id'}
              component={ViewEvent}
            />
            <Route
              path={'/events'}
              component={EventParent}
            />
            <Route
              path={'/gallery'}
              component={Gallery}
              />
              <Route
              path={'/signin'}
              component={SignInForm}
              />
            <Route
              exact path={'/'}
              component={Home}
            />
            <Route
              exact path={'/landing'}
              component={LandingPage}
            />
          </Switch>
        </main>
      </StudioKeeperContext.Provider>
      </>
    );
  };
};

export default withRouter(App);