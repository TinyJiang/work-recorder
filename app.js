var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./src/routes/index');

var daoinit = require('./src/dao/init');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'webapp'));
app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000
    }
}));

app.use('/', routes);

app.use(express.static(path.join(__dirname, 'webapp')));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        console.log(err);
        res.render('error.html', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.message);
    res.render('error.html', {
        message: err.message,
        error: {}
    });
});

//connect db
daoinit.connect();

module.exports = app;