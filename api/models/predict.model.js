const mongoose = require('mongoose')

const predictSchema = mongoose.Schema({
    date: {
        type: String,
    // required: 'Please fill From Date'
    },
    country: {
        name: {
            type: String,
            // required: 'Please fill From Country'
        },
        flag: {
            type: String,
            default: "https://media.api-sports.io/football/leagues/10.png"    
            }
    },
  
    championship: {
        name: {
            type: String,
        }, 
        logo: {
            type: String,
            default: "https://media.api-sports.io/football/leagues/10.png"    
            }
    },
    fixture:  {
        fixture_id: {
            type: Number,
            },
            homeTeam: {
                team_id: {
                    type     : Number,
                },
                team_name: {
                    type     : String,
                },
                logo: {
                    type: String,
                    default: "https://media.api-sports.io/football/leagues/10.png"    
                    }    
                       },
            awayTeam: {
                team_id: {
                    type     : Number,
                },
                team_name: {
                    type     : String,
                },
                logo: {
                    type: String,
                    default: "https://media.api-sports.io/football/leagues/10.png"    
                    }
            },
            event_date: {
                type: String,
            },
            goalsHomeTeam: {
                type: Number,
            },
            goalsAwayTeam: {
                type: Number,
            },
            score: {
                halftime: {
                    type     : String,
                },
                fulltime: {
                    type     : String,
                },
                extratime: {
                    type: String,
                    },
                    penalty: {
                        type: String,
                        }
            },
            venue: {
                type: String,
            },
            referee: {
                type: String,
            },
            day_saison: {
                type: String,
            },
            statuts: {
                type: String,
            },
        },
        prediction: {
            type: String,
            // required: 'Please fill From Prediction'
        },
        coast: {
            type: Number,
            // required: 'Please fill From Prediction'
        },
        type_prediction: {
            type: String,
            // required: 'Please fill From Type Prediction'
        },
        author: {
            type: String,
            // required: 'Please fill From Author'
        },  
         iswin: {
             default:"null",
            type: String,
        },
        timestamp : { type : Date, default: Date.now }

})


const Predict = mongoose.model('Predict', predictSchema)

module.exports = Predict