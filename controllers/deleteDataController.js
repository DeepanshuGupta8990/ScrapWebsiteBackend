const ScrapedData = require('../models/ScrapedData');

const deleteData = async (req, res) => {
    const { ids } = req.body; 
    console.log(ids)
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: 'An array of IDs is required' });
    }

    try {
        const deletedData = await ScrapedData.deleteMany({ _id: { $in: ids } }); 
        res.status(200).json({ message: 'Data deleted successfully', deletedCount: deletedData.deletedCount });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to delete the data' });
    }
};

module.exports = { deleteData };
