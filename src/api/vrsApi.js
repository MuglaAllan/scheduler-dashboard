import axios from 'axios'
import base, {
  GenerateMongoQueryStringWildCard,
  GenerateMongoQueryStringMultipleIn,
  GenerateMongoQueryString
} from './base'

const { VRS_SEARCH, VRS_SUBMIT_APPLICATION, VRS_SUBMIT_UPDATE, VRS_APPOINTMENT_DETAILS, OPERATIONAL_QUERY } = base

axios.defaults.crossDomain = true
axios.defaults.headers.get['access-control-allow-origin'] = '*'

export function getVrsExactFromApi (searchState) {
  return axios
    .post(VRS_SEARCH, {
      mongo_query: searchState
    })
    .then(response => {
      return response.data.ResponsePackage.data
    })
    .catch(err => {
      console.log(err)
    })
}

export function getVrsListFromApi (searchState, isAdvancedSearch, isWildCard) {
  let obj = {}
  if (isAdvancedSearch) {
    if (isWildCard) {
      searchState.forEach(function (item) {
        let parameter = "'" + item.hiddenId + "'"
        let value = item.parameterValue
        obj[parameter] = value
      })
    } else {
      obj = {
        'status': searchState.status
      }
    }
  } else {
    obj = {
      'registration_number': searchState.regNo,
      'make': searchState.make,
      'model': searchState.model,
      'chassis_number': searchState.chassisNo,
      'engine_number': searchState.engineNo,
      'surname': searchState.surname
    }
  }
  return axios
    .post(VRS_SEARCH, {
      mongo_query: isWildCard ? GenerateMongoQueryStringWildCard(obj) : GenerateMongoQueryStringMultipleIn(obj)
    })
    .then(response => {
      return response.data.ResponsePackage.data
    })
    .catch(err => {
      console.log(err)
    })
}

export function getVrsVinRecallApi (vinArray) {
  let obj = {
    'chassis_number': vinArray.map(item => `'${item}'`).join().trim()
  }
  return axios
    .post(VRS_SEARCH, {
      mongo_query: GenerateMongoQueryStringMultipleIn(obj)
    })
    .then(response => {
      return response.data.ResponsePackage.data
    })
    .catch(err => {
      console.log(err)
    })
}

export function getVehicleByDocUUIDFromApi (docUUID) {
  return axios
    .post(VRS_SEARCH, {
      mongo_query: GenerateMongoQueryString({ 'docUUID': "'" + docUUID + "'", '_parentid': '{ $exists: false }' })
    })
    .then(response => {
      return response.data.ResponsePackage.data
    })
    .catch(err => {
      console.log(err)
    })
}

export function addNewPartialVrsApplicationApi (data) {
  return axios
    .post(VRS_SUBMIT_APPLICATION, data)
    .then(response => ({
      data: response.data.ResponsePackage,
      success: true
    }))
    .catch(err => {
      console.log(err)
    })
}

export function updateVrsApplicationApi (obj) {
  return axios
    .post(VRS_SUBMIT_UPDATE, obj)
    .then(() => ({
      success: true
    }))
    .catch(err => {
      console.log(err)
    })
}

export function getGenericVehicleReferenceDataFromApi (type) {
  const itemArray = [{ table_name: 'body' }, { table_name: 'make' }] // , { table_name: 'fee' }
  return axios
    .post(OPERATIONAL_QUERY, { table_query_list: itemArray })
    .then(response => {
      return response.data.ResponsePackage
    }).catch((err) => {
      console.log(err)
    })
}

export function getVrsSchedulerDetailsApi (data) {
  let obj = {
    body_category: data.body_category,
    over_25: data.over_25,
    body_sub_category: data.body_sub_category,
    modified: data.modified,
    hand_drive: data.hand_drive,
    type_approval: data.type_approval
  }
  return axios
    .post(VRS_APPOINTMENT_DETAILS, obj)
    .then(response => {
      return response.data.ResponsePackage
    }).catch((err) => {
      console.log(err)
    })
}
