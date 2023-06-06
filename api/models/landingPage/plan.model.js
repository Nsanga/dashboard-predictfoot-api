const mongoose = require('mongoose')

const forfaitSchema = mongoose.Schema({
    type: {
        type: String,
        required: 'Please fill From Type'
    },
    duration: {
        type: String,
        required: 'Please fill From Duration'
    },
    price: {
        type: String,
        required: 'Please fill From Price'
    },

})


const Forfait = mongoose.model('Forfait', forfaitSchema)

module.exports = Forfait