// 'https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages';
export { fetchCountries };
function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,languages,population,flags`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('404');
      }
      return response.json();
    })
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}
