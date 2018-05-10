'use strict';

const promise = require('bluebird');
const initOptions = { promiseLib: promise };
const pgp = require('pg-promise')(initOptions);
const config = require('config');


// Database connection details;
const cn = {
    user: config.db.user,
    database: config.db.database,
    password: config.db.password,
    host: config.db.host,
    port: config.db.port
};

const db = pgp(cn); // database instance;

db.connect()
    //.then( console.log('Connected to DB'))
    .catch(err => console.error('Connection error', err.stack))
    
/*exports.radreplyOne = () => {
    console.log(db);
     
     db.one('select * from radreply where id = 10')
        .then(data => {
            console.log('DATA:', data); // print data;
        })
        .catch(error => {
            console.log('ERROR:', error); // print the error;
        });
};*/

module.exports = db;