import TokenService from '../services/token-service'
import config from '../config'
const formData = new FormData();

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


    getCatalogImages(){
        return fetch(`${config.API_ENDPOINT}/images`, {
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

    postCatalogImages(fd, image_name, catalog_id){
        return fetch(`${config.API_ENDPOINT}/images`, {
            method:'POST',
            headers:{ 
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                //'Content-Type': 'multipart/form-data'
            },
            form: {
                fd,
            },
            body: JSON.stringify({
               image_name: image_name,
               catalog_id: catalog_id 
            })

            //change the user_id to the logged in user
        })
        .then((res) => { 
            console.log(res)
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res()
        })
    },

    postCatalogItem(catalogItem) {
        console.log("HERE IN CATALOg", catalogItem)
        return fetch(`${config.API_ENDPOINT}/catalog`, {
          method: 'POST',
          headers: {
            'authorization': 'bearer db943962-4003-4d18-ab25-9f0c6bb2679c',
            'content-type': 'application/json',
        //     'authorization': `bearer ${TokenService.getAuthToken()}`,
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
          'authorization': 'bearer db943962-4003-4d18-ab25-9f0c6bb2679c',
          'content-type': 'application/json',
      //     'authorization': `bearer ${TokenService.getAuthToken()}`,
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
          //     'authorization': `bearer ${TokenService.getAuthToken()}`,
            },

    })
}


}





export default CatalogApiService 