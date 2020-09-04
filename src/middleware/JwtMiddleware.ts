import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { verifyAccessToken, verifyRefreshToken } from '../services/JwtService';
import { UserService } from "../services/UserService";

export const validAccessTokenMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    const userService = new UserService();

    const token = request.headers.authorization?.split(' ')[1];

    if (token == null) return response.sendStatus(403)

    try {
        const { user: id } = verifyAccessToken(token) as JwtPayload;
        const user = await userService.findById(id);
        if (!user) throw new JsonWebTokenError("invalid token");
    } catch (error) {
        response.status(401).send(error);
    }

    next();
}

export const validRefreshTokenMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    const userService = new UserService();
    const token = request.headers.authorization?.split(' ')[1];

    if (token == null) return response.sendStatus(403)

    try {
        const { user: id } = verifyRefreshToken(token);
        const user = await userService.findById(id);
        if (!user) throw new JsonWebTokenError("invalid token");
    } catch (error) {
        response.status(401).send(error);
    }

    next();
}