import { Request, Response } from "express";
import { CreateRequestBodyDto } from "../dto/Barbecue/CreateRequestBodyDto";
import { CreateRequestQueryDto } from "../dto/Barbecue/CreateRequestQueryDto";
import * as Service from "../services/BarbecueService";

type CreateRequest = Request<{}, {}, CreateRequestBodyDto, CreateRequestQueryDto>;

export const create = async (request: CreateRequest, response: Response) => {
    const result = await Service.save({ ...request.body, ...request.query });
    return response.json(result);
}

export const findAll = async (request: Request, response: Response) => {
    const result = await Service.findAll();
    return response.json(result);
}

export const findById = async (request: Request<{ id: string }>, response: Response) => {
    const result = await Service.findById(request.params.id);
    return response.json(result);
}

export const signUser = async (request: Request<{ barbecue_id: string }, {}, { user_id: string }>, response: Response) => {
    const result = await Service.signUser({ ...request.params, ...request.body });
    return response.json(result);
}