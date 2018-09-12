import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { assert, should, expect } = chai;

should();
chai.use(chaiHttp);
// test for creating menu items

describe('POST request for api/v1/menuItems', () => {
  it('should return 201 for menu item created successfully', (done) => {
    const menuItem = {
      food: 'fufu and egusi',
      price: '#1500',
      itemImage: 'image.png',
    };
    chai.request(app)
      .post('/api/v1/menuItems')
      .send(menuItem)
      .type('form')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.isString(res.body.status);
        assert.isString(res.body.message);
        assert.equal(res.body.status, 'success');
        assert.equal(res.body.message, 'Item created successfully');
        done();
      });
  });
  it('should return 400 for empty feilds when creating menu item ', (done) => {
    const menuItem = {
      food: '',
      price: '',
      image: '',
    };
    chai.request(app)
      .post('/api/v1/menuItems')
      .send(menuItem)
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
        assert.equal(res.body.message, 'All field are required');
        done();
      });
  });
});
