const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const scrapeRoutes = require('./routes/scrapeRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/screenshots', express.static(path.join(__dirname, 'screenshots')));

const mongoUri = 'mongodb+srv://deepanshugupta899:ZxEBEU2tZW5sI9BF@cluster0.ki6bgeh.mongodb.net/webscraper';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB connected");
}).catch((err) => {
    console.log(err);
});

app.use('/api', scrapeRoutes);

app.listen(port, () => {
    console.log(`Server is running`);
});
