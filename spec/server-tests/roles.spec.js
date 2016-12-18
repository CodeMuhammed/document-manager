import request from 'supertest';
import app from '../../server/api';
import testData from './testdata.json';
import usersAuth from './loginusers';

let adminUser;
let regularUser;

describe('Roles API', () => {
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

  describe('/roles/', () => {
    it('Creates a new role when user is admin', (done) => {
      request(app)
      .post('/roles/')
      .set('x-access-token', adminUser.token)
      .send(testData.roles.blocked)
      .expect(200)
      .end((err, res) => {
        if (res) {
          expect(res.body.data.id).toBeDefined();
          return done();
        }
        return done(err);
      });
    });

    it('Fails to create a new role when user is not admin', (done) => {
      request(app)
      .post('/roles/')
      .set('x-access-token', regularUser.token)
      .send(testData.roles.blocked)
      .expect(401)
      .end((err, res) => {
        if (res) {
          expect(res.body.msg).toEqual('unauthorized');
          return done();
        }
        return done(err);
      });
    });

    it('GETs all roles requested by any user even without authentication', (done) => {
      request(app)
      .get('/roles/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (res) {
          res.body.forEach((role) => {
            // Makes sure each role has a title and an id
            expect(role.id).toBeDefined();
            expect(role.title).toBeDefined();
          });
          return done();
        }
        return done(err);
      });
    });
  });

  describe('/roles/:id', () => {
    it('GETs a single requested by any user even without authentication', (done) => {
      request(app)
      .get('/roles/123')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (res) {
          expect(res.body.length).toEqual(1);
          res.body.forEach((role) => {
            // Makes sure each role has a title and an id
            expect(role.id).toBeDefined();
            expect(role.title).toBeDefined();
          });
          return done();
        }
        return done(err);
      });
    });
  });
});
