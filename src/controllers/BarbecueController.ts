import { Request, Response } from "express";
import { CreateRequestBodyDto } from "../dto/Barbecue/CreateRequestBodyDto";
import { CreateRequestQueryDto } from "../dto/Barbecue/CreateRequestQueryDto";
import * as Service from "../services/BarbecueService";

type CreateRequest = Request<{}, {}, CreateRequestBodyDto, CreateRequestQueryDto>;

export const create = async (request: CreateRequest, response: Response) => {
    const entity = await Service.save({ ...request.body, ...request.query });
    return response.json(entity);
}

export const findAll = async (request: Request, response: Response) => {
    const entity = await Service.findAll();
    return response.json(entity);
}

export const findById = async (request: Request<{ id: string }>, response: Response) => {
    const entity = await Service.findById(request.params.id);
    return response.json(entity);
}

export const signUser = async (request: Request<{ barbecue_id: string }, {},  { user_id: string }>, response: Response) => {
    const entity = await Service.signUser({ ...request.params, ...request.body });
    return response.json(entity);
}