import axios from 'axios'
import base from './base'
import { replaceWithSpecified } from '../components/Functions/Functions.js'

const { PRINT_VRS, PRINT_EXPORT, PRINT_TRADE } = base

axios.defaults.crossDomain = true
axios.defaults.headers.get['access-control-allow-origin'] = '*'

export function getVrsPdfFromStoreDataApi (obj) {
  let localObj = replaceWithSpecified(obj, '*')
  return axios
    .post(PRINT_VRS, localObj)
    .then(response => {
      return response.data
    }).catch((err) => {
      console.log(err)
    })
}

export function getExportCertPdfFromStoreDataApi (obj) {
  return axios
    .post(PRINT_EXPORT, obj)
    .then(response => {
      return response.data
    }).catch((err) => {
      console.log(err)
    })
}

export function getTradeLicensePdfFromStoreDataApi (obj) {
  return axios
    .post(PRINT_TRADE, obj)
    .then(response => {
      return response.data
    }).catch((err) => {
      console.log(err)
    })
}
