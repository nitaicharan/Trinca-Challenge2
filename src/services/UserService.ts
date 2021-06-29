import bcrypt from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import { CreateRequestBodyDto } from '../dto/User/CreateRequestBodyDto';
import { CreateRequestQueryDto } from '../dto/User/CreateRequestQueryDto';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import * as RedisService from './RedisService';

export const save = async (params: CreateRequestBodyDto & CreateRequestQueryDto) => {
    const repository = getCustomRepository(UserRepository);
    const password = bcrypt.hashSync(params.password, 10);
    const entity = repository.create({ ...params, password });
    const { password: pw, ...rest } = await repository.save(entity);
    RedisService.deleteData('users');
    return rest;
}

export const findAll = async () => {
    let entities: User[];
    entities = await RedisService.getData('users');

    if (!entities?.length) {
        const repository = getCustomRepository(UserRepository);
        entities = await repository.find();
        entities.length && await RedisService.setData('users', entities);
    }

    const result = entities.map(entity => {
        const { password, ...e } = entity;
        return e;
    });


    return await RedisService.setData('users', result);
}

export const findById = async (id: string) => {
    let entity: User;
    entity = await RedisService.getData(id);

    if (!entity) {
        const repository = getCustomRepository(UserRepository);
        entity = await repository.findOne({ id });
        entity && await RedisService.setData(entity.id, entity);
    }

    return entity;
}

export const findByEmail = async (email: string) => {
    let entity: User;
    entity = await RedisService.getData(email);

    if (!entity) {
        const repository = getCustomRepository(UserRepository);
        entity = await repository.findOne({ email });
        entity && await RedisService.setData(email, entity);
    }

    return entity;
}
