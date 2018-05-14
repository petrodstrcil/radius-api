var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    assert = require('assert'),
    config = require('config'),
    app = require('../app.js');
    

//const api = supertest('https://localhost:8010/radius-api');    
const api = supertest(app);    


process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';    

describe('-- radreply API router --', () => {
    describe('/GET /radreply/id/1', () => {
        it('it should GET one item from radreply', (done) => {
            api.get('/radius-api/radreply/id/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                    expect(res.body).to.have.property("status");
                    expect(res.body).to.have.property("message");
                    expect(res.body).to.have.property("data");

                    const data = res.body.data;
                    expect(data).to.have.property("id");
                    expect(data.id).to.not.equal(null);

                    expect(data).to.have.property("username");
                    expect(data.username).to.not.equal(null);

                    expect(data).to.have.property("attribute");
                    expect(data.attribute).to.not.equal(null);

                    expect(data).to.have.property("op");
                    expect(data.op).to.not.equal(null);

                    expect(data).to.have.property("value");
                    expect(data.value).to.not.equal(null);

                    done();
                })
                .catch((err) => {
                    console.log(err);
                    //assert.isNotOk(error,'Promise error');
                    done(err);
                });
        });
    })
    describe('/GET /radreply/username/Petr', () => {
                    it('it should GET list items from radreply', (done) => {
            api.get('/radius-api/radreply/username/Petr')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                    expect(res.body).to.have.property("status");
                    expect(res.body).to.have.property("message");
                    expect(res.body).to.have.property("data");

                    expect(res.body.data).to.be.an('array');

                    const data = res.body.data[0];
                    expect(data).to.have.property("id");
                    expect(data.id).to.not.equal(null);

                    expect(data).to.have.property("username");
                    expect(data.username).to.not.equal(null);

                    expect(data).to.have.property("attribute");
                    expect(data.attribute).to.not.equal(null);

                    expect(data).to.have.property("op");
                    expect(data.op).to.not.equal(null);

                    expect(data).to.have.property("value");
                    expect(data.value).to.not.equal(null);

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
});    