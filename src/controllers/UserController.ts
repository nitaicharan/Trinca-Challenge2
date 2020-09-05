import { Request, Response } from "express";
import * as Service from "../services/UserService";

export const create = async (request: Request, response: Response) => {
    const entity = await Service.save({ ...request.body, ...request.query });
    return response.json(entity);
}

export const findAll = async (request: Request, response: Response) => {
    const entity = await Service.findAll();
    return response.json(entity);
}

export const findByEmil = async (request: Request, response: Response) => {
    const entity = await Service.findByEmail(request.body.email);
    return response.json(entity);
}