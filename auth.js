'use strict';

const jwt = require('jwt-simple');
const config = require('config');
const Users = config.get('users');


module.exports = (req, res, next) => {
    const token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

    if (token) {
        try {
            const decoded = jwt.decode(token, config.webToken.secret);
        
            if (decoded.exp <= Date.now()) {
                res.status(400)
                    .json({
                        "status": "400",
                        "message": "Token Expired"
                    });
                return;
            }

            const user = decoded.user;
            
            if (!user.username) {
                res.status(401)
                    .json( {
                        "status": "Error",
                        "message": "Invalid User"
                    });
                return;
            }

            if (!Users.find( (obj) => { return (obj.username == user.username) } )) {
                    res.status(401)
                        .json( {
                            "status": "Error",
                            "message": "Invalid User"
                        });
                    return;
            }

            next(); // To move to next middleware

        } catch (err) {
            res.status(500)
                .json( {
                    "status": "Error",
                    "message": "Oops something went wrong",
                    "error": err
                });
        }


    } else {
        res.status(401)
            .json( {
                "status": "Error",
                "message": "Invalid Token"
            });
    }  
}
   
