'use strict'
import { showElement, hideElement } from './tab.js'
// var tabs
let firstTab = document.getElementById('first__tab')
let secondTab = document.getElementById('second__tab')
let dateTab = document.querySelector('.date')
let coutriesTab = document.querySelector('.countries')
//var dates
let endDateInput = document.querySelector('.end-date')
let startDateInput = document.querySelector('.start-date')
//var events
let dateForm = document.querySelector('.date__form')
let dateInputs = document.querySelector('.date__inputs')
//
let timeDimension = document.getElementById('time__dimension')
let dateResult = document.querySelector('.date__result')
//preset
let weekPreset = document.querySelector('.preset__week')
let monthPreset = document.querySelector('.preset__month')

const handleStartDate = () => {
  endDateInput.removeAttribute('disabled')
  endDateInput.min = startDateInput.value
  startDateInput.max = endDateInput.value
}

const getTimeBetweenDates = () => {
  let dateStartTimestamp = Date.parse(startDateInput.value)
  let dateEndTimestamp = Date.parse(endDateInput.value)

  let timeDifference = dateEndTimestamp - dateStartTimestamp
  let dimension = timeDimension.value
  switch (dimension) {
    case 'seconds':
      return `${timeDifference / 1000} секунд`
    case 'minutes':
      return `${timeDifference / 60000} хвилин`
    case 'hours':
      return `${timeDifference / 3600000} годин`
    case 'days':
      return `${timeDifference / 86400000} днів`
    default:
      return 'Invalid dimension'
  }
}

const addPrecet = (days) => {
  const currentDate = new Date()
  if (!startDateInput.value) {
    startDateInput.value = currentDate.toISOString().split('T')[0]
    endDateInput.removeAttribute('disabled')
  }

  const existingStartDate = new Date(startDateInput.value)
  existingStartDate.setDate(existingStartDate.getDate() + days)
  endDateInput.value = existingStartDate.toISOString().split('T')[0]
}

const addWeekPrecet = () => addPrecet(7)
const addMonthPrecet = () => addPrecet(30)

const calculateDate = (event) => {
  event.preventDefault()

  if (startDateInput.value === '' || endDateInput.value === '') {
    return
  }
  const result = getTimeBetweenDates()
  dateResult.innerHTML = `Результат: ${result}`
}

//events
dateInputs.addEventListener('change', handleStartDate)
dateForm.addEventListener('submit', calculateDate)
//precets
weekPreset.addEventListener('click', addWeekPrecet)
monthPreset.addEventListener('click', addMonthPrecet)
//events for tab
firstTab.addEventListener('click', () => {
  hideElement(dateTab)
  showElement(coutriesTab)
})
secondTab.addEventListener('click', () => {
  hideElement(coutriesTab)
  showElement(dateTab)
})
