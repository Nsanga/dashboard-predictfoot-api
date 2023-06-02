const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
    number: {
        type: Number,
        required: 'Please fill From Number'
    },
    title: {
        type: String,
        required: 'Please fill From Title'
    },
    description: {
        type: String,
        required: 'Please fill From Description'
    },

})


const Service = mongoose.model('Service', serviceSchema)

module.exports = Service