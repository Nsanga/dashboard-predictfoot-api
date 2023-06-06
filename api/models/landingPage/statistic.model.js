const mongoose = require('mongoose')

const statisticSchema = mongoose.Schema({
    title: {
        type: String,
    required: 'Please fill From Title'
    },
    subtitle: {
        type: String,
    required: 'Please fill From Subtitle'
    },
    description: {
        type: String,
    required: 'Please fill From Description'
    },
    titleStat: {
        type: String,
    required: 'Please fill From TitleStat'
    },
    pourcentage: {
        type: String,
    required: 'Please fill From Pourcentage'
    },
  
})


const Statistic = mongoose.model('Statistic', statisticSchema)

module.exports = Statistic