'use strict';

var fs = require('fs'),
    path = require('path'),
    app = require('./app.js'),
    debug = require('debug')('radius-api:server'),
    config = require('config'),
    url = require('url'); 


console.log('Environment: ', app.get('env'));

const URL = url.parse(config.server.url); 

/**
 * Get port from config.
 */

//const port = url.port;
//app.set('port', url.port);

/**
 * Create HTTP server.
 */
//var server = "";

var server = (URL.protocol === 'https:')
    ? require('https').createServer( {
            key:  fs.readFileSync( path.join(__dirname, 'certificate/radius-api.key'), 'utf8' ),
            cert: fs.readFileSync( path.join(__dirname, 'certificate/radius-api.csr'), 'utf8' ),
            passphrase: process.env.HTTPS_PASSPHRASE || ''
        }, app)
    : require('http').createServer(app);


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(URL.port, URL.hostname, () => {
    console.log(`JEDME na ${URL.href}`);
});

server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
  
    var port = URL.port;
    var bind = typeof port === 'string' 
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
  
/**
  * Event listener for HTTP server "listening" event.
  */
  
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
}


module.exports = server;