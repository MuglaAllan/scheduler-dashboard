export function toTitleCase (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

export function renameObjectProperty (oldKey, newKey, arr) {
  if (oldKey !== newKey) {
    arr.forEach(function (obj) {
      delete Object.assign(obj, { [newKey]: obj[oldKey] })[oldKey]
    })
  }
  return arr
}

export function replaceWithSpecified (obj, character) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue
    }
    let object = obj[key]
    for (let prop in object) {
      if (!object.hasOwnProperty(prop)) {
        continue
      }
      if (object[prop] === undefined) {
        object[prop] = character
      }
    }
  }
  return obj
}

export function getUnique (arr, comp) {
  const unique = arr
    .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e]).map(e => arr[e])
  return unique
}

export function sortArray (a, b) {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }
  return 0
}

export function sortArrayById (a, b) {
  if (a.id < b.id) {
    return -1
  }
  if (a.id > b.id) {
    return 1
  }
  return 0
}

export function sortArrayByValue (a, b) {
  if (a.value < b.value) {
    return -1
  }
  if (a.value > b.value) {
    return 1
  }
  return 0
}

export function sortStringArray (a, b) {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}

export function setAll (obj, val) {
  Object.keys(obj).forEach(function (index) {
    obj[index] = val
  })
}

export function searchForValueInArray (toSearch, array) {
  let results = []
  let objects = array
  if (toSearch !== null) {
    toSearch = trimString(toSearch)
    for (let i = 0; i < objects.length; i++) {
      for (let key in objects[i]) {
        if (objects[i][key] !== null && objects[i][key].toString().toLowerCase().indexOf(toSearch.toLowerCase()) !== -1) {
          if (!itemExists(results, objects[i])) {
            results.push(objects[i])
          }
        }
      }
    }
    return results
  }
  return array
}

function trimString (s) {
  let l = 0
  let r = s.length - 1
  while (l < s.length && s[l] === ' ') l++
  while (r > l && s[r] === ' ') r -= 1
  return s.substring(l, r + 1)
}

function itemExists (haystack, needle) {
  for (let i = 0; i < haystack.length; i++) {
    if (compareObjects(haystack[i], needle)) {
      return true
    }
  }
  return false
}

function compareObjects (o1, o2) {
  let k
  for (k in o1) {
    if (o1[k] !== o2[k]) {
      return false
    }
  }
  for (k in o2) {
    if (o1[k] !== o2[k]) {
      return false
    }
  }
  return true
}

export function formatDate (date) {
  if (date === '' || date === undefined) {
    return ''
  }

  if (isNumber(date)) {
    let convert = new Date(date * 1000)
    let day = '' + convert.getDate()
    let month = '' + (convert.getMonth() + 1)
    let year = convert.getFullYear()

    if (day.length < 2) {
      day = '0' + day
    }
    if (month.length < 2) {
      month = '0' + month
    }
    return [day, month, year].join('/')
  }

  let localDate = date
  if (localDate.toString().indexOf('/') > -1) {
    let split = date.split('/')
    localDate = new Date(split[2], split[1], split[0])
  }
  let day = '' + localDate.getDate()
  let month = '' + (localDate.getMonth() + 1)
  let year = localDate.getFullYear()

  if (day.length < 2) {
    day = '0' + day
  }
  if (month.length < 2) {
    month = '0' + month
  }
  return [day, month, year].join('/')
}

export function formatDateTime (date, time) {
  if (date === undefined) {
    return date
  }

  let localDate = new Date(date)
  let day = '' + localDate.getDate()
  let month = '' + (localDate.getMonth() + 1)
  let year = localDate.getFullYear()

  if (day.length < 2) {
    day = '0' + day
  }
  if (month.length < 2) {
    month = '0' + month
  }
  time = [time.slice(0, 2), ':', time.slice(2)].join('')
  return ([year, month, day].join('-')) + ' ' + time
}

export function dateForFileName () {
  let localDate = new Date()
  let day = String(localDate.getDate())
  let month = String((localDate.getMonth() + 1))
  let year = String(localDate.getFullYear()).substr(-2)
  let hours = String(localDate.getHours())
  let minutes = String(localDate.getMinutes())

  if (day < 10) {
    day = '0' + day
  }

  if (month < 10) {
    month = '0' + month
  }

  return day + '' + month + '' + year + '' + hours + '' + minutes
}

export function getTodaysDate () {
  let today = new Date()
  let day = String(today.getDate()).padStart(2, '0')
  let month = String(today.getMonth() + 1).padStart(2, '0')
  let year = today.getFullYear()

  if (day < 10) {
    day = '0' + day
  }

  if (month < 10) {
    month = '0' + month
  }

  return (day + '/' + month + '/' + year)
}

export function convertToUnixLong (date) {
  if (date !== null) {
    if (date.includes('/')) {
      let arr = date.split('/')
      let day = parseInt(arr[0], 10)
      let month = (parseInt(arr[1], 10) - 1)
      let year = parseInt(arr[2], 10)
      date = new Date(year, month, day, 0, 0, 0, 0)
    }
    return Math.trunc(new Date(date).getTime() / 1000)
  }
  return null
}

