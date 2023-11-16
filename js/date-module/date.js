import { saveResultToLocalStorage } from './storage.js'

export const displayDateResult = (timeDifference) => {
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