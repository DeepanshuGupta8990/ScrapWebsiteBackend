const ScrapedData = require('../models/ScrapedData');

const getData = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    try {
        const data = await ScrapedData.findById(id); 
        if (!data) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch the data' });
    }
};

module.exports = { getData };
