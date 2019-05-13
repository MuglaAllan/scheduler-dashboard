import axios from 'axios'
import base, { GenerateSQLQueryUpdateString, GenerateSQLQueryString } from './base'

const {
  // OPERATIONAL_QUERY,
  OPERATIONAL_UPDATE,
  OPERATIONAL_SEARCH
} = base

axios.defaults.crossDomain = true
axios.defaults.headers.get['access-control-allow-origin'] = '*'

export function getSystemConfigurationItemsFromApi (tableName) {
  const itemArray = [{ table_name: tableName }]
  return axios
    .post(OPERATIONAL_SEARCH, { table_query_list: itemArray })
    .then(response => {
      return response.data.ResponsePackage.data
    })
    .catch(err => {
      console.log(err)
    })
}

export function getSystemConfigurationItemValueFromApi (obj) {
  return axios
    .post(OPERATIONAL_SEARCH, GenerateSQLQueryString(obj, 'fee', false))
    .then((response) => ({
      success: true,
      data: response.data.ResponsePackage.data[0]
    }))
    .catch(err => {
      console.log(err)
    })
}

export function setSystemConfigurationFeeApi (arrObj) {
  return axios
    .post(OPERATIONAL_UPDATE, GenerateSQLQueryUpdateString(arrObj, 'fee'))
    .then(() => ({
      success: true
    }))
    .catch(err => {
      console.log(err)
    })
}

export function setSystemConfigurationValueApi (arrObj, tableName) {
  return axios
    .post(OPERATIONAL_UPDATE, GenerateSQLQueryUpdateString(arrObj, tableName))
    .then(() => ({
      success: true
    }))
    .catch(err => {
      console.log(err)
    })
}
