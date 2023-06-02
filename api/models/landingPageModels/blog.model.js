const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    author: {
        type: String,
        required: 'Please fill From Author'
    },
    datePublication: {
        type: Date,
        required: 'Please fill From DatePublication'
    },
    title: {
        type: String,
        required: 'Please fill From Title'
    },
    preambule: {
        type: String,
        required: 'Please fill From Preambule'
    },
    description: {
        type: String,
        required: 'Please fill From Description'
    },
    profile: {
        type: String,
        required: 'Please fill From Profile'
    },
    imageArticle: {
        type: String,
        required: 'Please fill From ImageArticle'
    },

})


const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog