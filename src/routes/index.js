var express = require('express');
var router = express.Router();
var loginFilter = require('./loginFilter');
var userDao = require('../dao/userDao');

router.get('/', function(req, res) {
    res.redirect('/index');
});

router.get('/index', loginFilter.authorize, function(req, res) {
    res.render('index.html');
});

router.get('/login', function(req, res) {
    res.render('login.html');
}).post('/login', function(req, res) {
    var username = req.param('username'),
        password = req.param('password');
    userDao.findByUsername(username, function(err, u) {
        if (u && u.get('password') == password) {
            req.session.user = u;
            res.redirect('/index');
        } else {
            res.redirect('/login');
        }
    });
});

module.exports = router;