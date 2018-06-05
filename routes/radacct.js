'use strict';

const router = require('express-promise-router')();
const db = require('../db/index.js');
const action = require('./action');

module.exports = router;

const columns = 'radacctid, acctsessionid, acctuniqueid, username, groupname'
+ ', realm, nasipaddress, nasportid, nasporttype, acctstarttime, acctupdatetime'
+ ', acctstoptime, acctinterval, acctsessiontime, acctauthentic, connectinfo_start'
+ ', connectinfo_stop, acctinputoctets, acctoutputoctets, calledstationid'
+ ', callingstationid, acctterminatecause, servicetype, framedprotocol'
+ ', framedipaddress';


const  sql = {
    findByUserName: 'SELECT '+ columns + ' FROM radacct WHERE username like \'%$1#%\'',
    findById: 'SELECT '+ columns + ' FROM radacct WHERE radacctid = $1'
}

const dbSQL = {
    findByUserName: (username) => { return db.result(sql.findByUserName, username) },
    findById: (id) => { return db.result(sql.findById, id) }
}

router.get('/username/:username', async (req, res) => {
    const username = req.params.username;
    await action.selectMany(res, dbSQL.findByUserName(username), username);
}); 

router.get('/id/:id', async (req, res) => {
    const id = req.params.id;
    await action.selectMany(res, dbSQL.findById(id), id);
});