import config from '../config';
import TokenService from '../services/token-service';

const ContactsEventsApiService = {

    getContactsAndEvents(field, id) {
        if (field && id !== undefined) {
            return fetch(`${config.API_ENDPOINT}/contactsevents?${field}=${id}`, {
                headers: {
                    'authorization': `bearer ${TokenService.getAuthToken()}`,
                }
            })
                .then(res =>
                    (!res.ok)
                        ? res.json().then(e => Promise.reject(e))
                        : res.json()
                )
        }

        else {
            return fetch(`${config.API_ENDPOINT}/contactsevents`, {
                headers: {
                    'authorization': `bearer ${TokenService.getAuthToken()}`,
                }
            })
                .then(res =>
                    (!res.ok)
                        ? res.json().then(e => Promise.reject(e))
                        : res.json()
                )
        }
    }
}

export default ContactsEventsApiService