const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    author: {
        type: String,
        required: 'Please fill From Author'
    },
    profession: {
        type: String,
        required: 'Please fill From Author'
    },
    datePublication: {
        type: Date,
        required: 'Please fill From DatePublication',
        set: function (value) {
            if (typeof value === 'string') {
                const dateParts = value.split('-');
                const formattedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
                return formattedDate;
            }
            return value;
        }
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
        default: null
    },
    imageArticle: {
        type: String,
        default: null
    },
    articleStatut:{
        type: String,
    },

})


const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog