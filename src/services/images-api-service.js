import config from '../config'

const CatalogImagesApiService = {

    getCatalogImages(field, id) {
        return fetch (`${config.API_ENDPOINT}/catalogimages?${field}=${id}`, {
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
    },
}
    
//     getCatalogAndEvents(key, value){
//         return fetch(`${config.API_ENDPOINT}/catalogevents`, {
//             headers:{
//                 'authorization': 'bearer db943962-4003-4d18-ab25-9f0c6bb2679c'
//                 //`bearer ${TokenService.getAuthToken()}`,
//             },
//             body: JSON.stringify({
//                 key: key,
//                 value: value,
//         })
//     })
//         .then(res => 
//             (!res.ok)
//             ?res.json().then(e => Promise.reject(e))
//             : res.json()
//             )
//     },

// }

export default CatalogImagesApiService