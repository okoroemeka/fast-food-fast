import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { assert, should, expect } = chai;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoib2tvcm9lbWVrYSIsInVzZXJfaWQiOjEsImVtYWlsIjoib2tvcm9AZ21haWwuY29tIiwic3RhdHVzIjoiYWRtaW4iLCJpYXQiOjE1Mzg2Mjg2NDIsImV4cCI6MTUzOTIzMzQ0Mn0.n5oDTIt03VG5mz95e-caW0bVoeYi67b_QDsp63H5ehY';
const regToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic29tdG8iLCJ1c2VyX2lkIjoyLCJlbWFpbCI6InNvbXRvQGdtYWlsLmNvbSIsInN0YXR1cyI6InJlZ3VsYXIiLCJpYXQiOjE1Mzg2Mjg4NTYsImV4cCI6MTUzOTIzMzY1Nn0.92jRS5tXZFYaDY56iiogCPSrCcRcuiuUPa8VGtvHUcc';
should();
chai.use(chaiHttp);

// Test get all order
describe('POST request for api/vi/auth/signup', () => {
  it('should return 201 for create user', (done) => {
    const user = {
      fullname: 'okoroemeka',
      email: 'okoro@gmail.com',
      telephone: '080626785',
      password: 'wiSe2424@',
      confirmPassword: 'wiSe2424@',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .type('form')
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        expect(res.body.data).be.a('object');
        assert.equal(res.body.message, 'Signup successfully, please proceed to login');
        assert.isObject(res.body.data);
        // expect(res).to.have.status(201);
        done();
      });
  });
  it('should return 409 for an already existing email', (done) => {
    const user = {
      fullname: 'okoroemeka',
      email: 'okoro@gmail.com',
      telephone: '080626785',
      password: 'wiSe2424@',
      confirmPassword: 'wiSe2424@',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .type('form')
      .end((err, res) => {
        res.should.have.status(409);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.equal(res.body.message, 'user alredy exist');
        done();
      });
  });
  it('should return 400 for an empty fullname', (done) => {
    const user = {
      fullname: '',
      email: 'okoro@gmail.com',
      telephone: '080626785',
      password: 'wiSe2424@',
      confirmPassword: 'wiSe2424@',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .type('form')
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'full name can not be empty and must be a string');
        done();
      });
  });
  it('should return 400 for empty email string', (done) => {
    const user = {
      fullname: 'okoroemeka',
      email: '',
      telephone: '080626785',
      password: 'wiSe2424@',
      confirmPassword: 'wiSe2424@',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .type('form')
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'please email can not be empty and must follow this format[example@whatever.com]');
        done();
      });
  });
  it('should return 400 for password length less than 6', (done) => {
    const user = {
      fullname: 'okoroemeka',
      email: 'okoro@gmail.com',
      telephone: '080626785',
      password: 'wiSe',
      confirmPassword: 'wiSe2424@',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .type('form')
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'password length must greater than 6 and should contain uppercase,lowercase, number and any of this character[$@#&!]');
        done();
      });
  });
  it('should return 400 for password that do not match confirmPassword', (done) => {
    const user = {
      fullname: 'okoroemeka',
      email: 'okoro@gmail.com',
      telephone: '080626785',
      password: 'wiGe2424@',
      confirmPassword: 'wiSe2424@',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .type('form')
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'the passwords do not match');
        done();
      });
  });
});
describe('POST request for api/v1/auth/signin', () => {
  it('should return 200 for a successful sign in', (done) => {
    const user = {
      email: 'okoro@gmail.com',
      password: 'wiSe2424@',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .type('form')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        expect(res.body.token).be.a('string');
        assert.equal(res.body.status, 'success');
        assert.equal(res.body.message, 'welcome to fast-food-fast resturant');
        done();
      });
  });
  it('should return 400 for a non existing user', (done) => {
    const user = {
      email: 'koro@gmail.com',
      password: 'wiSe2424@',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .type('form')
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'User does not exist, please sign up to continue');
        done();
      });
  });
  it('should return 400 for a wrong password', (done) => {
    const user = {
      email: 'okoro@gmail.com',
      password: 'wiGe2424@',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .type('form')
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'Wrong email or password');
        done();
      });
  });
  it('should return 400 for any epmty field', (done) => {
    const user = {
      email: 'okoro@gmail.com',
      password: '',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .type('form')
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'All feilds are required');
        done();
      });
  });
});
describe('POST api/v1/menu', () => {
  it('should return 201 for a menu created', (done) => {
    const order = {
      food: 'cake',
      price: '345',
      foodImage: 'gitres.jpg',
      token,
    };
    chai.request(app)
      .post('/api/v1/menu')
      .type('form')
      .send(order)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        expect(res.body.data).be.an('object');
        assert.equal(res.body.status, 'success');
        assert.equal(res.body.message, 'menu item created successfully');
        done();
      });
  });
  it('should return 400 for empty food string', (done) => {
    const order = {
      food: '',
      price: '345',
      foodImage: 'gitres.jpg',
      token,
    };
    chai.request(app)
      .post('/api/v1/menu')
      .type('form')
      .send(order)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'food name can not be empty');
        done();
      });
  });
  it('should return 400 for empty price string', (done) => {
    const order = {
      food: 'beans and yam',
      price: '',
      foodImage: 'gitres.jpg',
      token,
    };
    chai.request(app)
      .post('/api/v1/menu')
      .type('form')
      .send(order)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'price feild can not be empty and must be an integer');
        done();
      });
  });
  it('should return 400 for empty Image string', (done) => {
    const order = {
      food: 'beans and yam',
      price: '345',
      foodImage: '',
      token,
    };
    chai.request(app)
      .post('/api/v1/menu')
      .type('form')
      .send(order)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'food Image is required');
        done();
      });
  });
  it('should return 200 for get all order menu item', (done) => {
    chai.request(app)
      .get('/api/v1/menu')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.data.should.be.an('array');
        expect(res.body.status).be.a('string');
        assert.isArray(res.body.data);
        assert.isString(res.body.status);
        assert.equal(res.body.status, 'success');
        done();
      });
  });
});
//  Test for create order
describe('POST request for api/v1/order', () => {
  it('should return 201 for new order created', (done) => {
    const order = {
      street: '24 iju road',
      city: 'ikeja',
      telephone: '080637896',
      food: 'cake',
      quantity: 2,
      price: 1500,
      token,
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
        assert.equal(res.body.message, 'Order placed successfully');
        done();
      });
    it('should return 404 for an order that is no longer on the menu', (done) => {
      const badOrder = {
        street: '24 iju road',
        city: 'ikeja',
        telephone: '080637896',
        food: 'egusi and fufu',
        quantity: 2,
        price: 2500,
        token,
      };
      chai.request(app)
        .post('/api/v1/orders')
        .send(badOrder)
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
          assert.equal(res.body.message, 'Sorry, this food has been removed from the menu');
          done();
        });
    });
  });
  it('should return 200 for get all order request', (done) => {
    chai.request(app)
      .get('/api/v1/orders')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.data.should.be.an('array');
        expect(res.body.status).be.a('string');
        assert.isArray(res.body.data);
        assert.isString(res.body.status);
        assert.equal(res.body.status, 'success');
        done();
      });
  });
  it('should return 200 for get specific order request', (done) => {
    chai.request(app)
      .get('/api/v1/orders/1')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.data.should.be.an('object');
        expect(res.body.status).be.a('string');
        assert.isObject(res.body.data);
        assert.isString(res.body.status);
        assert.equal(res.body.status, 'success');
        done();
      });
  });
  it('should return 403 for get specific order request when not the caterer', (done) => {
    chai.request(app)
      .get('/api/v1/orders/1')
      .set('x-access-token', regToken)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.an('object');
        expect(res.body.status).be.a('string');
        assert.isString(res.body.status);
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'You are not autthorized to perform this action');
        done();
      });
  });
  it('should return 404 for a non existing order', (done) => {
    chai.request(app)
      .get('/api/v1/orders/6')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        expect(res.body.status).be.a('string');
        assert.isString(res.body.status);
        assert.equal(res.body.status, 'fail');
        // assert.equal(res.body.message, 'order not found');
        done();
      });
  });
  it('should return 200 for get order history', (done) => {
    chai.request(app)
      .get('/api/v1/users/1/orders')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.data.should.be.an('array');
        expect(res.body.status).be.a('string');
        assert.isArray(res.body.data);
        assert.isString(res.body.status);
        assert.equal(res.body.status, 'success');
        done();
      });
  });
  it('should return 403 for get order history by unauthorized user', (done) => {
    chai.request(app)
      .get('/api/v1/users/3/orders')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        expect(res.body.status).be.a('string');
        assert.isString(res.body.status);
        assert.isString(res.body.message);
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'User has no order history');
        done();
      });
  });
});
describe('PUT request for api/v1/order/:orderId', () => {
  it('should return 200 for updating order status', (done) => {
    const order = {
      status: 'Complete',
    };
    chai.request(app)
      .put('/api/v1/orders/1')
      .send(order)
      .type('form')
      .set('x-access-token', token)
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
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.isString(res.body.status);
        assert.isString(res.body.message);
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'Status need to be either "Processing","Complete" or "Cancelled"');
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
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.isString(res.body.status);
        assert.isString(res.body.message);
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'status field can not be empty');
        done();
      });
  });
});
