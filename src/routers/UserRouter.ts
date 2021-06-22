import { Router } from 'express';
import * as Controller from '../controllers/UserController';
import createMiddleware from '../middleware/User/CreateMiddleware';

const routes = Router();

routes.post('/users', createMiddleware, Controller.create);
// TODO check access_token
// TODO check if user has permission
routes.get('/users', Controller.findAll);

export default routes;