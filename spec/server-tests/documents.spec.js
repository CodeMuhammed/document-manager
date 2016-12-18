import request from 'supertest';
import app from '../../server/api';
import testData from './testdata.json';
import usersAuth from './loginusers';

let adminUser;
let regularUser;

describe('Documents API', () => {
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

  describe('/documents/', () => {
    it('GETs all documents when requested by the admin', (done) => {
      request(app)
      .get('/documents/')
      .set('Accept', 'application/json')
      .set('x-access-token', adminUser.token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (res) {
          done();
        }
        return done(err);
      });
    });

    it('GETs all allowed documents when requested by a regular user', (done) => {
      request(app)
      .get('/documents/')
      .set('Accept', 'application/json')
      .set('x-access-token', regularUser.token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (res) {
          /*
           * Makes sure that returned docs are either public or owned by this user
           * creator of the doc shares the same role as user this user.
           */
          res.body.forEach((doc) => {
            const isValid = doc.access === 'public' ||
                            doc.userId === regularUser.data.id ||
                            doc.roleId === regularUser.data.roleId;
            expect(isValid).toBeTruthy();
          });
          done();
        }
        return done(err);
      });
    });

    // @TODO tests creating a document.
  });

  describe('/documents/:id', () => {
    it('GET any document that exists when requested by admin', (done) => {
      request(app)
        .get('/documents/123')
        .set('Accept', 'application/json')
        .set('x-access-token', adminUser.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (res) {
            done();
          }
          return done(err);
        });
    });

    it('GET any document that a regular user is allowed to access', (done) => {
      request(app)
        .get('/documents/345')
        .set('Accept', 'application/json')
        .set('x-access-token', regularUser.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (res) {
            /*
            * Makes sure that returned docs are either public or owned by this user
            * creator of the doc shares the same role as user this user.
            */
            res.body.forEach((doc) => {
              const isValid = doc.access === 'public' ||
                              doc.userId === regularUser.data.id ||
                              doc.roleId === regularUser.data.roleId;
              expect(isValid).toBeTruthy();
            });
            done();
          }
          return done(err);
        });
    });
  });
});
