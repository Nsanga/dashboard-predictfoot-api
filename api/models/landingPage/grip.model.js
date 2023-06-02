const mongoose = require('mongoose')

const gripSchema = mongoose.Schema({
    titleGetstarted: {
        type: String,
        required: 'Please fill From TitleGetstarted'
    },
    subtitle: {
        type: String,
        required: 'Please fill From Subtitle'
    },
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


const Grip = mongoose.model('Grip', gripSchema)

module.exports = Grip