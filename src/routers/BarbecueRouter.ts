import { Router } from 'express';
import * as Controller from '../controllers/BarbecueController';
import createMiddleware from '../middleware/Barbecue/CreateMiddleware';

const routes = Router();

// TODO check access_token
routes.post('/barbecues', createMiddleware, Controller.create);
// TODO check access_token
routes.get('/barbecues/:id', Controller.findById);
// TODO check access_token
routes.get('/barbecues', Controller.findAll);
// TODO check access_token
routes.patch('/barbecues/:barbecue_id/sign-user', Controller.signUser)

export default routes;