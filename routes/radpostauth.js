'use strict';

const router = require('express-promise-router')();
const db = require('../db/index.js');
const action = require('./action');

module.exports = router;

const columns = 'id, username, pass, reply, calledstationid, callingstationid, authdate'; 


const  sql = {
    findByUserName: 'SELECT '+ columns + ' FROM radpostauth WHERE username like \'%$1#%\' ORDER BY id DESC LIMIT 100',
    findById: 'SELECT '+ columns + ' FROM radpostauth WHERE id = $1'
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
    await action.selectOne(res, dbSQL.findById(id), id);
});