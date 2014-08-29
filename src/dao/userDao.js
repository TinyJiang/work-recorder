var User = require('../bean/User');

var dao = {};

dao.add = function(userJSON) {
    var u = new User(userJSON);
    console.log('saving user...................');
    u.save(function(err) {
        if (err) return handleError(err);
        console.log('saving completed.');
    });
};

dao.findByUsername = function(username, cb) {
    if (username && username.length)
        return User.findOne({
            username: username
        }).exec(cb);
}

dao.del = function() {};

module.exports = dao;