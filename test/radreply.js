//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';

var db = require('../db')

//Require the dev-dependencies
var chai = require('chai'),
    chaiHttp = require('chai-http'),
    //server = require('../server'),
    app = require('../app'),
    should = chai.should();

chai.use(chaiHttp);

//Our parent block
/*describe('radreply', () => {
    beforeEach((done) => { //Before each test
    });     
});*/
/*
    * Test the /GET route
    */
//describe('/GET /radreply/id/1', () => {
//    it('it should GET one the item from radreply', (done) => {

 /*       chai.request(server).get('/radreply/id/1')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.have.length(5);
        });
        done();
*/        
    /*chai.request(server)
        .get('/radreply/id/1')
        .end((err, res) => {
            res.should.have.status(200);
            //res.body.should.be.a('json');
            //res.body.length.should.be.eql(0);
            done();
        });*/
    
//    });
//});
