import { Router } from 'express';
import * as Controller from '../controllers/UserController';
import { validAccessTokenMiddleware } from '../middleware/JwtMiddleware';
import createMiddleware from '../middleware/User/CreateMiddleware';
import findAllMiddleware from '../middleware/User/FindAllMiddleware';

const routes = Router();

routes.post('/users', createMiddleware, Controller.create);
routes.get('/users', [validAccessTokenMiddleware, ...findAllMiddleware], Controller.findAll);

export default routes;