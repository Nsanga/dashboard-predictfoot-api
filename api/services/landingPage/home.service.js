const About = require('../../models/landingPage/about.model');
const Advertisement = require('../../models/landingPage/advertisement.model');
const Customer = require('../../models/landingPage/customer.model');
const Grip = require('../../models/landingPage/grip.model');
const Headband = require('../../models/landingPage/headband.model');
const Plan = require('../../models/landingPage/plan.model');
const Service = require('../../models/landingPage/service.model');
const Statistic = require('../../models/landingPage/statistic.model');


exports.getAll = async (req, res) => {
    try {
        const about = await About.find().exec();
        const advertisement = await Advertisement.find().exec();
        const customer = await Customer.find().exec();
        const grip = await Grip.find().exec();
        const headband = await Headband.find().exec();
        const plan = await Plan.find().exec();
        const service = await Service.find().exec();
        const statistic = await Statistic.find().exec();

        const homeData = {
            success: true,
            data: {
                about,
                advertisement,
                customer,
                grip,
                headband,
                plan,
                service,
                statistic,
            },
        };

        res.status(200).json(homeData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
