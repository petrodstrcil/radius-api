/*!
 * radius-api
 * Copyright(c) 2016 Petr Odstrcil
 * AGPL 3.0 Licensed
 */

 'use strict';

/**
 * Module dependencies.
 * @private
 */

const createError = require('http-errors');
const express = require('express');
//const logger = require('morgan');
//const ntlm = require('express-ntlm');
const path = require('path');
const morganBody = require('morgan-body');
const config = require('config');
const url = require('url');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();

const expressSwagger = require('express-swagger-generator')(app);

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

//app.use(logger('combined'));


// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));//?? or true


let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'https://localhost:8000',
        basePath: '/radius-api',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['https']
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options);

app.use('/radius-api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use('/radius-api/api/v1', router);


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

// GET method route
app.get('/', function (req, res) {
    res.send('GET request to the homepage')
})

app.use('/radius-api/login', require('./routes/login'));

app.use('/radius-api/*', require('./auth'));
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