export function convertToISODate (date) {
  if (date.includes('/')) {
    let arr = date.split('/')
    let day = parseInt(arr[0], 10)
    let month = (parseInt(arr[1], 10) - 1)
    let year = parseInt(arr[2], 10)
    date = new Date(year, month, day, 0, 0, 0, 0)
  }

  date = date.toISOString()

  if (date.includes('Z')) {
    date = date.replace('Z', '')
  }

  return date
}

export function extractParameterNamesFromArrayObj (arr) {
  let indexes = []
  for (let index in arr) {
    indexes.push(index)
  }
  return indexes
}

export function monthDiff (dateTo, dateFrom) {
  return (dateTo.getMonth() - dateFrom.getMonth()) + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
}

export function convertStatus (status) {
  switch (status) {
    case 'new':
      return 'New'
    case 'approved':
      return 'Approved'
    case 'paymentconfirm':
      return 'Paid'
    case 'passinspection':
      return 'Passed'
    case 'writeooff':
      return 'Write-off'
    case 'removed':
      return 'Removed'
    case 'stolen':
      return 'Stolen'
    case 'scrapped':
      return 'Scrapped'
    case 'permanentlyexported':
      return 'Permanently Exported'
    default:
      console.log('Status: ' + status + ' is not recognised as a genuiine VRS status')
  }
}

export function chunkArray (array, size) {
  let chunkedArr = []
  for (let i = 0; i < array.length; i++) {
    const last = chunkedArr[chunkedArr.length - 1]
    if (!last || last.length === size) {
      chunkedArr.push([array[i]])
    } else {
      last.push(array[i])
    }
  }
  return chunkedArr
}

export function insertSlash (value) {
  if (value.length === 2) {
    return value + '/'
  }
  if (value.length === 5) {
    return value + '/'
  }
  return value
}

export function paging (page, count) {
  // if (page === 1) {
  //   return {
  //     start: page,
  //     end: count
  //   }
  // }
  //
  // let multiplier = page - 1
  //
  // return {
  //   start: (count * multiplier) + 1,
  //   end: (count * page)
  // }
  return {
    start: page,
    end: count
  }
}

export function isEmpty (obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}

export function isEven (number) {
  return number % 2 === 0
}

/// Local Functions

function isNumber (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

/// CSV Export Functionality

export function downloadCSV (args) {
  let data
  let filename
  let link
  let csv = convertArrayOfObjectsToCSV({
    data: args.dataArray
  })

  if (csv == null) {
    return
  }

  filename = args.filename || 'export.csv'

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    window.navigator.msSaveOrOpenBlob(blob, filename)
  } else {
    if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv
    }

    data = encodeURI(csv)

    link = document.createElement('a')
    link.setAttribute('href', data)
    link.setAttribute('download', filename)
    link.setAttribute('target', '_blank')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export function printPdf (pdf, fileName) {
  fileName = fileName + dateForFileName() + '.pdf'
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(pdf, fileName)
  } else {
    let fileURL = URL.createObjectURL(pdf)
    let a = document.createElement('a')
    a.setAttribute('download', fileName)
    a.href = fileURL
    a.target = '_blank'
    document.body.appendChild(a)
    a.click()
  }
}

export function createBlobFromByteArray (input) {
  let x = atob(input)
  let array = new Uint8Array(x.length)
  for (let i = 0; i < x.length; i++) {
    array[i] = x.charCodeAt(i)
  }

  return new Blob([array], { type: 'application/x-pdf;' })
}

export function isValueNull (value, character) {
  if (value === undefined || value === null || value === '') {
    return character
  }
  return value
}

export function concatValues (arr, useComma) {
  let output = ''
  arr.forEach(function (item) {
    if (item !== undefined && item !== null && item !== '' && item !== 'NULL') {
      output = output + (item + (useComma ? ', ' : ' '))
    }
  })
  if (useComma) {
    output = output.substr(0, output.lastIndexOf(','))
  }
  return output.trim()
}

export function searchArray (key, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === key) {
      return array[i]
    }
  }
}

function convertArrayOfObjectsToCSV (args) {
  let result
  let ctr
  let keys
  let columnDelimiter
  let lineDelimiter
  let data

  data = args.data || null
  if (data == null || !data.length) {
    return null
  }

  columnDelimiter = args.columnDelimiter || ','
  lineDelimiter = args.lineDelimiter || '\n'

  keys = Object.keys(data[0])

  result = ''
  result += keys.join(columnDelimiter)
  result += lineDelimiter

  data.forEach(function (item) {
    ctr = 0
    keys.forEach(function (key) {
      if (ctr > 0) {
        result += columnDelimiter
      }
      result += item[key]
      ctr++
    })
    result += lineDelimiter
  })

  return result
}
