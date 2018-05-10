/*!
 * radius-api
 * Copyright(c) 2016 Petr Odstrcil
 * MIT Licensed
 */

 'use strict';

/**
 * Module dependencies.
 * @private
 */

var createError = require('http-errors'),
    express = require('express'),
    //ntlm = require('express-ntlm'),
    path = require('path'),
    //logger = require('morgan'),
    //bodyParser = require('body-parser'),

    morganBody = require('morgan-body'),
    config = require('config'),
    url = require('url');
    //url = require('url').parse(config.server.url); 

(config) => { 
    console.log(config);      
}

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

//app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));//?? or true
//app.use(bodyParser.json); //??
//app.use(express.static(path.join(__dirname, 'public')));


if (app.get('env') !== 'test') {
    morganBody(app, {
        skip: (req, res) => { return res.statusCode < 400; }
        , stream: process.stderr
    });

    morganBody(app, {
        skip: (req, res) => { return res.statusCode >= 400 }
        , stream: process.stdout
    });
}

require('./routes')(app);

//var radreplyRouter = require('./routes/radreply');
//app.use('/radius-api/radreply', radreplyRouter );
//var indexRouter = require('./routes/index')(app);

/*NTLM*/
/*app.use(ntlm({
    function() {
        var args = Array.prototype.slice.apply(arguments);
        console.log.apply(null, args);
    },
    domain: 'MYDOMAIN',
    //domaincontroller: 'ldap://myad.example',

    // use different port (default: 389)
    // domaincontroller: 'ldap://myad.example:3899',
}));*/
//const { URL } = require('url');
//console.log(url.parse(config.server.url).path);
//console.log(new URL('/page.html',  '/chrome://settings/').href);
  // Prints 'chrome://settings/page.html'
  
//const routePath = URL.pathname; 
//console.log(routePath + '/radreply');
//app.use( routePath + '/radreply', radreplyRouter );

//app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500)
        .json({
            status: 'error',
            message: err
        });
    //res.render('error');
});

/**
 * Create a generic Not Found error object
 * @public
 */

function notFound (message, errorCode) {
    Error.captureStackTrace(this, this.constructor);
  
    this.name = this.constructor.name;
    this.message = message || 'The requested resource couldn\'t be found';
    this.statusCode = 404;
    this.errorCode = errorCode || 404;
};

/**
 * Module exports.
 * @public
 */
module.exports = notFound;
module.exports = app;

/*
module.exports = { 
    app: app(),
    notFound: notFound
}   */
