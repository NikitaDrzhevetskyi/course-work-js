'use strict'

import { showElement, hideElement } from './tab.js'

// var tabs
let firstTab = document.getElementById('first__tab')
let secondTab = document.getElementById('second__tab')
let dateTab = document.querySelector('.date')
let countriesTab = document.querySelector('.countries')
//var dates
let endDateInput = document.querySelector('.end-date')
let startDateInput = document.querySelector('.start-date')
//var events
let dateForm = document.querySelector('.date__form')
let dateInputs = document.querySelector('.date__inputs')
//var options (time, days)
let timeDimension = document.getElementById('time__dimension')
let daysDimension = document.getElementById('days__dimension')
//preset
let weekPreset = document.querySelector('.preset__week')
let monthPreset = document.querySelector('.preset__month')
//days option
let optionDays = document.querySelector('.option__days')
//result
let dateResult = document.querySelector('.date__result')

// Functions
const handleStartDate = () => {
  endDateInput.removeAttribute('disabled')
  endDateInput.min = startDateInput.value
}

const getTimeBetweenDates = (
  startDate,
  endDate,
  dimensionTime,
  dimensionDate
) => {
  let dateStartTimestamp = Date.parse(startDate)
  let dateEndTimestamp = Date.parse(endDate)

  let timeDifference = dateEndTimestamp - dateStartTimestamp
  let resultOfTime = 0

  switch (dimensionTime) {
    case 'seconds':
      resultOfTime = `${timeDifference / 1000} seconds`
    case 'minutes':
      resultOfTime = `${timeDifference / 60000} minutes`
    case 'hours':
      resultOfTime = `${timeDifference / 3600000} hours`
    case 'days':
      resultOfTime = `${timeDifference / 86400000} days`
    default:
      'Invalid dimension'
  }
  let resultOfDate = 0
  switch (dimensionDate) {
    case 'all-days':
      resultOfDate = 1
      break
    case 'working-days':
      resultOfDate = 2
      break
    case 'weekends':
      resultOfDate = 3
      break
  }
  return `${resultOfTime} ${resultOfDate}`
}

const addPreset = (days) => {
  const currentDate = new Date()

  if (!startDateInput.value) {
    startDateInput.value = currentDate.toISOString().split('T')[0]
    endDateInput.removeAttribute('disabled')
    endDateInput.value = new Date(
      currentDate.getTime() + days * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split('T')[0]
  } else {
    const existingStartDate = new Date(startDateInput.value)
    existingStartDate.setDate(existingStartDate.getDate() + days)
    endDateInput.value = existingStartDate.toISOString().split('T')[0]
  }
}
const addWeekPreset = () => addPreset(7)
const addMonthPreset = () => addPreset(30)

const calculateDate = (event) => {
  event.preventDefault()

  if (startDateInput.value === '' || endDateInput.value === '') {
    return
  }
  const result = getTimeBetweenDates(
    startDateInput.value,
    endDateInput.value,
    timeDimension.value,
    daysDimension.value
  )
  dateResult.innerHTML = `Результат: ${result}`
}

// Event listeners
startDateInput.addEventListener('change', handleStartDate)
endDateInput.addEventListener('change', () => {
  startDateInput.max = endDateInput.value
})

//result
dateForm.addEventListener('submit', calculateDate)

// Presets
weekPreset.addEventListener('click', addWeekPreset)
monthPreset.addEventListener('click', addMonthPreset)

// Events for tab
firstTab.addEventListener('click', () => {
  hideElement(dateTab)
  showElement(countriesTab)
})

secondTab.addEventListener('click', () => {
  hideElement(countriesTab)
  showElement(dateTab)
})
