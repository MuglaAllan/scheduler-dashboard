import axios from 'axios'
import base, { GenerateMongoQueryStringWildCard } from './base'

const { SCHEDULE_QUERY, SCHEDULE_UPDATE, SCHEDULE_ADD_NEW, SCHEDULE_REMOVE, PERMIT_QUERY } = base

axios.defaults.crossDomain = true
axios.defaults.headers.get['access-control-allow-origin'] = '*'

export function getScheduleDataByDateApi (date) {
  let format = require('date-format')
  let timeArray = []
  timeArray.push(format('yyyy-MM-dd', new Date(date)))
  return axios
    .post(SCHEDULE_QUERY, { dates: timeArray })
    .then(response => {
      return response.data.ResponsePackage.slots
    })
    .catch(err => {
      console.log(err)
    })
}

export function amendScheduleDataApi (data) {
  return axios
    .post(SCHEDULE_UPDATE, data)
    .then(response => {
      return response.data.ResponsePackage
    })
    .catch(err => {
      console.log(err)
    })
}

export function addScheduleDataApi (appointmentType, data) {
  return axios
    .post(SCHEDULE_ADD_NEW + appointmentType, data)
    .then(response => {
      return response.data.ResponsePackage
    })
    .catch(err => {
      console.log(err)
    })
}

export function removeScheduleEntryApi (obj) {
  return axios
    .post(SCHEDULE_REMOVE, obj)
    .then(response => {
      return {
        date: response.data.ResponsePackage,
        success: true
      }
    })
    .catch(err => {
      console.log(err)
    })
}

export function getSearchDataFromApi (obj) {
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
