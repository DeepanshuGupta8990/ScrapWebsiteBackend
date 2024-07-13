const ScrapedData = require('../models/ScrapedData');

const getAllData = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    try {
        const data = await ScrapedData.find()
            .skip((options.page - 1) * options.limit)
            .limit(options.limit);

        const totalCount = await ScrapedData.countDocuments();

        res.status(200).json({
            data,
            totalCount,
            totalPages: Math.ceil(totalCount / options.limit),
            currentPage: options.page,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch the data' });
    }
};

module.exports = { getAllData };
