import types from '../mutation-types'
import { createHelpers } from 'vuex-map-fields'
// import { getPermitByDocUUIDFromApi } from '../../api/permitApi'
import { getVehicleByDocUUIDFromApi } from '../../api/vrsApi'
import { formatDateTime } from '../../components/Functions/Functions.js'

import {
  amendScheduleDataApi,
  getScheduleDataByDateApi,
  getSearchDataFromApi,
  addScheduleDataApi,
  removeScheduleEntryApi
} from '../../api/scheduleApi'

const getDefaultState = () => {
  return {
    selectedSchedule: {
      registrationId: null,
      appointmentDuration: null,
      docUUID: null,
      originalAppointmentTime: null,
      appointmentTime: null,
      originalAppointmentDate: null,
      appointmentDate: null,
      slotType: null,
      originalWorkshopType: null,
      workshopType: null,
      surname: null,
      forname: null,
      permitType: null,
      free_text: null,
      vehicleMake: null,
      vehicleWeight: null,
      vehicleLength: null,
      vehicleWidth: null
    },
    searchData: [],
    checkedRow: null,
    scheduleDataArray: [],
    scheduleDate: new Date(),
    showSchedulerGrids: true,
    showSchedulerModal: false,
    showSchedulerAddModal: false,
    scheduleAvailableTimeSlot: [],
    schedulerLoading: false,
    isAppointmentDisabled: true,
    searchParameter: null,
    searchValue: null
  }
}

const { getSchedulerField, updateSchedulerField } = createHelpers({
  getterType: 'getSchedulerField',
  mutationType: 'updateSchedulerField'
})

const state = getDefaultState()

const actions = {
  async actionSetScheduleDataArray ({ commit, state }, showLoading) {
    state.schedulerLoading = showLoading
    const res = await getScheduleDataByDateApi(state.showSchedulerModal ? state.selectedSchedule.appointmentDate : state.scheduleDate)
    commit(types.SET_SCHEDULE_DATA_ARRAY, res)
    return res
  },
  async actionGetSelectedSchedule ({ commit, state }, value) {
    if (value !== null) {
      commit(types.SET_SELECTED_SCHEDULE, value)
      const vehicleData = await getVehicleByDocUUIDFromApi(value)
      if (vehicleData.length > 0) {
        commit(types.SET_SELECTED_SCHEDULE_VEHICLE_VEHICLE_DETAILS, vehicleData)
      }
      commit(types.SET_SHOW_SCHEDULER_DETAIL_MODAL, true)
    }
  },
  async actionAmendScheduleData ({ commit, state }) {
    let obj = {
      registrationId: state.selectedSchedule.registrationId,
      oldDate: GenerateDateTime(state.selectedSchedule.originalAppointmentDate, state.selectedSchedule.originalAppointmentTime),
      newDate: GenerateDateTime(state.selectedSchedule.appointmentDate, state.selectedSchedule.appointmentTime),
      workshopType: state.selectedSchedule.workshopType,
      appointmentType: state.selectedSchedule.slotType.substring(6)
    }
    const amend = await amendScheduleDataApi(obj)
    return amend
  },
  async actionAddScheduleData ({ commit, state }, appointmentType) {
    let obj = {
      registrationId: state.selectedSchedule.docUUID !== undefined ? state.selectedSchedule.docUUID : GenerateGuid(), // state.checkedRow this is what is needed instead of the GUID generated,
      date: GenerateDateTime(state.selectedSchedule.appointmentDate, state.selectedSchedule.appointmentTime),
      type: state.selectedSchedule.workshopType,
      duration: state.selectedSchedule.appointmentDuration
    }
    const add = await addScheduleDataApi(appointmentType, obj)
    return add
  },
  async getSearchData ({ state, commit }) {
    let obj = { [state.searchParameter]: state.searchValue }
    const res = await getSearchDataFromApi(obj)
    commit(types.SET_SEARCH_DATA, res)
    return res
  },
  async removeScheduleEntry ({ state, dispatch }) {
    let obj = {
      registrationId: state.selectedSchedule.registrationId.toString(),
      oldDate: formatDateTime(state.selectedSchedule.originalAppointmentDate, state.selectedSchedule.originalAppointmentTime).toString(),
      type: state.selectedSchedule.originalWorkshopType.toString()
    }
    const res = await removeScheduleEntryApi(obj)
    if (res.success) {
      dispatch('actionHideSchedulerDetailModal')
    }
  },
  actionHideSchedulerDetailModal ({ commit }) {
    commit(types.RESET_SELECTED_SCHEDULE)
    commit(types.SET_SHOW_SCHEDULER_DETAIL_MODAL, false)
  },
  actionHideSchedulerAddModal ({ commit }) {
    commit(types.RESET_SELECTED_SCHEDULE)
    commit(types.SET_SEARCH_PARAMETER, null)
    commit(types.SET_SEARCH_VALUE, null)
    commit(types.SET_SEARCH_DATA, [])
    commit(types.SET_SHOW_SCHEDULER_ADD_MODAL, false)
    commit(types.SET_CHECKED_ROW, null)
  },
  actionSetIsAppointmentDisabled ({ commit }, value) {
    commit(types.SET_IS_APPOINTMENT_DISABLED, value)
  },
  actionSetPickerToNewAppointmentDate ({ commit, state }) {
    commit(types.SET_SCHEDULE_DATE, state.selectedSchedule.appointmentDate)
  },
  resetScheduler ({ commit }) {
    commit('resetSchedulerState')
  }
}

