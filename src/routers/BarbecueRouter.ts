import { Router } from 'express';
import * as Controller from '../controllers/BarbecueController';
import createMiddleware from '../middleware/Barbecue/CreateMiddleware';
import signUserMiddleware from '../middleware/Barbecue/SignUserMiddleware';
import { validAccessTokenMiddleware } from '../middleware/JwtMiddleware';

const routes = Router();

routes.post('/barbecues', [validAccessTokenMiddleware, ...createMiddleware], Controller.create);
routes.get('/barbecues/:id', [validAccessTokenMiddleware], Controller.findById);
routes.get('/barbecues', [validAccessTokenMiddleware], Controller.findAll);
routes.patch('/barbecues/:barbecue_id/sign-user', [validAccessTokenMiddleware, ...signUserMiddleware], Controller.signUser)

export default routes;