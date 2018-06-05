'use strict';

const router = require('express-promise-router')();
const db = require('../db/index.js');
const action = require('./action');

const columns = 'username, userpassword, status, provideridentification, ipaddresstype'
    + ', accesstype, servicecode, routedipaddressamount, iproutedrange'
    + ', ipaddress, framedpoolid, provisioningsource, usercreation, connectivityid'
    + ', endpointipaddress, routediprange, requestsource';

const  sql = {
    delete: 'DELETE FROM users WHERE username = $1 RETURNING username',
    update: 'UPDATE users SET ' + templateCols(columns, '$this=${$this}', 'username') + ' WHERE username=${username} RETURNING username',
    insert: 'INSERT INTO users('+ columns + ') VALUES (' + templateCols(columns, '${$this}') + ') RETURNING username',
  
    findByUserName: 'SELECT '+ columns + ' FROM users WHERE username like \'%$1#%\'',
    //findByIP: 'SELECT '+ columns + ' FROM users WHERE ipaddress = $1'
    searchByIP: 'SELECT '+ columns + ' FROM users WHERE (ipaddress = $1'
        + ' or username in (SELECT username FROM radippool WHERE framedipaddress = $1))'
}

const dbSQL = {
    delete: (username) => { return db.result(sql.delete, username) },
    update: (username, values) => { return db.result(sql.update, Object.assign(values, {username: username})) },
    insert: (values) => { return db.result(sql.insert, values) },
    findByUserName: (username) => { return db.result(sql.findByUserName, username) },
    searchByIP: (ip) => { return db.result(sql.findByIP, ip) }
}


module.exports = router;

router.route('/username/:username')
    .get( (req, res) => { getUserByUsername(req, res); })
    .put(async (req, res) => {
        const { username } = req.params;
        await action.updateOne(res, dbSQL.update(username, req.body));
    })
    .delete(async (req, res) => {
        const { username } = req.params;
        await action.deleteOne(res, dbSQL.delete(username), username);
    })


router.get('/search/username/:username', async (req, res) => {
    getUserByUsername(req, res);
}); 

router.get('/search/ip/:ip', async (req, res) => {
    const ip = req.params.ip;
    await action.selectMany(res, dbSQL.searchByIP(ip), ip);
});

router.post('/', async (req, res) => {
    await action.insertOne(res, dbSQL.insert(req.body));
});


var getUserByUsername = async (req, res) => {
    const { username } = req.params;
    await action.selectMany(res, dbSQL.findByUserName(username), username);
}

function templateCols(source, patern, exlude) {
    const separator = ',';
    
    //const str = '\s*'+separator+'\s*';
    //console.log(str);
    //const re = new RegExp(str);
    //var arr = source.split(re);
    //var arr = source.split(/\s*'+separator+'\s*/);
    var arr = source.split(/\s*,\s*/);

    if (exlude != undefined) {
        if (!exlude.isArray) exlude = [exlude];
        for (let item of exlude)  arr.splice(arr.indexOf(item),1);
    }
    //Apply patern
    let pArr = arr.map( (item) => { return patern.replace(/(\$this)/g, item) } );

    return pArr.join(separator);
}