var Recoder = require('../bean/Recoder');
var utils = require('../common/utils.js');
var dao = {};

dao.add = function(id, json, success, error) {
    var r = new Recoder(json);
    console.log('saving recoder...................');
    var upsertData = r.toObject();
    var _id = id || upsertData._id;
    delete upsertData._id;
    Recoder.update({
        _id: _id
    }, upsertData, {
        upsert: true
    }, function(err) {
        if (err) {
            utils.callFn(error);
            return utils.handleError(err)
        }

        console.log('saving completed.');
        utils.callFn(success, null, _id);
    });



};

dao.del = function() {};

dao.findByTimeScope = function(author, start, end, success, error) {
    var query = Recoder.find({
            author: author,
            date: {
                $gte: start,
                $lte: end
            }
        }),
        promise = query.exec();
    promise.addBack(function(err, docs) {
        if (err) {
            utils.callFn(error);
            return utils.handleError(err)
        }

        utils.callFn(success, null, docs);
    });
};

module.exports = dao;