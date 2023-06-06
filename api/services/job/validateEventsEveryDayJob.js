const axios = require("axios");
const cron = require('node-cron');
const config = require('../config/database');
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
var moment = require('moment');


let parameters = (param) => {
    const config = {
      "method": "GET",
      "url": `https://${process.env.RAPID_API_HOST}/v2/fixtures/team/${param}/last/1?timezone=Europe/London`,
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": process.env.RAPID_API_HOST,
        "x-rapidapi-key": process.env.RAPID_API_KEY,
      }, "query": {
        "timezone": "Europe%2FLondon"
      }
    }
  return config;
  }





  let validateFixtureTeamsYesterday = () => {
    cron.schedule("00 53 04 * * *", function () {
    axios.get(`https://predictfoot.herokuapp.com/api/v1/predict/getpredictold`, {
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => {
        
        let values = response.data;
        values.forEach(function (item) {
          if(moment().subtract(1, 'days').format("YYYY-MM-DD") == item.date)
          { 
            axios(parameters(item.fixture.homeTeam.team_id)).then((res2) => {
            MongoClient.connect(config.database, function(err, db) {
                if (err)  console.log(err);
                const dbo = db.db("josspredict");
                const myquery = { _id:ObjectId(item._id) };
            
              const valu = res2.data.api.fixtures;
                dbo.collection("predicts").updateOne(myquery, {$set:{'fixture':valu[0]}}, function(err, res) {
                  if (err) console.log(err);
                  console.log(res2.data.api.fixtures);
                  console.log("data yesterday updated");
                  db.close();
                });
                axios.put(`https://predictfoot.herokuapp.com/api/v1/predict/validatepredict/${item._id}`, {
                  headers: { "Content-Type": "application/json" }
                }).then((response) => { return response}).catch(
                  function (error) {
                    console.log(error)
                  });
              });  
            })
        }
      
        
       }); 
      }).catch(
        function (error) {
          console.log(error)
          console.log('done errors!')
        });
      })
      return "data yesterday updated";
  }


  
  


  module.exports = { validateFixtureTeamsYesterday };

  
