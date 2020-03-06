//import TokenService from '../services/token-service'
import config from '../config'

const CatalogApiService = {
    getCatalogItems() {
        return fetch(`${config.API_ENDPOINT}/catalog`, {
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

    getCatalogItem(catalog_id) {
        return fetch (`${config.API_ENDPOINT}/catalog/${catalog_id}`, {
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

    // postCatalogItem(articleId, text) {
    //     return fetch(`${config.API_ENDPOINT}/comments`, {
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





export default CatalogApiService 