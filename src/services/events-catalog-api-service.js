import config from '../config'

const EventsCatalogService = {
    getCatalogAndEvents(key, value){
        return fetch(`${config.API_ENDPOINT}/catalogevents`, {
            headers:{
                'authorization': 'bearer db943962-4003-4d18-ab25-9f0c6bb2679c'
                //`bearer ${TokenService.getAuthToken()}`,
            },
            query: JSON.stringify({
                key: key,
                value: value,
        })
    })
        .then(res => 
            console.log(res.ok, "here is res OK?")
            (!res.ok)
            ?res.json().then(e => Promise.reject(e))
            : res.json()
            )
    },

}

export default EventsCatalogService