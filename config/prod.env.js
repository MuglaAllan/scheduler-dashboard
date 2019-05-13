'use strict'
module.exports = {
  NODE_ENV: '"production"',
  JSON_PLACEHOLDER: '"https://jsonplaceholder.typicode.com"',

  OAUTH: '"https://login.microsoftonline.com/govje.onmicrosoft.com/oauth2/token"',

  /// UAT

  // PERMIT
  PERMIT_QUERY: '"https://permit-api.dvsuat.uk/api/v1/Permits/queryPermit"',
  PERMIT_DOCUMENT_UPDATE: '"https://permit-api.dvsuat.uk/api/v1/Permits/documentUpdate"',
  // CALENDAR
  SCHEDULE_QUERY: '"https://calendar-api.dvsuat.uk/api/v1/calendar/bookings/query"',
  SCHEDULE_UPDATE: '"https://calendar-api.dvsuat.uk/api/v1/calendar/bookings/update"',
  SCHEDULE_REMOVE: '"https://calendar-api.dvsuat.uk/api/v1/calendar/bookings/remove"',
  // SCHEDULE_ADD_NEW: '"https://calendar-api.jx-staging.dvs.je/api/v1/calendar/book/vrs"',
  SCHEDULE_ADD_NEW: '"https://calendar-api.dvsuat.uk/api/v1/calendar/book"',
  // MAHA
  MAHA_STATUS_UPDATE: '"https://maha-service.dvsuat.uk/maha/inspection-status"',
  MAHA_STATUS_RECORDS: '"https://maha-service.dvsuat.uk/maha/vehicle/unassigned"',
  MAHA_SLOTS: '"https://maha-service.dvsuat.uk/maha/vehicle/slots"',
  // OPERATIONAL
  OPERATIONAL_QUERY: '"https://operational-query-api.dvsuat.uk/api/v1/Operational/Query"',
  OPERATIONAL_INSERT: '"https://operational-query-api.dvsuat.uk/api/v1/Operational/insert"',
  OPERATIONAL_UPDATE: '"https://operational-query-api.dvsuat.uk/api/v1/Operational/update"',
  OPERATIONAL_SEARCH: '"https://operational-query-api.dvsuat.uk/api/v1/Operational/search"',
  // OPERATION_UPDATE_FEE: '"https://operational-query-api.dvsuat.uk/api/v1/Operational/update-fee"',
  // VRS
  VRS_SEARCH: '"https://vrs-api.dvsuat.uk/api/v1/vrs/query/registration"',
  VRS_SUBMIT_APPLICATION: '"https://vrs-api.dvsuat.uk/api/v1/vrs/submit/application"',
  VRS_SUBMIT_UPDATE: '"https://vrs-api.dvsuat.uk/api/v1/vrs/documentupdate"', // No sure I know what this does as I don't use it
  VRS_APPOINTMENT_DETAILS: '"https://vrs-api.dvsuat.uk/api/v1/vrs/get/appointmentDetail"',
  // REGISTRATION NUMBERS
  REG_NO_HISTORY: '"https://registration-pool-api.dvsuat.uk/registrationNumber/history/"',
  REG_NO_CLASSIFICATION: '"https://registration-pool-api.dvsuat.uk/registrationNumber/search/classification/"',
  REG_NO_RANGE_BY_CLASSIFICATION: '"https://registration-pool-api.dvsuat.uk/registrationNumber/search/classification/"',
  REG_NO_UPDATE_STATUS: '"https://registration-pool-api.dvsuat.uk/registrationNumber/update/status"',
  REG_NO_BULK_UPDATE_STATUS: '"https://registration-pool-api.dvsuat.uk/registrationNumber/update/bulk/status"',
  REG_NO_GET_T_NUMBER: '"https://registration-pool-api.dvsuat.uk/registrationNumber/search/trade/range"',
  REG_NO_EXCHANGE: '"https://registration-pool-api.dvsuat.uk/registrationNumber/exchange"',
  REG_NO_RETAIN_CHANGE: '"https://registration-pool-api.dvsuat.uk/registrationNumber/retchange"',
  REG_NO_RETAINED_BY_OWNER_ID: '"https://registration-pool-api.dvsuat.uk/registrationNumber/search/classificationOwnerSearch/"',
  // PRINTING
  PRINT_VRS: '"https://printer-service.dvsuat.uk/print/VRD1"',
  PRINT_EXPORT: '"https://printer-service.dvsuat.uk/print/ExportCert"',
  PRINT_TRADE: '"https://printer-service.dvsuat.uk/print/TradeLicense"',
  // OWNERS
  OWNER_ID_SEARCH: '"https://operational-query-api.dvsuat.uk/api/v1/Operational/Search"'

  /// DEV

  // PERMIT
  // PERMIT_QUERY: '"https://permit-api.dvsdev.uk/api/v1/Permits/queryPermit"',
  // PERMIT_DOCUMENT_UPDATE: '"https://permit-api.dvsdev.uk/api/v1/Permits/documentUpdate"',
  // // CALENDAR
  // SCHEDULE_QUERY: '"https://calendar-api.dvsdev.uk/api/v1/calendar/bookings/query"',
  // SCHEDULE_UPDATE: '"https://calendar-api.dvsdev.uk/api/v1/calendar/bookings/update"',
  // SCHEDULE_REMOVE: '"https://calendar-api.dvsdev.uk/api/v1/calendar/bookings/remove"',
  // // SCHEDULE_ADD_NEW: '"https://calendar-api.jx-staging.dvs.je/api/v1/calendar/book/vrs"',
  // SCHEDULE_ADD_NEW: '"https://calendar-api.dvsdev.uk/api/v1/calendar/book"',
  // // MAHA
  // MAHA_STATUS_UPDATE: '"https://maha-service.dvsdev.uk/maha/inspection-status"',
  // MAHA_STATUS_RECORDS: '"https://maha-service.dvsdev.uk/maha/vehicle/unassigned"',
  // MAHA_SLOTS: '"https://maha-service.dvsdev.uk/maha/vehicle/slots"',
  // // OPERATIONAL
  // OPERATIONAL_QUERY: '"https://operational-query-api.dvsdev.uk/api/v1/Operational/Query"',
  // OPERATIONAL_INSERT: '"https://operational-query-api.dvsdev.uk/api/v1/Operational/insert"',
  // OPERATIONAL_UPDATE: '"https://operational-query-api.dvsdev.uk/api/v1/Operational/update"',
  // OPERATIONAL_SEARCH: '"https://operational-query-api.dvsdev.uk/api/v1/Operational/search"',
  // // OPERATION_UPDATE_FEE: '"https://operational-query-api.dvsdev.uk/api/v1/Operational/update-fee"',
  // // VRS
  // VRS_SEARCH: '"https://vrs-api.dvsdev.uk/api/v1/vrs/query/registration"',
  // VRS_SUBMIT_APPLICATION: '"https://vrs-api.dvsdev.uk/api/v1/vrs/submit/application"',
  // VRS_SUBMIT_UPDATE: '"https://vrs-api.dvsdev.uk/api/v1/vrs/documentupdate"', // No sure I know what this does as I don't use it
  // VRS_APPOINTMENT_DETAILS: '"https://vrs-api.dvsdev.uk/api/v1/vrs/get/appointmentDetail"',
  // // REGISTRATION NUMBERS
  // REG_NO_HISTORY: '"https://registration-pool-api.dvsdev.uk/registrationNumber/history/"',
  // REG_NO_CLASSIFICATION: '"https://registration-pool-api.dvsdev.uk/registrationNumber/search/classification/"',
  // REG_NO_RANGE_BY_CLASSIFICATION: '"https://registration-pool-api.dvsdev.uk/registrationNumber/search/classification/"',
  // REG_NO_UPDATE_STATUS: '"https://registration-pool-api.dvsdev.uk/registrationNumber/update/status"',
  // REG_NO_BULK_UPDATE_STATUS: '"https://registration-pool-api.dvsdev.uk/registrationNumber/update/bulk/status"',
  // REG_NO_GET_T_NUMBER: '"https://registration-pool-api.dvsdev.uk/registrationNumber/search/trade/range"',
  // REG_NO_EXCHANGE: '"https://registration-pool-api.dvsdev.uk/registrationNumber/exchange"',
  // REG_NO_RETAIN_CHANGE: '"https://registration-pool-api.dvsdev.uk/registrationNumber/retchange"',
  // REG_NO_RETAINED_BY_OWNER_ID: '"https://registration-pool-api.dvsdev.uk/registrationNumber/search/classificationOwnerSearch/"',
  // // PRINTING
  // PRINT_VRS: '"https://printer-service.dvsdev.uk/print/VRD1"',
  // PRINT_EXPORT: '"https://printer-service.dvsdev.uk/print/ExportCert"',
  // PRINT_TRADE: '"https://printer-service.dvsdev.uk/print/TradeLicense"',
  // // OWNERS
  // OWNER_ID_SEARCH: '"https://operational-query-api.dvsdev.uk/api/v1/Operational/Search"'
}
