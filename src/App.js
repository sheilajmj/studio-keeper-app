import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import StudioKeeperContext from './Context'
import PrivateOnlyRoute from './Components/Utils/PrivateRoute'
import PublicOnlyRoute from './Components/Utils/PublicOnlyRoute'
import CatalogItem from './Components/Catalog/CatalogItem'
import AddCatalogEntry from './Components/Catalog/AddCatalogEntry'
import EditCatalogEntry from './Components/Catalog/EditCatalogEntry'
import ViewCatalog from './Components/Catalog/ViewCatalog'
import ContactItemList from './Components/Contacts/ContactItemList'
import AddContact from './Components/Contacts/AddContact'
import EditContact from './Components/Contacts/EditContact'
import ViewContact from './Components/Contacts/ViewContact'
import EventItem from './Components/Events/EventItem'
import AddEvent from './Components/Events/AddEvent'
import EditEvent from './Components/Events/EditEvent'
import ViewEvent from './Components/Events/ViewEvent'
import Home from './Components/Home/Home'
import LandingPage from './Components/LandingPage/LandingPage'
import Nav from './Components/Nav/Nav'
import Gallery from './Components/Gallery/Gallery'
import LoginPage from './Components/Login/LoginPage'
import RegistrationPage from './Components/RegistrationPage/RegistrationPage'
import ContactsApiService from './services/contacts-api-service'
import CatalogApiService from './services/catalog-api-service'
import EventsApiService from './services/events-api-service'
import NotFoundPage from './Components/NotFoundPage/NotFoundPage'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catalog_items: [],
      contacts: [],
      events: [],
      selectedContact: [],
      updateValue: true,
      hasError: false
    }
  }

static getDerivedStateFromError(error){
  console.error(error)
  return { hasError: true }
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
    this.setState({catalog_items: catalogItems })
  }

  setContacts = (contacts) => {
    this.setState({contacts: contacts})
  }

  setEventItems = (events) => {
    this.setState({events: events})
  }

  componentDidMount() {
    ContactsApiService.getContacts()
      .then(this.setContacts)
      .catch(this.context.setError)

    CatalogApiService.getCatalogItems()
        .then(this.setCatalogItems)
        .catch(this.context.setError)

    EventsApiService.getEventItems()
        .then(this.setEventItems)
        .catch(this.context.setError)
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
      setEvents: this.setEvents
    }


    return (
      <>     <StudioKeeperContext.Provider value={contextValue}>
        <header>
          <h1>
            <a href="/home" className="header">Studio Keeper</a>
          </h1>
        <Nav />
        </header>
        <main className='app'>
          <Switch>
            <Route
              exact path={'/'}
              component={LandingPage}
            />
            <PrivateOnlyRoute
              exact path={'/home'}
              component={Home}
            />
            <PublicOnlyRoute
            path={'/login'}
            component={LoginPage} 
            />
            <PublicOnlyRoute
              path={'register'}
              component={RegistrationPage}
            />
            <PrivateOnlyRoute
              path={'/catalog/edit/:id'}
              component={EditCatalogEntry}
            />
            <PrivateOnlyRoute
              path={'/catalog/add'}
              component={AddCatalogEntry}
            />
            <PrivateOnlyRoute
              exact path={'/catalog/:id'}
              component={ViewCatalog}
            />
            <PrivateOnlyRoute
              path={'/catalog'}
              component={CatalogItem}
            />
            <PrivateOnlyRoute
              exact path={'/contacts/edit/:id'}
              component={EditContact}
            />
            <PrivateOnlyRoute
              exact path={'/contacts/add'}
              component={AddContact}
            />
            <PrivateOnlyRoute
              exact path={'/contacts/:id'}
              component={ViewContact}
            />
            <PrivateOnlyRoute
              exact path={'/contacts'}
              component={ContactItemList}
            />
            <PrivateOnlyRoute
              path={'/events/edit/:id'}
              component={EditEvent}
            />
            <PrivateOnlyRoute
              path={'/events'}
              component={EventItem}
            />
            <PrivateOnlyRoute
              path={'/events/add'}
              component={AddEvent}
            />
            <PrivateOnlyRoute
              exact path={'/events/:id'}
              component={ViewEvent}
            />
            <PrivateOnlyRoute
              path={'/gallery'}
              component={Gallery}
              />
            <Route
              component={NotFoundPage}
            />

          </Switch>
        </main>
      </StudioKeeperContext.Provider>
      </>
    );
  };
};

export default withRouter(App);