import { Router } from 'express';
import validate from 'express-validation';
import jwt from 'jsonwebtoken';

import ProductController from '../app/controllers/ProductController';

import auth from '../app/middlewares/auth';

import createValidator from './validators/create';
import editValidator from './validators/edit';
import getOrDeleteValidator from './validators/getOrDelete';

const routes = new Router();

// Public routes
/**
 * @swagger
 * /jwt:
 *    get:
 *      description: This should return all users
 */
routes.get('/jwt', (req, res) => {
  return res.json({
    token: jwt.sign({ id: 1 }, process.env.APP_SECRET, {
      expiresIn: '30d',
    }),
  });
});

routes.get('/:id', validate(getOrDeleteValidator), ProductController.find);

routes.use(auth);
// Private routes
routes.get('/', ProductController.show);
routes.post('/', validate(createValidator), ProductController.store);
routes.put('/:id', validate(editValidator), ProductController.update);
routes.delete(
  '/:id',
  validate(getOrDeleteValidator),
  ProductController.destroy
);

export default routes;
