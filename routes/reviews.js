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

        // Calling helper method to extract the initial reviews.
        extractReviewsFromContainer($, reviews, responseData);

        // Check if this product has more reviews.
        let nextItems = $(".reviewPage > dd > a").attr('href');

        // If the product has more reviews then recursively extract all the reviews page by page.
        if (nextItems) {
            let nextUrl = nextItems.trim();
            while (true) {
                let url = "https://www.tigerdirect.com" + nextUrl;
                let reviewResponse = await axios.get(url);
                let $ = cheerio.load(reviewResponse.data)
                let reviews = $("#customerReviews");
                extractReviewsFromContainer($, reviews, responseData);
                let nextItems = $(".reviewPage dd a:nth-child(2)").attr('href');
                if (!nextItems)
                    break;
                else
                    nextUrl = nextItems.trim();
            }
        }

        responseData.message = "Here is what I found...";
        return res.status(200).send(responseData);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Oops! It's not you, it's us. Looks like something's wrong. Please try again later.");
    }
});

// Helper function to retrive reviews from a block
const extractReviewsFromContainer = ($, reviews, responseData) => {
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
}

module.exports = router;