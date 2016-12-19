import request from 'supertest';
import app from '../../server/api';
import testData from './testdata.json';
import usersAuth from './loginusers';

let adminUser;
let regularUser;
let defaultDoc;
describe('Documents API', () => {
  beforeAll((done) => {
    const getDoc = () => {
      request(app)
        .get('/documents/123')
        .set('Accept', 'application/json')
        .set('x-access-token', adminUser.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (res) {
            defaultDoc = res.body[0];
            done();
          }
          return done(err);
        });
    };

    usersAuth.login(request, app, (users) => {
      if (users) {
        adminUser = users.admin;
        regularUser = users.regular;
        getDoc();
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

    it('Creates a new document', (done) => {
      request(app)
      .post('/documents/')
      .set('x-access-token', adminUser.token)
      .send(testData.documents.new)
        .expect(201)
        .end((err, res) => {
          if (res) {
            expect(res.body.data.id).toBeDefined();
            return done();
          }
          return done(err);
        });
    });
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

    it('Should UPDATE the docment', (done) => {
      request(app)
      .put(`/documents/${defaultDoc.id}`)
      .set('x-access-token', adminUser.token)
      .send(defaultDoc)
        .expect(200)
        .end((err, res) => {
          if (res) {
            expect(res.body.msg).toEqual('document updated');
            return done();
          }
          return done(err);
        });
    });
    it('Should DELETE the docment', (done) => {
      request(app)
      .delete(`/documents/${defaultDoc.id}`)
      .set('x-access-token', adminUser.token)
        .expect(201)
        .end((err, res) => {
          if (res) {
            expect(res.body.msg).toEqual('document deleted');
            return done();
          }
          return done(err);
        });
    });
  });

  describe('/documents/search', () => {
    it('Searches for documents given search criteria', (done) => {
      const query = testData.search.query1;
      request(app)
        .get(`/documents/search?role=${query.role}&limit=${query.limit}&date=${query.date}`)
        .set('Accept', 'application/json')
        .set('x-access-token', adminUser.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (res) {
            expect(res.body.length <= query.limit).toBeTruthy();
            res.body.forEach((doc) => {
              expect(doc.role.title).toEqual(query.role);
            });
            done();
          }
          return done(err);
        });
    });
  });
});
