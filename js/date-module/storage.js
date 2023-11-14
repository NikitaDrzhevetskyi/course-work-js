export const saveResultToLocalStorage = (
  startDate,
  endDate,
  result,
  dimension
) => {
  let results = JSON.parse(localStorage.getItem('results')) || []

  const newResult = {
    startDate: startDate,
    endDate: endDate,
    result,
    dimension,
  }

  results.unshift(newResult)

  if (results.length > 10) {
    results.pop()
  }

  localStorage.setItem('results', JSON.stringify(results))
}

export const getResultsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('results')) || []
}
