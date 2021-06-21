import { Router } from 'express';
import * as Controller from '../controllers/AuthenticationController';
import loginMiddleware from "../middleware/Authentication/LoginMiddleware";

const routes = Router();

routes.post('/refresh-token', Controller.refreshToken);
routes.post('/login', loginMiddleware, Controller.login);

export default routes;