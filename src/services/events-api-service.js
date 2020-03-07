//import TokenService from '../services/token-service'
import config from '../config'

const EventsApiService = {
    getEventItems() {
        return fetch(`${config.API_ENDPOINT}/events`, {
            headers:{
                'authorization': 'bearer db943962-4003-4d18-ab25-9f0c6bb2679c'

                //`bearer ${TokenService.getAuthToken()}`,
            }
        })
        .then(res => 
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },

    getEventItem(event_id) {
        return fetch (`${config.API_ENDPOINT}/events/${event_id}`, {
            headers: {
                'authorization': 'bearer db943962-4003-4d18-ab25-9f0c6bb2679c'
                //'Authorization': `bearer ${TokenService.getAuthToken()}`,
            }
        })

        .then(res => 
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
            )
    }

    // postEventItem(event_id, text) {
    //     return fetch(`${config.API_ENDPOINT}/events`, {
    //       method: 'POST',
    //       headers: {
    //         'content-type': 'application/json',
    //         'authorization': `bearer ${TokenService.getAuthToken()}`,
    //       },
    //       body: JSON.stringify({
    //         article_id: articleId,
    //         text,
    //       }),
    //     })
    //       .then(res =>
    //         (!res.ok)
    //           ? res.json().then(e => Promise.reject(e))
    //           : res.json()
    //       )
    //   },

}





export default EventsApiService 