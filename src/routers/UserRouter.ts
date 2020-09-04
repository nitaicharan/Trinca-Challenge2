import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import createMiddleware from '../middleware/User/CreateMiddleware';

const routes = Router();

const controller = new UserController();

routes.post('/users', createMiddleware, controller.create);
routes.get('/users', controller.findAll);

export default routes;