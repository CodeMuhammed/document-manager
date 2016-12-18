import express from 'express';
import auth from '../middlewares/auth';
import rolesController from '../controllers/rolesController';

const router = new express.Router();

router.route('/')
   .get(rolesController.getAll)
   .post(auth.authorize, rolesController.create);

router.route('/:id')
   .get(rolesController.getOne);

// exports this routes
export default router;
