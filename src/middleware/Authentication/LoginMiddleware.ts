import bcrypt from 'bcrypt';
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { LoginRequestBodyDto } from "../../dto/Authentication/LoginRequestBodyDto";
import { LoginRequestQueryDto } from "../../dto/Authentication/LoginRequestQueryDto";
import * as UserService from '../../services/UserService';

const validateRequestPartMiddleware = async (request: Request<{}, {}, LoginRequestBodyDto, LoginRequestQueryDto>, response: Response, next: NextFunction) => {
    const queryErrors = await validate(new LoginRequestQueryDto(request.query));
    const bodyErrors = await validate(new LoginRequestBodyDto(request.body));
    const errors = [...queryErrors, ...bodyErrors];

    return errors.length ? response.status(400).json(errors) : next();
}

const validatePasswordMiddleware = async (request: Request<{}, {}, LoginRequestBodyDto, LoginRequestQueryDto>, response: Response, next: NextFunction) => {
    const user = await UserService.findByEmail(request.body.email);
    
    if (!user) return response.status(400).json({ message: `User ${request.body.email} doesn't exist!` })

    const isNotValid = !bcrypt.compareSync(request.body.password, user.password);
    if (isNotValid) return response.status(400).json({ message: `Password incorrect!` });

    next();
}

export default [
    validateRequestPartMiddleware,
    validatePasswordMiddleware,
];
