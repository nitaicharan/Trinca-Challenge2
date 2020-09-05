import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { CreateRequestBodyDto } from "../../dto/Barbecue/CreateRequestBodyDto";
import { CreateRequestQueryDto } from "../../dto/Barbecue/CreateRequestQueryDto";

const validateRequestPartMiddleware = async (request: Request<{}, {}, CreateRequestBodyDto, CreateRequestQueryDto>, response: Response, next: NextFunction) => {
    const queryErrors = await validate(new CreateRequestQueryDto(request.query));
    const bodyErrors = await validate(new CreateRequestBodyDto(request.body));
    const errors = [...queryErrors, ...bodyErrors];

    return errors.length ? response.status(400).json(errors) : next();
}

export default [
    validateRequestPartMiddleware,
];
