//import TokenService from '../services/token-service'
import config from '../config'

const EventsApiService = {
    getEventItems() {
        return fetch(`${config.API_ENDPOINT}/events`, {
            headers: {
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
        return fetch(`${config.API_ENDPOINT}/events/${event_id}`, {
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
    },

    postEventItem(newEventItem) {
        return fetch(`${config.API_ENDPOINT}/events`, {
            method: 'POST',
            headers: {
                'authorization': 'bearer db943962-4003-4d18-ab25-9f0c6bb2679c',
                'content-type': 'application/json',
                // 'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(
                newEventItem,
            ),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    updateEventItem(id, eventItem) {
       let newId = id.id

        console.log("HERE IS EENT ITEM", eventItem)
        return fetch(`${config.API_ENDPOINT}/events/${newId}`, {
            method: 'PATCH',
            headers: {
                'authorization': 'bearer db943962-4003-4d18-ab25-9f0c6bb2679c',
                'content-type': 'application/json',
                //     'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(
                eventItem
            ),
        })
    },

    deleteEventItem(id) {
        return fetch(`${config.API_ENDPOINT}/events/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': 'bearer db943962-4003-4d18-ab25-9f0c6bb2679c',
                'content-type': 'application/json',
                //     'authorization': `bearer ${TokenService.getAuthToken()}`,
            },

        })

    }
}





export default EventsApiService 