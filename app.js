require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const indexRouter = require("./routes");
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


const tweeter = new CronJob('0 5 * * *', async function () {
    await tweetGoodMorning()
    console.log('This cron tweets every morning');
});
tweeter.start()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// public files
app.use(express.static('public'));

// app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
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