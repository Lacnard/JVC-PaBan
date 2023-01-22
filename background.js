const axios = require('axios');
const cheerio = require('cheerio');

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.type === "scrape") {
            getScrapedData(request.url, sendResponse);
            return true;
        }
    }
);

async function getScrapedData(url, callback) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const scrapedData = $('body').text();
        callback({
            type: "scrapedData",
            data: scrapedData
        });
    } catch (error) {
        console.error(error);
    }
}
