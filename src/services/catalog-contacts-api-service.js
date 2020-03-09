import config from '../config'

const CatalogContactsService = {
    getCatalogAndContacts(key, value){
        return fetch(`${config.API_ENDPOINT}/catalogcontacts`, {
            headers:{
                'authorization': 'bearer db943962-4003-4d18-ab25-9f0c6bb2679c'
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

export default EventsCatalogService