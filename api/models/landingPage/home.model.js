const mongoose = require('mongoose')

const homeSchema = mongoose.Schema({
    headband: {
        headbandTitle: {
            type: String,
        },
        headbandDescription: {
            type: String,
        },
        headbandImage: {
            type: String,
            default: null
        },
        headbandLinkAppStore: {
            type: String,
        },
        headbandLinkPlayStore: {
            type: String,
        },
    },
    service: {
        serviceNumber: {
            type: String,
        },
        serviceTitle: {
            type: String,
        },
        serviceDescription: {
            type: String,
        },
    },

    statistic: {
        statisticTitle: {
            type: String,
        },
        statisticSubtitle: {
            type: String,
        },
        statisticDescription: {
            type: String,
        },
        statisticTitleStat: {
            type: String,
        },
        statisticPourcentage: {
            type: String,
        },
    },
    plan: {
        planType: {
            type: String,
        },
        planDuration: {
            type: String,
        },
        planPrice: {
            type: String,
        },
    },
    customer: {
        customerDescription: {
            type: String,
            required: 'Please fill From Descrition'
        },
        customerName: {
            type: String,
            required: 'Please fill From Name'
        },
        customerProfile: {
            type: String,
            default: null
        },
    },
    advertisement: {
        advertisementTitle: {
            type: String,
        },
        advertisementDescription: {
            type: String,
        },
        advertisementImage: {
            type: String,
            default: null
        },
        advertisementLinkAppStore: {
            type: String,
        },
        advertisementLinkPlayStore: {
            type: String,
        },
    },
    about: {
        aboutTitle: {
            type: String,
        },
        aboutDescription: {
            type: String,
        },
        aboutImage: {
            type: String,
            default: null
        },
    },
    grip: {
        gripTitleGetstarted: {
            type: String,
        },
        gripSubtitle: {
            type: String,
        },
        gripNumber: {
            type: Number,
        },
        gripTitle: {
            type: String,
        },
        gripDescription: {
            type: String,
        },
        gripImage: {
            type: String,
            default: null
        }
    }

})


const Home = mongoose.model('Home', homeSchema)

module.exports = Home