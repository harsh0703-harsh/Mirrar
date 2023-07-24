const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../app")


chai.use(chaiHttp);
const expect = chai.expect;


const postProductPayload = {
    "name": "XIOMIYO",
    "description": "Xiaomi Corporation (/ˈʃaʊmiː/; Chinese: 小米), commonly known as Xiaomi and registered as Xiaomi Inc., is a Chinese designer and manufacturer of consumer electronics and related software, home appliances, and household items",
    "price": 50
}

const prodVariantsPayload = {
    "name": "OPPO Reno10 Pro+ 5G",
    "additional_cost": 10

}

describe('API Tests', () => {


    it('Post Products', function (done) {
        this.timeout(5000);
        chai.request(app)
            .post('/product')
            .send(postProductPayload)
            .end((err, response) => {

                if (err) {
                    done(err);
                } else {
                    expect(response.status).to.be.equal(200);
                    done();
                }

            })

    })

    let prodId

    it('Get All Products', function (done) {
        this.timeout(5000);
        chai.request(app)
            .get('/product')
            .end((err, response) => {

                if (err) {
                    done(err);
                } else {
                    prodId = response.body[0]._id       // taking product id for next test
                    expect(response.status).to.be.equal(200);
                    done();
                }

            })

    })

    it('Post Variants in product', function (done) {
        this.timeout(5000);
        chai.request(app)
            .post(`/variants/${prodId}`)
            .send(prodVariantsPayload)
            .end((err, response) => {

                if (err) {
                    done(err);
                } else {
                    expect(response.status).to.be.equal(200);
                    done();
                }

            })

    })

    it('Get All Variants by Product id', function (done) {
        this.timeout(5000);
        chai.request(app)
            .get(`/variants/${prodId}`)
            .end((err, response) => {

                if (err) {
                    done(err);
                } else {
                    expect(response.status).to.be.equal(200);
                    done();
                }

            })

    })

    
    it('Delete the product and all variants by Product id', function (done) {
        this.timeout(5000);
        chai.request(app)
            .delete(`/product/${prodId}`)
            .end((err, response) => {

                if (err) {
                    done(err);
                } else {
                    expect(response.status).to.be.equal(200);
                    done();
                }

            })

    })

    // With the help of last test , it wil clean the db, So there will no testing data in db will be left


})