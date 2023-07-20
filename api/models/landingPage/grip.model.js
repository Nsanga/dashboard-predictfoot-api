const mongoose = require('mongoose')

const gripSchema = mongoose.Schema({
    number: {
        type: String,
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
    image: {
        type: String,
        default: null 
    }

})


const Grip = mongoose.model('Grip', gripSchema)

module.exports = Grip