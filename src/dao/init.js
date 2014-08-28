var config = require('./config');
var mongoose = require('mongoose');

var options = {
    db: {
        native_parser: true
    },
    server: {
        poolSize: 5,
        socketOptions: {
            keepAlive: 1
        },
    },
    replset: {
        socketOptions: {
            keepAlive: 1
        }
    },
    user: config.username,
    pass: config.password
}

exports.connect = function() {
    mongoose.connect(config.url, options);
}