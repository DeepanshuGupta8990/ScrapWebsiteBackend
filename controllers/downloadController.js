// controllers/downloadController.js
const ScrapedData = require('../models/ScrapedData');
const { createObjectCsvWriter } = require('csv-writer');
const path = require('path');
const fs = require('fs');

const downloadCSV = async (req, res) => {
    try {
        const data = await ScrapedData.find();
        if (!data.length) {
            return res.status(404).json({ error: 'No data found' });
        }

        const downloadsDir = path.join(__dirname, '../downloads');
        if (!fs.existsSync(downloadsDir)) {
            fs.mkdirSync(downloadsDir);
        }

        const csvWriter = createObjectCsvWriter({
            path: path.join(downloadsDir, 'scrapedData.csv'),
            header: [
                { id: 'name', title: 'Name' },
                { id: 'description', title: 'Description' },
                { id: 'logo', title: 'Logo' },
                { id: 'facebook', title: 'Facebook' },
                { id: 'linkedin', title: 'LinkedIn' },
                { id: 'twitter', title: 'Twitter' },
                { id: 'instagram', title: 'Instagram' },
                { id: 'address', title: 'Address' },
                { id: 'phone', title: 'Phone' },
                { id: 'email', title: 'Email' },
                { id: 'screenshot', title: 'Screenshot' },
                { id: 'url', title: 'URL' },
            ],
        });

        await csvWriter.writeRecords(data);

        res.download(path.join(downloadsDir, 'scrapedData.csv'), 'scrapedData.csv', (err) => {
            if (err) {
                console.error('Error downloading the file:', err);
                res.status(500).send('Could not download the file.');
            }
        });
    } catch (error) {
        console.error('Error generating CSV:', error);
        res.status(500).json({ error: 'Failed to generate CSV' });
    }
};

module.exports = { downloadCSV };
