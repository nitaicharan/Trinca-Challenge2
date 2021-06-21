import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { LoginRequestBodyDto } from "../../dto/Authentication/LoginRequestBodyDto";
import { LoginRequestQueryDto } from "../../dto/Authentication/LoginRequestQueryDto";

const validateRequestPartMiddleware = async (request: Request<{}, {}, LoginRequestBodyDto, LoginRequestQueryDto>, response: Response, next: NextFunction) => {
    const queryErrors = await validate(new LoginRequestQueryDto(request.query));
    const bodyErrors = await validate(new LoginRequestBodyDto(request.body));
    const errors = [...queryErrors, ...bodyErrors];

    return errors.length ? response.status(400).json(errors) : next();
}

export default [
    validateRequestPartMiddleware,
];
