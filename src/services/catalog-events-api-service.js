import config from '../config'
import TokenService from '../services/token-service'

const CatalogEventsService = {

    getCatalogAndEvents(field, id) {
        return fetch (`${config.API_ENDPOINT}/catalogevents?${field}=${id}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                
                //'bearer db943962-4003-4d18-ab25-9f0c6bb2679c'
                //'Authorization': `bearer ${TokenService.getAuthToken()}`,
            },
      
    })
      
    .then(res => 
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
            )
    },



}
    

//         .then(res => 
//             (!res.ok)
//             ?res.json().then(e => Promise.reject(e))
//             : res.json()
//             )
//     },

// }

export default CatalogEventsService