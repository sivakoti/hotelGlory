let chai = require('chai');
let chaiHttp = require('chai-http');
const { response } = require('express');
let server = require('./backend');
let reserve = require('./model/reservation')

chai.should();

chai.use(chaiHttp);
describe('reservation',()=>{
    describe("GET /reservation/reservenow",()=>{
        it("all test cases passed",(done)=>{
            chai.request('http://localhost:8888').get("/reservation/reservenow").end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(1);
            done();
            });
        });
        it("wrong URL",(done)=>{
            chai.request('http://localhost:8888').get("/reservation/reserve").end((err,response)=>{
                response.should.have.status(404);
            done();
        });
    });
    });
    });