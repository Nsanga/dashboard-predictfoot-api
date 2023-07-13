const moment = require('moment');
const fs = require('fs-extra');
const path = require('path');
const { jsonFileWriter } = require('./jsonFileWriter');
const { errorResponse, successResponse }  = require ('./apiResponse.service');

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
  
  const getDailyFixtures = async (days) => {
    try {
      const dates = [];
      const today = moment().format('YYYY-MM-DD');
      dates.push(today);
      const directory = path.dirname("./api/data/api-football/");
      await fs.emptyDir(directory);
      for (let i = 1; i < days; i++) {
        const nextDate = moment().add(i, 'days').format('YYYY-MM-DD');
        dates.push(nextDate);
      }
  
      const fixtures = [];
  
      for (const date of dates) {
        const config = getRequestConfig(date);
        const response = await fetch(config.url, {
          method: config.method,
          headers: config.headers
        });
  
        if (response.ok) {
          const data = await response.json();
          const restructuredData = restructureApiData(data);
          fixtures.push(restructuredData);
          const filename = `./api/data/api-football/fixtures_${date}.json`; // Nom du fichier basé sur la date
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
}


async function findCountriesByDate(req, res) {
  try {
    const pathFile = await findFileByDate("./api/data/api-football",req.query.date)
    const result = await extractCountryInJson(pathFile)
    const response = successResponse(result);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.log(error)
    const response = errorResponse(`Failed to get list country${error}`);
    return res.status(response.statusCode).json(response);
  }
}

const extractCountryInJson = async (path) => {
  try {
    const data = await fs.readFile(path);
    const rawdata = JSON.parse(data);
    const countrys = {
      country: rawdata.country.map(item => ({ name: item.name, flag: item.flag }))
    };
    return countrys;
  } catch (error) {
    return error;
  }
};

const extractChampionshipInJson = async (path) => {
  try {
    const data = await fs.readFile(path);
    const rawdata = JSON.parse(data);
    const championships = {
      championship: rawdata.country.flatMap(item =>
        item.championship.map(champ => ({ name: champ.name, logo: champ.logo }))
      )
    };
    return championships;
  } catch (error) {
    return error;
  }
};

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



async function findChampionshipsByCountry(req, res) {
  try {
    const pathFile = await findFileByDate("./api/data/api-football",req.query.date)
    const countries = await extractCountryInJson(pathFile)
    const result = await extractChampionshipInJson(pathFile,countries)
    const response = successResponse(result);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.log(error)
    const response = errorResponse(`Failed to get list championship${error}`);
    return res.status(response.statusCode).json(response);
  }
}

async function findMatchesByChampionship(req, res) {
  try {
    const pathFile = await findFileByDate("./api/data/api-football",req.query.date)
    const result = await extractFixturesInJson(pathFile,req.query.championship)
    const response = successResponse(result);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.log(error)
    const response = errorResponse(`Failed to get list fixture${error}`);
    return res.status(response.statusCode).json(response);
  }
}

module.exports = {
  getDailyFixtures,
  findCountriesByDate,
  findChampionshipsByCountry,
  findMatchesByChampionship
};
