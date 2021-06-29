import { Request, Response } from "express";
import * as Service from "../services/UserService";

export const create = async (request: Request, response: Response) => {
    const result = await Service.save({ ...request.body, ...request.query });
    return response.json(result);
}

export const findAll = async (request: Request, response: Response) => {
    const result = await Service.findAll();
    return response.json(result);
}

export const findByEmil = async (request: Request, response: Response) => {
    const result = await Service.findByEmail(request.body.email);
    return response.json(result);
}