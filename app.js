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

const createError = require('http-errors');
const express = require('express');
const morganBody = require('morgan-body');

//logger = require('morgan'),
//bodyParser = require('body-parser'),

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');


var app = express();

//app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));//?? or true
//app.use(bodyParser.json); //??
//app.use(express.static(path.join(__dirname, 'public')));


app.use('/radius-api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
require('./swagger/docs.js')(app);

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

app.use('/radius-api', require('./basic-auth'));
require('./routes')(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
    res.locals.message = err.message;
    //res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500)
        .json({
            status: 'error',
            message: res.locals.message,
            error: res.locals.error
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
}

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
