require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const CronJob = require('cron').CronJob;
const {generateBanner} = require("./controllers/imageController.js");
const {tweetGoodMorning} = require("./controllers/twitterController.js");
const fs = require('fs');
const fsPromises = fs.promises;

const job = new CronJob('* * * * *', async function () {
    console.log('Starting Job');
    await deleteOldAvatars()
    await generateBanner()
});
job.start()


const tweeter = new CronJob('0 5 * * *', async function () {
    await tweetGoodMorning()
    console.log('This cron tweets every morning');
});
tweeter.start()

app.get('/', function (req, res, next) {
    res.send('Server is running. By <a href="https://domthedev.com/">Dom the dev</a>');
});

async function deleteOldAvatars() {
    const directory = './images/avatars';
    console.log('deleting old avatars')

    await fsPromises.readdir(directory, async (err, files) => {
        if (err) throw err;


        for (const file of files) {
            if (file !== ".gitkeep") {
                try {
                    await fsPromises.unlink(path.join(directory, file));
                } catch (e) {
                    console.log('Error deleting image')
                    console.error(e)
                }
            }
        }
    });
}

module.exports = app