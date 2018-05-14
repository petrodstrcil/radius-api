'use strict';

const router = require('express-promise-router')();
const db = require('../db/index.js');
const action = require('./action');

const  sql = {
    delete: 'DELETE FROM radreply WHERE id = $1 RETURNING id',
    update: 'UPDATE radreply SET username=${username}, attribute=${attribute}, op=${op}, value=${value} WHERE id=${id} RETURNING id',
    insert: 'INSERT INTO radreply(username, attribute, op, value) VALUES (${username}, ${attribute}, ${op}, ${value}) RETURNING id',
    findById: 'SELECT * FROM radreply WHERE id = $1',
    findByUserName: 'SELECT * FROM radreply WHERE username = $1'
}

const dbSQL = {
    delete: (id) => { return db.result(sql.delete, +id) },
    update: (id, values) => { return db.result(sql.update, Object.assign(values, {id: +id})) },
    insert: (values) => { return db.result(sql.insert, values) }, 
    findById: (id) => { return db.result(sql.findById, +id) },
    findByUserName: (username) => { return db.result(sql.findByUserName, username) },
}


router.get('/id/:id([0-9]+)', async (req, res) => {
    const id = req.params.id;
    await action.selectOne(res, dbSQL.findById(id), id);
});

router.get('/username/:username', async (req, res) => {
    const username = req.params.username;
    await action.selectMany(res, dbSQL.findByUserName(username), username);
});

router.post('/', async (req, res, next) => {
    await action.insertOne(res, dbSQL.insert(req.body));
});

router.put('/id/:id([0-9]+)', async (req, res) => {
    const id = parseInt(req.params.id);
    await action.updateOne(res, dbSQL.update(+id, req.body));
});    

router.delete('/id/:id([0-9]+)', async (req, res) => {
    const id = parseInt(req.params.id);
    await action.deleteOne(res, dbSQL.delete(id), id);
});

module.exports = router;