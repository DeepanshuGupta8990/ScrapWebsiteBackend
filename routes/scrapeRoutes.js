const express = require('express');
const router = express.Router();
const { scrapeData } = require('../controllers/scrapeController');
const { getData } = require('../controllers/getDataController');
const { getAllData } = require('../controllers/getAllDataController');
const { deleteData } = require('../controllers/deleteDataController');
const { downloadCSV } = require('../controllers/downloadController');

router.post('/scrape', scrapeData);
router.get('/getAllData', getAllData);
router.get('/getData/:id', getData);
router.delete('/deleteData', deleteData);
router.get('/downloadCSV', downloadCSV);

module.exports = router;
