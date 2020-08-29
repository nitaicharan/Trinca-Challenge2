import { NextFunction, Request, Response } from "express";
import * as AuthorizationService from '../../services/AuthenticationService';
import { decodeToken } from "../../services/JwtService";
import { RoleType } from "../../types/RoleType";

const validateRoleAdminMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    const access_token = request.headers.authorization?.split(' ')[1];
    const { user: user_id } = decodeToken(access_token);
    const authorization = await AuthorizationService.findByUserId(user_id);

    return authorization.role === RoleType.CLIENT ? response.sendStatus(403) : next();
}

export default [
    validateRoleAdminMiddleware,
];

