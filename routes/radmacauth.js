'use strict';

const router = require('express-promise-router')();
const db = require('../db/index.js');
const action = require('./action');

module.exports = router;

const columns = 'id, username, macaddress, creationdate'; 


const  sql = {
    delete: 'DELETE FROM radmacauth WHERE id = $1 RETURNING id',
    update: 'UPDATE radmacauth SET username=${username}, macaddress=${macaddress} WHERE id=${id} RETURNING id',
    insert: 'INSERT INTO radmacauth(username, macaddress) VALUES (${username}, ${macaddress}) RETURNING id',
    findById: 'SELECT '+ columns + ' FROM radmacauth WHERE id = $1',
    findByUserName: 'SELECT '+ columns + ' FROM radmacauth WHERE username like \'%$1#%\' ORDER BY username',
    findByMacAddress: 'SELECT '+ columns + ' FROM radmacauth WHERE macaddress = $1'
}

const dbSQL = {
    delete: (id) => { return db.result(sql.delete, +id) },
    update: (id, values) => { return db.result(sql.update, Object.assign(values, {id: +id})) },
    insert: (values) => { return db.result(sql.insert, values) },
    findById: (id) => { return db.result(sql.findById, id) },     
    findByUserName: (username) => { return db.result(sql.findByUserName, username) },
    findByMacAddress: (id) => { return db.result(sql.findByMacAddress, id) }
}

router.route('/id/:id([0-9]+)')
    .get(async (req, res) => {
        const id = parseInt(req.params.id);
        await action.selectOne(res, dbSQL.findById(id), id);
    })
    .put(async (req, res) => {
        const id = parseInt(req.params.id);
        await action.updateOne(res, dbSQL.update(+id, req.body));
    })
    .delete(async (req, res) => {
        const id = parseInt(req.params.id);
        await action.deleteOne(res, dbSQL.delete(id), id);
    })


router.get('/username/:username', async (req, res) => {
    //const username = req.params.username;
    const { username } = req.params;
    await action.selectMany(res, dbSQL.findByUserName(username), username);
}); 

router.get('/macaddress/:macaddress', async (req, res) => {
    //const macaddress = req.params.macaddress;
    const { macaddress } = req.params;
    await action.selectMany(res, dbSQL.findByMacAddress(macaddress), macaddress);
});

router.post('/', async (req, res) => {
    await action.insertOne(res, dbSQL.insert(req.body));
});