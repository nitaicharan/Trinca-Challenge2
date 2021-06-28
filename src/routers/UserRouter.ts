import { Router } from 'express';
import * as Controller from '../controllers/UserController';
import { validAccessTokenMiddleware } from '../middleware/JwtMiddleware';
import createMiddleware from '../middleware/User/CreateMiddleware';

const routes = Router();

routes.post('/users', createMiddleware, Controller.create);
// TODO check if user has permission
routes.get('/users', [validAccessTokenMiddleware], Controller.findAll);

export default routes;