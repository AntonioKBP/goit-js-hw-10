import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';
const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// refs = {};

inputRef.addEventListener('input', debounce(onInputText, DEBOUNCE_DELAY));

function onInputText(evt) {
  evt.preventDefault();
  // console.log(evt.currentTarget.value);
  const inputValue = evt.target.value.trim();
  console.log(inputValue);

  fetchCountries(inputValue)
    .then(countries => {
      if (countries.length > 10) {
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      markupCountryList(countries);
    })
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

// fetchCountries().then(r => {
//   const markup = r.map(country => {});
// });

function markupCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<p class="country-list__text">
        <img
          class="country-list__img"
          src="${country.flags.svg}"
          width="150px"
          height="100px"
          alt=""
        />
        ${country.name.official}
      </p>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function markupCountryInfo(countries) {
  const markup = countries
    .map(country => {
      return `<p><img class="country-info__img" src="${country.flags.svg}" alt="" /></p>
      <p class="country-info__text"><b>Capital: </b>${country.capital}</p>
      <p class="country-info__text"><b>Population: </b>${country.population}</p>
      <p class="country-info__text"><b>Languages: </b>${country.languages}</p>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
}
