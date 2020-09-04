import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { CreateRequestBodyDto } from "../../dto/User/CreateRequestBodyDto";
import { CreateRequestQueryDto } from "../../dto/User/CreateRequestQueryDto";
import { UserService } from "../../services/UserService";

const validateRequestPartMiddleware = async (request: Request<{}, {}, CreateRequestBodyDto, CreateRequestQueryDto>, response: Response, next: NextFunction) => {
    const queryErrors = await validate(new CreateRequestQueryDto(request.query));
    const bodyErrors = await validate(new CreateRequestBodyDto(request.body));
    const errors = [...queryErrors, ...bodyErrors];

    return errors.length ? response.status(400).json(errors) : next();
}

const alreadyHasUser = async (request: Request<{}, {}, CreateRequestBodyDto, CreateRequestQueryDto>, response: Response, next: NextFunction) => {
    const service = new UserService();
    const entity = service.findByEmail(request.body.email);

    return entity ? response.status(400).json({ message: `User ${request.body.email} already exists!` }) : next();
}

export default [
    validateRequestPartMiddleware,
    alreadyHasUser,
];
