import request from 'supertest';
import app from '../../server/api';
import testData from './testdata.json';
import usersAuth from './loginusers';

// sign in a defaul users
let adminUser;
let regularUser;

// sign a fake token
const fakeToken = usersAuth.fakeToken();

describe('User API', () => {
  beforeAll((done) => {
    usersAuth.login(request, app, (users) => {
      if (users) {
        adminUser = users.admin;
        regularUser = users.regular;
        done();
      } else {
        done(new Error('Default users could not be logged in'));
      }
    });
  });
  describe('/users/', () => {
    it('Validates newly created user', (done) => {
      request(app)
      .post('/users')
        .send(testData.users.admin)
        .expect(200)
        .end((err, res) => {
          if (res) {
            expect(res.body.msg).toEqual('signup success');
            expect(res.body.data.id).toBeDefined();
            return done();
          }
          return done(err);
        });
    });

    it('Fails when it trys to create a user that already exists', (done) => {
      request(app)
      .post('/users')
        .send(testData.users.admin)
        .expect(409)
        .end(() => {
          done();
        });
    });

    it('Returns all user when requested by admin', (done) => {
      request(app)
      .get('/users/')
      .set('Accept', 'application/json')
      .set('x-access-token', adminUser.token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (res) {
          res.body.forEach((user) => {
            // Check required fields for each user
            expect(user.id).toBeDefined();
          });
          return done();
        }
        return done(err);
      });
    });

    it('Returns error when a regular user trys to GET all users', (done) => {
      request(app)
      .get('/users/')
      .set('Accept', 'application/json')
      .set('x-access-token', regularUser.token)
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        if (res) {
          expect(res.body.msg).toEqual('unauthorized: not admin');
          return done();
        }
        return done(err);
      });
    });
  });

  describe('/users/login', () => {
    it('Successfully logs in a valid user', (done) => {
      request(app)
      .post('/users/login')
        .send(
        {
          username: testData.users.admin.username,
          password: testData.users.admin.password,
        })
        .expect(200)
        .end((err, res) => {
          if (res) {
            expect(res.body.msg).toEqual('login success');
            expect(res.body.data.id).toBeDefined();
            return done();
          }
          return done(err);
        });
    });

    it('Trys to login an invalid user', (done) => {
      request(app)
      .post('/users/login')
        .send(
        {
          username: 'invalid_username',
          password: 'valid_password',
        })
        .expect(404)
        .end((err, res) => {
          if (res) {
            expect(res.body.msg).toEqual('user not found');
            return done();
          }
          return done(err);
        });
    });

    it('Trys to login a valid user with the wrong password', (done) => {
      request(app)
      .post('/users/login')
        .send(
        {
          username: testData.users.admin.username,
          password: 'invalid_password',
        })
        .expect(401)
        .end((err, res) => {
          if (res) {
            expect(res.body.msg).toEqual('invalid password');
            return done();
          }
          return done(err);
        });
    });
  });

  describe('/users/:id', () => {
    it('Trys to get a user with no token provided', (done) => {
      request(app)
      .get(`/users/${adminUser.data.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403)
      .end((err, res) => {
        if (res) {
          expect(res.body.msg).toEqual('no token provided');
          return done();
        }
        return done(err);
      });
    });

    it('Trys to get a user with a forged token', (done) => {
      request(app)
      .get(`/users/${adminUser.data.id}`)
      .set('Accept', 'application/json')
      .set('x-access-token', fakeToken)
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        if (res) {
          expect(res.body.msg).toEqual('failed to authenticate token');
          return done();
        }
        return done(err);
      });
    });

    it('Sucessfully GET a different user when the accessor is admin', (done) => {
      request(app)
      .get(`/users/${adminUser.data.id}`)
      .set('Accept', 'application/json')
      .set('x-access-token', adminUser.token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (res) {
          res.body.forEach((user) => {
            // Check required fields for each user
            expect(user.id).toBeDefined();
          });
          return done();
        }
        return done(err);
      });
    });

    it('Should not GET a different user when the acessor is not admin', (done) => {
      request(app)
      .get(`/users/${adminUser.data.id}`)
      .set('Accept', 'application/json')
      .set('x-access-token', regularUser.token)
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        if (res) {
          expect(res.body.msg).toEqual('unauthorized: do not have access');
          return done();
        }
        return done(err);
      });
    });

    it('Should UPDATE the user when accessor is authorized', (done) => {
      request(app)
      .put(`/users/${adminUser.data.id}`)
      .set('x-access-token', adminUser.token)
      .send(adminUser)
        .expect(201)
        .end((err, res) => {
          if (res) {
            expect(res.body.msg).toEqual('user updated');
            return done();
          }
          return done(err);
        });
    });

    it('Should not UPDATE the user when accessor is unauthorized', (done) => {
      request(app)
      .put(`/users/${adminUser.data.id}`)
      .set('x-access-token', regularUser.token)
      .send(adminUser)
        .expect(401)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body.msg).toEqual('unauthorized: do not have access');
            done();
          }
        });
    });

    it('Should DELETE the user when accessor is authorized', (done) => {
      request(app)
      .delete(`/users/${adminUser.data.id}`)
      .set('x-access-token', adminUser.token)
      .expect(202)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.body.msg).toEqual('user deleted successfully');
          done();
        }
      });
    });

    it('Should not DELETE the user when accessor is unauthorized', (done) => {
      request(app)
      .delete(`/users/${adminUser.data.id}`)
      .set('x-access-token', regularUser.token)
      .expect(401)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.body.msg).toEqual('unauthorized: do not have access');
          done();
        }
      });
    });
  });

  describe('/users/:id/documents', () => {
    it('Should return every documents created by the logged in user', (done) => {
      request(app)
      .get(`/users/${adminUser.data.id}/documents`)
      .set('Accept', 'application/json')
      .set('x-access-token', adminUser.token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (res) {
          res.body.forEach((document) => {
            /*
             * Check required fields for each document and
             * makes sure it belngs to the authenticated user.
             */
            expect(document.userId).toEqual(adminUser.data.id);
          });
          return done();
        }
        return done(err);
      });
    });
  });
});

