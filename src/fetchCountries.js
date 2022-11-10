// 'https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages';
export { fetchCountries };
function fetchCountries(name) {
  return fetch('https://restcountries.com/v3.1/all')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log('Error just hapend'));
}
