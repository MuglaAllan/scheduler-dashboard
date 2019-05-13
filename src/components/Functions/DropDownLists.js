export function ddlMonths () {
  return [
    { id: '01', value: 'January' },
    { id: '02', value: 'February' },
    { id: '03', value: 'March' },
    { id: '04', value: 'April' },
    { id: '05', value: 'May' },
    { id: '06', value: 'June' },
    { id: '07', value: 'July' },
    { id: '08', value: 'August' },
    { id: '09', value: 'September' },
    { id: '10', value: 'October' },
    { id: '11', value: 'November' },
    { id: '12', value: 'December' }
  ]
}

export function ddlTitle () {
  return [
    { id: 'Com', value: 'Company' },
    { id: 'Mr', value: 'Mr.' },
    { id: 'Mrs', value: 'Mrs.' },
    { id: 'Miss', value: 'Miss.' },
    { id: 'Ms', value: 'Ms.' },
    { id: 'Dr', value: 'Dr.' }
  ]
}

export function ddlParish () {
  return [
    { id: 'Grouville', value: 'Grouville', initial: 'G' },
    { id: 'St. Brelade', value: 'St. Brelade', initial: 'B' },
    { id: 'St. Clement', value: 'St. Clement', initial: 'C' },
    { id: 'St. Helier', value: 'St. Helier', initial: 'H' },
    { id: 'St. John', value: 'St. John', initial: 'J' },
    { id: 'St. Lawrence', value: 'St. Lawrence', initial: 'L' },
    { id: 'St. Martin', value: 'St. Martin', initial: 'M' },
    { id: 'St. Mary', value: 'St. Mary', initial: 'Y' },
    { id: 'St. Ouen', value: 'St. Ouen', initial: 'O' },
    { id: 'St. Peter', value: 'St. Peter', initial: 'P' },
    { id: 'St. Saviour', value: 'St. Saviour', initial: 'S' },
    { id: 'Trinity', value: 'Trinity', initial: 'T' }
  ]
}

export function ddlCategories () {
  return [
    { id: 'agricultural', value: 'Agricultural' },
    { id: 'bus', value: 'Bus, Minibus or Coach' },
    { id: 'car', value: 'Car' },
    { id: 'light4x4', value: 'Light 4x4 Utility' },
    { id: 'lightCommercial', value: 'Light Commercial Vehicle < 3500kg' },
    { id: 'motorCaravan', value: 'Motor Caravan' },
    { id: 'motorcycle', value: 'Motorcycle, Moped, Scooter or Tricycle' },
    { id: 'roadMaintenance', value: 'Road Maintenance or Construction' },
    { id: 'vehicle3500', value: 'Vehicle > 3500kg' },
    { id: 'vehicle7500', value: 'Vehicle > 7500kg' },
    { id: 'workTruck', value: 'Work Truck' }
  ]
}

export function ddlSubCategories () {
  return [
    { id: 'agriculturalTractor', value: 'Agricultural Tractor' },
    { id: 'agriculturalVehicle', value: 'Agricultural Vehicle' },
    { id: 'articulatedVehicle', value: 'Articulated Vehicle' },
    { id: 'engineeringPlant', value: 'Engineering Plant' },
    { id: 'heavyMotorcycle', value: 'Heavy Motorcycle' },
    { id: 'largeGoods', value: 'Large Goods' },
    { id: 'largePassenger', value: 'Large Passenger' },
    { id: 'lightMotorcycle', value: 'Light Motorcycle' },
    { id: 'mediumGoods', value: 'Medium Goods' },
    { id: 'miniBus', value: 'Mini Bus' },
    { id: 'moped', value: 'Moped' },
    { id: 'motorCaravan', value: 'Motor Caravan' },
    { id: 'motorTractor', value: 'Motor Tractor' },
    { id: 'motorTricycle', value: 'Motor Tricycle' },
    { id: 'passengerVehicle', value: 'Passenger Vehicle' },
    { id: 'plant', value: 'Plant' },
    { id: 'refuseVehicle', value: 'Refuse Vehicle' },
    { id: 'restrictedSpeedAgrTractor', value: 'Restricted Speed Agr Tractor' },
    { id: 'smallGoods', value: 'Small Goods' },
    { id: 'straddleCarrier', value: 'Straddle Carrier' },
    { id: 'trackLaying', value: 'Track Laying' },
    { id: 'worksTruck', value: 'Works Truck' }
  ]
}

