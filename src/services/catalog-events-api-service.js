import config from '../config';
import TokenService from '../services/token-service';

const CatalogEventsService = {

    getCatalogAndEvents(field, id) {
        return fetch(`${config.API_ENDPOINT}/catalogevents?${field}=${id}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
}


export default CatalogEventsService