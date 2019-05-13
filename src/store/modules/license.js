import types from '../mutation-types'

import { createHelpers } from 'vuex-map-fields'
// import { getLicenseUsersListFromApi } from '../../api/license'

const getDefaultState = () => {
  return {
    step: 1,
    license_search: {
      firstName: null,
      lastName: null,
      license_no: null,
      postCode: null
    },
    new_license: {
      firstName: null,
      lastName: null,
      title: null,
      dob: null,
      placeOfBirth: null,
      homeNo: null,
      mobileNo: null,
      emailAddress: null,
      address1: null,
      address2: null,
      address3: null,
      addressParish: null,
      addressPostCode: null,
      applicantLivedInJersey12: null,
      applicantEyeWear: null
    },
    licenseSearchUserList: [],
    selectedLicenseSearchData: [],
    checked: [],
    licenseLoading: false,
    licenseStatus: null
  }
}

const { getLicenseField, updateLicenseField } = createHelpers({
  getterType: 'getLicenseField',
  mutationType: 'updateLicenseField'
})

const state = getDefaultState()

const actions = {
  async getLicenseUserListData ({ state, commit }) {
    // const res = await getLicenseUsersListFromApi(state.search)
    let res = [
      {
        _id: '5bfd688bb78a1b0808f9fcf4',
        docUUID: '193',
        permit_type: 'Implements Permit',
        requires_test: 'N',
        permit_period: 'Indefinite',
        holder_id: '141',
        holder_number: '19',
        company_name: 'Raoul Le Miere',
        address_line_1: 'La Nouvelle Gallaise',
        address_line_2: 'Rue De Bas',
        post_code: 'JE3 1JG',
        parish: 'St. Lawrence',
        is_company: true,
        permit_number: 19,
        status: 'Active',
        permit_for_vehicle_or_person: 'P',
        end_date: '01/01/9000',
        issued_date: '01/01/2009',
        start_date: '01/01/2009',
        conditions: []
      },
      {
        _id: '5bfd688bb78a1b0808f9fcf5',
        docUUID: '2484',
        permit_type: 'Implements Permit',
        requires_test: 'N',
        permit_period: 'Indefinite',
        holder_id: '433',
        holder_number: '311',
        company_name: 'Le Pav Ltd',
        address_id: '33629',
        caf_id: '23860',
        address_line_1: 'LEcurie',
        address_line_2: '3 Eastview Farm',
        address_line_3: 'Rue De La Croiserie',
        post_code: 'JE3 5JT',
        parish: 'Trinity',
        is_company: true,
        permit_number: 2307,
        status: 'Active',
        permit_for_vehicle_or_person: 'P',
        end_date: '01/01/9000',
        issued_date: '03/07/2013',
        start_date: '21/06/2012',
        conditions: []
      },
      {
        _id: '5bfd688bb78a1b0808f9fcf6',
        docUUID: '3420',
        permit_type: 'Oversized Vehicle Permit',
        requires_test: 'Y',
        permit_period: 'Permanent',
        make: 'Renault',
        model: 'KERAX 320.27',
        body: 'Concrete Mixer',
        registration_number: 'J28894',
        vehicle_identification_number: 'VF633DVC000103560',
        holder_id: '226',
        holder_number: '104',
        title: '(Com)',
        company_name: 'Ronez Ltd',
        address_line_1: 'Ronez Quarries',
        address_line_2: 'La Route Du Nord',
        post_code: 'JE3 4AR',
        parish: 'St. John',
        is_company: true,
        jde_account_number: '1004523',
        permit_number: 3243,
        fminspect_test_id: '7040',
        status: 'Active',
        permit_for_vehicle_or_person: 'V',
        end_date: '01/01/2030',
        issued_date: '05/06/2014',
        start_date: '13/03/2014',
        oversize_route: '.',
        oversize_articles: '81',
        oversize_vehicle_height: 350,
        oversize_vehicle_length: 800,
        oversize_vehicle_width: 230,
        oversize_vehicle_gross_weight: 29000,
        wheel_plan: '3 Axle Rigid',
        conditions: [
          {
            condition_code: 'AW',
            condition_name: 'The gross weight of any axle must not exceed 10500kgs'
          },
          {
            condition_code: 'OW',
            condition_name: 'The overall width of the vehicle must not exceed 2300mm'
          },
          {
            condition_code: 'P3',
            condition_name: 'A copy of the permit to be carried by the driver'
          }
        ]
      },
      {
        _id: '5bfd688bb78a1b0808f9fcf7',
        docUUID: '4887',
        permit_type: 'Oversized Vehicle Permit',
        requires_test: 'Y',
        permit_period: 'Permanent',
        make: 'Renault',
        model: 'TWIZY COLOUR',
        body: 'Unknown',
        registration_number: 'J150562',
        vehicle_identification_number: 'VF1ACVYB047414005',
        holder_id: '592',
        holder_number: '470',
        title: 'Mr',
        company_name: 'Robins',
        forenames: 'Ian',
        address_id: '13164',
        caf_id: '12765',
        address_line_1: 'Villa Roncherez',
        address_line_2: 'La Grande Route De La Cote',
        post_code: 'JE2 6FW',
        parish: 'St. Clement',
        is_company: false,
        permit_number: 4710,
        fminspect_test_id: '8406',
        status: 'Active',
        permit_for_vehicle_or_person: 'V',
        end_date: '31/07/2036',
        issued_date: '26/08/2015',
        start_date: '26/08/2015',
        oversize_route: 'All roads',
        oversize_articles: 'The Inspector of Motor Traffic in pursuance of Article 78 of the Road Traffic (Jersey) Law 1956 hereby exempts the undermentioned vehicle from the provisions of Article(s) 35(1) of the Motor Vehicles ',
        oversize_vehicle_height: 150,
        oversize_vehicle_length: 234,
        oversize_vehicle_width: 140,
        oversize_vehicle_gross_weight: 1000,
        wheel_plan: '2 Axle Rigid',
        conditions: []
      },
      {
        _id: '5bfd688bb78a1b0808f9fcf8',
        docUUID: '7521',
        permit_type: 'Oversized Vehicle Permit',
        requires_test: 'Y',
        permit_period: 'Permanent',
        make: 'Cannon',
        model: 'SPYDER',
        body: 'Unknown',
        registration_number: 'J68573',
        vehicle_identification_number: '2BXJAXA179V002064',
        holder_id: '702',
        holder_number: '580',
        title: 'Mrs',
        company_name: 'Devenish',
        forenames: 'Sally',
        address_id: '281216',
        caf_id: '71903',
        address_line_1: 'Flat 1 Malvern Court',
        address_line_2: 'Paddock End',
        address_line_3: 'La Rue À Don',
        post_code: 'JE3 9DE',
        parish: 'Grouville',
        is_company: false,
        permit_number: 7344,
        fminspect_test_id: '10048',
        status: 'Active',
        permit_for_vehicle_or_person: 'V',
        end_date: '15/02/2057',
        issued_date: '15/02/2017',
        start_date: '15/02/2017',
        oversize_route: 'Open',
        oversize_articles: '48',
        oversize_vehicle_height: 150,
        oversize_vehicle_length: 267,
        oversize_vehicle_width: 156,
        oversize_vehicle_gross_weight: 1000,
        wheel_plan: '2 Axle Rigid',
        conditions: [
          {
            condition_code: 'G1',
            condition_name: 'The driver and any passengers in/on this vehicle must at all times wear a protective helmet.'
          },
          {
            condition_code: 'Q2',
            condition_name: 'This Permit is Not Transferable'
          }
        ]
      },
      {
        _id: '5bfd688bb78a1b0808f9fcf9',
        docUUID: '187',
        permit_type: 'Implements Permit',
        requires_test: 'N',
        permit_period: 'Indefinite',
        holder_id: '135',
        holder_number: '13',
        company_name: 'L W Pallot Farms Ltd',
        address_line_1: 'Vue Du Moulin',
        address_line_2: 'La Rue Du Pont',
        post_code: 'JE3 2DX',
        parish: 'St. Ouen',
        is_company: true,
        permit_number: 13,
        status: 'Active',
        permit_for_vehicle_or_person: 'P',
        end_date: '01/01/9000',
        issued_date: '01/01/2009',
        start_date: '01/01/2009',
        conditions: []
      },
      {
        _id: '5bfd688bb78a1b0808f9fcf9',
        docUUID: '189',
        permit_type: 'Implements Permit',
        requires_test: 'N',
        permit_period: 'Indefinite',
        holder_id: '135',
        holder_number: '13',
        company_name: 'A PIster Farms Ltd',
        address_line_1: 'Le Farm',
        address_line_2: 'La Rue',
        post_code: 'JE3 5XG',
        parish: 'Trinity',
        is_company: true,
        permit_number: 999,
        status: 'Suspended',
        permit_for_vehicle_or_person: 'P',
        end_date: '01/01/9000',
        issued_date: '01/01/2009',
        start_date: '01/01/2009',
        conditions: []
      }
    ]
    commit(types.SET_LICENSE_SEARCH_USER_LIST, res)
    return res
  },
  setArrayToSelectedLicenseRowData ({ state, commit }) {
    commit(types.SET_LICENSE_ARRAY_TO_SELECTED_ROW_DATA, state.licenseSearchUserList.filter(a => a.docUUID === state.checked))
  },
  resetLicense ({ commit }) {
    commit('resetLicenseState')
  }
}

