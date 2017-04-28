import jwt from 'jsonwebtoken';

import models from '../../models';
import bcryptHelpers from '../../helpers/bcryptHelpers';

// Method definition getting one user
const create = (req, res) => {
  models.Users.findAll({
    where: { username: req.body.username },
  })
  .then((results) => {
    if (results[0]) {
      res.status(409).send({ msg: `user with username ${req.body.username} already exist` });
    } else {
      Object.defineProperty(req.body, 'password', {
        value: bcryptHelpers.createHash(req.body.password),
      });

      models.Users.create(req.body)
      .then(() => {
        res.status(201).send(
          {
            msg: 'signup success',
          }
        );
      })
      .catch(() => {
        res.status(500).send({ msg: 'error while creating user, form might contain invalid inputs' });
      });
    }
  })
  .catch(() => {
    res.status(500).send({ msg: 'invalid form inputs' });
  });
};

// Method definition for login
const login = (req, res) => {
  models.Users.findAll({
    where: { username: req.body.username },
    include: [
      {
        as: 'role',
        model: models.Roles,
      },
    ],
  })
  .then((results) => {
    if (!results[0]) {
      return res.status(404).send({ msg: 'user not found' });
    }
    if (bcryptHelpers.isValid(req.body.password, results[0].password)) {
      const data = results[0];
      const token = jwt.sign({
        userId: data.id,
        roleId: data.roleId,
        role: data.role.title,
      }, 'SECRET HERE', {
        expiresIn: 60 * 60 * 24,
      });

      return res.status(200).send(
        {
          msg: 'login success',
          data,
          token,
        }
      );
    }
    return res.status(401).send({ msg: 'invalid password' });
  })
  .catch(() => {
    res.status(500).send({ msg: 'internal server error' });
  });
};

// Method definition for getting all users
const getAll = (req, res) => {
  if (req.decoded.role === 'admin') {
    models.Users.findAll({
      include: [
        {
          as: 'role',
          model: models.Roles,
        },
      ],
    })
    .then((results) => {
      res.status(200).send(
        results
        .map(result =>
          result.get({
            plain: true,
          })
        )
      );
    })
    .catch(() => {
      res.status(500).send({ msg: 'internal server error' });
    });
  } else {
    res.status(401).send({ msg: 'unauthorized: not admin' });
  }
};

// Method definition getting one user
const getOne = (req, res) => {
  if (req.decoded.userId === parseInt(req.params.id, 10) || req.decoded.role === 'admin') {
    models.Users.findAll({
      where: { id: req.params.id },
      include: [
        {
          as: 'role',
          model: models.Roles,
        },
      ],
    })
    .then((results) => {
      res.status(200).send(
        results
        .map(result =>
          result.get({
            plain: true,
          })
        )
      );
    })
    .catch(() => {
      res.status(500).send({ msg: 'internal server error' });
    });
  } else {
    res.status(401).send({ msg: 'unauthorized: do not have access' });
  }
};

// Method definition for updating a user
const update = (req, res) => {
  if ((req.decoded.userId === req.params.id) || req.decoded.role === 'admin') {
    models.Users.update(req.body, {
      where: { id: req.params.id },
    })
    .then(() => {
      res.status(201).send({ msg: 'user updated' });
    })
    .catch((e) => {
      res.status(500).send({ msg: e.errors[0].message });
    });
  } else {
    res.status(401).send({ msg: 'unauthorized: do not have access' });
  }
};

// Method definition for updating a user
const remove = (req, res) => {
  if ((req.decoded.userId === req.params.id) || req.decoded.role === 'admin') {
    models.Documents.destroy({
      where: { userId: req.params.id },
    })
    .then(() => {
      models.Users.destroy({
        where: { id: req.params.id },
      })
      .then(() => {
        res.status(200).send({ msg: 'user deleted successfully' });
      })
      .catch(() => {
        res.status(500).send({ msg: 'internal server error' });
      });
    })
    .catch(() => {
      res.status(500).send({ msg: 'internal server error' });
    });
  } else {
    res.status(401).send({ msg: 'unauthorized: do not have access' });
  }
};

// Method definition for getting all documents for this user
const getDocuments = (req, res) => {
  models.Documents.findAll({
    where: { id: req.params.id },
  })
  .then((results) => {
    res.status(200).send(results.map(r =>
      r.get({
        plain: true,
      })));
  })
  .catch((e) => {
    res.status(500).send({ msg: e.errors[0].message });
  });
};

export default {
  create,
  login,
  getAll,
  getOne,
  update,
  remove,
  getDocuments,
};
