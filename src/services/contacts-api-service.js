import config from '../config'
//import TokenService from '../services/token-service'


const ContactsApiService = {
    getContacts() {
        return fetch(`${config.API_ENDPOINT}/contacts`, {
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

    getContactsQuery(field, id){
        return fetch(`${config.API_ENDPOINT}/contacts?${field}=${id}`, {
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
  

    getContact(id) {
        return fetch (`${config.API_ENDPOINT}/contacts/${id}`, {
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

}

export default ContactsApiService