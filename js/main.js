'use strict';
const apiKey = config.MY_KEY;
const searchURL = 'https://api.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
    $('#results-list').empty();

  for (let i = 0; i < responseJson.data.length; i++){

    $('#results-list').append(
      `<li><h3>${responseJson.data[i].name}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
      </li>`
    )};
  //display the results section
  $('#results').removeClass('hidden');
};


function getParksData(state, maxResults, searchQuary) {

  const params = {
      stateCode: state,
      limit: maxResults,
      q: searchQuary,
      api_key: apiKey

    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }

  function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchQuary = $('#search-input').val();
      const maxResults = $('#max-number').val();
      const state = $('#state').val();

      getParksData(state, maxResults, searchQuary);
    });
  }


$(watchForm);
