const moment = require('moment');
const fs = require('fs-extra');
const path = require('path');
const { jsonFileWriter } = require('./jsonFileWriter');
const { errorResponse, successResponse } = require('./apiResponse.service');
const { getPredictsService, updatePredictService } = require('./predict.service');

/**
 * Build the request configuration object for the API call.
 * @param {string} param - The date parameter for the API request.
 * @returns {object} - The request configuration object.
 */
const buildRequestConfig = (param) => {
  const config = {
    method: "GET",
    url: `https://${process.env.RAPID_API_HOST}/v2/fixtures/date/${param}`,
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    }
  };
  return config;
};

/**
 * Fetches daily fixtures for the specified number of days.
 * @param {number} days - The number of days to fetch fixtures for.
 * @returns {Promise<Array>} - A Promise that resolves to an array of fixtures.
 */
const getDailyFixtures = async (days) => {
  try {
    const dates = [];
    const today = moment().subtract(1, 'day').format('YYYY-MM-DD');
    dates.push(today);
    const directory = path.dirname("./api/data/api-football/");
    await fs.emptyDir(directory);
    for (let i = 0; i <= days; i++) {
      const nextDate = moment().add(i, 'days').format('YYYY-MM-DD');
      dates.push(nextDate);
    }

    const fixtures = [];

    for (const date of dates) {
      const config = buildRequestConfig(date);
      const response = await fetch(config.url, {
        method: config.method,
        headers: config.headers
      });

      if (response.ok) {
        const data = await response.json();
        const restructuredData = restructureApiData(data);
        fixtures.push(restructuredData);
        const filename = `./api/data/api-football/fixtures_${date}.json`; // Filename based on the date
        jsonFileWriter(filename, restructuredData);
      } else {
        throw new Error(`Error occurred while fetching fixtures for ${date}!`);
      }
    }

    return fixtures;
  } catch (error) {
    console.log(`Error occurred while fetching fixtures: ${error.message}`); 
    return Promise.reject(error);
  }
};

/**
 * Restructures the API data to a more manageable format.
 * @param {object} dataApi - The data from the API response.
 * @returns {object} - The restructured data object.
 */
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
                ...(itemmatch.status && { "status": itemmatch.status }),
                ...(itemmatch.statusShort && { "statusShort": itemmatch.statusShort }),
                ...(itemmatch.goalsHomeTeam && { "goalsHomeTeam": itemmatch.goalsHomeTeam }),
                ...(itemmatch.goalsAwayTeam && { "goalsAwayTeam": itemmatch.goalsAwayTeam }),
                ...(itemmatch.score && { "score": itemmatch.score })
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

/**
 * Finds a file by date in the specified folder path.
 * @param {string} folderPath - The folder path to search for files.
 * @param {string} substring - The substring to match in the filename.
 * @returns {Promise<string|null>} - A Promise that resolves to the file path or null if not found.
 */
