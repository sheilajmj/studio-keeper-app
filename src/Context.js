import React from 'react';

const StudioKeeperContext = React.createContext({
      history: {},
      catalog_items: [], 
      contacts: [],
      events: [],
      updateAppStateContactsCreate: () => {},
      updateAppStateCatalogCreate: () => {},
      updateAppStateEventsCreate: () => {},
      updateAppStateContactsUpdate: () => {},
      updateAppStateCatalogUpdate: () => {},
      updateAppStateEventsUpdate: () => {},    
      updateAppStateContactsDelete: () => {},
      updateAppStateCatalogDelete: () => {},
      updateAppStateEventDelete: () => {},
      setCatalogItems: () => {},
      setContacts: () => {},
      setEvents: () => {},
      uploadImage: () => {}
  })
  
  export default StudioKeeperContext;