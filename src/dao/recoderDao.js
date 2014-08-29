var Recoder = require('../bean/Recoder');

var dao = {};

dao.add = function(json) {
    var r = new Recoder(json);
    console.log('saving recoder...................');
    r.save(function(err) {
        if (err) return handleError(err);
        console.log('saving completed.');
    });
};

dao.del = function() {};

module.exports = dao;