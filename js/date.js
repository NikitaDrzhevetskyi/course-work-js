export const isWeekday = (date) => {
  return !isWeekend(date);
};

export const isWeekend = (date) => {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
};

export const calculateWorkingDaysDifference = (startDate, endDate) => {
  let workingDays = 0;
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (isWeekday(currentDate)) {
      workingDays++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return workingDays * 24 * 60 * 60 * 1000;
};

export const calculateWeekendsDifference = (startDate, endDate) => {
  let weekends = 0;
  let currentDate = new Date(startDate);

  while (currentDate < endDate) {
    if (isWeekend(currentDate)) {
      weekends++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekends * 24 * 60 * 60 * 1000;
};

export const calculateDefaultDifference = (startDate, endDate) => {
  return endDate - startDate;
};
