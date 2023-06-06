const moment = require('moment');

const getRequestConfig = (param) => {
    const config = {
      method: "GET",
      url: `https://${process.env.RAPID_API_HOST}/v2/fixtures/date/${param}`,
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": process.env.RAPID_API_HOST,
        "x-rapidapi-key": process.env.RAPID_API_KEY,
      },
      query: {
        timezone: "Europe%2FLondon"
      }
    };
    return config;
  };
  
  const getFixturesForDate = (date) => {
    const config = getRequestConfig(date);
  
    return fetch(config.url, {
      method: config.method,
      headers: config.headers
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error occurred while fetching fixtures for ${date}!`);
        }
      })
      .then((data) => {
        return restructureApiData(data);
      })
      .catch((error) => {
        console.log(`Error occurred while fetching fixtures for ${date}!`);
        return Promise.reject(error);
      });
  };
  
const restructureApiData = (dataApi) => {
  const fixtures = dataApi.api.fixtures;
  const response = {
    results: dataApi.api.results,
    country: []
  };
  fixtures.forEach((item) => {
    if (response.country.map((e) => e.name).indexOf(item.league.country) === -1) {
      const championship = [];
      fixtures.forEach((itemleague) => {
        if (itemleague.league.country == item.league.country && championship.map((e) => e.name).indexOf(itemleague.league.name) === -1) {
          const matches = [];
          fixtures.forEach((itemmatch) => {
            if (itemmatch.league_id === itemleague.league_id) {
              matches.push({
                "fixture_id": itemmatch.fixture_id,
                "homeTeam": itemmatch.homeTeam,
                "awayTeam": itemmatch.awayTeam,
                "event_date": moment(itemmatch.event_date),
                "venue": itemmatch.venue,
                "day saison": itemmatch.round,
                "status": "PENDING"
              });
            }
          });
          championship.push({
            "name": itemleague.league.name,
            "logo": itemleague.league.logo,
            "leagueid": itemleague.league_id,
            matches
          });
        }
      });
      response.country.push({
        "name": item.league.country,
        "flag": item.league.flag,
        championship
      });
    }
  });
  return response;
};

module.exports = {
    getFixturesForDate
};
