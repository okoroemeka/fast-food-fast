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

// update menu item test
describe('PUT request for api/v1/menuItems', () => {
  it('should return 200 for updating order status', (done) => {
    const menuItem = {
      food: 'pizza',
      price: '#1500',
      itemImage: 'image.jpeg',
    };
    chai.request(app)
      .put('/api/v1/menuItems/1')
      .send(menuItem)
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
        assert.equal(res.body.message, 'menu item updated successfully');
        done();
      });
  });

  it('should return 400 for empty fields', (done) => {
    const menuItem = {
      food: '',
      price: '',
      itemImage: '',
    };
    chai.request(app)
      .put('/api/v1/menuItems/1')
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
  it('should return 404 for non existing item', (done) => {
    const menuItem = {
      food: 'jellof rice',
      price: '#2100',
      itemImage: 'image.png',
    };
    chai.request(app)
      .put('/api/v1/menuItems/4')
      .send(menuItem)
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
        assert.equal(res.body.message, 'unable to update item, item not found');
        done();
      });
  });
});

// delete item test
describe('DELETE request for api/v1/menuItems/:itemId', () => {
  it('should return 204 after deleting a certain bmenu item', (done) => {
    chai.request(app)
      .delete('/api/v1/menuItems/1')
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
  it('should return 404 after after trying to delete a certain menu item which does not exist', (done) => {
    chai.request(app)
      .delete('/api/v1/menuItems/4')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        expect(res.body).be.an('object');
        expect(res.body.status).be.a('string');
        expect(res.body.message).be.a('string');
        assert.isString(res.body.status);
        assert.isString(res.body.message);
        assert.equal(res.body.status, 'fail');
        assert.equal(res.body.message, 'Unable to delete item, item not found');
        done();
      });
  });
});
