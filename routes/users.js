'use strict';

const router = require('express-promise-router')();
const db = require('../db/index.js');
const action = require('./action');

module.exports = router;

const user_column = 'username, status, provideridentification, ipaddresstype'
    + ', accesstype, servicecode, routedipaddressamount, iproutedrange'
    + ', ipaddress, framedpoolid, provisioningsource, usercreation, connectivityid'
    + ', endpointipaddress, routediprange, requestsource';


const  sql = {
    findByUserName: 'SELECT '+ user_column + ' FROM users WHERE username like \'%$1#%\'',
    findByIP: 'SELECT '+ user_column + ' FROM users WHERE ipaddress = $1'
    /*findByIP: 'SELECT '+ user_column + ' FROM users WHERE (ipaddress = $1'
        + ' or username in (SELECT username FROM radippool WHERE framedipaddress = $1))'*/
}

const dbSQL = {
    findByUserName: (username) => { return db.result(sql.findByUserName, username) },
    findByIP: (ip) => { return db.result(sql.findByIP, ip) }
}


router.get('/search/username/:username', async (req, res) => {
    const username = req.params.username;
    await action.selectMany(res, dbSQL.findByUserName(username), username);
}); 

router.get('/search/ip/:ip', async (req, res) => {
    const ip = req.params.ip;
    await action.selectMany(res, dbSQL.findByIP(ip), ip);
});