export function ddlFuelTypes () {
  return [
    { id: 'petrol', value: 'Petrol' },
    { id: 'heavyOil', value: 'Heavy Oil' },
    { id: 'gas', value: 'Gas' },
    { id: 'gasBiFuel', value: 'Gas Bi Fuel' },
    { id: 'electric', value: 'Electric' },
    { id: 'hybridElectric', value: 'Hybrid Electric' },
    { id: 'steam', value: 'Steam' }
  ]
}

export function ddlColours () {
  return [
    { id: 'beige', value: 'Beige', hex: '#F5F5DC' },
    { id: 'black', value: 'Black', hex: '#000000' },
    { id: 'blue', value: 'Blue', hex: '#0078D7' },
    { id: 'bronze', value: 'Bronze', hex: '#CD7F32' },
    { id: 'brown', value: 'Brown', hex: '#8B4513' },
    { id: 'cream', value: 'Cream', hex: '#FFFDD0' },
    { id: 'gold', value: 'Gold', hex: '#D4AF37' },
    { id: 'green', value: 'Green', hex: '#008B00' },
    { id: 'maroon', value: 'Maroon', hex: '#800000' },
    { id: 'multiColoured', value: 'Multi-coloured', hex: '' },
    { id: 'orange', value: 'Orange', hex: '#FFA500' },
    { id: 'pink', value: 'Pink', hex: '#FFC0CB' },
    { id: 'purple', value: 'Purple', hex: '#800080' },
    { id: 'red', value: 'Red', hex: '#FF0000' },
    { id: 'silver', value: 'Silver', hex: '#C0C0C0' },
    { id: 'turquoise', value: 'Turquoise', hex: '#40E0D0' },
    { id: 'white', value: 'White', hex: '#FFFFFF' },
    { id: 'yellow', value: 'Yellow', hex: '#FFFF00' }
  ]
}

export function ddlIsKitBuilt () {
  return [
    { id: 'allNewParts', value: 'All new parts' },
    { id: 'somePartsNew', value: 'Some parts not new' }
  ]
}

export function ddlFirstRegOnVrd1 () {
  return [
    { id: 'dayMonthYear', value: 'Day / Month / Year' },
    { id: 'monthYear', value: 'Month / Year' },
    { id: 'year', value: 'Year' },
    { id: 'unknown', value: 'Unknown' }
  ]
}

export function ddlYesNo () {
  return [
    { id: 'true', value: 'Yes' },
    { id: 'false', value: 'No' }
  ]
}

export function ddlNumber () {
  return [
    { id: '1', value: '1' },
    { id: '2', value: '2' },
    { id: '3', value: '3' },
    { id: '4', value: '4' },
    { id: '5', value: '5' },
    { id: '6', value: '6' },
    { id: '7', value: '7' }
  ]
}

export function ddlTransmission () {
  return [
    { id: 'Manual', value: 'Manual' },
    { id: 'Automatic', value: 'Automatic' }
  ]
}

export function ddlVehicleOwnership () {
  return [
    { id: 'never', value: 'Never Registered' },
    { id: 'previously', value: 'Previously Registered' }
  ]
}

export function ddlVrsStatus (disableArray) {
  let output = [
    { id: 'new', value: 'New' },
    { id: 'approved', value: 'Approved' },
    { id: 'paymentconfirm', value: 'Paid' },
    { id: 'passinspection', value: 'Passed' },
    { id: 'active', value: 'Active' },
    { id: 'writeooff', value: 'Write-off' },
    { id: 'removed', value: 'Removed' },
    { id: 'stolen', value: 'Stolen' },
    { id: 'scrapped', value: 'Scrapped' },
    { id: 'permanentlyexported', value: 'Permanently Exported' },
    { id: 'inflighttransfer', value: 'Awaiting Confirmation' }
  ]

  output.forEach(function (item) {
    if (disableArray.includes(item.id)) {
      item.disabled = 'disabled'
    }
  })
  return output
}

