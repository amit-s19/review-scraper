# Review Scraper
Allows to scrape all reviews of a product easily from TigerDirect

### How to use?
Simply perform a post request at 
`https://review-scraper-0.herokuapp.com/api/v1/reviews/scrapeReviews` with the given sample JSON body and get results.

### Sample JSON Body
```
{
    "targetUrl" : "https://www.tigerdirect.com/applications/SearchTools/item-details.asp?EdpNo=640254&CatId=3"
}
```

### Sample Response
```
{
    "message": "Here is what I found...",
    "reviewData": [
        {
            "reviewerName": "RISHABH",
            "reviewDate": "Aug 20, 2021",
            "rating": "4.0",
            "commentTitle": "Best deal",
            "commentDescription": "Must buy product at this price"
        },
        {
            "reviewerName": "don,",
            "reviewDate": "Jul 10, 2021",
            "rating": "4.3",
            "commentTitle": "Best product",
            "commentDescription": "It seems everything is fine, and it has a good sound system, but I looked up why Windows was saying it needs to be Activated from the HP website, and they said once it is up to date that will go away. That changed nothing. It is up to date and it was just never activated. I don't like the small solid state drive, and it has a place for a second drive, so I am thinking about finding all the drivers and installing normal Windows 10."
        },
        {
            "reviewerName": "AChipps,",
            "reviewDate": "Aug 07, 2020",
            "rating": "3.5",
            "commentTitle": "Windows 10 Pro Unactivated",
            "commentDescription": "It seems everything is fine, and it has a good sound system, but I looked up why Windows was saying it needs to be Activated from the HP website, and they said once it is up to date that will go away. That changed nothing. It is up to date and it was just never activated.\nI don't like the small solid state drive, and it has a place for a second drive, so I am thinking about finding all the drivers and installing normal Windows 10."
        }
    ]
}
```