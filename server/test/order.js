import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../bin/www';

const { expect, assert, should } = chai;

should();
chai.use(chaiHttp);
describe('Get request for api/v1/order', () => {
  it('should return 200 for get all order', (done) => {
    chai.request(app)
      .get('api/v1/order')
      .end((res, err) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        done();
      });
  });
});
