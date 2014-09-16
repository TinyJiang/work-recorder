var express = require('express');
var router = express.Router();
var loginFilter = require('./loginFilter');
var userDao = require('../dao/userDao');
var recoderDao = require('../dao/recoderDao');
var utils = require('../common/utils.js');

/** login module */
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
        if (u && u.get('password') === password) {
            req.session.user = u;
            res.redirect('/index');
        } else {
            res.redirect('/login');
        }
    });
});

/** recoder module */
router.post('/recoder/add', function(req, res) {
    var user = req.session.user,
        date = req.param('date'),
        content = req.param('_content'),
        id = req.param('_id'),
        rec, returner = utils.returner(res);
    rec = {
        author: user.username,
        date: date,
        recordTime: utils.getFormat()(new Date()),
        content: content
    };
    recoderDao.add(id, rec, function(_id) {
        rec._id = _id;
        returner.returnSuccess('保存成功', rec);
    }, function() {
        returner.returnError('保存失败', null);
    });
});

router.post('/recoder/load', function(req, res) {
    var user = req.session.user,
        start = req.param('start'),
        end = req.param('end'),
        returner = utils.returner(res);

    recoderDao.findByTimeScope(user.username, start, end, function(data) {
        returner.returnSuccess('查询成功', data);
    }, function() {
        returner.returnError('查询成功', null);
    });
});


module.exports = router;