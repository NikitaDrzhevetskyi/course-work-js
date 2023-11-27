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
export const displayStorageResults = () => {
  const results = getResultsFromLocalStorage()
  const resultsBody = document.getElementById('results-body')

  // Clear previous results
  resultsBody.innerHTML = ''

  // Display the last 10 results
  results.forEach((result) => {
    const row = document.createElement('tr')
    row.innerHTML = `
		<td>${result.startDate}</td>
		<td>${result.endDate}</td>
		<td>${result.result} ${result.dimension}</td>
	  `

    resultsBody.appendChild(row)
  })
}
