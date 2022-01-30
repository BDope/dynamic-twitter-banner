const express = require("express")
const router = express.Router()

router.get('/', function (req, res, next) {
    res.send('Server is running. By <a href="https://domthedev.com/">Dom the dev</a>');
});

module.exports = router;