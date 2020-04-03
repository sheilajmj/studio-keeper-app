import TokenService from '../services/token-service'
import config from '../config'

const EventsApiService = {
    getEventItems() {
        return fetch(`${config.API_ENDPOINT}/events`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
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
                'authorization': `bearer ${TokenService.getAuthToken()}`,
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
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json',
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
        return fetch(`${config.API_ENDPOINT}/events/${newId}`, {
            method: 'PATCH',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json',
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
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json',
            },

        })

    }
}





export default EventsApiService 