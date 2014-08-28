var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String, //用户名
    password: String, //密码
    createTime: String, //创建时间
    owner: String //上级主管
})

var User = mongoose.model('User', userSchema);

module.exports = User;