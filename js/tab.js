let dateTab = document.querySelector(".date");
let countriesTab = document.querySelector(".countries");

function showElement(event) {
  event.hidden = true;
}
function hideElement(event) {
  event.hidden = false;
}

export const handleFirstTab = () => {
  hideElement(dateTab);
  showElement(countriesTab);
};

export const handleSecondTab = () => {
  hideElement(countriesTab);
  showElement(dateTab);
};
