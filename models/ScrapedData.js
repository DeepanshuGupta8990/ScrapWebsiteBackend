const mongoose = require('mongoose');

const scrapedDataSchema = new mongoose.Schema({
    name: String,
    description: String,
    logo: String,
    facebook: String,
    linkedin: String,
    twitter: String,
    instagram: String,
    address: String,
    phone: String,
    email: String,
    screenshot: String,
    url: String,
}, { timestamps: true });

const ScrapedData = mongoose.model('ScrapedData', scrapedDataSchema);

module.exports = ScrapedData;
