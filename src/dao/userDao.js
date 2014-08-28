var User = require('../bean/User');

var dao = {};

dao.add = function(userJSON) {
    var uJSON = {
        username: 'root',
        password: 'eastcom12#$',
        createTime: '2014-08-28 13:35:22',
        owner: ''
    };

    var u = new User(uJSON);
    console.log('saving user...................');
    u.save(function(err) {
        if (err) return handleError(err);
        console.log(u);
        console.log('saving completed.');
    });
};

dao.del = function() {};

module.exports = dao;