export function ddlVrsSearchParameters () {
  return [
    { id: 'docUUID', value: 'Id' },
    { id: 'status', value: 'Status' },
    // Miscellaneous
    { id: 'receipt_no', value: 'Receipt No.' },
    { id: 'agent_code', value: 'Agent Code' },
    { id: 'link_to_owner', value: 'Link to Owner' },
    { id: 'decl_no', value: 'Declaration No.' },
    { id: 'duty_paid', value: 'Duty Paid' },
    { id: 'duty_exemption_no', value: 'Duty Exemption No.' },
    { id: 'code', value: 'Code' },
    // Registration Details
    { id: 'overseas_registration_no', value: 'Overseas Registration No.' },
    { id: 'date_of_first_registration', value: 'Date of First Registration' },
    { id: 'date_of_last_transfer', value: 'Date of Last Transfer' },
    { id: 'date_reg_in_jersey', value: 'Date Registered in Jersey' },
    { id: 'prev_reg_no', value: 'Prev Registration No.' },
    { id: 'prev_reg_no_date', value: 'Previous Registration No. Date' },
    { id: 'prev_reg_country', value: 'Previous Registration Country' },
    // Owner Details
    { id: 'title', value: 'Title' },
    { id: 'initials', value: 'Initials' },
    { id: 'forenames', value: 'Forenames' },
    { id: 'surname', value: 'Surname' },
    { id: 'dob', value: 'Date of Birth' },
    { id: 'email', value: 'Email' },
    { id: 'phone', value: 'Phone' },
    { id: 'landline', value: 'Landline' },
    { id: 'address_line_1', value: 'Address Line 1' },
    { id: 'address_line_2', value: 'Address Line 2' }, // owner_details.address2
    { id: 'address_line_3', value: 'Address Line 2' },
    { id: 'parish', value: 'Parish' },
    { id: 'postcode', value: 'Postcode' },
    { id: 'license_no', value: 'License No.' },
    { id: 'first_reg_on_vrd1', value: 'First Registered On VRD1' },
    { id: 'resale', value: 'Resale' },
    { id: 'hire', value: 'Hire' },
    // Vehicle Details
    { id: 'registration_number', value: 'Registration No.' },
    { id: 'previously_owned', value: 'Previously Owned' },
    { id: 'body_category', value: 'Body Category' },
    { id: 'body_sub_category', value: 'Body Sub Category' },
    { id: 'body_type', value: 'Body Type' },
    { id: 'make', value: 'Make' },
    { id: 'model', value: 'Model' },
    { id: 'vehicleManufactureDate', value: 'Vehicle Manufacture Date' },
    { id: 'width', value: 'Width' },
    { id: 'height', value: 'Height' },
    { id: 'length', value: 'Length' },
    { id: 'primary_colour', value: 'Colour' },
    { id: 'secondary_colour', value: 'Secondary Colour' },
    { id: 'cylinder_capacity', value: 'CC' },
    { id: 'transmission_type', value: 'Transmission Type' },
    { id: 'co2', value: 'CO2' },
    { id: 'engine_number', value: 'Engine No.' },
    { id: 'chassis_number', value: 'Chassis No.' },
    { id: 'weight', value: 'Weight' },
    { id: 'unladen_weight', value: 'Unladen Weight' },
    { id: 'manufacture_year', value: 'Manufacture Year' },
    { id: 'type_of_fuel', value: 'Type of Fuel' },
    { id: 'door_no', value: 'Door No.' },
    { id: 'type_approval', value: 'Type Approval' },
    { id: 'type_approval_number', value: 'Type Approval No.' },
    { id: 'mileage', value: 'Mileage' },
    { id: 'seating_capacity', value: 'Seating Capacity' },
    { id: 'over_25', value: 'Over 25 Years' },
    { id: 'hand_drive', value: 'Hand Drive' },
    { id: 'modified', value: 'Modified' },
    // Comments
    { id: 'free_text', value: 'Free Text' },
    { id: 'hidden_text', value: 'Hidden Text' },
    { id: 'kit_built', value: 'Kit Built' },
    { id: 'no_v55_not_new', value: 'No V55 Not New' },
    { id: 'p30', value: 'P30' }
  ]
}

export function ddlRegNoClassification () {
  return [
    { id: '', value: 'Please Select...' },
    { id: 'DEFAULT', value: 'Default' },
    { id: 'CHERISHED', value: 'Cherished' },
    { id: 'RETAINED', value: 'Retained' },
    { id: 'RESERVED', value: 'Reserved for Auction' }
  ]
}

export function ddlOperationalValueType () {
  return [
    { id: '', value: 'Please Select...' },
    { id: 'body', value: 'Body' },
    { id: 'make', value: 'Make' },
    { id: 'parish', value: 'Parish' }
  ]
}
