import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.post('/sessions', SessionController.create);
routes.post('/users', UserController.create);

routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.get('/users', UserController.getAll);
routes.get('/users/:id', UserController.getById);
routes.delete('/users/:id', UserController.delete);

export default routes;
