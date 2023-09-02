const { Double } = require('mongodb')
const mongoose = require('mongoose')

const predictSchema = mongoose.Schema({
    country: {
        flag: {
            type: String,
            default: "https://media.api-sports.io/football/leagues/10.png"
        },
        name: {
            type: String,
        }
    },
    championship: {
        logo: {
            type: String,
            default: "https://media.api-sports.io/football/leagues/10.png"
        },
        name: {
            type: String,
        }
    },
    fixture: {
        fixture_id: {
            type: Number,
        },
        league_id: {
            type: Number,
        },
        league: {
            name: {
                type: String,
            },
            country: {
                type: String,
            },
            logo: {
                type: String,
            },
            flag: {
                type: String,
            }
        },
        event_date: {
            type: String,
        },
        event_timestamp: {
            type: Number,
        },
        firstHalfStart: {
            type: Number,
        },
        secondHalfStart: {
            type: Number,
        },
        round: {
            type: String,
        },
        status: {
            type: String,
        },
        statusShort: {
            type: String,
        },
        elapsed: {
            type: Number,
        },
        venue: {
            type: String,
        },
        referee: {
            type: String,
        },
        homeTeam: {
            team_id: {
                type: Number
            },
            team_name: {
                type: String,
            },
            logo: {
                type: String,
            }
        },
        awayTeam: {
            team_id: {
                type: Number
            },
            team_name: {
                type: String,
            },
            logo: {
                type: String,
            }
        },
        goalsHomeTeam: {
            type: Number
        },
        goalsAwayTeam: {
            type: Number
        },
        score: {
            halftime: {
                type: String,
            },
            fulltime: {
                type: String,
            },
            extratime: {
                type: String,
                default: null
            },
            penalty: {
                type: String,
                default: null
            } 
        }
    },
    iswin: {
        type: String,
    },
    date: {
        type: String,
    },
    prediction: {
        type: String,
    },
    coast: {
        type: Number,
        min: 0,
        max: 999999.99
    },
    type_prediction: {
        type: String,
    },
    author: {
        type: String,
    },
    timestamp: {
        date: { type: String }
    }
})


const Predict = mongoose.model('Predict', predictSchema)

module.exports = Predict