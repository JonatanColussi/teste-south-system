import { Router } from 'express';

import ProductController from '../app/controllers/ProductController';
import auth from '../app/middlewares/auth';

const routes = new Router();

// Public routes
routes.get('/:id', ProductController.find);

// routes.use(auth);
// Private routes
routes.post('/', ProductController.store);
routes.get('/', ProductController.show);
routes.put('/:id', ProductController.update);
routes.delete('/:id', ProductController.destroy);

export default routes;
