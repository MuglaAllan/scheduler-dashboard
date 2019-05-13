import axios from 'axios'
import Vue from 'vue'
import config from '../../config'
// import { AuthenticationContext } from 'vue-adal'

const env = config.active()

axios.interceptors.response.use((res) => {
  const data = res
  // If message successful, remove data wrapper
  if (data.ResponseMessage === 'ok') {
    return data.ResponsePackage
  }
  return data
}, (err) => {
  Vue.prototype.$notify({
    title: 'Error',
    text: err.response.data.ResponseMessage,
    type: 'error'
  })
  return Promise.reject(err.response.data)
})

// axios.interceptors.request.use(function (config) {
//   AuthenticationContext.acquireToken('f3088b8c-dd36-4051-8ec1-6e9340b1d9e7', (err, token) => {
//     if (err) {
//       let errCode = err.split(':')[0]
//       switch (errCode) {
//         case 'AADSTS50058': // Need to prompt for user sign in
//           AuthenticationContext.login()
//           break
//         case 'AADSTS65001': // Token is invalid; grab a new one
//           AuthenticationContext.acquireTokenRedirect('f3088b8c-dd36-4051-8ec1-6e9340b1d9e7')
//           break
//         case 'AADSTS16000': // No Access
//         default:
//           // Need a pop-up forcing a login
//           AuthenticationContext.login()
//           break
//       }
//       return
//     }
//     config.headers = {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + token
//     }
//   })
//   return config
// }, function (error) {
//   return Promise.reject(error)
// })

export default {
  JSON_PLACEHOLDER: env.JSON_PLACEHOLDER,
  OAUTH: env.OAUTH,
  PERMIT_QUERY: env.PERMIT_QUERY,
  PERMIT_STATUS_CHANGE: env.PERMIT_STATUS_CHANGE,
  PERMIT_DOCUMENT_UPDATE: env.PERMIT_DOCUMENT_UPDATE,
  SCHEDULE_QUERY: env.SCHEDULE_QUERY,
  SCHEDULE_UPDATE: env.SCHEDULE_UPDATE,
  SCHEDULE_ADD_NEW: env.SCHEDULE_ADD_NEW,
  SCHEDULE_REMOVE: env.SCHEDULE_REMOVE,
  MAHA_STATUS_UPDATE: env.MAHA_STATUS_UPDATE,
  MAHA_STATUS_RECORDS: env.MAHA_STATUS_RECORDS,
  OPERATIONAL_QUERY: env.OPERATIONAL_QUERY,
  OPERATION_UPDATE_FEE: env.OPERATION_UPDATE_FEE,
  OPERATIONAL_INSERT: env.OPERATIONAL_INSERT,
  OPERATIONAL_UPDATE: env.OPERATIONAL_UPDATE,
  OPERATIONAL_SEARCH: env.OPERATIONAL_SEARCH,
  VRS_SEARCH: env.VRS_SEARCH,
  VRS_SUBMIT_APPLICATION: env.VRS_SUBMIT_APPLICATION,
  VRS_SUBMIT_UPDATE: env.VRS_SUBMIT_UPDATE,
  VRS_APPOINTMENT_DETAILS: env.VRS_APPOINTMENT_DETAILS,
  REG_NO_HISTORY: env.REG_NO_HISTORY,
  REG_NO_CLASSIFICATION: env.REG_NO_CLASSIFICATION,
  REG_NO_RANGE_BY_CLASSIFICATION: env.REG_NO_RANGE_BY_CLASSIFICATION,
  REG_NO_UPDATE_STATUS: env.REG_NO_UPDATE_STATUS,
  REG_NO_BULK_UPDATE_STATUS: env.REG_NO_BULK_UPDATE_STATUS,
  REG_NO_GET_T_NUMBER: env.REG_NO_GET_T_NUMBER,
  REG_NO_EXCHANGE: env.REG_NO_EXCHANGE,
  REG_NO_RETAIN_CHANGE: env.REG_NO_RETAIN_CHANGE,
  REG_NO_RETAINED_BY_OWNER_ID: env.REG_NO_RETAINED_BY_OWNER_ID,
  PRINT_VRS: env.PRINT_VRS,
  PRINT_EXPORT: env.PRINT_EXPORT,
  PRINT_TRADE: env.PRINT_TRADE,
  OWNER_ID_SEARCH: env.OWNER_ID_SEARCH
}

