import models from '../../models';

// Method definition for creating documents
const create = (req, res) => {
  if (req.decoded.role === 'admin') {
    models.Roles.create(req.body)
    .then((result) => {
      res.status(201).send(
        {
          data: result.get({
            plain: true,
          }),
        }
      );
    })
    .catch((e) => {
      res.status(500).send({ msg: e.errors[0].message });
    });
  } else {
    res.status(401).send({ msg: 'unauthorized' });
  }
};

// Method definition for getting all documents
const getAll = (req, res) => {
  models.Roles.findAll()
  .then((results) => {
    res.status(200).send(results.map(result =>
      result.get({
        plain: true,
      }))
    );
  })
  .catch((e) => {
    res.status(500).send({ msg: e.errors[0].message });
  });
};

// Method definition for getting one document
const getOne = (req, res) => {
  models.Roles.findAll({
    where: { id: req.params.id },
  })
  .then((results) => {
    res.status(200).send(results.map(r =>
      r.get({
        plain: true,
      }))
    );
  })
  .catch((e) => {
    res.status(500).send({ msg: e.errors[0].message });
  });
};

export default {
  create,
  getAll,
  getOne,
};
