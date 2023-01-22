const axios = require('axios');
const cheerio = require('cheerio');

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.type === "scrape") {
            getScrapedData(sendResponse);
            return true;
        }
    }
);

async function getScrapedData(callback) {
    try {
        const response = await axios.get('https://www.jeuxvideo.com/sso/ajax_suggest_pseudo.php?pseudo=amaretsoncam');
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
