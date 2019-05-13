import types from '../mutation-types'
import { createHelpers } from 'vuex-map-fields'

import {
  getVrsExactFromApi,
  getVrsListFromApi,
  addNewPartialVrsApplicationApi,
  updateVrsApplicationApi,
  getGenericVehicleReferenceDataFromApi,
  getVrsVinRecallApi,
  getVrsSchedulerDetailsApi
} from '../../api/vrsApi'

import {
  getRegistrationNoByTypeDataFromApi,
  setRegistrationNoStatusApi,
  getRetainedByIdApi
} from '../../api/registrationNoApi'

import {
  getVrsPdfFromStoreDataApi,
  getExportCertPdfFromStoreDataApi
} from '../../api/printApi'

import {
  getOwnerDetailsApi,
  setOwnerDetailsApi
} from '../../api/ownerApi'

import {
  sortStringArray,
  formatDate,
  convertToUnixLong,
  chunkArray,
  createBlobFromByteArray,
  getTodaysDate,
  isValueNull,
  concatValues,
  searchArray
} from '../../components/Functions/Functions.js'

import {
  ddlVrsStatus
} from '../../components/Functions/DropDownLists.js'

const getDefaultState = () => {
  return {
    step: 1,
    vrsRegexFieldsEnabled: null,
    vrsCheckedRow: null,
    isVrsLoading: null,
    vrsDataParameter: null,
    showVrsScheduleModal: false,
    showVrsReceiptModal: false,
    showOperationalModal: false,
    showVrsPreviewModal: false,
    showRegistrationNoSelectModal: false,
    useRetained: false,
    retainedList: [],
    manufactureDay: null,
    manufactureMonth: null,
    manufactureYear: null,
    vrsReceiptDocUUID: null,
    vrsReceiptStatus: null,
    vrsSearchList: [],
    vrsSelectedSearchData: [],
    vrsSelectedSearchDataDocUUID: null,
    vehicleManufacturers: [],
    vehicleBodyTypes: [],
    registrationNoSelect: [],
    vrsVinRecallArray: [],
    ownerIdDataVrs: [],
    vrsPreviewHistory: [],
    showFindOwnerButton: true,
    showRegisterOwnerButton: false,
    showOwnerIdDataVrs: false,
    isNewVrsApplication: null,
    isAdvancedSearch: false,
    vrs_search_rows: [{
      hiddenId: null,
      displayValue: null,
      parameterValue: null,
      tableData: [],
      tableVisible: false
    }],
    vrs_search: {
      exactRegNo: null,
      regNo: null,
      make: null,
      model: null,
      chassisNo: null,
      engineNo: null,
      surname: null
    },
    vrs_data: {
      docUUID: null,
      receiptNoInspection: null,
      owner_details: {
        ownerDocUUID: null,
        isCompany: null,
        title: null,
        forenames: null,
        initials: null,
        surname: null,
        dob: null,
        licenseNo: null,
        address1: null,
        address2: null,
        address3: null,
        parish: null,
        postCode: null,
        mobilePhone: null,
        homePhone: null,
        emailAddress: null
      },
      vehicle_details: {
        previouslyOwned: null,
        vehicleBodyType: null,
        vehicleMake: null,
        vehicleCategory: null,
        vehicleSubCategory: null,
        vehicleModel: null,
        previousRegNo: null,
        fuelType: null,
        primaryColour: null,
        firstEverRegDate: null,
        chassisNo: null,
        engineNo: null,
        isTypeApproved: false,
        typeApprovalNo: null,
        isLeftHandDrive: false,
        isOver25yrs: false,
        isModified: false
      }
    },
    vrsChangeOwnership: {
      isCompany: false,
      vehicleSearchData: [],
      vehicleData: [],
      showVehicleTable: false,
      vehicleDisabled: false,
      selectedVehicleDocUUID: null,
      ownerSearchData: [],
      ownerData: [],
      showOwnerTable: false,
      ownerDisabled: false,
      selectedOwnerId: null,
      vrdFromPart: null,
      changeOwnerAdditionalData: []
    }
  }
}

const { getVrsField, updateVrsField } = createHelpers({
  getterType: 'getVrsField',
  mutationType: 'updateVrsField'
})

const state = getDefaultState()

