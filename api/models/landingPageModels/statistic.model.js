const mongoose = require('mongoose')

const statisticSchema = mongoose.Schema({
    title: {
        type: String,
    required: 'Please fill From Title'
    },
    pourcentage: {
        type: String,
    required: 'Please fill From Pourcentage'
    },
  
})


const Statistic = mongoose.model('Statistic', statisticSchema)

module.exports = Statistic