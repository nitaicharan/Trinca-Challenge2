import { getCustomRepository } from 'typeorm';
import { LoginRequestBodyDto } from "../dto/Authentication/LoginRequestBodyDto";
import { LoginRequestQueryDto } from "../dto/Authentication/LoginRequestQueryDto";
import { Authentication } from "../entities/Authentication";
import { AuthenticationRepository } from '../repositories/AuthenticationRepository';
import * as JwtService from './JwtService';
import * as RedisService from './RedisService';
import * as UserService from './UserService';

export const login = async (params: LoginRequestBodyDto & LoginRequestQueryDto) => {
    const repository = getCustomRepository(AuthenticationRepository);
    const user = await UserService.findByEmail(params.email);
    const authorization = repository.create({ user });

    const foundAuthorization = await repository.createQueryBuilder('Authorization')
        .leftJoinAndSelect('Authorization.user', 'User')
        .where('User.email = :email', { email: params.email })
        .getOne();

    const { token: refresh_token } = JwtService.signRefreshToken({ user: authorization.user.id });
    const entity = await repository.save({ ...authorization, ...foundAuthorization, refresh_token });
    const { token: access_token, ...rest } = JwtService.signAccessToken({ user: entity.user.id });

    return {
        ...rest,
        refresh_token: entity.refresh_token,
        access_token,
    };
}

export const refreshToken = async (params: { refresh_token: string }) => {
    const repository = getCustomRepository(AuthenticationRepository);
    const entity = await findByRefreshToken(params.refresh_token);
    const refreshToken = JwtService.signRefreshToken({ user: entity.user.id });
    const result = await repository.save({ ...entity, refreshToken });
    const { token: access_token, expires_in } = JwtService.signAccessToken({ user: entity.user.id });

    return {
        access_token,
        refresh_token: result.refreshToken.token,
        expires_in,
    };
}

export const findByUserId = async (user_id: string) => {
    const repository = getCustomRepository(AuthenticationRepository);

    return await repository.createQueryBuilder('Authorization')
        .leftJoinAndSelect('Authorization.user', 'User')
        .where('User.id = :id', { id: user_id })
        .getOne();
}

export const findByRefreshToken = async (refresh_token: string) => {
    let entity: Authentication;
    entity = await RedisService.getData(refresh_token);

    if (!entity) {
        const repository = getCustomRepository(AuthenticationRepository);
        entity = await repository.findOne({ refresh_token: refresh_token }, { relations: ['user'] });
        entity && await RedisService.setData(refresh_token, entity);
    }

    return entity;
}