const actions = {
  async setIssueInitialVrsRegistrationData ({ state, commit, dispatch }, hasBeenRegistered) {
    let obj = {
      owner_docuuid: state.vrs_data.owner_details.ownerDocUUID,
      is_company: state.vrs_data.owner_details.isCompany,
      title: state.vrs_data.owner_details.title,
      forenames: state.vrs_data.owner_details.forenames,
      initials: state.vrs_data.owner_details.initials,
      surname: state.vrs_data.owner_details.surname,
      dob: convertToUnixLong(state.vrs_data.owner_details.dob),
      address_line_1: state.vrs_data.owner_details.address1,
      address_line_2: state.vrs_data.owner_details.address2,
      address_line_3: state.vrs_data.owner_details.address3,
      parish: state.vrs_data.owner_details.parish,
      postcode: state.vrs_data.owner_details.postCode,
      phone: state.vrs_data.owner_details.mobilePhone,
      landline: state.vrs_data.owner_details.landline,
      email: state.vrs_data.owner_details.emailAddress,
      previously_owned: state.vrs_data.vehicle_details.previouslyOwned,
      prev_reg_no: state.vrs_data.vehicle_details.previousRegNo,
      chassis_number: state.vrs_data.vehicle_details.chassisNo,
      make: state.vrs_data.vehicle_details.vehicleMake,
      model: state.vrs_data.vehicle_details.vehicleModel,
      date_of_first_registration: convertToUnixLong(state.vrs_data.vehicle_details.firstEverRegDate),
      primary_colour: state.vrs_data.vehicle_details.primaryColour,
      body_category: state.vrs_data.vehicle_details.vehicleCategory,
      body_sub_category: state.vrs_data.vehicle_details.vehicleSubCategory,
      body_type: state.vrs_data.vehicle_details.vehicleBodyType,
      type_of_fuel: state.vrs_data.vehicle_details.fuelType,
      type_approval: state.vrs_data.vehicle_details.isTypeApproved,
      type_approval_number: state.vrs_data.vehicle_details.typeApprovalNo,
      hand_drive: state.vrs_data.vehicle_details.isLeftHandDrive === true ? 'left' : 'right',
      over_25: state.vrs_data.vehicle_details.isOver25yrs,
      modified: state.vrs_data.vehicle_details.isModified,
      docUUID: state.vrs_data.docUUID,
      status: 'new',
      redact: false
    }
    let response = await addNewPartialVrsApplicationApi(obj)
    state.vrsSelectedSearchDataDocUUID = response.data.docUUID
    if (hasBeenRegistered) {
      if (response.success) {
        let receiptObj = {
          docUUID: response.data.docUUID,
          status: 'paymentconfirm'
        }
        commit(types.SET_RECEIPT_DETAILS, receiptObj)

        let schedulerObj = await getVrsSchedulerDetailsApi(obj)
        schedulerObj.inspection.docUUID = response.data.docUUID

        if (schedulerObj.inspection.duration > 0) {
          commit(types.SET_SLOT_AND_DURATION, schedulerObj.inspection)
          commit(types.SET_SHOW_HIDE_VRS_SCHEDULE_MODAL, true)
        } else {
          commit(types.SET_SHOW_HIDE_VRS_RECEIPT_MODAL, true)
        }

        return { redirect: false }
      }
    } else {
      if (response.success) {
        dispatch('getGenericVehicleReferenceData')
        commit(types.SET_VRS_ARRAY, response.data)
        return { redirect: true }
      }
    }
  },
  async setReceiptData ({ state, commit }, receiptNoInspection) {
    let obj = {
      docUUID: state.vrsReceiptDocUUID,
      status: state.vrsReceiptStatus
    }

    if (state.isNewVrsApplication) {
      obj.receipt_no_inspection = receiptNoInspection
    } else {
      obj.receipt_no_registration = receiptNoInspection
    }

    let response = await updateVrsApplicationApi(obj)
    if (response.success) {
      commit(types.SET_SHOW_HIDE_VRS_RECEIPT_MODAL, false)
      commit('resetVrsState')
    }
  },
  async setCompleteVrsRegistrationData ({ commit, state }) {
    let apiObj = {}
    let storeObj = state.vrsSelectedSearchData
    apiObj.docUUID = storeObj.docUUID
    // Miscellaneous
    apiObj.receipt_no_inspection = storeObj.miscellaneous.receiptNoInspection
    apiObj.receipt_no_registration = storeObj.miscellaneous.receiptNoRegistration
    apiObj.agent_code = storeObj.miscellaneous.agentCode
    apiObj.link_to_owner = storeObj.miscellaneous.linkToOwner
    apiObj.decl_no = storeObj.miscellaneous.declNo
    apiObj.duty_paid = storeObj.miscellaneous.dutyPaid
    // Registration Details
    apiObj.date_of_first_registration = convertToUnixLong(storeObj.registration_details.firstEverRegDate)
    apiObj.date_of_last_transfer = convertToUnixLong(storeObj.registration_details.date_of_last_transfer)
    apiObj.date_reg_in_jersey = convertToUnixLong(storeObj.registration_details.dateRegInJersey)
    apiObj.prev_reg_no = storeObj.registration_details.prevRegNo
    apiObj.prev_reg_no_date = convertToUnixLong(storeObj.registration_details.prevRegNoDate)
    apiObj.prev_reg_country = storeObj.registration_details.prevRegCountry
    // Owner Details
    apiObj.title = storeObj.owner_details.title
    apiObj.initials = storeObj.owner_details.initials
    apiObj.forenames = storeObj.owner_details.forenames
    apiObj.surname = storeObj.owner_details.surname
    apiObj.dob = convertToUnixLong(storeObj.owner_details.dob)
    apiObj.email = storeObj.owner_details.emailAddress
    apiObj.phone = storeObj.owner_details.mobilePhone
    apiObj.landline = storeObj.owner_details.homePhone
    apiObj.address_line_1 = storeObj.owner_details.address1
    apiObj.address_line_2 = storeObj.owner_details.address2
    apiObj.address_line_3 = storeObj.owner_details.address3
    apiObj.parish = storeObj.owner_details.parish
    apiObj.postcode = storeObj.owner_details.postCode
    apiObj.license_no = storeObj.owner_details.licenseNo
    apiObj.first_reg_on_vrd1 = storeObj.owner_details.firstRegOnVrd1
    apiObj.resale = storeObj.owner_details.isForSale
    apiObj.hire = storeObj.owner_details.isForHire
    // Vehicle Details
    apiObj.registration_number = storeObj.vehicle_details.regNo
    apiObj.previously_owned = storeObj.vehicle_details.previouslyOwned
    apiObj.body_category = storeObj.vehicle_details.vehicleCategory
    apiObj.body_sub_category = storeObj.vehicle_details.vehicleSubCategory
    apiObj.body_type = storeObj.vehicle_details.vehicleBodyType
    apiObj.make = storeObj.vehicle_details.vehicleMake
    apiObj.model = storeObj.vehicle_details.vehicleModel
    apiObj.vehicleManufactureDate = convertToUnixLong(storeObj.vehicle_details.vehicleManufactureDate)
    apiObj.width = storeObj.vehicle_details.vehicleWidth
    apiObj.length = storeObj.vehicle_details.vehicleLength
    apiObj.primary_colour = storeObj.vehicle_details.primaryColour
    apiObj.secondary_colour = storeObj.vehicle_details.secondaryColour
    apiObj.cylinder_capacity = storeObj.vehicle_details.cubicCapacity
    apiObj.transmission_type = storeObj.vehicle_details.transmission
    apiObj.co2 = storeObj.vehicle_details.co2
    apiObj.engine_number = storeObj.vehicle_details.engineNo
    apiObj.chassis_number = storeObj.vehicle_details.chassisNo
    apiObj.weight = storeObj.vehicle_details.weight
    apiObj.unladen_weight = storeObj.vehicle_details.unladenWeight
    apiObj.manufacture_year = storeObj.vehicle_details.manufactureYear
    apiObj.type_of_fuel = storeObj.vehicle_details.fuelType
    apiObj.door_no = storeObj.vehicle_details.doorNo
    apiObj.type_approval = storeObj.vehicle_details.isTypeApproved
    apiObj.type_approval_number = storeObj.vehicle_details.typeApprovalNo
    apiObj.mileage = storeObj.vehicle_details.odometer
    apiObj.seating_capacity = storeObj.vehicle_details.seatCapacity
    apiObj.over_25 = storeObj.vehicle_details.isOver25yrs
    apiObj.hand_drive = storeObj.vehicle_details.isLeftHandDrive === true ? 'left' : 'right'
    apiObj.modified = storeObj.vehicle_details.isModified
    // Comments
    apiObj.free_text = storeObj.comments.freeText
    apiObj.hidden_text = storeObj.comments.hidden
    apiObj.kit_built = storeObj.comments.kitBuilt
    apiObj.no_v55_not_new = storeObj.comments.noV55NotNew
    apiObj.p30 = storeObj.comments.p30

    let response = await updateVrsApplicationApi(apiObj)
    if (response) {
      console.log('Final Update Complete')

      let receiptObj = {}
      receiptObj.docUUID = storeObj.docUUID
      receiptObj.status = 'active'
      commit(types.SET_RECEIPT_DETAILS, receiptObj)
      // Beck becks
      commit(types.SET_SHOW_HIDE_VRS_RECEIPT_MODAL, true)
    }
  },
  async setVrsDataBySection ({ state, commit }, section) {
    let apiObj = {}
    let storeObj = state.vrsSelectedSearchData
    apiObj.docUUID = storeObj.docUUID
    apiObj.status = storeObj.registration_details.status === undefined ? 'active' : storeObj.registration_details.status
    switch (section) {
      case 'Miscellaneous':
        storeObj = storeObj.miscellaneous
        apiObj.receipt_no_inspection = storeObj.receiptNoInspection
        apiObj.receipt_no_registration = storeObj.miscellaneous.receiptNoRegistration
        apiObj.agent_code = storeObj.agentCode
        apiObj.link_to_owner = storeObj.linkToOwner
        apiObj.decl_no = storeObj.declNo
        apiObj.duty_paid = storeObj.dutyPaid
        break
      case 'RegistrationDetails':
        storeObj = storeObj.registration_details
        apiObj.status = storeObj.status
        apiObj.date_of_first_registration = convertToUnixLong(storeObj.firstEverRegDate)
        apiObj.date_of_last_transfer = convertToUnixLong(storeObj.date_of_last_transfer)
        apiObj.date_reg_in_jersey = convertToUnixLong(storeObj.dateRegInJersey)
        apiObj.prev_reg_no = storeObj.prevRegNo
        apiObj.prev_reg_no_date = convertToUnixLong(storeObj.prevRegNoDate)
        apiObj.prev_reg_country = storeObj.prevRegCountry
        break
      case 'OwnerDetails':
        storeObj = storeObj.owner_details
        apiObj.title = storeObj.title
        apiObj.initials = storeObj.initials
        apiObj.forenames = storeObj.forenames
        apiObj.surname = storeObj.surname
        apiObj.dob = convertToUnixLong(storeObj.dob)
        apiObj.email = storeObj.emailAddress
        apiObj.phone = storeObj.mobilePhone
        apiObj.landline = storeObj.homePhone
        apiObj.address_line_1 = storeObj.address1
        apiObj.address_line_2 = storeObj.address2
        apiObj.address_line_3 = storeObj.address3
        apiObj.parish = storeObj.parish
        apiObj.postcode = storeObj.postCode
        apiObj.license_no = storeObj.licenseNo
        apiObj.first_reg_on_vrd1 = storeObj.firstRegOnVrd1
        apiObj.resale = storeObj.isForSale
        apiObj.hire = storeObj.isForHire
        break
      case 'VehicleDetails':
        storeObj = storeObj.vehicle_details
        apiObj.registration_number = storeObj.regNo
        apiObj.previously_owned = storeObj.previouslyOwned
        apiObj.body_category = storeObj.vehicleCategory
        apiObj.body_sub_category = storeObj.vehicleSubCategory
        apiObj.body_type = storeObj.vehicleBodyType
        apiObj.make = storeObj.vehicleMake
        apiObj.model = storeObj.vehicleModel
        apiObj.vehicleManufactureDate = convertToUnixLong(storeObj.vehicleManufactureDate)
        apiObj.width = storeObj.vehicleWidth
        apiObj.length = storeObj.vehicleLength
        apiObj.primary_colour = storeObj.primaryColour
        apiObj.secondary_colour = storeObj.secondaryColour
        apiObj.cylinder_capacity = storeObj.cubicCapacity
        apiObj.transmission_type = storeObj.transmission
        apiObj.co2 = storeObj.co2
        apiObj.engine_number = storeObj.engineNo
        apiObj.chassis_number = storeObj.chassisNo
        apiObj.weight = storeObj.weight
        apiObj.unladen_weight = storeObj.unladenWeight
        apiObj.manufacture_year = storeObj.manufactureYear
        apiObj.type_of_fuel = storeObj.fuelType
        apiObj.door_no = storeObj.doorNo
        apiObj.type_approval = storeObj.isTypeApproved
        apiObj.type_approval_number = storeObj.typeApprovalNo
        apiObj.mileage = storeObj.odometer
        apiObj.seating_capacity = storeObj.seatCapacity
        apiObj.over_25 = storeObj.isOver25yrs
        apiObj.hand_drive = storeObj.isLeftHandDrive === true ? 'left' : 'right'
        apiObj.modified = storeObj.isModified
        break
      case 'Comment':
        storeObj = storeObj.comments
        apiObj.free_text = storeObj.freeText
        apiObj.hidden_text = storeObj.hidden
        apiObj.kit_built = storeObj.kitBuilt
        apiObj.no_v55_not_new = storeObj.noV55NotNew
        apiObj.p30 = storeObj.p30
        break
      default:
        console.log('Section: ' + section + ' is undefined for \'action\' setVrsDataBySection')
    }
    let response = await updateVrsApplicationApi(apiObj)
    if (response) {
      console.log('Update complete')
    }
  },
  async setChangeOfOwner ({ state, commit }, obj) {
    let response = await updateVrsApplicationApi(obj)
    if (response) {
      let regNoObj = {
        owner_docuuid: obj.docUUID,
        is_company: obj.is_company,
        classification: 'HELD',
        registrationnumber: obj.registration_number
      }
      let response2 = await setRegistrationNoStatusApi(regNoObj)
      if (response2) {
        console.log('It chuffing worked...')
        commit('resetVrsState')
      }
    }
  },
  async resetVrsDataBySection ({ state, commit }, section) {
    // let oldObj
    // if (state.vrsSearchList.length < 1) {
    let oldObj = state.vrsPreviewHistory
    // } else {
    //   oldObj = state.vrsSearchList.filter(a => a.docUUID === state.vrsCheckedRow)[0]
    // }
    let storeObj = state.vrsSelectedSearchData
    switch (section) {
      case 'Miscellaneous':
        storeObj = storeObj.miscellaneous
        storeObj.receiptNoInspection = oldObj.receipt_no_inspection
        storeObj.receiptNoRegistration = oldObj.receipt_no_registration
        storeObj.agentCode = oldObj.agent_code
        storeObj.linkToOwner = oldObj.link_to_owner
        storeObj.declNo = oldObj.decl_no
        storeObj.dutyPaid = oldObj.duty_paid
        break
      case 'RegistrationDetails':
        storeObj = storeObj.registration_details
        storeObj.status = oldObj.status
        storeObj.firstEverRegDate = formatDate(oldObj.date_of_first_registration)
        storeObj.dateRegInJersey = formatDate(oldObj.date_reg_in_jersey)
        storeObj.prevRegNo = oldObj.prev_reg_no
        storeObj.prevRegNoDate = formatDate(oldObj.prev_reg_no_date)
        storeObj.prevRegCountry = oldObj.prev_reg_country
        break
      case 'OwnerDetails':
        storeObj = storeObj.owner_details
        storeObj.title = oldObj.title
        storeObj.initials = oldObj.initials
        storeObj.forenames = oldObj.forenames
        storeObj.surname = oldObj.surname
        storeObj.dob = formatDate(oldObj.dob)
        storeObj.emailAddress = oldObj.email
        storeObj.mobilePhone = oldObj.phone
        storeObj.homePhone = oldObj.landline
        storeObj.address1 = oldObj.address_line_1
        storeObj.address2 = oldObj.address_line_2
        storeObj.address3 = oldObj.address_line_3
        storeObj.parish = oldObj.parish
        storeObj.postCode = oldObj.postcode
        storeObj.licenseNo = oldObj.license_no
        storeObj.firstRegOnVrd1 = oldObj.first_reg_on_vrd1
        storeObj.isForSale = oldObj.resale
        storeObj.isForHire = oldObj.hire
        break
      case 'VehicleDetails':
        storeObj = storeObj.vehicle_details
        storeObj.regNo = oldObj.registration_number
        storeObj.previouslyOwned = oldObj.previously_owned
        storeObj.vehicleCategory = oldObj.body_category
        storeObj.vehicleSubCategory = oldObj.body_sub_category
        storeObj.vehicleBodyType = oldObj.body_type
        storeObj.vehicleMake = oldObj.make
        storeObj.vehicleModel = oldObj.model
        storeObj.vehicleManufactureDate = oldObj.vehicleManufactureDate
        storeObj.vehicleWidth = oldObj.width
        storeObj.vehicleLength = oldObj.length
        storeObj.primaryColour = oldObj.primary_colour
        storeObj.secondaryColour = oldObj.secondary_colour
        storeObj.cubicCapacity = oldObj.cylinder_capacity
        storeObj.transmission = oldObj.transmission_type
        storeObj.co2 = oldObj.co2
        storeObj.engineNo = oldObj.engine_number
        storeObj.chassisNo = oldObj.chassis_number
        storeObj.weight = oldObj.weight
        storeObj.unladenWeight = oldObj.unladen_weight
        storeObj.manufactureYear = oldObj.manufacture_year
        storeObj.fuelType = oldObj.type_of_fuel
        storeObj.doorNo = oldObj.door_no
        storeObj.isTypeApproved = oldObj.type_approval
        storeObj.typeApprovalNo = oldObj.type_approval_number
        storeObj.odometer = oldObj.mileage
        storeObj.seatCapacity = oldObj.seating_capacity
        storeObj.isOver25yrs = oldObj.over_25
        storeObj.isLeftHandDrive = oldObj.hand_drive === 'left'
        storeObj.isModified = oldObj.modified
        break
      case 'Comment':
        storeObj = storeObj.comments
        storeObj.freeText = oldObj.free_text
        storeObj.hidden = oldObj.hidden_text
        storeObj.kitBuilt = oldObj.kit_built
        storeObj.noV55NotNew = oldObj.no_v55_not_new
        storeObj.p30 = oldObj.p30
        break
      default:
        console.log('Section: ' + section + ' is undefined for \'action\' setVrsDataBySection')
    }
  },
  async getVrsListData ({ state, commit }, wildCard) {
    let res
    if (state.vrs_search.exactRegNo !== null) {
      let obj = {
        'registration_number': state.vrs_search.exactRegNo.toUpperCase()
      }
      res = await getVrsExactFromApi(obj)
    } else {
      res = await getVrsListFromApi(state.isAdvancedSearch ? state.vrs_search_rows : state.vrs_search, state.isAdvancedSearch, wildCard)
    }
    commit(types.SET_VRS_SEARCH_LIST, res)
    return res
  },
  async getGenericVehicleReferenceData ({ state, commit }) {
    const res = await getGenericVehicleReferenceDataFromApi('Permanent_Exempt_Permit')
    if (res !== undefined) {
      let bodyTypeArray = [...new Set(res.body.map(function (item) {
        return item.body.replace(/[()]/g, '')
      }))]
      commit(types.SET_VEHICLE_BODY_TYPE_ARRAY, bodyTypeArray.sort(sortStringArray))

      let manufacturerArray = [...new Set(res.make.map(function (item) {
        return item.make
      }))]
      commit(types.SET_VEHICLE_MANUFACTURER_ARRAY, manufacturerArray.sort(sortStringArray))
    }
  },
  async setUpdatedVehicleDetails ({ state }) {
    let data = await updateVrsApplicationApi(state.vrsSelectedSearchData[0])
    return data
  },
  async actionVrsSearchByVinArray ({ commit }, vinArray) {
    if (vinArray.length > 50000) {
      let outputResult = []
      let chunkedArray = chunkArray(vinArray.split(','), 50000)
      const start = async () => {
        await asyncForEach(chunkedArray, async (out) => {
          const res = await getVrsVinRecallApi(out)
          res.forEach(function (obj) {
            outputResult.push(obj)
          })
        })
        commit(types.SET_VIN_RECALL_ARRAY, outputResult)
        commit(types.SET_VRS_LOADING, false)
      }
      start()
    } else {
      const res = await getVrsVinRecallApi(vinArray.split(','))
      commit(types.SET_VIN_RECALL_ARRAY, res)
      commit(types.SET_VRS_LOADING, false)
    }
  },
  async getRegistrationNoByTypeDataVrs ({ state, commit }, { regNoType, count }) {
    let str = regNoType + '/' + count + '/1'
    const res = await getRegistrationNoByTypeDataFromApi(str)
    return res
  },
  async getVrsPdfFromStoreData ({ state }) {
    const res = await getVrsPdfFromStoreDataApi(state.vrsSelectedSearchData)
    return createBlobFromByteArray(res)
  },
  async getExportVrsPdfFromStoreState ({ state }) {
    let stateObj = state.vrsSelectedSearchData
    let obj = {
      Date: getTodaysDate(),
      ReferenceNo: stateObj.docUUID,
      RegistrationNumber: isValueNull(stateObj.vehicle_details.regNo, '*'),
      VinChassisFrame: isValueNull(stateObj.vehicle_details.chassisNo, '*'),
      EngineNo: isValueNull(stateObj.vehicle_details.engineNo, '*'),
      Make: isValueNull(stateObj.vehicle_details.vehicleMake, '*'),
      Model: isValueNull(stateObj.vehicle_details.vehicleModel, '*'),
      BodyType: isValueNull(stateObj.vehicle_details.vehicleBodyType, '*'),
      Seats: isValueNull(stateObj.vehicle_details.seatCapacity, '*'),
      CC: isValueNull(stateObj.vehicle_details.cubicCapacity, '*'),
      TypeOfFuel: isValueNull(stateObj.vehicle_details.fuelType, '*'),
      Colour: isValueNull(stateObj.vehicle_details.primaryColour, '*'),
      Weight: isValueNull(stateObj.vehicle_details.weight, '*'),
      TypeApproval: isValueNull(stateObj.vehicle_details.typeApprovalNo, '*'),
      CO2: isValueNull(stateObj.vehicle_details.co2, '*'),
      Name: isValueNull(concatValues([stateObj.owner_details.title, stateObj.owner_details.forenames, stateObj.owner_details.surname], false), '*'),
      Address: isValueNull(concatValues([stateObj.owner_details.address1, stateObj.owner_details.address2, stateObj.owner_details.address3, stateObj.owner_details.parish, stateObj.owner_details.postCode], true), '*'),
      FirstReg: isValueNull(stateObj.registration_details.firstEverRegDate, '*'),
      RegDate: isValueNull(stateObj.registration_details.dateRegInJersey, '*'),
      Status: isValueNull(searchArray(stateObj.registration_details.status, ddlVrsStatus([])).value, '*'),
      Notes: isValueNull(stateObj.comments.freeText, '*')
    }
    const res = await getExportCertPdfFromStoreDataApi(obj)
    return createBlobFromByteArray(res)
  },
  async getOwnerIdDetailsVrs ({ state, commit }) {
    state.showOwnerIdDataVrs = false
    let isCompany = state.vrs_data.owner_details.title === 'Com'
    let obj
    if (isCompany) {
      obj = {
        business_name: state.vrs_data.owner_details.surname
      }
    } else {
      obj = {
        title: state.vrs_data.owner_details.title,
        forenames: state.vrs_data.owner_details.forenames,
        surname: state.vrs_data.owner_details.surname,
        dob: state.vrs_data.owner_details.dob
      }
    }
    let res = await getOwnerDetailsApi(obj, isCompany ? 'business' : 'people', true)
    if (res.length > 0) {
      if (res.length === 1) {
        if (isCompany) {
          state.vrs_data.owner_details.ownerDocUUID = res[0].business_id
          state.vrs_data.owner_details.surname = res[0].business_name
          state.vrs_data.owner_details.address1 = res[0].address_line_1
          state.vrs_data.owner_details.address2 = res[0].address_line_2
          state.vrs_data.owner_details.address3 = res[0].address_line_3
          state.vrs_data.owner_details.parish = res[0].parish
          state.vrs_data.owner_details.postCode = res[0].postcode
          state.showFindOwnerButton = false
        } else {
          state.vrs_data.owner_details.ownerDocUUID = res[0].people_id
          state.vrs_data.owner_details.title = res[0].title
          state.vrs_data.owner_details.forenames = res[0].forenames
          state.vrs_data.owner_details.surname = res[0].surname
          state.vrs_data.owner_details.address1 = res[0].address_line_1
          state.vrs_data.owner_details.address2 = res[0].address_line_2
          state.vrs_data.owner_details.address3 = res[0].address_line_3
          state.vrs_data.owner_details.parish = res[0].parish
          state.vrs_data.owner_details.postCode = res[0].postcode
          state.vrs_data.owner_details.dob = res[0].dob
          state.showFindOwnerButton = false
        }
      } else {
        state.vrs_data.owner_details.ownerDocUUID = null
        commit(types.SET_OWNER_ID_DATA_VRS, res)
        state.showOwnerIdDataVrs = true
      }
      return res
    } else {
      state.showRegisterOwnerButton = true
      state.showFindOwnerButton = false
      state.showOwnerIdDataVrs = true
    }
  },
  async setOwnerDetailsAndReturnIdForNewVrs ({ state }) {
    let obj
    let isCompany = state.vrs_data.owner_details.title === 'Com'
    if (isCompany) {
      obj = {
        business_id: '',
        business_name: state.vrs_data.owner_details.surname,
        address_line_1: state.vrs_data.owner_details.address1,
        address_line_2: state.vrs_data.owner_details.address2,
        address_line_3: state.vrs_data.owner_details.address3,
        parish: state.vrs_data.owner_details.parish,
        postcode: state.vrs_data.owner_details.postCode,
        isActive: 1
      }
    } else {
      obj = {
        people_id: '',
        surname: state.vrs_data.owner_details.surname,
        forenames: state.vrs_data.owner_details.forenames,
        initials: state.vrs_data.owner_details.initials,
        title: state.vrs_data.owner_details.title,
        address_line_1: state.vrs_data.owner_details.address1,
        address_line_2: state.vrs_data.owner_details.address2,
        address_line_3: state.vrs_data.owner_details.address3,
        parish: state.vrs_data.owner_details.parish,
        postcode: state.vrs_data.owner_details.postCode,
        isActive: 1
      }
    }
    let res = await setOwnerDetailsApi(obj, isCompany ? 'business' : 'people', false)
    if (res.success) {
      state.showRegisterOwnerButton = false
      state.showOwnerIdDataVrs = false
      state.vrs_data.owner_details.ownerDocUUID = isCompany ? res.business_id : res.people_id
    }
  },
  async getVrsRetainedRegNoByOwnerId ({ state, commit }) {
    // let res = await getRetainedByIdApi(state.vrsSelectedSearchData.is_company, 'RETAIN', state.vrsSelectedSearchData.owner_docuuid)
    let res = await getRetainedByIdApi(false, 'RETAINED', 327521)
    if (res.success) {
      let arr = []
      res.data.forEach(function (item) {
        arr.push(item.registrationnumber)
      })
      console.log(arr)
      commit(types.SET_RETAINED_TO_LIST, arr)
    }
  },
  setArrayToSelectedVrsRowData ({ state, commit }) {
    commit(types.SET_VRS_ARRAY, state.vrsSearchList.filter(a => a.docUUID === state.vrsCheckedRow)[0])
  },
  showHideVrsReceiptModal ({ commit }, value) {
    commit(types.SET_SHOW_HIDE_VRS_RECEIPT_MODAL, value)
  },
  showHideOperationalModal ({ commit }, value) {
    commit(types.SET_SHOW_HIDE_OPERATIONAL_MODAL, value)
  },
  showHideRegistrationNoSelectModal ({ commit }, value) {
    commit(types.SET_SHOW_HIDE_REGNO_MODAL, value)
  },
  setVrsDataParameter ({ commit }, value) {
    commit(types.SET_VRS_DATA_PARAMETER, value)
    commit(types.SET_SHOW_HIDE_OPERATIONAL_MODAL, true)
  },
  setVrsRegistrationNumber ({ commit, dispatch }, value) {
    dispatch('getRegistrationNoByTypeData', 'DEFAULT')
    commit(types.SET_VRS_DATA_PARAMETER, value)
    commit(types.SET_SHOW_HIDE_REGNO_MODAL, true)
  },
  setSpecificVrsData ({ commit }, value) {
    commit(types.SET_SPECIFIC_VRS_DATA, value)
  },
  resetVrs ({ commit }) {
    commit('resetVrsState')
  }
}

