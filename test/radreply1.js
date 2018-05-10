'use strict';

var request = require("request");
var app = require("../app");


describe("API Server", function() {

    var server;
    var port;

    beforeEach(function(done) {
        server = app.listen(0, done);
        port = server.address.port();
    });

    afterEach(function() {
        server.stop();
    });
});

