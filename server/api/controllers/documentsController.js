import models from '../../models';

// Method definition for creating documents
const create = (req, res) => {
  const newDoc = {
    userId: req.decoded.userId,
    roleId: req.decoded.roleId,
    access: 'public',
  };

  Object.assign(newDoc, req.body);

  models.Documents.create(newDoc)
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
};

// Method definition for getting all documents
const getAll = (req, res) => {
  models.Documents.findAll({
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
      .filter((result) => {
        if (result.access === 'role') {
          return result.roleId === req.decoded.roleId;
        } else if (result.access === 'private') {
          return result.userId === req.decoded.userId;
        }
        return true;
      })
    );
  })
  .catch((e) => {
    res.status(500).send({ msg: e });
  });
};

// Method definition for getting one document
const getOne = (req, res) => {
  models.Documents.findAll({
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
      .filter((result) => {
        if (result.access === 'role') {
          return result.roleId === req.decoded.roleId;
        } else if (result.access === 'private') {
          return result.userId === req.decoded.userId;
        }
        return true;
      })
    );
  })
  .catch((e) => {
    res.status(500).send({ msg: e });
  });
};

// Method definition for updating one ocument
const update = (req, res) => {
  models.Documents.update(req.body, {
    where: { id: req.params.id },
  })
  .then(() => {
    res.status(200).send({ msg: 'document updated' });
  })
  .catch((e) => {
    res.status(500).send({ msg: e.errors[0].message });
  });
};

// Method definition for deleting one documents
const remove = (req, res) => {
  models.Documents.destroy({
    where: { id: req.params.id },
  })
  .then(() => {
    res.status(202).send({ msg: 'document deleted' });
  })
  .catch(() => {
    res.status(500).send({ msg: 'cannot delete document' });
  });
};

// Method definition for seaching documents
const search = (req, res) => {
  // req.query.date.toUpperCase()
  models.Documents.findAll({
    order: [
      ['createdAt', req.query.date.toUpperCase()],
    ],
    limit: req.query.limit,
    include: [
      {
        as: 'role',
        model: models.Roles,
        where: { title: req.query.role },
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
  .catch((e) => {
    res.status(500).send({ msg: e });
  });
};

export default {
  create,
  getAll,
  getOne,
  update,
  remove,
  search,
};
