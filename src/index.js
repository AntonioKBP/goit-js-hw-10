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

  fetchCountries(name)
    .then(data => {
      console.log(data.length);
      const countriesLength = data.length;
      if (countriesLength > 10) {
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      markupCountryList(data);
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });

  // fetchCountries(name)
  //   .then(countries => {
  //     const countriesLength = countries.length;
  //     // markupCountryList(countries);
  //     // markupCountryInfo(countries);
  //     // if (countries.length > 10) {
  //     //   Notify.info(
  //     //     'Too many matches found. Please enter a more specific name.'
  //     //   );
  //     //   return;
  //     // }
  //     countries.map(country => {
  //       if (countriesLength <= 10 && countriesLength > 2) {
  //         countryInfo.innerHTML = '';
  //         countryList.insertAdjacentHTML(
  //           'beforeend',
  //           markupCountryList(countries)
  //         );
  //       }
  //     });
  //   })
  //   .catch(error => Notify.failure('Oops, there is no country with that name'));
}

// fetchCountries().then(r => {
//   const markup = r.map(country => {});
// });

function markupCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li class="country-list__item">
        <img
          class="country-list__img"
          src="${country.flags.svg}"
          alt=""
        />
        ${country.name}
      </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function markupCountryInfo(countries) {
  const markup = countries
    .map(country => {
      return `<lli><img class="country-info__img" src="${country.flags.svg}" alt="" /></lli>
      <li class="country-info__text"><b>Capital: </b>${country.capital}</li>
      <li class="country-info__text"><b>Population: </b>${country.population}</li>
      <li class="country-info__text"><b>Languages: </b>${country.languages}</li>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
}
