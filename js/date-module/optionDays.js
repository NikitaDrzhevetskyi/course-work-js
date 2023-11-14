export const isWeekday = (date) => {
  return !isWeekend(date)
}

export const isWeekend = (date) => {
  const dayOfWeek = date.getDay()
  return dayOfWeek === 0 || dayOfWeek === 6
}