const findFileByDate = async (folderPath, substring) => {
  try {
    const files = await fs.readdir(folderPath);
    for (const file of files) {
      if (file.includes(substring)) {
        const filePath = path.join(folderPath, file);
        const transformedPath = filePath.replace(/\\/g, '/');
        return transformedPath;
      }
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

/**
 * Finds countries in the JSON data for a specific date.
 * @param {object} req - The request object containing the query parameter "date".
 * @returns {Promise<object>} - A Promise that resolves to an object containing country information.
 */
const findCountriesByDate = async (req) => {
  try {
    const pathFile = await findFileByDate("./api/data/api-football", req.query.date);
    const result = await extractCountryInJson(pathFile);
    return successResponse(result);
  } catch (error) {
    console.log(error);
    return errorResponse(`Failed to get the list of countries: ${error}`);
  }
};

/**
 * Extracts country information from the JSON file.
 * @param {string} path - The file path of the JSON data.
 * @returns {Promise<object>} - A Promise that resolves to an object containing country information.
 */
const extractCountryInJson = async (path) => {
  try {
    const data = await fs.readFile(path);
    const rawdata = JSON.parse(data);
    const countries = {
      country: rawdata.country.map(item => ({ name: item.name, flag: item.flag }))
    };
    return countries;
  } catch (error) {
    return error;
  }
};

/**
 * Extracts championship information for a specific country from the JSON data.
 * @param {string} path - The file path of the JSON data.
 * @param {string} countryName - The name of the country to extract championships for.
 * @returns {Promise<object>} - A Promise that resolves to an object containing championship information.
 */
const extractChampionshipByCountry = async (path, countryName) => {
  try {
    const data = await fs.promises.readFile(path);
    const rawdata = JSON.parse(data);

    const countryData = rawdata.country.find(country => country.name === countryName);
    if (!countryData) {
      throw new Error(`Country "${countryName}" not found in the JSON file.`);
    }

    const championships = {
      championship: countryData.championship.map(champ => ({ name: champ.name, logo: champ.logo }))
    };
    return championships;
  } catch (error) {
    return error;
  }
};

/**
 * Extracts fixtures for a specific championship from the JSON data.
 * @param {string} path - The file path of the JSON data.
 * @param {string} championshipName - The name of the championship to extract fixtures for.
 * @returns {array} - An array containing the fixtures for the specified championship.
 */
const extractFixturesInJson = (path, championshipName) => {
  try {
    const data = fs.readFileSync(path);
    const rawdata = JSON.parse(data);
    const matches = rawdata.country
      .flatMap(item => item.championship)
      .find(champ => champ.name === championshipName)?.matches || [];
    return matches;
  } catch (error) {
    return error;
  }
};

/**
 * Finds championships by country for a specific date.
 * @param {object} req - The request object containing the query parameters "date" and "country".
 * @returns {Promise<object>} - A Promise that resolves to an object containing championship information.
 */
const findChampionshipsByCountry = async (req) => {
  try {
    const pathFile = await findFileByDate("./api/data/api-football", req.query.date);
    const result = await extractChampionshipByCountry(pathFile, req.query.country);
    return successResponse(result);
  } catch (error) {
    console.log(error);
    return errorResponse(`Failed to get the list of championships: ${error}`);
  }
};

/**
 * Finds matches by championship for a specific date.
 * @param {object} req - The request object containing the query parameters "date" and "championship".
 * @returns {Promise<object>} - A Promise that resolves to an object containing match information.
 */
const findMatchesByChampionship = async (req) => {
  try {
    const pathFile = await findFileByDate("./api/data/api-football", req.query.date);
    const result = await extractFixturesInJson(pathFile, req.query.championship);
    return successResponse(result);
  } catch (error) {
    console.log(error);
    return errorResponse(`Failed to get the list of fixtures: ${error}`);
  }
};

/**
 * Checks if a prediction is correct based on the score.
 * @param {string} score - The score in the format "goalsHomeTeam-goalsAwayTeam".
 * @param {string} prediction - The prediction string (e.g., "Home Win", "Draw").
 * @returns {boolean} - True if the prediction is correct, false otherwise.
 */
function isPredictionCorrect(score, prediction) {
  const [goalsHomeTeam, goalsAwayTeam] = score.split('-').map(Number);

  const predictionMap = {
    "Home Win": () => goalsHomeTeam > goalsAwayTeam,
    "Away Win": () => goalsAwayTeam > goalsHomeTeam,
    "Draw": () => goalsHomeTeam === goalsAwayTeam,
    "Double Chance Home": () => goalsHomeTeam >= goalsAwayTeam,
    "Double Chance Away": () => goalsAwayTeam >= goalsHomeTeam,
    "Two Teams Goals": () => goalsHomeTeam > 0 && goalsAwayTeam > 0,
    "Two Teams Don't Goals": () => goalsHomeTeam === 0 || goalsAwayTeam === 0,
    "Over 0.5": () => goalsHomeTeam > 0 || goalsAwayTeam > 0,
    "Under 0.5": () => goalsHomeTeam === 0 && goalsAwayTeam === 0,
    "Over 1.5": () => goalsHomeTeam + goalsAwayTeam > 1,
    "Under 1.5": () => goalsHomeTeam + goalsAwayTeam <= 1,
    "Over 2.5": () => goalsHomeTeam + goalsAwayTeam > 2,
    "Under 2.5": () => goalsHomeTeam + goalsAwayTeam <= 2,
    "Over 3.5": () => goalsHomeTeam + goalsAwayTeam > 3,
    "Under 3.5": () => goalsHomeTeam + goalsAwayTeam <= 3,
  };

  return predictionMap.hasOwnProperty(prediction) ? predictionMap[prediction]() : false;
}

/**
 * Corrects events from the previous day based on predictions and scores.
 */
async function correctPreviousDayEvents() {
  try {
    const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');
    const previousDayEventsUrl = await getPredictsService({ "query": { "dateFrom": yesterday } });
    const { success, data: previousDayEvents } = previousDayEventsUrl;
    if (!success || !Array.isArray(previousDayEvents.results)) {
      throw new Error('Failed to retrieve previous day events');
    }

    const pathFile = await findFileByDate('./api/data/api-football', yesterday);
    const data = fs.readFileSync(pathFile);
    const correctedMatchesResponse = JSON.parse(data);
    const { country } = correctedMatchesResponse;

    for (const countryData of country) {
      const { championship } = countryData;

      for (const leagueData of championship) {
        const { matches: correctedMatches } = leagueData;

        for (const event of previousDayEvents.results) {
          const fixtureId = event.fixture.fixture_id;
          const correctedMatch = correctedMatches.find(match => match.fixture_id === fixtureId);

          if (correctedMatch) {
            const isWin = isPredictionCorrect(event.fixture.score.fulltime, event.prediction);
            await updatePredictService({
              "query": { "fixture_id": fixtureId },
              "body": {
                fixture: correctedMatch,
                iswin: isWin,
              },
            });
            console.log(`Event corrected for fixture ID ${fixtureId}, isWin: ${isWin}`);
          }
        }
      }
    }
    console.log('Event correction completed successfully.');
  } catch (error) {
    console.error('Error while correcting events:', error.message);
  }
}

module.exports = {
  getDailyFixtures,
  findCountriesByDate,
  correctPreviousDayEvents,
  findChampionshipsByCountry,
  findMatchesByChampionship
};
