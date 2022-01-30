require("dotenv").config()
const createError = require("http-errors")
const express = require("express")
const path = require("path")
const logger = require("morgan")
const indexRouter = require("./routes")
const app = express();
const CronJob = require('cron').CronJob;
const {getFollowers, getUserProfileImage, updateBanner} = require("./controllers/twitterController")
const{createBanner, saveFollowerAvatar} = require("./controllers/imageController.js")

async function generateBanner() {

    const followers = await getFollowers()
    for (const follower of followers) {
        console.log("get follower images")
        const imageBuffer = await getUserProfileImage(follower.id)
        await saveFollowerAvatar(follower.id, imageBuffer)
    }

    await createBanner(process.env.BANNER_PATH)
    await updateBanner("./images/1500x500_final.png")

}

const job = new CronJob('* * * * *', async function () {
    await generateBanner()
    console.log('You will see this message every minute');
});
job.start()

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

module.exports = app