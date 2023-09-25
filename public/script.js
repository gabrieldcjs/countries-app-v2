'use strict';

const submitButton = document.querySelector('.submit');
const countryInput = document.querySelector('.country-input');
const capitalElement = document.querySelector('.capital');
const populationElement = document.querySelector('.population');
const currenciesElement = document.querySelector('.currencies');
const continentElement = document.querySelector('.continent');

submitButton.addEventListener('click', () => {
  const countryName = countryInput.value;

  fetch(`/country-info?name=${countryName}`)
    .then((response) => response.json())
    .then((data) => {
      capitalElement.textContent = `Capital: ${data.capital}`;
      populationElement.textContent = `Population: ${data.population}`;
      currenciesElement.textContent = `Currencies: ${data.currencies}`;
      continentElement.textContent = `Continent: ${data.continents}`;
      console.log(currenciesElement);
    })
    .catch((error) => {
      console.error(error);
      populationElement.textContent = 'An error occured while fetching data';
      capitalElement.textContent = ' ';
    });
});
