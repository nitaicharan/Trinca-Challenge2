import { Request, Response } from "express";
import { LoginRequestBodyDto } from "../dto/Authentication/LoginRequestBodyDto";
import { LoginRequestQueryDto } from "../dto/Authentication/LoginRequestQueryDto";
import * as Service from "../services/AuthenticationService";
import { RefreshTokenRequestBodyDto } from './../dto/Authentication/RefreshTokenRequestBodyDto';
import { RefreshTokenRequestQueryDto } from './../dto/Authentication/RefreshTokenRequestQueryDto';

type LoginRequest = Request<{}, {}, LoginRequestBodyDto, LoginRequestQueryDto>;
type RefreshTokenRequest = Request<{}, {}, RefreshTokenRequestBodyDto, RefreshTokenRequestQueryDto>;

export const login = async (request: LoginRequest, response: Response) => {
    const entity = await Service.login({ ...request.body, ...request.query });
    return response.json(entity);
}

export const refreshToken = async (request: RefreshTokenRequest, response: Response) => {
    const entity = await Service.refreshToken({ ...request.body, ...request.query });
    return response.json(entity);
}