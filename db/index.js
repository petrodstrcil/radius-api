'use strict';

// Bluebird is the best promise library available today,
// and is the one recommended here:
const promise = require('bluebird');

//tohle jsem zakomentoval
//const repos = require('./repos'); // loading all repositories

// pg-promise initialization options:
const initOptions = {

    // Use a custom promise library, instead of the default ES6 Promise:
    promiseLib: promise,

    // Extending the database protocol with our custom repositories;
    // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
    //extend(obj, dc) {
        // Database Context (dc) is mainly useful when extending multiple databases
        // with different access API-s.

        //https://github.com/vitaly-t/pg-promise-demo
        // Do not use 'require()' here, because this event occurs for every task
        // and transaction being executed, which should be as fast as possible.
        //obj.radreply = new repos.Radreply(obj, pgp);
        //obj.radcheck = new repos.radcheck(obj, pgp);
    //}
};

// Load and initialize pg-promise:
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

// Create the database instance:
const db = pgp(cn);

// Load and initialize optional diagnostics:
const diagnostics = require('./diagnostics');
diagnostics.init(initOptions);

// If you ever need access to the library's root (pgp object), you can do it via db.$config.pgp
// See: http://vitaly-t.github.io/pg-promise/Database.html#.$config
module.exports = db;




