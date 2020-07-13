const chai    = require('chai');
const request = require('supertest');
const faker   = require('faker');
const server  = request('http://localhost:3000');

const user = {
  userId    : '123teste'
};

describe('01. Test Case SignIn and get user', () => {
  var token;

  it('Should sign in service and get the access token', (done) => {

    server
      .post('/access-token')
      .send(user)
      .set('Content-Type', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(201)
      .expect(res => {
        chai.expect(res.body).to.be.an('object', 'Your body is not an object!');

        chai.expect(res.body.token).to.be.a('string', 'Your body.accessToken is not a string');

        token = res.body.token;
      })
      .end((error) => {
        if (error)
          return done(error);
        return done();
      });
  });
  
  it('Should get /users route', (done) => {
    server
      .get('/users')
      .set('access-token', token)
      .expect(200)
      .expect(res => {
        chai.expect(res.body).to.be.an('object', 'Your body is not an object!');

        chai.expect(res.body.ok).to.be.a('string', 'The field body.email is not a string!');
      })
      .end((error) => {
        if (error)
          return done(error);
        return done();
      });
  });
  
  it('Should found user by route /users/:userId', (done) => {
    server
      .get(`/users/${user.userId}`)
      .set('access-token', token)
      .expect(200)
      .expect(res => {
        chai.expect(res.body).to.be.an('object', 'Your body is not an object!');

        chai.expect(res.body.userId).to.be.a('string', 'The field body.userId is not a string!');
        chai.expect(res.body.message).to.be.a('string', 'The field body.message is not a string!');
      })
      .end((error) => {
        if (error)
          return done(error);
        return done();
      });
  });
  
  it('Should not found user by route /users/:userId', (done) => {
    server
      .get(`/users/321213`)
      .set('access-token', token)
      .expect(404)
      .expect(res => {
        chai.expect(res.body).to.be.an('object', 'Your body is not an object!');

        chai.expect(res.body.message).to.be.a('string', 'The field body.message is not a string!');
      })
      .end((error) => {
        if (error)
          return done(error);
        return done();
      });
  });

});