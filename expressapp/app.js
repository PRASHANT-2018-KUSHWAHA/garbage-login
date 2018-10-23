var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var cors= require('cors');
var app = express();

app.use(cors({
    origin: ['http://localhost:4200','http://127.0.0.1:4200'],
    credentials:true
}))


// mongoose connectivity
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/logindb', { useNewUrlParser: true } );

//passport
var passport = require('passport');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(session({
    name: 'myname.sid',   // custom name
    resave: false,       //  we do not want to save the object for every request 
    saveUninitialized: false,   // we do not want to save the session untill a successfull login by pasport.js
    secret: 'secret',
    cookie: {
        maxAge: 36000000,  // one day in milisecond
        httpOnly:false,  
        secure: false
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
 
require('./passport-config')  // require the passport configration file before initializing

app.use(passport.initialize());  // before initializing we have to configer passpoet first
app.use(passport.session());  //


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
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
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
