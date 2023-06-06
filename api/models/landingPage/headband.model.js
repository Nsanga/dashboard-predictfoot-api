const mongoose = require('mongoose')

const bandeauSchema = mongoose.Schema({
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
    linkAppStore: {
        type: String,
        required: 'Please fill From LinkAppStore'
    },
    linkPlayStore: {
        type: String,
        required: 'Please fill From LinkPlayStore'
    },

})


const Bandeau = mongoose.model('Bandeau', bandeauSchema)

module.exports = Bandeau