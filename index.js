// Module imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Setting constants
const PORT = process.env.PORT || 3000

// Instantiating express variable and enabling body parsing
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

// Importing routes
const reviewRoute = require('./routes/reviews');

// Route middlewares
app.use('/api/v1/reviews', reviewRoute);

app.listen(PORT, () => {
    console.log("Server Running on port : " + PORT)
});