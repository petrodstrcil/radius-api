'use strict';

var db = require('../db.js');

module.exports = {

    getRadreplyById: (req, res, next) => {
        var id = parseInt(req.params.id);
        db.one('select * from radreply where id = $1', id)
            .then( data => {
                res.status(200).json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved one row'
                });
            })
            .catch(err => { return next(err); } );
    },

    getRadreplyByUserName: (req, res, next) => {
        var username = req.params.username;
        db.query('select * from radreply where username = $1', username)
            .then( data => {
                res.status(200).json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved any row'
                });
            })
            .catch(err => { return next(err); } );
    },

    createRadreply: (req, res, next) => {
        db.none('insert into radreply(username, attribute, op, value)'
            + 'values(${username}, ${attribute}, ${op}, ${value})', req.body)
            .then( data => {
                res.status(200).json({
                    status: 'success',
                    message: 'Inserted one row'
                });
            })
            .catch(err => { return next(err); } );
    },

    updateRadreply: (req, res, next) => {
        var id = parseInt(req.params.id);
        db.none('update radreply'
                + ' set username=$1, attribute=$2, op=$3, value=$4'
                + ' where id=$5'
                , [req.body.username, req.body.attribute, req.body.op, req.body.value, id])
            .then( data => {
                res.status(200).json({
                    status: 'success',
                    message: 'Updated one row'
                });
            })
            .catch(err => { return next(err); });
    },            

    
    deleteRadreply: (req, res, next) => {
        var id = parseInt(req.params.id);
        db.none('delete from radreply where id=$1', id)
            .then( data => {
                res.status(200).json({
                    status: 'success',
                    message: 'Removed one row'
                });
            })
            .catch(err => { return next(err); } );
    }   
};