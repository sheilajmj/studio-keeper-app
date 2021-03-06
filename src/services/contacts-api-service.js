import config from '../config';
import TokenService from '../services/token-service';


const ContactsApiService = {
    getContacts(field, id) {
        if (field === undefined && id === undefined) {
            return fetch(`${config.API_ENDPOINT}/contacts`, {
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
            return fetch(`${config.API_ENDPOINT}/contacts?${field}=${id}`, {
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
    },

    getContact(id) {
        return fetch(`${config.API_ENDPOINT}/contacts/${id}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    postContactItem(contact) {
        return fetch(`${config.API_ENDPOINT}/contacts`, {
            method: 'POST',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(
                contact
            )
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    updateContactItem(id, contactItem) {
        let newId = parseInt(id.id)
        return fetch(`${config.API_ENDPOINT}/contacts/${newId}`, {
            method: 'PATCH',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(
                contactItem
            ),
        })
    },

    deleteContactItem(id) {
        return fetch(`${config.API_ENDPOINT}/contacts/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json',
            },
        })
    }
}

export default ContactsApiService