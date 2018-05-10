var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    assert = require('assert'),
    config = require('config'),
    app = require('../app.js');
    

//const api = supertest('https://localhost:8010/radius-api');    
const api = supertest(app);    


process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';    

describe('/GET /radreply/id/1', () => {
    it('it should GET one the item from radreply', (done) => {
        api.get('/radius-api/radreply/id/1')
           .set('Accept', 'application/json')
           //.set("Content-Type", "application/json")
           .expect('Content-Type', /json/)
           .expect(200)
           .then(res => {
           //.end( (err, res) => {

                expect(res.body).to.have.property("id");
                expect(res.body.id).to.not.equal(null);

                expect(res.body).to.have.property("username");
                expect(res.body.username).to.not.equal(null);

                expect(res.body).to.have.property("attribute");
                expect(res.body.attribute).to.not.equal(null);

                expect(res.body).to.have.property("op");
                expect(res.body.op).to.not.equal(null);

                expect(res.body).to.have.property("value");
                expect(res.body.value).to.not.equal(null);

                done();
            })
            .catch((err) => {
                console.log(err);
                //assert.isNotOk(error,'Promise error');
                done(err);
            });
    });

    //after(() => api.server.close());
});    