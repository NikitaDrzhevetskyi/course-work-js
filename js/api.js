const API_KEY = "NB32rWoHbmHF87yn0SdEGSLhiLQfxib7";
const API_URL = "https://calendarific.com/api/v2/";

export async function getCountries() {
  try {
    const response = await fetch(`${API_URL}countries?api_key=${API_KEY}`);
    const data = await response.json();
    return data.response.countries;
  } catch (error) {
    throw error;
  }
}

export async function getHolidays(country, year) {
  try {
    const response = await fetch(
      `${API_URL}holidays?api_key=${API_KEY}&country=${country}&year=${year}`
    );
    const data = await response.json();
    return data.response.holidays;
  } catch (error) {
    throw error;
  }
}
