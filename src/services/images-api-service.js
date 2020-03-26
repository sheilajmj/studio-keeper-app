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

    postCatalogImages(image) {
        console.log("This is the formData file: ", image.name)
          const fd = new FormData();
          fd.append('image', image, 'image.name.jpg')
          return fetch(`${config.API_ENDPOINT}/images`, {
            method: 'POST',
            headers: {
               'authorization': `bearer ${TokenService.getAuthToken()}`,
            //    'Content-Type': 'multipart/form-data'
            },
            body: fd
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