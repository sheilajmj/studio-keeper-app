import React from 'react'

const StudioKeeperContext = React.createContext({
      history: {},
      catalog_items: [], 
      contacts: [],
      events: [],
      updateAppStateContacts: () => {},
      updateAppStateCatalog: () => {},
      updateAppStateEvent: () => {}    
  })
  
  export default StudioKeeperContext;