const mutations = {
  [types.UPDATE_VRS_STEP_VALUE] (state, isIncrement) {
    if (isIncrement) {
      state.step++
    } else {
      state.step--
    }
  },
  [types.SET_VRS_CHECKEC_ROW] (state, value) {
    state.vrsCheckedRow = value
  },
  [types.RESET_VRS_STEP_VALUE] (state) {
    state.step = 1
  },
  [types.SET_VEHICLE_BODY_TYPE_ARRAY] (state, bodyTypes) {
    state.vehicleBodyTypes = bodyTypes
  },
  [types.SET_REGNO_SELECTED_ARRAY] (state, regNos) {
    state.registrationNoSelect = regNos
  },
  [types.SET_VEHICLE_MANUFACTURER_ARRAY] (state, manufacturers) {
    state.vehicleManufacturers = manufacturers
  },
  [types.SET_SHOW_HIDE_VRS_SCHEDULE_MODAL] (state, value) {
    state.showVrsScheduleModal = value
  },
  [types.SET_VRS_SEARCH_LIST] (state, list) {
    state.vrsSearchList = list
    state.isVrsLoading = false
  },
  [types.SET_VRS_LOADING] (state, value) {
    state.isVrsLoading = value
  },
  [types.SET_RETAINED_TO_LIST] (state, array) {
    state.retainedList = array
  },
  async [types.SET_VRS_ARRAY] (state, rowData) {
    state.vrsPreviewHistory = rowData
    state.vrsSelectedSearchData = await MapFromApiObjToStoreObj(rowData)
    return state.vrsSelectedSearchData
  },
  [types.SET_VRS_DOCUUID] (state, docUUID) {
    state.vrs_data.docUUID = docUUID
  },
  [types.SET_SHOW_HIDE_VRS_RECEIPT_MODAL] (state, value) {
    state.showVrsReceiptModal = value
  },
  [types.SET_SHOW_HIDE_OPERATIONAL_MODAL] (state, value) {
    state.showOperationalModal = value
  },
  [types.SET_SHOW_HIDE_REGNO_MODAL] (state, value) {
    state.showRegistrationNoSelectModal = value
  },
  [types.SET_SHOW_VRS_PREVIEW_MODAL] (state, value) {
    state.showVrsPreviewModal = value
  },
  [types.SET_VRS_DATA_PARAMETER] (state, value) {
    state.vrsDataParameter = value
  },
  [types.SET_VIN_RECALL_ARRAY] (state, output) {
    state.vrsVinRecallArray = output
  },
  [types.SET_SPECIFIC_VRS_DATA] (state, value) {
    switch (state.vrsDataParameter) {
      case 'manufacturer':
        state.vrs_data.vehicle_details.vehicleMake = value
        break
      case 'bodyType':
        state.vrs_data.vehicle_details.vehicleBodyType = value
        break
      case 'regNo':
        state.vrsSelectedSearchData.vehicle_details.regNo = value
        break
      default:
        break
    }
  },
  [types.SET_RECEIPT_DETAILS] (state, obj) {
    state.vrsReceiptDocUUID = obj.docUUID
    state.vrsReceiptStatus = obj.status
  },
  [types.SET_OWNER_ID_DATA_VRS] (state, data) {
    state.ownerIdDataVrs = data
  },
  setVrsDataLoadingOn (state) {
    state.isVrsLoading = true
  },
  resetVrsState (state) {
    Object.assign(state, getDefaultState())
  },
  updateVrsField
}

