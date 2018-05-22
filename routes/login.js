'use strict';

const jwt = require('jwt-simple');
const router = require('express-promise-router')();
const config = require('config');
const Users = config.get('users');
//const db = require('../db/index.js');
//const action = require('./action');

module.exports = router;
router.get('/',  (req, res) => {
    res.status(200).json({'status': 'ok'});
});

router.post('/',  (req, res) => {
    const { username, password } = req.body;
    //var username = req.body.username || '';
    //var password = req.body.password || '';

    if (username != '' && password != '') {
        //Check if the credentials are valid
        const user = validateCredential(username, password);
        if (user) {
            // If authentication is success, we will generate a token
            // and dispatch it to the client
            res.json( {
                "status": "Sucess",
                "token": genToken(user)
            });
            return
        }
    }
    // If authentication fails, we send a 401 back
    res.status(401)
        .json( {
            "status": "Error",
            "message": "Invalid credentials"
        });
});

// Private methods
function validateCredential (username, password) {
    const user = Users.find( (obj) => { 
        return (obj.username == username && obj.password == password)
    });
    return user;
}

function genToken (user) {
    var expires = expiresIn(config.webToken.expiresDays); // 1 days
    var token = jwt.encode( { 
                exp: expires,
                user: {
                    username: user.username,
                    role: user.role 
                }
            }, config.webToken.secret);
   
    return token;
}

function expiresIn (numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}
