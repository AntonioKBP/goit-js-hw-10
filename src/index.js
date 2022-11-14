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

  const name = evt.target.value.trim();
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';

  fetchCountries(name)
    .then(data => {
      // console.log(data);
      const countriesLength = data.length;
      if (countriesLength > 10) {
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (countriesLength < 9 && countriesLength > 2) {
        markupCountryList(data);
      } else if (countriesLength === 1) {
        markupCountryInfo(data);
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function markupCountryList(countries) {
  const markup = countries
    .map(({ flags, name }) => {
      return `<li class="country-list__item">
        <img
          class="country-list__flag"
          src="${flags.svg}"
          alt=""
        /><p class="country-list__text">${name}</p</li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function markupCountryInfo(countries) {
  const markup = countries
    .map(({ flags, name, capital, population, languages }) => {
      console.log(Object.values(languages));
      return `<div class="country-info__header"><img class="country-info__flag" src="${
        flags.svg
      }" alt="${name}" /><p class="country-info__country-name">${name}</p></div>
      <ul class="country-info__item">
      <li class="country-info__item"><p><b>Capital: </b>${capital}</p>
      </li>
      <li class="country-info__item"><p><b>Population: </b>${population}</p>
      </li>
      <li class="country-info__item">
      <p><b>Languages: </b>${languages.map(lang => {
        return `${lang.name}`;
      })}</p>
        </li>
      </ul>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
}
