import axios from 'axios'
import base from './base'

const {
  REG_NO_HISTORY,
  REG_NO_RANGE_BY_CLASSIFICATION,
  REG_NO_UPDATE_STATUS,
  REG_NO_BULK_UPDATE_STATUS,
  REG_NO_CLASSIFICATION,
  REG_NO_GET_T_NUMBER,
  REG_NO_EXCHANGE,
  REG_NO_RETAIN_CHANGE,
  REG_NO_RETAINED_BY_OWNER_ID
} = base

axios.defaults.crossDomain = true
axios.defaults.headers.get['access-control-allow-origin'] = '*'

export function getRegistrationNoHistoryDataFromApi (searchString) {
  return axios
    .get(REG_NO_HISTORY + searchString)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export function getRegistrationNoByTypeDataFromApi (classification) {
  return axios
    .get(REG_NO_CLASSIFICATION + classification)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export function getRegistrationNoAllByClassificationApi (classification) {
  return axios
    .get(REG_NO_RANGE_BY_CLASSIFICATION + classification)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export function getRegistrationNoRangeByClassificationApi (classification, obj) {
  return axios
    .get(REG_NO_RANGE_BY_CLASSIFICATION + classification + '/' + obj.start + '/' + obj.end)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export function setRegistrationNoStatusApi (obj) {
  return axios
    .post(REG_NO_UPDATE_STATUS, obj)
    .then(() => ({
      success: true
    }))
    .catch(err => {
      console.log(err)
    })
}

export function setRegistrationNoBulkStatusUpdateApi (obj) {
  return axios
    .post(REG_NO_BULK_UPDATE_STATUS, obj)
    .then(() => ({
      success: true
    }))
    .catch(err => {
      console.log(err)
      return {
        success: false
      }
    })
}

export function getTradeLicensesApi (count) {
  return axios
    .post(REG_NO_GET_T_NUMBER + '/?count=' + count)
    .then(response => {
      return {
        success: true,
        data: response.data
      }
    })
    .catch(err => {
      console.log(err)
    })
}

export function setExchangeRegNoApi (arr) {
  return axios
    .post(REG_NO_EXCHANGE, arr)
    .then(() => ({
      success: true
    }))
    .catch(err => {
      console.log(err)
    })
}

export function setRetainChangeRegNoApi (arr) {
  return axios
    .post(REG_NO_RETAIN_CHANGE, arr)
    .then(() => ({
      success: true
    }))
    .catch(err => {
      console.log(err)
    })
}

export function getRetainedByIdApi (isCompany, classification, ownerId) {
  return axios
    .get(REG_NO_RETAINED_BY_OWNER_ID + isCompany + '/' + classification + '/' + ownerId)
    .then((data) => ({
      success: true,
      data: data.data
    }))
    .catch(err => {
      console.log(err)
    })
}
