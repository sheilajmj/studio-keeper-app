import config from '../config'
import TokenService from '../services/token-service'

const CatalogImagesApiService = {

    getCatalogImages(field, id) {
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
    },

    postCatalogImages(fd) {
        console.log(fd.file)
          return fetch(`${config.API_ENDPOINT}/images`, {
            method: 'POST',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            //    'Content-Type': 'multipart/form-data'
            },
            formData: {
                "image": fd.file,
            },
        })
            .then((res) => {
                // console.log(res) 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res()
            })
    }

}

export default CatalogImagesApiService