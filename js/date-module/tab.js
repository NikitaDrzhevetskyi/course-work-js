

export function showElement(event) {
  event.hidden = true
}
export function hideElement(event) {
  event.hidden = false
}
export const handleStartDate = () => {
  endDateInput.removeAttribute('disabled')
  endDateInput.min = startDateInput.value
}