const mutations = {
  [types.SET_SCHEDULE_DATA_ARRAY] (state, newScheduleDataArray) {
    state.scheduleDataArray = newScheduleDataArray
    state.schedulerLoading = false
  },
  [types.SET_SCHEDULE_DATE] (state, newScheduleDate) {
    state.scheduleDate = newScheduleDate
  },
  [types.SET_SCHEDULE_APPOINTMENT_DATE] (state, newScheduleAppointmentDate) {
    state.selectedSchedule.appointmentDate = newScheduleAppointmentDate
  },
  [types.SET_SELECTED_SCHEDULE] (state, item) {
    let obj = state.scheduleDataArray.filter(a => a.registrationid === item)[0]
    state.selectedSchedule.registrationId = item
    state.selectedSchedule.appointmentDuration = obj.appointment_duration
    state.selectedSchedule.originalAppointmentTime = obj.appointment_time
    state.selectedSchedule.appointmentTime = obj.appointment_time
    state.selectedSchedule.originalAppointmentDate = state.scheduleDate
    state.selectedSchedule.appointmentDate = state.scheduleDate
    state.selectedSchedule.slotType = obj.slot_type
    state.selectedSchedule.originalWorkshopType = obj.workshop_type
    state.selectedSchedule.workshopType = obj.workshop_type
    state.scheduleAvailableTimeSlot = [ obj.appointment_time ]
  },
  [types.SET_SELECTED_SCHEDULE_PERMIT_VEHICLE_DETAILS] (state, permitDetails) {
    state.selectedSchedule.permitType = permitDetails[0].permit_type
    state.selectedSchedule.vehicleMake = permitDetails[0].make
    state.selectedSchedule.vehicleLength = permitDetails[0].oversize_vehicle_length
    state.selectedSchedule.vehicleWidth = permitDetails[0].oversize_vehicle_width
  },
  [types.SET_SELECTED_SCHEDULE_VEHICLE_VEHICLE_DETAILS] (state, vehicleDetails) {
    state.selectedSchedule.vehicleMake = vehicleDetails[0].make
    state.selectedSchedule.registrationId = (vehicleDetails[0].registration_number !== undefined ? vehicleDetails[0].registration_number : vehicleDetails[0].prev_reg_no)
    state.selectedSchedule.forenames = vehicleDetails[0].forenames
    state.selectedSchedule.surname = vehicleDetails[0].surname
  },
  [types.RESET_SELECTED_SCHEDULE] (state) {
    state.selectedSchedule = {
      registrationId: null,
      appointmentDuration: null,
      originalAppointmentTime: null,
      appointmentTime: null,
      originalAppointmentDate: null,
      appointmentDate: null,
      slotType: null,
      workshopType: null,
      permitType: null,
      surname: null,
      forenames: null,
      vehicleMake: null,
      vehicleWeight: null,
      vehicleLength: null,
      vehicleWidth: null
    }
  },
  [types.SET_SHOW_SCHEDULER_DETAIL_MODAL] (state, showSchedulerDetailModalValue) {
    state.showSchedulerModal = showSchedulerDetailModalValue
    state.showSchedulerGrids = !showSchedulerDetailModalValue
  },
  [types.SET_SHOW_SCHEDULER_ADD_MODAL] (state, showSchedulerAddModalValue) {
    state.showSchedulerAddModal = showSchedulerAddModalValue
    state.showSchedulerGrids = !showSchedulerAddModalValue
  },
  [types.SET_SELECTED_SCHEDULE_WORKSHOP_TYPE] (state, workshopType) {
    state.selectedSchedule.workshopType = workshopType
  },
  [types.SET_SELECTED_TIME_SLOT] (state, timeSlot) {
    state.selectedSchedule.appointmentTime = timeSlot
  },
  [types.SET_SELECTED_DURATION] (state, duration) {
    state.selectedSchedule.appointmentDuration = duration
  },
  [types.SET_IS_APPOINTMENT_DISABLED] (state, value) {
    state.isAppointmentDisabled = value
  },
  [types.SET_SEARCH_PARAMETER] (state, value) {
    state.searchParameter = value
  },
  [types.SET_SEARCH_VALUE] (state, value) {
    state.searchValue = value
  },
  [types.SET_SEARCH_DATA] (state, value) {
    state.searchData = value
  },
  [types.SET_CHECKED_ROW] (state, value) {
    state.checkedRow = value
  },
  [types.SET_SLOT_AND_DURATION] (state, obj) {
    state.selectedSchedule.workshopType = obj.type
    state.selectedSchedule.appointmentDuration = obj.duration
    state.selectedSchedule.docUUID = obj.docUUID
  },
  setSchedulerDataLoadingOn (state) {
    state.schedulerLoading = true
  },
  resetSchedulerState (state) {
    Object.assign(state, getDefaultState())
  },
  updateSchedulerField
}

