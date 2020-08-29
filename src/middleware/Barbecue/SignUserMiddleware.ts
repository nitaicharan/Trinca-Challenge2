import { NextFunction, Request, Response } from 'express';
import * as BarbecueService from '../../services/BarbecueService';
import * as UserService from '../../services/UserService';

const validateExistedUserMiddleware = async (request: Request<{ barbecue_id: string }, {}, { user_id: string }>, response: Response, next: NextFunction) => {
    const entity = await UserService.findById(request.body.user_id);
    return !entity ? response.status(400).json({ message: `Entity ${request.body.user_id} doesn't exist!` }) : next();
}

const validateExistedBarbecueMiddleware = async (request: Request<{ barbecue_id: string }, {}, { user_id: string }>, response: Response, next: NextFunction) => {
    const entity = await BarbecueService.findById(request.params.barbecue_id);
    return !entity ? response.status(400).json({ message: `Entity ${request.body.user_id} doesn't exist!` }) : next();
}

export default [
    validateExistedUserMiddleware,
    validateExistedBarbecueMiddleware,
];