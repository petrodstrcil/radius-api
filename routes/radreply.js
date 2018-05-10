'use strict';

var router = require('express-promise-router')(),
    db = require('../db/index.js');


let sql = {
    delete: 'DELETE FROM radreply WHERE id = $1 RETURNING id',
    update: 'UPDATE radreply SET username=$1, attribute=$2, op=$3, value=$4 WHERE id=$5 RETURNING id',
    insert: 'INSERT INTO radreply(username, attribute, op, value) VALUES (${username}, ${attribute}, ${op}, ${value})',
    findById: 'SELECT * FROM radreply WHERE id = $1',
    findByUserName: 'SELECT * FROM radreply WHERE username = $1'
}

let dbSQL = {
    delete: (id) => { return db.result(sql.delete, +id, r => r.rowCount);},
    update: (id, values) => {return db.result(sql.update, [...values, +id]);},
    insert: (values) => { return db.result(sql.insert, values); }, 
    findById: (id) => { return db.oneOrNone(sql.findById, +id); },
    findByUserName: (username) => { return db.manyOrNone(sql.findByUserName, username); },
}


router.get('/id/:id([0-9]+)', async (req, res) => {
    let id = req.params.id;
    //let data = await db.oneOrNone('select * from radreply where id = $1', id);
    let data = await dbSQL.findById(id);
    res.send( data );
});

router.get('/username/:username', async (req, res) => {
    let username = req.params.username;
    let data = await dbSQL.findByUserName(username);
    res.send( data );
});

router.post('/', async (req, res) => {
    let data = await dbSQL.insert(req.body);
    res.status(201).json( { status: 'success', message: 'Inserted one row' } );
    //console.log(data);
    //res.status(201).json( data );
    //res.send( data );
});

//patch
router.patch('/id/:id([0-9]+)', (req, res) => {
    let id = parseInt(req.params.id);
    //console.log('PETR', id);
    //res.send('OK');
});

router.put('/id/:id([0-9]+)', async (req, res) => {
    let id = parseInt(req.params.id);
    let data = await dbSQL.update( [req.body.username, req.body.attribute, req.body.op, req.body.value], +id);
    res.send( data );        
});    

router.delete('/id/:id([0-9]+)', async (req, res) => {
    let id = parseInt(req.params.id);
    let data = await dbSQL.delete(id);
    res.send( data );  
});

module.exports = router;