const getters = {
  getScheduleDataArrayRamp (state) {
    return GenerateScheduleArray(state.scheduleDataArray, 'RAMP', ['00', '15', '30', '45'])
  },
  getScheduleDataArrayPit (state) {
    return GenerateScheduleArray(state.scheduleDataArray, 'PIT', ['00', '15', '30', '45'])
  },
  getScheduleDataArrayMotorcycle (state) {
    return GenerateScheduleArray(state.scheduleDataArray, 'MOTORCYCLE', ['00', '15', '30', '45'])
  },
  getScheduleAvailableTimeSlot (state) {
    let appointmentDuration = state.selectedSchedule.appointmentDuration
    if (appointmentDuration !== null) {
      let hourBreakdownArray = ['00', '15', '30', '45']
      return GenerateScheduleTimeSlotArray(state.scheduleDataArray, state.selectedSchedule.workshopType, hourBreakdownArray, state.isAppointmentDisabled, state.selectedSchedule)
    }
  },
  getShowSchedulerGrid (state) {
    return state.showSchedulerGrids
  },
  getShowSchedulerModal (state) {
    return state.showSchedulerModal
  },
  getShowAddSchedulerModal (state) {
    return state.showSchedulerAddModal
  },
  getSearchData (state) {
    return state.searchData
  },
  getIsSearchDataEmpty (state) {
    return state.searchData.length > 0
  },
  getSchedulerField
}

function GenerateScheduleArray (dataArrayInput, workshopType, hourBreakdown) {
  let output = []
  if (dataArrayInput === undefined) {
    return output
  }
  for (let i = 8; i < 17; i++) {
    for (let j = 0; j < hourBreakdown.length; j++) {
      output.push(
        {
          tag: ((i < 10 ? '0' + i : i) + hourBreakdown[j]),
          color: '#dcdcdc',
          type: 'circle',
          htmlMode: true,
          content: `<div class="scheduleElementEmpty"></div>`,
          registrationId: null
        })
    }
  }
  return InsertArrayEntries(output, FilterDataArrayByWorkShopType(dataArrayInput, workshopType))
}

