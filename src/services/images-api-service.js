import config from '../config';
import TokenService from '../services/token-service';

const CatalogImagesApiService = {

    getCatalogImages(field, id) {
        if (field && id) {
            return fetch(`${config.API_ENDPOINT}/images?${field}=${id}`, {
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
            return fetch(`${config.API_ENDPOINT}/images`, {
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

    postCatalogImages(image, catalog_id) {
        const fd = new FormData();
        fd.append('image', image, image.name)
        fd.append('catalog_id', catalog_id)
        return fetch(`${config.API_ENDPOINT}/image-upload`, {
            method: 'POST',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: fd,
            catalog_id
        })
    },
}


export default CatalogImagesApiService