/**
 * @return {string}
 */
export function GenerateMongoQueryStringWildCard (target) {
  let keyList = GetKeyListWithValuesFromArray(target)

  if (keyList.length <= 1) {
    return `{ ${keyList[0]}: { '$regex': '${target[keyList[0]]}', '$options': 'i' }}`
  } else {
    let outputString = []
    for (let key in keyList) {
      outputString.push(`{ ${keyList[key]}: { '$regex': '${target[keyList[key]]}', '$options': 'i' } }`)
    }
    outputString = outputString.join(', ').toString()
    return '{$and:[' + outputString + ']}'
  }
}

/**
 * @return {string}
 */
export function GenerateMongoQueryString (target) {
  let keyList = GetKeyListWithValuesFromArray(target)
  if (keyList.length <= 1) {
    return `{ ${keyList[0]}: ${target[keyList[0]]} }`
  } else {
    let outputString = []
    for (let key in keyList) {
      outputString.push(`{ ${keyList[key]}: ${target[keyList[key]]} }`)
    }
    outputString = outputString.join(', ').toString()
    return '{$and:[' + outputString + ']}'
  }
}

export function GenerateSQLQueryString (target, table, isSelect) {
  let wildCard = isSelect ? '%' : ''
  let keyList = GetKeyListWithValuesFromArray(target)
  let outputString = []
  for (let key in keyList) {
    if (typeof (target[keyList[key]]) === 'boolean') {
      wildCard = ''
    }
    outputString.push(`{ "key":"${keyList[key]}", "value":"${target[keyList[key]] + wildCard}" }`)
  }
  outputString = outputString.join(', ').toString()

  return JSON.parse('{ "table_query_list" : [ { "table_name" : "' + table + '" }, ' + outputString + ' ] }')
}

export function GenerateSQLQuerySelectString (target, table, isSelect) {
  let wildCard = isSelect ? '%' : ''
  let keyList = GetKeyListWithValuesFromArray(target)
  let outputString = []
  for (let key in keyList) {
    if (typeof (target[keyList[key]]) === 'boolean') {
      wildCard = ''
    }
    outputString.push(`{ "key":"${keyList[key]}", "value":"${target[keyList[key]] + wildCard}" }`)
  }
  outputString = outputString.join(', ').toString()

  return JSON.parse('{ "table_query_list" : [ { "table_name" : "' + table + '" }, ' + outputString + ' ] }')
}

export function GenerateSQLQueryUpdateString (target, table) {
  let keyListSelect = GetKeyListWithValuesFromArray(target[0].select)
  let outputStringSelect = []
  for (let key in keyListSelect) {
    outputStringSelect.push(`{ "key":"${keyListSelect[key]}", "value":"${target[0].select[keyListSelect[key]]}" }`)
  }
  outputStringSelect = outputStringSelect.join(', ').toString()

  let keyListValues = GetKeyListWithValuesFromArray(target[0].values)
  let outputStringValues = []
  for (let key in keyListValues) {
    outputStringValues.push(`{ "key":"${keyListValues[key]}", "value":"${target[0].values[keyListValues[key]]}" }`)
  }
  outputStringValues = outputStringValues.join(', ').toString()

  return JSON.parse('{ "table_query_list" : [ { "table_name" : "' + table + '" }, ' + outputStringSelect + ' ], "update_keys":[ ' + outputStringValues + '] }')
}

/**
 * @return {string}
 */
export function GenerateMongoQueryStringMultipleIn (target) {
  let keyList = GetKeyListWithValuesFromArray(target)
  return `{ ${keyList[0]}: { $in: [${target[keyList[0]]}] }}`
}

function GetKeyListWithValuesFromArray (array) {
  let keyList = []
  for (let member in array) {
    if (array[member] != null) {
      keyList.push(member)
    }
  }
  return keyList
}
