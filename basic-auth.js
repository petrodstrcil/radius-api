'use strict';

const basicAuth = require('express-basic-auth');
const configAuth = require('config').auth;

const options= {
    //users: config.users,
    //authorizer: (user, password, authorize) => authorize(null, password == 'secret'),
    authorizer: myAsyncAuthorizer,
    authorizeAsync: true,
    unauthorizedResponse: getUnauthorizedResponse,
    /*unauthorizedResponse: (req) => {
        return {
            'status': 'Error',
            'message': req.auth 
                ? 'Credentials ' + req.auth.user + ' rejected'
                : 'No credentials provided'
        };
    }*/
};

module.exports = (req, res, next) => {
    if (configAuth.type == 'basic')
        basicAuth(options)(req, res, next);
    else
        next();
}


function getUnauthorizedResponse(req) {
    return {
        'status': 'Error',
        'message': req.auth 
            ? 'Credentials ' + req.auth.user + ' rejected'
            : 'No credentials provided'
    };
}

function myAsyncAuthorizer(username, password, cb) {
    const user = configAuth.users.find( (obj) => { 
        return (obj.username == username && obj.password == password)
    });
    if (user) {
        console.log('User: %o', user.username);
        return cb(null, true);
    }
    else 
        cb(null, false);


    /*for (var i in users)
        if (username == i && password == users[i]) {
            console.log('User %o', i);
            return cb(null, true);
        }
   return cb(null, false);*/
} 