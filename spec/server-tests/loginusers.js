/**
 * This module logs in the default users for use during the test
 */
import jwt from 'jsonwebtoken';

// Exports public functionalities.
export default {
  fakeToken: () => {
    const token = jwt.sign({
      userId: '1234',
      roleId: '1234',
      role: 'min',
    }, 'GUESSED', {
      expiresIn: 60 * 60 * 24,
    });

    return token;
  },
  login: (request, app, cb) => {
    const users = {};
    const loginAdmin = () => {
      request(app)
      .post('/users/login')
      .send({ username: 'mario', password: '12345' })
      .expect(200)
      .end((err, res) => {
        if (res) {
          Object.defineProperty(res.body.data, 'password', {
            value: '12345',
          });
          users.admin = res.body;
          return cb(users);
        }
        return cb();
      });
    };

    const loginRegular = () => {
      request(app)
      .post('/users/login')
        .send({ username: 'meron', password: '12345' })
        .expect(200)
        .end((err, res) => {
          if (res) {
            Object.defineProperty(res.body.data, 'password', {
              value: '12345',
            });
            users.regular = res.body;
            loginAdmin();
          }
        });
    };

    loginRegular();
  },
};
