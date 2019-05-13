import { createHelpers } from 'vuex-map-fields'
import { getOwnerDetailsApi, setOwnerDetailsApi, updateOwnerDetailsApi } from '../../api/ownerApi'
import { getRetainedByIdApi } from '../../api/registrationNoApi'
import { toTitleCase, convertToUnixLong, formatDate } from '../../components/Functions/Functions.js'
// import types from '../mutation-types'

const getDefaultState = () => {
  return {
    showOwnerDetails: false,
    showOwnerNoDetailsFound: false,
    showCreateButton: false,
    showUpdateButton: false,
    retainedRegNo: [],
    heldRegNo: [],
    personSearchDetails: {
      forenames: null,
      surname: null
    },
    ownerPersonArray: [],
    ownerPersonRowChecked: null,
    ownerPerson: {},
    businessSearchDetails: {
      business_name: null,
      isMotorTrade: null
    },
    ownerBusinessArray: [],
    ownerBusinessRowChecked: null,
    ownerBusiness: {},
    assignedTradeLicenses: []
  }
}

const { getOwnerField, updateOwnerField } = createHelpers({
  getterType: 'getOwnerField',
  mutationType: 'updateOwnerField'
})

const state = getDefaultState()

const actions = {
  async getOwnerPeople ({ state }) {
    state.showOwnerDetails = false
    state.showOwnerNoDetailsFound = false
    state.showUpdateButton = false
    let res = await getOwnerDetailsApi(state.personSearchDetails, 'people', true)
    res.forEach(function (item) {
      item.forenames = toTitleCase(item.forenames)
      item.surname = toTitleCase(item.surname)
    })
    if (res.length > 0) {
      if (res.length === 1) {
        state.ownerPerson = res[0]
        if (state.ownerPerson.dob !== null) {
          state.ownerPerson.dob = formatDate(res[0].dob)
        }
        state.showOwnerDetails = true
        state.showUpdateButton = true
        let retained = await getRetainedByIdApi(false, 'RETAINED', state.ownerPerson.people_id)
        retained.data.forEach(function (item) {
          state.retainedRegNo.push(item.registrationnumber)
        })
        let held = await getRetainedByIdApi(false, 'HELD', state.ownerPerson.people_id)
        held.data.forEach(function (item) {
          state.heldRegNo.push(item.registrationnumber)
        })
      } else {
        state.ownerPersonArray = res
      }
    } else {
      state.showOwnerNoDetailsFound = true
    }
  },
  async createNewPerson ({ state, dispatch }) {
    let res = await setOwnerDetailsApi(state.ownerPerson, 'people', false)
    if (res.success) {
      dispatch('resetOwner')
    }
  },
  async updatePerson ({ state, dispatch }) {
    let arr = []
    let obj = {
      select: {
        people_id: state.ownerPerson.people_id
      },
      values: {
        title: state.ownerPerson.title,
        forenames: state.ownerPerson.forenames,
        initials: state.ownerPerson.initials,
        surname: state.ownerPerson.surname,
        address_line_1: state.ownerPerson.address_line_1,
        address_line_2: state.ownerPerson.address_line_2,
        address_line_3: state.ownerPerson.address_line_3,
        parish: state.ownerPerson.parish,
        postcode: state.ownerPerson.postcode,
        dob: convertToUnixLong(state.ownerPerson.dob),
        isActive: state.ownerPerson.isActive
      }
    }
    arr.push(obj)
    let res = await updateOwnerDetailsApi(arr, 'people')
    if (res.success) {
      dispatch('resetOwner')
    }
  },
  async selectOwnerPersonDetails ({ state }) {
    state.ownerPerson = state.ownerPersonArray.find(a => a.people_id === state.ownerPersonRowChecked)
    if (state.ownerPerson.dob !== null) {
      state.ownerPerson.dob = formatDate(state.ownerPerson.dob)
    }
    state.showOwnerDetails = true
    state.showUpdateButton = true
    state.ownerPersonArray = []
    let retained = await getRetainedByIdApi(false, 'RETAINED', state.ownerPersonRowChecked)
    retained.data.forEach(function (item) {
      state.retainedRegNo.push(item.registrationnumber)
    })
    let held = await getRetainedByIdApi(false, 'HELD', state.ownerPersonRowChecked)
    held.data.forEach(function (item) {
      state.heldRegNo.push(item.registrationnumber)
    })
  },
  async getOwnerBusinesses ({ state }) {
    state.showOwnerDetails = false
    state.showOwnerNoDetailsFound = false
    state.showUpdateButton = false

    let localIsMotorTrade = state.businessSearchDetails.isMotorTrade
    if (localIsMotorTrade !== null) {
      state.businessSearchDetails.isMotorTrade = localIsMotorTrade === 'true' ? 1 : 0
    }

    let res = await getOwnerDetailsApi(state.businessSearchDetails, 'business', true)
    res.forEach(function (item) {
      item.business_name = toTitleCase(item.business_name)
    })
    if (res.length > 0) {
      if (res.length === 1) {
        state.ownerBusiness = res[0]
        state.showOwnerDetails = true
        state.showUpdateButton = true
        state.assignedTradeLicenses = await getOwnerDetailsApi({
          owner_id: res[0].business_id
        }, 'tradelicense_pool', false)
      } else {
        state.ownerBusinessArray = res
      }
    } else {
      state.showOwnerNoDetailsFound = true
    }
  },
  async createNewBusiness ({ state, dispatch }) {
    let res = await setOwnerDetailsApi(state.ownerBusiness, 'business', false)
    if (res.success) {
      dispatch('resetOwner')
    }
  },
  async updateBusiness ({ state, dispatch }) {
    let arr = []
    let obj = {
      select: {
        business_id: state.ownerBusiness.business_id
      },
      values: {
        business_name: state.ownerBusiness.business_name,
        address_line_1: state.ownerBusiness.address_line_1,
        address_line_2: state.ownerBusiness.address_line_2,
        address_line_3: state.ownerBusiness.address_line_3,
        parish: state.ownerBusiness.parish,
        postcode: state.ownerBusiness.postcode,
        gstNumber: state.ownerBusiness.gstNumber,
        isMotorTrade: state.ownerBusiness.isMotorTrade,
        isActive: state.ownerBusiness.isActive
      }
    }
    arr.push(obj)
    let res = await updateOwnerDetailsApi(arr, 'business')
    if (res.success) {
      dispatch('resetOwner')
    }
  },
  async selectOwnerBusinessDetails ({ state }) {
    state.ownerBusiness = state.ownerBusinessArray.find(a => a.business_id === state.ownerBusinessRowChecked)
    state.showOwnerDetails = true
    state.showUpdateButton = true
    state.ownerBusinessArray = []
    state.assignedTradeLicenses = await getOwnerDetailsApi({
      owner_id: state.ownerBusiness.business_id
    }, 'tradelicense_pool', false)
  },
  resetOwner ({ commit }) {
    commit('resetOwnerState')
  }
}

const mutations = {
  resetOwnerState (state) {
    Object.assign(state, getDefaultState())
  },
  updateOwnerField
}

const getters = {
  getIsOwnerPersonArrayListEmpty (state) {
    if (state.ownerPersonArray === undefined) {
      return false
    }
    return state.ownerPersonArray.length > 0
  },
  getIsOwnerBusinessArrayListEmpty (state) {
    if (state.ownerBusinessArray === undefined) {
      return false
    }
    return state.ownerBusinessArray.length > 0
  },
  getOwnerField
}

export default {
  state,
  actions,
  mutations,
  getters
}
