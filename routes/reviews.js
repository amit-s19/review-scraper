//Module Imports
const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio')

router.post('/scrapeReviews', async (req, res) => {
    const targetUrl = req.body.targetUrl;
    let responseData = {
        message: "This product has no reviews so far :)",
        reviewData: []
    };
    try {
        if (!targetUrl) {
            return res.status(400).send("targetUrl cannot be empty!");
        }
        let reviewResponse = await axios.get(targetUrl);
        let $ = cheerio.load(reviewResponse.data)
        let reviews = $("#customerReviews");

        if (reviews.length == 0) {
            responseData.message = "This product has no reviews so far :)";

            return res.status(200).send(responseData);
        };

        reviews.each((index, element) => {
            if (index != 0) {
                let tempObj = {};
                let rating = $(element).find(".itemRating strong").text();
                let nameAndDate = $(element).find(".reviewer > dd");
                let commentTitle = $(element).find(".rightCol > blockquote > h6").text();
                let commentDescription = $(element).find(".rightCol > blockquote > p").text();
                nameAndDate.each((index, element) => {
                    if (index == 0)
                        tempObj['reviewerName'] = $(element).text();
                    else
                        tempObj['reviewDate'] = $(element).text();
                });
                tempObj['rating'] = rating;
                tempObj['commentTitle'] = commentTitle;
                tempObj['commentDescription'] = commentDescription;
                responseData.reviewData.push(tempObj);
            }
        });
        responseData.message = "Here is what I found...";
        return res.status(200).send(responseData);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Oops! It's not you, it's us. Looks like something's wrong. Please try again later.");
    }
});


module.exports = router;