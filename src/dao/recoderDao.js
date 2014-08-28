var Recoder = require('../bean/Recoder');

var dao = {};

dao.add = function(json) {
    var uJSON = {
        author: 'root', //作者
        date: '2014-08-28', //日志日期
        recordTime: '2014-08-28 10:00:00', //记录时间
        content: '今天做了个啥！！！！！' //日志内容
    };

    var r = new Recoder(uJSON);
    console.log('saving recoder...................');
    r.save(function(err) {
        if (err) return handleError(err);
        console.log(r);
        console.log('saving completed.');
    });
};

dao.del = function() {};

module.exports = dao;