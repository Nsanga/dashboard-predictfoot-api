const mongoose = require('mongoose')

const aboutSchema = mongoose.Schema({
    title: {
        type: String,
    required: 'Please fill From Title'
    },
    description: {
        type: String,
    required: 'Please fill From Description'
    },
    image: {
        type: String,
        default: null 
    },
    
})


const About = mongoose.model('About', aboutSchema)

module.exports = About