const getters = {
  getIsVrsDataLoading (state) {
    return state.isVrsLoading
  },
  getVrsStep (state) {
    return state.step
  },
  getVrsRegStatus (state) {
    if (state.vrsSelectedSearchData.registration_details !== undefined) {
      return state.vrsSelectedSearchData.registration_details.status
    }
  },
  getIsVrsSearchNull (state) {
    if (state.isAdvancedSearch) {
      return (state.vrs_search_rows[0].hiddenId !== null && state.vrs_search_rows[0].parameterValue !== null)
    } else {
      return (state.vrs_search.exactRegNo || state.vrs_search.regNo || state.vrs_search.make || state.vrs_search.model || state.vrs_search.chassisNo || state.vrs_search.engineNo || state.vrs_search.surname)
    }
  },
  getCanChangeOwner (state) {
    return state.vrsChangeOwnership.vehicleDisabled && state.vrsChangeOwnership.ownerDisabled && (state.vrsChangeOwnership.vrdFromPart !== null) && (state.vrsChangeOwnership.changeOwnerAdditionalData.mileage !== undefined)
  },
  getVrsSearchCheckedId (state) {
    return state.vrsCheckedRow
  },
  getIsVrsSearchListEmpty (state) {
    if (state.vrsSearchList === undefined) {
      return false
    }
    return state.vrsSearchList.length > 0
  },
  getShowVrsScheduleModal (state) {
    return state.showVrsScheduleModal
  },
  getShowVrsReceiptModal (state) {
    return state.showVrsReceiptModal
  },
  getShowVrsPreviewModal (state) {
    return state.showVrsPreviewModal
  },
  getShowOperationalModal (state) {
    return state.showOperationalModal
  },
  getShowRegistrationNoSelectModal (state) {
    return state.showRegistrationNoSelectModal
  },
  getVrsField
}

