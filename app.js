require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const CronJob = require('cron').CronJob;
const {generateBanner} = require("./controllers/imageController.js");
const {tweetGoodMorning} = require("./controllers/twitterController.js");
const fs = require('fs');

deleteOldAvatars()

const job = new CronJob('* * * * *', async function () {
    await generateBanner()
    console.log('You will see this message every minute');
});
job.start()


const tweeter = new CronJob('0 4 * * *', async function () {
    await tweetGoodMorning()
    console.log('This cron tweets every morning');
});
tweeter.start()

app.get('/', function (req, res, next) {
    res.send('Server is running. By <a href="https://domthedev.com/">Dom the dev</a>');
});

function deleteOldAvatars() {
    const directory = './images/avatars';

    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            if (file !== ".gitkeep") {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                });
            }
        }
    });
}

module.exports = app