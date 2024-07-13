const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const ScrapedData = require('../models/ScrapedData');

const scrapeData = async (req, res) => {
    const url = req.body.url;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const name = $('meta[property="og:site_name"]').attr('content') || $('title').text() || "N/A";
        const description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || "N/A";
        const logo = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href') || "N/A";
        const facebook = $('a[href*="facebook.com"]').attr('href') || "N/A";
        const linkedin = $('a[href*="linkedin.com"]').attr('href') || "N/A";
        const twitter = $('a[href*="twitter.com"]').attr('href') || "N/A";
        const instagram = $('a[href*="instagram.com"]').attr('href') || "N/A";
        const address = $('address').text() || "N/A";
        const phone = $('a[href^="tel:"]').text() || "N/A";
        const email = $('a[href^="mailto:"]').text() || "N/A";        

        const result = {
            name,
            description,
            logo,
            facebook,
            linkedin,
            twitter,
            instagram,
            address,
            phone,
            email,
        };

        const screenshotsDir = path.join(__dirname, '../screenshots');
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir);
        }

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        const screenshotFilename = `screenshot-${uuidv4()}.png`;
        const screenshotPath = path.join(screenshotsDir, screenshotFilename);
        await page.screenshot({ path: screenshotPath });
        await browser.close();

        result.screenshot = `/screenshots/${screenshotFilename}`;
        result.url = url;

       // saving the scrap data in mongodb .....
       const scrapedData = new ScrapedData(result);
       const savedData = await scrapedData.save();
       
       res.json({ ...result, _id: savedData._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch the webpage' });
    }
};

module.exports = { scrapeData };
