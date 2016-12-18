import express from 'express';
import auth from '../middlewares/auth';
import documentsController from '../controllers/documentsController';

const router = new express.Router();

router.route('/')
   .get(auth.authorize, documentsController.getAll)
   .post(auth.authorize, documentsController.create);

router.route('/:id')
   .get(auth.authorize, documentsController.getOne)
   .put(auth.authorize, documentsController.update)
   .delete(auth.authorize, documentsController.remove);

// exports this routes
export default router;
