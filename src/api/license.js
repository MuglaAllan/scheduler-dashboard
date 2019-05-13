import axios from 'axios'
import base, { /* GenerateMongoQueryString, */ GenerateMongoQueryStringWildCard } from './base'

const { PERMIT_QUERY } = base // , PERMIT_RECORD_UPDATE

axios.defaults.crossDomain = true
axios.defaults.headers.get['access-control-allow-origin'] = '*'

export function getLicenseUsersListFromApi (searchState) {
  let obj = {
    'forenames': searchState.firstName,
    'surname': searchState.lastName,
    'license_no': searchState.license_no,
    'post_code': searchState.postCode
  }
  return axios
    .post(PERMIT_QUERY, {
      mongo_query: GenerateMongoQueryStringWildCard(obj)
    })
    .then(response => {
      return response.data.ResponsePackage.data
    })
    .catch(err => {
      console.log(err)
    })
}