function InsertArrayEntries (emptyScheduleArray, filteredData) {
  if (filteredData.length === 0) {
    return emptyScheduleArray
  }
  let outputComplete = emptyScheduleArray
  for (let i = 0; i < filteredData.length; i++) {
    let time = filteredData[i].appointment_time
    let duration = parseInt(filteredData[i].appointment_duration)
    // let durationInt = duration / hourBreakdown
    let durationInt = duration / 15
    // let adjTime = TimeEntry(time)
    let slotType = DetermineSlotTypeClass(filteredData[i].slot_type)
    const index = emptyScheduleArray.findIndex(x => x.tag === time)
    outputComplete.splice(index, Math.round(durationInt))
    outputComplete.push({
      tag: time,
      color: 'orange',
      type: 'circle',
      htmlMode: true,
      // content: (durationInt % 1 !== 0)
      //   ? CreateEntryForQuarterHtml(time, duration, slotType)
      //   : CreateEntryHtml(durationInt, duration, slotType),
      content: CreateEntryHtml(durationInt, duration, slotType),
      registrationId: filteredData[i].registrationid
    })
  }
  return outputComplete.sort(Compare)
}

// function TimeEntry (time) {
//   let minutes = time.toString().substring(2, 4)
//   if (minutes.includes('15')) {
//     return time.replace('15', '00')
//   } else if (minutes.includes('45')) {
//     return time.replace('45', '30')
//   } else {
//     return time
//   }
// }

function Compare (a, b) {
  return (a.tag < b.tag) ? -1 : (a.tag > b.tag) ? 1 : 0
}

function GenerateScheduleTimeSlotArray (dataArrayInput, workshopType, hourBreakdown, isChange, selectedSchedule) {
  let output = []
  if (dataArrayInput === undefined) {
    return output
  }
  for (let i = 8; i <= 16; i++) {
    for (let j = 0; j < hourBreakdown.length; j++) {
      output.push((i < 10 ? '0' + i : i) + hourBreakdown[j])
    }
  }
  return RemoveArrayEntries(output, isChange ? [] : FilterDataArrayByWorkShopType(dataArrayInput, workshopType), hourBreakdown.length, selectedSchedule)
}

function RemoveArrayEntries (emptyScheduleArray, arrayEntriesToRemove, hourBreakdownInt, selectedSchedule) {
  if (arrayEntriesToRemove.length === 0) {
    return emptyScheduleArray
  }
  let outputComplete = emptyScheduleArray
  for (let i = 0; i < arrayEntriesToRemove.length; i++) {
    let arrayDuration = parseInt(arrayEntriesToRemove[i].appointment_duration)
    let eventDuration = parseInt(selectedSchedule.appointmentDuration)
    let duration = eventDuration > arrayDuration ? eventDuration : arrayDuration // parseInt(selectedSchedule.appointmentDuration)
    let adjTime = arrayEntriesToRemove[i].appointment_time
    // if (duration > 15) {
    //   // let time = arrayEntriesToRemove[i].appointment_time
    //   adjTime = TimeEntry(adjTime)
    // }
    let durationInt = DetermineNumberArrayEntriesToRemove(duration)
    if (selectedSchedule.originalWorkshopType !== selectedSchedule.workshopType || selectedSchedule.originalAppointmentTime !== adjTime) { // && selectedSchedule.originalAppointmentTime !== adjTime
      if (selectedSchedule !== undefined && (selectedSchedule.appointmentDuration > 15) && (selectedSchedule.appointmentTime !== adjTime) && (parseInt(selectedSchedule.appointmentDuration) >= parseInt(duration))) {
        let updatedTime = AdjustTimeForSchedulerAmendment(adjTime, outputComplete, eventDuration)
        adjTime = updatedTime.time
        // durationInt = (duration === 15 && adjTime === '0800') ? 1 : (durationInt + updatedTime.durationIntAdj)
        durationInt = (durationInt + updatedTime.durationIntAdj)
      }
      outputComplete.splice(emptyScheduleArray.indexOf(adjTime.toString()), durationInt)
    }
  }
  return outputComplete
}

