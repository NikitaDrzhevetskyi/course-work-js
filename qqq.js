'use strict'
import {
  getResultsFromLocalStorage,
  saveResultToLocalStorage,
} from './storage.js'
import { showElement, hideElement } from './tab.js'

//var tabs
let firstTab = document.getElementById('first__tab')
let secondTab = document.getElementById('second__tab')
let dateTab = document.querySelector('.date')
let countriesTab = document.querySelector('.countries')

//var dates
let endDateInput = document.querySelector('.end-date')
let startDateInput = document.querySelector('.start-date')

//var events
let dateForm = document.querySelector('.date__form')
let dateResult = document.querySelector('.date__result')

//var options (time, days)
let timeDimension = document.getElementById('time__dimension')
let daysDimension = document.getElementById('days__dimension')

//preset
let weekPreset = document.querySelector('.preset__week')
let monthPreset = document.querySelector('.preset__month')

const displayDateResult = (timeDifference) => {
  switch (timeDimension.value) {
    case 'seconds':
      timeDifference = `${timeDifference / 1000}`
      break
    case 'minutes':
      timeDifference = `${timeDifference / 60000}`
      break
    case 'hours':
      timeDifference = `${timeDifference / 3600000}`
      break
    case 'days':
      timeDifference = `${timeDifference / 86400000}`
      break
    default:
      return 'Invalid dimension'
  }

  dateResult.innerHTML = `Результат: ${timeDifference} ${timeDimension.value}`

  saveResultToLocalStorage(
    startDateInput.value,
    endDateInput.value,
    timeDifference,
    timeDimension.value
  )

  displayStorageResults()
}

const displayStorageResults = () => {
  const results = getResultsFromLocalStorage()
  const resultsContainer = document.querySelector('.stored-results')

  // Clear previous results
  resultsContainer.innerHTML = ''

  // Display the last 10 results
  results.forEach((result) => {
    const resultElement = document.createElement('div')
    resultElement.innerHTML = `<table>
  <tr>
    <th>Початкова дата:</th>
    <th>Кінцева дата</th>
    <th>Результат</th>
  </tr>
  <tr>
    <td>${result.startDate}</td>
    <td>${result.endDate}</td>
    <td>${result.result} ${result.dimension}</td>
  </tr>
  </table>`

    resultsContainer.appendChild(resultElement)
  })
}

// Call the displayStoredResults function when the page loads
document.addEventListener('DOMContentLoaded', displayStorageResults)

//Functions
const handleStartDate = () => {
  endDateInput.removeAttribute('disabled')
  endDateInput.min = startDateInput.value
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

  let timeDifference = calculateTimeDifference()
  displayDateResult(timeDifference)
}

const calculateTimeDifference = () => {
  const startDate = new Date(startDateInput.value)
  const endDate = new Date(endDateInput.value)

  if (daysDimension.value === 'working-days') {
    return calculateWorkingDaysDifference(startDate, endDate)
  } else if (daysDimension.value === 'weekends') {
    return calculateWeekendsDifference(startDate, endDate)
  }

  return calculateDefaultDifference(startDate, endDate)
}

const calculateWorkingDaysDifference = (startDate, endDate) => {
  let workingDays = 0
  let currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    if (isWeekday(currentDate)) {
      workingDays++
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return workingDays * 24 * 60 * 60 * 1000
}

const calculateWeekendsDifference = (startDate, endDate) => {
  let weekends = 0
  let currentDate = new Date(startDate)

  while (currentDate < endDate) {
    if (isWeekend(currentDate)) {
      weekends++
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return weekends * 24 * 60 * 60 * 1000
}

const calculateDefaultDifference = (startDate, endDate) => {
  return endDate - startDate
}

const isWeekday = (date) => {
  return !isWeekend(date)
}

const isWeekend = (date) => {
  const dayOfWeek = date.getDay()
  return dayOfWeek === 0 || dayOfWeek === 6
}

startDateInput.addEventListener('change', handleStartDate)
endDateInput.addEventListener('change', () => {
  startDateInput.max = endDateInput.value
})

dateForm.addEventListener('submit', calculateDate)

// Events for tab
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
