import axios from 'axios'
import base, { GenerateSQLQueryString, GenerateSQLQueryUpdateString } from './base'

const { OPERATIONAL_INSERT, OPERATIONAL_UPDATE, OWNER_ID_SEARCH } = base

axios.defaults.crossDomain = true
axios.defaults.headers.get['access-control-allow-origin'] = '*'

export function getOwnerDetailsApi (obj, table, isSelect) {
  return axios
    .post(OWNER_ID_SEARCH, GenerateSQLQueryString(obj, table, isSelect))
    .then(response => {
      return response.data.ResponsePackage.data
    })
    .catch(err => {
      console.log(err)
    })
}

// export function checkShortCodeAvailableApi (arrObj) {
//   return axios
//     .post(OWNER_ID_SEARCH, GenerateSQLQueryString(arrObj, 'owners', true))
//     .then(response => {
//       return {
//         success: true,
//         data: response.data.ResponsePackage
//       }
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }

export function setOwnerDetailsApi (obj, table, isSelect) {
  return axios
    .post(OPERATIONAL_INSERT, GenerateSQLQueryString(obj, table, isSelect))
    .then(response => {
      return {
        success: true,
        data: response.data.ResponsePackage
      }
    })
    .catch(err => {
      console.log(err)
      return {
        success: false
      }
    })
}

export function updateOwnerDetailsApi (obj, table) {
  return axios
    .post(OPERATIONAL_UPDATE, GenerateSQLQueryUpdateString(obj, table))
    .then(() => ({
      success: true
    }))
    .catch(err => {
      console.log(err)
    })
}
