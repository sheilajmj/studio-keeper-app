import TokenService from '../services/token-service'
import config from '../config'

const CatalogApiService = {
    getCatalogItems() {
        return fetch(`${config.API_ENDPOINT}/catalog`, {
            headers:{
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                
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
            }
        })

        .then(res => 
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
            )
    },


    
    postCatalogItem(catalogItem) {
        const user_id = 1
        //change user_id to the logged in user
        return fetch(`${config.API_ENDPOINT}/catalog`, {
          method: 'POST',
          headers: {
            'authorization': 'bearer db943962-4003-4d18-ab25-9f0c6bb2679c',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
              user_id, 
              catalogItem
          }),
       })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
      },

    updateCatalogItem(id, catalogItem) {  
        let newId = parseInt(id.id)
    return fetch(`${config.API_ENDPOINT}/catalog/${newId}`, {
        method: 'PATCH',
        headers: {
          'authorization': 'bearer db943962-4003-4d18-ab25-9f0c6bb2679c',
          'content-type': 'application/json',
        },
        body: JSON.stringify(
          catalogItem
        ),
      })
      },

    deleteCatalogItem(id){
        return fetch(`${config.API_ENDPOINT}/catalog/${id}`, {
            method: 'DELETE',
            headers: {
              'authorization': 'bearer db943962-4003-4d18-ab25-9f0c6bb2679c',
              'content-type': 'application/json',
            },

    })
}


}





export default CatalogApiService 