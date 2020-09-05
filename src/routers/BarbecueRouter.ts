import { Router } from 'express';
import * as Controller from '../controllers/BarbecueController';
import createMiddleware from '../middleware/Barbecue/CreateMiddleware';

const routes = Router();

routes.post('/barbecues', createMiddleware, Controller.create);
routes.get('/barbecues/:id', Controller.findById);
routes.get('/barbecues', Controller.findAll);

export default routes;