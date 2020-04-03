import TokenService from '../services/token-service'
import config from '../config'

const CatalogApiService = {
  getCatalogItems() {
    return fetch(`${config.API_ENDPOINT}/catalog`, {
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

  getCatalogItem(catalog_id) {
    return fetch(`${config.API_ENDPOINT}/catalog/${catalog_id}`, {
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



  postCatalogItem(catalogItem) {
    return fetch(`${config.API_ENDPOINT}/catalog`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
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
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(
        catalogItem
      ),
    })
  },

  deleteCatalogItem(id) {
    return fetch(`${config.API_ENDPOINT}/catalog/${id}`, {
      method: 'DELETE',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },

    })
  }


}





export default CatalogApiService 