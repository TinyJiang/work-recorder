var express = require('express');
var router = express.Router();
var loginFilter = require('./loginFilter');

router.get('/', loginFilter.authorize, function(req, res) {
    res.render('index.html');
});

router.get('/login', function(req, res) {
    res.render('login.html');
});

module.exports = router;