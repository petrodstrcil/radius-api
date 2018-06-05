'use strict';

const router = require('express-promise-router')();
const db = require('../db/index.js');
const action = require('./action');

module.exports = router;

const columns = 'id, pool_name, framedipaddress, nasipaddress, pool_key, calledstationid' 
+ ', callingstationid, expiry_time, username';


const  sql = {
    findByUserName: 'SELECT '+ columns + ' FROM radippool WHERE username like \'%$1#%\'',
    findByIP: 'SELECT '+ columns + ' FROM radippool WHERE framedipaddress = $1'
}

const dbSQL = {
    findByUserName: (username) => { return db.result(sql.findByUserName, username) },
    findById: (id) => { return db.result(sql.findById, id) }
}

router.get('/username/:username', async (req, res) => {
    const username = req.params.username;
    await action.selectMany(res, dbSQL.findByUserName(username), username);
}); 

router.get('/ip/:ip', async (req, res) => {
    const ip = req.params.ip;
    await action.selectOne(res, dbSQL.findByIP(ip), ip);
});