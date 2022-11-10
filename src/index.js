import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;
fetchCountries().then(r => {
  const markup = r
    .map(country => {
      console.log(country.flags.svg);
      return `<p class="country-list__text">
        <img
          class="country-list__img"
          src="https://flagcdn.com/ai.svg"
          width="150px"
          height="100px"
          alt=""
        />
        Country Name
      </p>`;
    })
    .join('');
});
