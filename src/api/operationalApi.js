import axios from 'axios'
import base, { GenerateSQLQueryString } from './base'

const { OPERATIONAL_INSERT } = base

axios.defaults.crossDomain = true
axios.defaults.headers.get['access-control-allow-origin'] = '*'

export function setOperationalValueApi (obj, table, isSelect) {
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
