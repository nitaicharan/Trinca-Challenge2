import { Router } from 'express';
import * as Controller from '../controllers/AuthenticationController';
import loginMiddleware from "../middleware/Authentication/LoginMiddleware";
import { validAccessTokenMiddleware } from '../middleware/JwtMiddleware';

const routes = Router();

routes.post('/refresh-token', [validAccessTokenMiddleware], Controller.refreshToken);
routes.post('/login', loginMiddleware, Controller.login);

export default routes;