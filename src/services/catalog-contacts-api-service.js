import config from '../config'
import TokenService from '../services/token-service'

const CatalogContactsApiService = {
    getCatalogAndContacts(field, id){
        return fetch(`${config.API_ENDPOINT}/catalogcontacts?${field}=${id}`, {
            headers:{
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                
                //'bearer db943962-4003-4d18-ab25-9f0c6bb2679c'
                //`bearer ${TokenService.getAuthToken()}`,
            },
        //     body: JSON.stringify({
        //         key: key,
        //         value: value,
        // })
    })
        .then(res => 
            (!res.ok)
            ?res.json().then(e => Promise.reject(e))
            : res.json()
            )
    },

}

export default CatalogContactsApiService