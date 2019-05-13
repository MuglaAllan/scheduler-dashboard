import axios from 'axios'
import base, {
  GenerateMongoQueryString,
  GenerateMongoQueryStringWildCard
} from './base'

const {
  PERMIT_QUERY,
  PERMIT_DOCUMENT_UPDATE,
  MAHA_STATUS_RECORDS,
  MAHA_STATUS_UPDATE
} = base

axios.defaults.crossDomain = true
axios.defaults.headers.get['access-control-allow-origin'] = '*'

export function getUsersListFromApi (searchState) {
  let obj
  let isPermitNoSearch = searchState.permitNo !== null
  if (isPermitNoSearch) {
    obj = {
      'permit_number': searchState.permitNo
    }
  } else {
    obj = {
      'docUUID': searchState.ref,
      'forenames': searchState.firstName,
      'surname': searchState.lastName,
      'company_name': searchState.companyName,
      'post_code': searchState.postCode,
      'registration_number': searchState.vehicleRegistration
    }
  }
  return axios
    .post(PERMIT_QUERY, {
      mongo_query: isPermitNoSearch ? GenerateMongoQueryString(obj) : GenerateMongoQueryStringWildCard(obj)
    })
    .then(response => {
      return response.data.ResponsePackage.data
    })
    .catch(err => {
      console.log(err)
    })
}

export function getPermitsInQueueFromApi () {
  return axios
    .post(PERMIT_QUERY, {
      mongo_query: GenerateMongoQueryString({ 'status': "{ $in: ['New', 'Renew'] }" }) // { 'permit_number': "'0'" }
    })
    .then(response => {
      return response.data.ResponsePackage.data
    })
    .catch(err => {
      console.log(err)
    })
}

