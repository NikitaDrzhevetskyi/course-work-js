import { getCountries, getHolidays } from "./api.js";

const countriesSelect = document.getElementById("countries__select");
const yearSelect = document.getElementById("year__select");
const holidaysTableBody = document.querySelector("#holidays-table tbody");
const errorMessageContainer = document.getElementById("error-message");
const holidayButton = document.querySelector(".holiday__button");
const sortButton = document.getElementById("sort-holidays");

async function populateCountriesDropdown() {
  try {
    const countries = await getCountries();
    countries.forEach((country) => {
      let countryOption = document.createElement("option");
      countryOption.textContent = country.country_name;
      countryOption.value = country["iso-3166"];
      countriesSelect.append(countryOption);
    });
  } catch (error) {
    displayErrorMessage("Error! Unable to get countries.");
  }
}

function populateYearsDropdown() {
  for (let year = 2001; year <= 2049; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.text = year;
    yearSelect.add(option);
  }
}

async function getAndDisplayHolidays() {
  const selectedCountry = countriesSelect.value;
  const selectedYear = yearSelect.value;

  if (!selectedCountry || !selectedYear) {
    displayErrorMessage("Select country and year!");
    // Clear holidays data
    holidaysTableBody.innerHTML = "";
    return;
  }

  // Reset error message container
  errorMessageContainer.textContent = "";
  errorMessageContainer.style.display = "none";

  holidaysTableBody.innerHTML = "";

  try {
    const holidays = await getHolidays(selectedCountry, selectedYear);
    displayHolidays(holidays);
  } catch (error) {
    displayErrorMessage("Error! Unable to get holidays.");
  }
}

function displayHolidays(holidays) {
  holidays.forEach((holiday) => {
    const row = holidaysTableBody.insertRow();
    const dateCell = row.insertCell(0);
    const nameCell = row.insertCell(1);

    dateCell.textContent =
      holiday.date.iso || holiday.date.date || holiday.date;
    nameCell.textContent = holiday.name;
  });
}

function displayErrorMessage(message) {
  errorMessageContainer.textContent = message;
  errorMessageContainer.style.display = "block";
}

let ascendingOrder = true;

function sortHolidays() {
  const tableBody = document.querySelector("#holidays-table tbody");
  const rows = Array.from(tableBody.querySelectorAll("tr"));

  rows.sort((row1, row2) => {
    const date1 = new Date(row1.cells[0].textContent);
    const date2 = new Date(row2.cells[0].textContent);

    return ascendingOrder ? date1 - date2 : date2 - date1;
  });

  tableBody.innerHTML = "";

  rows.forEach((row) => {
    tableBody.appendChild(row);
  });

  ascendingOrder = !ascendingOrder;
}

export function initCountryTab() {
  populateCountriesDropdown();
  populateYearsDropdown();
}

holidayButton.addEventListener("click", getAndDisplayHolidays);
sortButton.addEventListener("click", sortHolidays);
