import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { assert, should, expect } = chai;

should();
chai.use(chaiHttp);

// Test get all order
describe('GET request for api/v1/order', () => {
  it('should return 200 for get all order request', (done) => {
    chai.request(app)
      .get('/api/v1/orders')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.data.should.be.an('array');
        expect(res.body.status).be.a('string');
        assert.isString(res.body.status);
        assert.equal(res.body.status, 'success');
        done();
      });
  });
  it('should return 200 for get all order request', (done) => {
    chai.request(app)
      .get('/api/v1/orders/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.data.should.be.an('object');
        expect(res.body.status).be.a('string');
        assert.isString(res.body.status);
        assert.equal(res.body.status, 'success');
        done();
      });
  });
  it('should return 404 for get all order request', (done) => {
    chai.request(app)
      .get('/api/v1/orders/2')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.isString(res.body.status);
        assert.isString(res.body.message);
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'No order found');
        done();
      });
  });
});

// Test for create order
describe('POST request for api/v1/order', () => {
  it('should return 201 for new order created', (done) => {
    const order = {
      fullName: 'okoro emeka',
      address: '24 iju road',
      food: 'fufu and egusi',
      price: '#1500',
    };
    chai.request(app)
      .post('/api/v1/orders')
      .send(order)
      .type('form')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        expect(res.body.data).be.a('object');
        assert.isString(res.body.status);
        assert.isString(res.body.message);
        assert.isObject(res.body.data);
        assert.equal(res.body.status, 'success');
        assert.equal(res.body.message, 'your order for fufu and egusi was placed successfully');
        done();
      });
  });
  it('should return 400 for empty input fields', (done) => {
    const order = {
      food: '',
      price: '#1500',
    };
    chai.request(app)
      .post('/api/v1/orders')
      .send(order)
      .type('form')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.isString(res.body.status);
        assert.isString(res.body.message);
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'All feilds are required');
        done();
      });
  });
});

// Test for update order status routes and controller
describe('PUT request for api/v1/order/:orderId', () => {
  it('should return 200 for updating order status', (done) => {
    const order = {
      status: 'decline',
    };
    chai.request(app)
      .put('/api/v1/orders/1')
      .send(order)
      .type('form')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        expect(res.body.data).be.an('object');
        assert.isString(res.body.status);
        assert.isString(res.body.message);
        assert.isObject(res.body.data);
        assert.equal(res.body.status, 'success');
        assert.equal(res.body.message, 'Order status updated successfully');
        assert.equal(res.body.data.status, 'decline');
        done();
      });
  });
  it('should return 400 for wrong order status', (done) => {
    const order = {
      status: 'rejected',
    };
    chai.request(app)
      .put('/api/v1/orders/1')
      .send(order)
      .type('form')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.isString(res.body.status);
        assert.isString(res.body.message);
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'Status need to be either "accept" or "decline"');
        done();
      });
  });
  it('should return 400 for empty status field', (done) => {
    const order = {
      status: '',
    };
    chai.request(app)
      .put('/api/v1/orders/1')
      .send(order)
      .type('form')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.isString(res.body.status);
        assert.isString(res.body.message);
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'All feilds are required');
        done();
      });
  });
  it('should return 404 for unavailable order', (done) => {
    const order = {
      status: 'accept',
    };
    chai.request(app)
      .put('/api/v1/orders/3')
      .send(order)
      .type('form')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.isString(res.body.status);
        assert.isString(res.body.message);
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'Order not found');
        done();
      });
  });
});