const mutations = {
  [types.UPDATE_LICENSE_STEP_VALUE] (state, isIncrement) {
    if (isIncrement) {
      state.step++
    } else {
      state.step--
    }
  },
  [types.RESET_LICENSE_STEP_VALUE] (state) {
    state.step = 1
  },
  [types.SET_LICENSE_SEARCH_USER_LIST] (state, newUserList) {
    state.licenseSearchUserList = newUserList
    state.licenseLoading = false
  },
  [types.SET_LICENSE_ARRAY_TO_SELECTED_ROW_DATA] (state, rowData) {
    state.selectedLicenseSearchData = rowData
    state.selectedDocUUID = rowData[0].docUUID
    state.permitStatus = rowData[0].status
  },
  setLicenseDataLoadingOn (state) {
    state.licenseLoading = true
  },
  resetLicenseState (state) {
    Object.assign(state, getDefaultState())
  },
  updateLicenseField
}

const getters = {
  getLicenseStep (state) {
    return state.step
  },
  getIsLicenseSearchNull (state) {
    return (state.license_search.lastName || state.license_search.firstName || state.license_search.license_no || state.license_search.postCode)
  },
  getLicenseStatus (state) {
    return state.licenseStatus
  },
  getIsLicenseSearchListEmpty (state) {
    return state.licenseSearchUserList.length > 0
  },
  getIsLicenseDataLoading (state) {
    return state.licenseLoading
  },
  getLicenseSearchCheckedId (state) {
    return state.checked
  },
  getLicenseField
}

export default {
  state,
  actions,
  mutations,
  getters
}
