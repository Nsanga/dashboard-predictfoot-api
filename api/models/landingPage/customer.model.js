const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
    description: {
        type: String,
        required: 'Please fill From Descrition'
    },
    name: {
        type: String,
        required: 'Please fill From Name'
    },
    profile: {
        type: String,
        default: null 
    },

})


const Client = mongoose.model('Client', clientSchema)

module.exports = Client