export function getMahaStatusRecordsFromApi () {
  return axios
    .get(MAHA_STATUS_RECORDS)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export function getPermitsSuspendedFromApi () {
  return axios
    .post(PERMIT_QUERY, {
      mongo_query: GenerateMongoQueryString({ 'status': '"Suspended"' }) // { 'permit_number': "'0'" }
    })
    .then(response => {
      return response.data.ResponsePackage.data
    })
    .catch(err => {
      console.log(err)
    })
}

export function getPermitByDocUUIDFromApi (docUUID) {
  return axios
    .post(PERMIT_QUERY, {
      mongo_query: GenerateMongoQueryString({ 'docUUID': "'" + docUUID + "'", '_parentid': '{ $exists: false }' })
    })
    .then(response => {
      return response.data.ResponsePackage.data
    })
    .catch(err => {
      console.log(err)
    })
}

export function getMahaStatusByDocUUIDFromApi (docUUID) {
  return axios
    .post(PERMIT_QUERY, {
      mongo_query: GenerateMongoQueryString({ 'docUUID': "'" + docUUID + "'" })
    })
    .then(response => {
      return response.data.ResponsePackage.data
    })
    .catch(err => {
      console.log(err)
    })
}

export function getPermitsConditionsFromApi () {
  return [
    {
      condition_code: 'A',
      condition_name: 'Identification (P30) plates must be fitted to the front and rear of the vehicle.'
    },
    {
      condition_code: 'A1',
      condition_name: 'Identification (P30) plate must be fitted to the rear of the vehicle.'
    },
    {
      condition_code: 'A2',
      condition_name: 'Vehicle only to be used for agricultural or forestry purposes'
    },
    {
      condition_code: 'A3',
      condition_name: 'The maximum front axle weight per axle must not exceed 8500kg'
    },
    {
      condition_code: 'A4',
      condition_name: 'The Gross Weight of any rear axle must not exceed 9500kgs'
    },
    {
      condition_code: 'AW',
      condition_name: 'The gross weight of any axle must not exceed 10500kgs'
    },
    {
      condition_code: 'AX',
      condition_name: 'The Gross Weight of any axle must not exceed 12000kg'
    },
    {
      condition_code: 'B',
      condition_name: 'Vehicle may only travel on specified routes.'
    },
    {
      condition_code: 'B1',
      condition_name: 'Specified route can only be changed with a temporary permit'
    },
    {
      condition_code: 'B2',
      condition_name: 'Vehicle not permitted to use Havre des Pas and Mount Bingham - except for access'
    },
    {
      condition_code: 'B3',
      condition_name: 'Permission to be obtained for journeys outside the confines of the Elizabeth Terminal'
    },
    {
      condition_code: 'C',
      condition_name: 'Police escort required on all journeys.'
    },
    {
      condition_code: 'C0',
      condition_name: 'Police escort required when loaded'
    },
    {
      condition_code: 'C1',
      condition_name: 'Police escort on outward journey.Return journey between 0600 to 0730.'
    },
    {
      condition_code: 'C2',
      condition_name: 'Police escort on inward journey.Outward journey between 0600 to 0730.'
    },
    {
      condition_code: 'C3',
      condition_name: 'Police or Port Control escort required on all journeys. Private escort to be agreed with DVS'
    },
    {
      condition_code: 'C4',
      condition_name: 'Police escort on outward journey.Not required on return journey.'
    },
    {
      condition_code: 'C5',
      condition_name: 'Police escort on inward journey.Not required on outward journey.'
    },
    {
      condition_code: 'C6',
      condition_name: 'Private Escort as agreed with DVS'
    },
    {
      condition_code: 'C7',
      condition_name: 'Police escort required for journeys to Gorey fete and Jersey Live'
    },
    {
      condition_code: 'C8',
      condition_name: 'Police escort required'
    },
    {
      condition_code: 'C9',
      condition_name: 'Police escort and temporary P30 required for loads over 2.9m wide'
    },
    {
      condition_code: 'CA',
      condition_name: 'Police Escort Required on 1st Return Journey. Private Escort Required For Other Return Journeys'
    },
    {
      condition_code: 'CB',
      condition_name: 'Police escort required when loaded. Private escort required on all other journeys.'
    },
    {
      condition_code: 'D',
      condition_name: 'Vehicle not permitted to travel on the Public Highway between 07.30-9.30 and 15.00-19.30 '
    },
    {
      condition_code: 'D0',
      condition_name: 'Vehicle to travel between 1900 and 0730'
    },
    {
      condition_code: 'D1',
      condition_name: 'Vehicle to travel between  1800 hrs. and 0730 hrs.'
    },
    {
      condition_code: 'D2',
      condition_name: 'Vehicle to travel between  0600 hrs. and 0730 hrs.'
    },
    {
      condition_code: 'D3',
      condition_name: 'Vehicle to travel between 1930 hrs and 0730 hrs.'
    },
    {
      condition_code: 'D4',
      condition_name: 'Vehicle not permitted to travel between 0730 to 0900 Applies to normal work days not w/e etc.'
    },
    {
      condition_code: 'D5',
      condition_name: 'Vehicle to travel between 1800 and 0730.'
    },
    {
      condition_code: 'D6',
      condition_name: 'Vehicle not permitted to travel between 0730 to 0900 and 1700 to 1815.'
    },
    {
      condition_code: 'D7',
      condition_name: 'Vehicle to travel between  0500 hrs. and 0730 hrs.'
    },
    {
      condition_code: 'D8',
      condition_name: 'Vehicle must be off the public highway by 10.00 hrs'
    },
    {
      condition_code: 'D9',
      condition_name: 'Travel time restriction only applies to normal working days - not weekends or public and bank holidays.'
    },
    {
      condition_code: 'DR',
      condition_name: 'Unless travelling to / from the ferry or from the DVS or a garage for repairs - Vehicle not permitted to travel between 07.30 to 09.00 and 1700 to 18.15.'
    },
    {
      condition_code: 'E',
      condition_name: 'Vehicle only permitted to travel between A C Mauger Ltd constrution sites on an occasional basis'
    },
    {
      condition_code: 'E1',
      condition_name: 'The vehicle will only be leased/loaned to persons who already have a P30 issued to them for a similar tractor unit and the vehicle will be opperated in accordance with the conditions of that permit'
    },
    {
      condition_code: 'F1',
      condition_name: 'Only to be used when carrying loads of exceptional length'
    },
    {
      condition_code: 'F2',
      condition_name: 'Temporary vehicle exemption licence required when trailer length extended beyond 9.3m'
    },
    {
      condition_code: 'F3',
      condition_name: 'Vehicle only to travel on the public highway unladen.'
    },
    {
      condition_code: 'FP',
      condition_name: 'Frontal projection/winch must have a protective cover/device fitted when circulating on the public highway'
    },
    {
      condition_code: 'G1',
      condition_name: 'The driver and any passengers in/on this vehicle must at all times wear a protective helmet.'
    },
    {
      condition_code: 'G2',
      condition_name: 'The Gross Vehicle Weight (GVW) must not exceed 36000 KG'
    },
    {
      condition_code: 'G3',
      condition_name: 'The Gross Vehicle Weight (GVW) must not exceed 17000 KG'
    },
    {
      condition_code: 'G4',
      condition_name: 'The Gross Vehicle Weight (GVW) must not exceed 26000 KG'
    },
    {
      condition_code: 'G5',
      condition_name: 'The gross vehicle weight (GVW) must not exceed 48000 KG'
    },
    {
      condition_code: 'G6',
      condition_name: 'The Gross Vehicle Weight (GVW) must not exceed 24000kgs KG'
    },
    {
      condition_code: 'G7',
      condition_name: 'The Gross Vehicle Weight (GVW) must not exceed 18000kgs KG'
    },
    {
      condition_code: 'GW',
      condition_name: 'The Gross Vehicle Weight (GVW) must not exceed 29000 KG'
    },
    {
      condition_code: 'H',
      condition_name: 'Temporary P30 required for use outside of the Harbour Area'
    },
    {
      condition_code: 'J',
      condition_name: 'Restricted to drawing company low loader DVS permission must be obtained for other use'
    },
    {
      condition_code: 'J1',
      condition_name: 'Permitted to travel between Bellozanne and La Collette for duration of contract. Re aplication letter 17th May 2011'
    },
    {
      condition_code: 'J2',
      condition_name: 'Vehicle permitted to transport authorised oversized semitrailers from port to Rue des Pres Traiding Estate between 18.00-07.30. Travel between 09.30-15.30 when boat delays dictate (AS PER AGREEMENT)'
    },
    {
      condition_code: 'JP',
      condition_name: 'Vehicles permitted to travel between Elizabeth Terminal and Rue des Pres Traiding Estate between 18.00 and 07.30 - Vehicles only permitted to travel between 09.30 and 15.30 when boat delays dictate -'
    },
    {
      condition_code: 'L',
      condition_name: 'A copy of letter of authority to use a parish by-road to be carried by the driver in the vehicle.'
    },
    {
      condition_code: 'L1',
      condition_name: 'Vehicle only to be used for large main events catering for 200 plus people.'
    },
    {
      condition_code: 'L2',
      condition_name: 'This permit is only valid whilst the Joint Liquidators have title on Huelin Renouf Shipping Ltd and is not transferable to another third party during the duration of this permit'
    },
    {
      condition_code: 'L3',
      condition_name: 'A copy of the permit to be carried by the driver of the vehicle/towing vehicle.'
    },
    {
      condition_code: 'M',
      condition_name: 'Any rider/driver must undergo rider/driver training before using the vehicle on a road.'
    },
    {
      condition_code: 'O',
      condition_name: 'See attachment relating to oversized loads.'
    },
    {
      condition_code: 'OW',
      condition_name: 'The overall width of the vehicle must not exceed 2300mm.'
    },
    {
      condition_code: 'P',
      condition_name: 'Prior permission must be obtained from the St Helier Parish authorities for use within the confines of the town ring road and a permit obtained for accessing the Precinct.'
    },
    {
      condition_code: 'P0',
      condition_name: 'Prior permission must be obtained from the Parish authorities for use of any parish by-roads.'
    },
    {
      condition_code: 'P1',
      condition_name: 'Prior permission must be obtained from the St Helier Parish authorities for use within the confines of the town ring road.'
    },
    {
      condition_code: 'P2',
      condition_name: 'Lights must be functional and lens fitted.'
    },
    {
      condition_code: 'P3',
      condition_name: 'A copy of the permit to be carried by the driver'
    },
    {
      condition_code: 'P4',
      condition_name: 'A Suitable vehicle must be used when drawing any semi trailer'
    },
    {
      condition_code: 'P5',
      condition_name: 'Vehicle only permitted to travel on specified routes'
    },
    {
      condition_code: 'P6',
      condition_name: 'Offroad parking to be arranged as agreed with DVS'
    },
    {
      condition_code: 'P7',
      condition_name: 'Driver must hold the appropriate licence'
    },
    {
      condition_code: 'P8',
      condition_name: 'Prior to the delivery the company is to liase with parking controll to ensure the cessation of parking in the area for the duration of the operation'
    },
    {
      condition_code: 'PA',
      condition_name: 'Licensed over sized semi trailers can be drawn between Elizabeth Terminal and Depot only in the Port/La Collette Industrial Area'
    },
    {
      condition_code: 'Q',
      condition_name: 'Vehicle to travel between 0400hrs and 0630hrs on outward journey and 1930hrs and 0630hrs on return journey'
    },
    {
      condition_code: 'Q1',
      condition_name: 'Vehicle only to be used in accordance with exemption application'
    },
    {
      condition_code: 'Q2',
      condition_name: 'This Permit is Not Transferable'
    },
    {
      condition_code: 'R',
      condition_name: 'Route survey must be undertaken'
    },
    {
      condition_code: 'R1',
      condition_name: 'The vehicle cannot be driven under any circumstances by a person granted a category B provisional licence.'
    },
    {
      condition_code: 'R2',
      condition_name: 'The driver must hold a full category B driving licence.'
    },
    {
      condition_code: 'R3',
      condition_name: 'Any modifications made to the vehicle will invalidate the exemption licence.'
    },
    {
      condition_code: 'R4',
      condition_name: 'Rear axle loading not to exceed 10500kg'
    },
    {
      condition_code: 'R5',
      condition_name: 'Valid M.O.T. certificate to be presented on renewal of this permit'
    },
    {
      condition_code: 'R6',
      condition_name: 'Vehicle to travel between 0600 and 0800 hrs'
    },
    {
      condition_code: 'RS',
      condition_name: 'Route survey must be undertaken'
    },
    {
      condition_code: 'SC',
      condition_name: 'Vehicle to be used for the transport of ISO Containers and Plant. Not to be use as a skip truck or tipper or for general haulage.'
    },
    {
      condition_code: 'SR',
      condition_name: 'This vehicle is exempt from the requirements within Construction & Use and can be used in connection with the cleaning of the islands beaches'
    },
    {
      condition_code: 'T1',
      condition_name: 'Vehicle only to be driven on the Public Highway with drivers seat facing forward.'
    },
    {
      condition_code: 'T2',
      condition_name: 'Travel time restriction only applies to normal working days not weekends or public holidays'
    }
  ]
}

// status_update (spec to when the status is changed) or document_update

export function updatePermitApi (obj) {
  return axios
    .post(PERMIT_DOCUMENT_UPDATE, obj)
    .then(() => ({
      success: true
    }))
    .catch(err => {
      console.log(err)
    })
}

export function updateMahaStatusApi (obj) {
  return axios
    .post(MAHA_STATUS_UPDATE, obj)
    .then(() => ({
      success: true
    }))
    .catch(err => {
      console.log(err)
    })
}