function AdjustTimeForSchedulerAmendment (adjTime, array, duration) {
  let hour = adjTime.toString().substring(0, 2)
  let minutes = adjTime.toString().substring(2, 4)
  let adjustment = DetermineAdjustmentMinutes(duration, minutes)
  let newTime = ''
  switch (minutes) {
    case '00':
      newTime = RoundTimeToFourDigits(parseInt(hour) - 1, adjustment)
      break
    case '15':
      newTime = RoundTimeToFourDigits(parseInt(hour) - 1, adjustment)
      break
    case '30':
      newTime = RoundTimeToFourDigits(hour, adjustment)
      break
    case '45':
      newTime = RoundTimeToFourDigits(hour, adjustment)
      break
  }
  // if (minutes === '30' || minutes === '45') {
  //   newTime = hour + '00'
  // } else {
  //   newTime = (parseInt(hour) - 1).toString() + '30'
  // }
  if (array.includes(newTime) && adjTime !== '0800') {
    return {
      time: newTime,
      durationIntAdj: newTime === '0800' ? 1 : DurationDeterminedAdjustment(duration)
    }
  } else {
    return {
      time: adjTime,
      durationIntAdj: 0
    }
  }
}

/**
 * @return {number}
 */
function DetermineNumberArrayEntriesToRemove (duration) {
  switch (duration) {
    case 15:
      return 1
    case 30:
      return 2
    case 60:
      return 4
    case 90:
      return 8
    case 240:
      return 16
    case 330:
      return 22
    default:
      console.log('Duration: ' + duration + ' is not a valid value')
  }
  //
  // if (duration === 240) {
  //   return hourBreakdownInt === 4 ? 16 : 8
  // }
  // if (hourBreakdownInt === 4) {
  //   return duration === 60 ? 4 : duration === 30 ? 2 : 1
  // }
  // return duration === 60 ? 2 : 1
}

function GenerateDateTime (date, time) {
  let format = require('date-format')
  let hours = parseInt(time.toString().substring(0, 2))
  let minutes = parseInt(time.toString().substring(2, 4))
  let dte = format('yyyy-MM-dd hh:mm', new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes))
  return dte
}

function FilterDataArrayByWorkShopType (dataArrayInput, workshopType) {
  if (dataArrayInput !== undefined) {
    return dataArrayInput.filter(function (dataArray) {
      return dataArray.workshop_type === workshopType
    })
  }
}

/**
 * @return {string}
 */
function RoundTimeToFourDigits (hour, min) {
  if (hour === 7) {
    return '0800'
  }
  let hr = hour
  if (parseInt(hr) < 10) {
    hr = '0' + hr
  }
  return hr + min
}

/**
 * @return {number}
 */
function DurationDeterminedAdjustment (duration) {
  switch (duration) {
    case 15:
      return 0
    case 30:
      return 1
    case 60:
    default:
      return 2
  }
}

/**
 * @return {string}
 */
function DetermineAdjustmentMinutes (duration, minutes) {
  let output
  switch (duration) {
    case 15:
      output = minutes // Math.abs(parseInt(minutes)).toString()
      break
    case 30:
      output = Math.abs(parseInt(minutes) + 15).toString()
      break
    default:
      output = Math.abs(parseInt(minutes) + 30).toString()
      break
  }
  return output === '60' ? '00' : output
}

/**
 * @return {string}
 */
function CreateEntryHtml (durationInt, duration, slotTypeClass) {
  return `<div class="scheduleElement scheduleElement${durationInt} ${slotTypeClass}"><div class="schedule-entry"><b>Duration:</b> ${duration} minutes<br /></div></div>`
}

/**
 * @return {string}
 */
// function CreateEntryForQuarterHtml (time, duration, slotType) {
//   if (time.toString().includes('15') || time.toString().includes('45')) {
//     return `<div class="scheduleElementEmpty05"></div><div class="scheduleElement scheduleElement05 ${slotType}"><div class="schedule-entry"><b>Duration:</b> ${duration} minutes</div></div>`
//   } else {
//     return `<div class="scheduleElement scheduleElement05 ${slotType}"><div class="schedule-entry"><b>Duration:</b> ${duration} minutes</div></div><div class="scheduleElementEmpty05"></div>`
//   }
// }

/**
 * @return {string}
 */
function GenerateGuid () {
  let d = new Date().getTime()
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now()
  }
  let newGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })

  return newGuid
}

/**
 * @return {string}
 */
function DetermineSlotTypeClass (slotType) {
  switch (slotType) {
    case 'class je.dvs.echo.domain.BookedVrsSlot':
      return 'scheduleElementVrs'
    case 'class je.dvs.echo.domain.BookedP30Slot':
    default:
      return 'scheduleElementP30'
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
