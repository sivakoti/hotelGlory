let chai = require('chai');
let chaiHttp = require('chai-http');
const { response } = require('express');
let server = require('./backend');

chai.should();

chai.use(chaiHttp);
describe('users',()=>{
    describe("get all users",()=>{
        it("all test cases passed",(done)=>{
            chai.request('http://localhost:8888').get("/users/allusers").end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(6);
            done();
            });
        });
        it("wrong URL",(done)=>{
            chai.request('http://localhost:8888').get("/users/users").end((err,response)=>{
                response.should.have.status(404);
            done();
        });
    });
    });
    });