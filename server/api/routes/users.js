import express from 'express';
import usersController from '../controllers/usersController';
import auth from '../middlewares/auth';

const router = new express.Router();
router.route('/')
   .get(auth.authorize, usersController.getAll)
   .post(usersController.create);
router.route('/login')
   .post(usersController.login);

router.route('/:id')
   .get(auth.authorize, usersController.getOne)
   .put(auth.authorize, usersController.update)
   .delete(auth.authorize, usersController.remove);

router.route('/:id/documents')
   .get(auth.authorize, usersController.getDocuments);

// exports this routes
export default router;
