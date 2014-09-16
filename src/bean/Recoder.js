var mongoose = require('mongoose');

var recoderSchema = mongoose.Schema({
    author: String, //作者
    date: String, //日志日期
    recordTime: String, //记录时间
    content: String //日志内容
});

var Recoder = mongoose.model('Recoder', recoderSchema);

module.exports = Recoder;