import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {

    async create(request: Request, response: Response) {
        const service = new UserService();
        const entity = await service.save({ ...request.body, ...request.query });
        return response.json(entity);
    }

    async findAll(request: Request, response: Response) {
        const service = new UserService();
        const entity = await service.findAll();
        return response.json(entity);
    }

    async findByEmil(request: Request, response: Response) {
        const service = new UserService();
        const entity = await service.findByEmail(request.body.email);
        return response.json(entity);
    }

}