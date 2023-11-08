'use strict'
// variables
let firstTab = document.getElementById('first__tab')
let secondTab = document.getElementById('second__tab')
let dateTab = document.querySelector('.date')
let coutriesTab = document.querySelector('.countries')

let startDateInput = document.querySelector('.first-input')
let endDateInput = document.querySelector('.second-input')

let dateButton = document.querySelector('.date__button')
let dateForm = document.querySelector('.date__form')

let firstInput = document.querySelector('.first-input')
let secondInput = document.querySelector('.second-input')

function handleDateInput() {
  let startDate = new Date(startDateInput.value)
  let endDate = new Date(endDateInput.value)

  if (endDate < startDate) {
    endDateInput.value = startDateInput.value
  }

  if (startDate > endDate) {
    startDateInput.value = endDateInput.value
  }
}
//Task1. Event for input
const isCorrectDate = () => {
  if (startDateInput.value !== '') {
    endDateInput.removeAttribute('disabled')
  } else {
    endDateInput.setAttribute('disabled', true)
  }
  console.log('startDateInput', startDateInput.value)
  console.log('endDateInput', endDateInput.value)
}

const calculateDate = (event) => {
  event.preventDefault()
}
// events for tabs
firstTab.addEventListener('click', () => {
  dateTab.style.display = 'block'
  coutriesTab.style.display = 'none'
})

secondTab.addEventListener('click', () => {
  coutriesTab.style.display = 'block'
  dateTab.style.display = 'none'
})

//events
startDateInput.addEventListener('input', handleDateInput)
endDateInput.addEventListener('input', handleDateInput)
startDateInput.addEventListener('input', isCorrectDate)
dateForm.addEventListener('submit', calculateDate)