export default {
  state,
  actions,
  mutations,
  getters
}

function MapFromApiObjToStoreObj (apiObj) {
  let firstRegDte = formatDate(apiObj.date_of_first_registration)
  let regInJsyDte = apiObj.date_reg_in_jersey !== undefined ? formatDate(apiObj.date_reg_in_jersey) : formatDate(new Date())
  let preNoRegDte = formatDate(apiObj.prev_reg_no_date)
  let dobDte = formatDate(apiObj.dob)

  let obj = {
    docUUID: apiObj.docUUID,
    miscellaneous: {
      receiptNoInspection: apiObj.receipt_no_inspection,
      receiptNoRegistration: apiObj.receipt_no_registration,
      agentCode: apiObj.agent_code,
      linkToOwner: apiObj.link_to_owner,
      declNo: apiObj.decl_no,
      dutyPaid: apiObj.duty_paid,
      dutyExemptionNo: apiObj.duty_exemption_no,
      code: apiObj.code
    },
    registration_details: {
      status: apiObj.status,
      firstEverRegDate: firstRegDte,
      dateRegInJersey: regInJsyDte,
      prevRegNo: apiObj.prev_reg_no,
      prevRegNoDate: preNoRegDte,
      prevRegCountry: apiObj.prev_reg_country
    },
    owner_details: {
      title: apiObj.title,
      initials: apiObj.initials,
      forenames: apiObj.forenames,
      surname: apiObj.surname,
      dob: dobDte,
      emailAddress: apiObj.email,
      mobilePhone: apiObj.phone,
      homePhone: apiObj.landline,
      address1: apiObj.address_line_1,
      address2: apiObj.address_line_2,
      address3: apiObj.address_line_3,
      parish: apiObj.parish,
      postCode: apiObj.postcode,
      licenseNo: apiObj.license_no,
      firstRegOnVrd1: apiObj.first_reg_on_vrd1,
      isForSale: apiObj.resale,
      isForHire: apiObj.hire
    },
    vehicle_details: {
      regNo: apiObj.registration_number,
      vehicleCategory: apiObj.body_category,
      vehicleBodyType: apiObj.body_sub_category,
      vehicleMake: apiObj.make,
      vehicleModel: apiObj.model,
      vehicleManufactureDate: apiObj.vehicleManufactureDate,
      vehicleWidth: apiObj.width,
      vehicleLength: apiObj.length,
      primaryColour: apiObj.primary_colour,
      secondaryColour: apiObj.secondary_colour,
      cubicCapacity: apiObj.cylinder_capacity,
      transmission: apiObj.transmission_type,
      co2: apiObj.co2,
      engineNo: apiObj.engine_number,
      chassisNo: apiObj.chassis_number,
      weight: apiObj.weight,
      unladenWeight: apiObj.unladen_weight,
      fuelType: apiObj.type_of_fuel,
      doorNo: apiObj.door_no,
      isTypeApproved: apiObj.type_approval,
      typeApprovalNo: apiObj.type_approval_number,
      odometer: apiObj.mileage,
      seatCapacity: apiObj.seating_capacity,
      isOver25yrs: apiObj.over_25,
      isLeftHandDrive: apiObj.hand_drive === 'left',
      isModified: apiObj.modified
    },
    comments: {
      freeText: apiObj.free_text,
      hidden: apiObj.hidden_text,
      kitBuilt: apiObj.kit_built,
      noV55NotNew: apiObj.no_v55_not_new,
      p30: apiObj.p30
    }
  }
  return obj
}

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
