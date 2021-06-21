import bcrypt from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import { CreateRequestBodyDto } from '../dto/User/CreateRequestBodyDto';
import { CreateRequestQueryDto } from '../dto/User/CreateRequestQueryDto';
import { UserRepository } from '../repositories/UserRepository';

export const save = async (params: CreateRequestBodyDto & CreateRequestQueryDto) => {
    const repository = getCustomRepository(UserRepository);
    const password = bcrypt.hashSync(params.password, 10);
    const entity = repository.create({ ...params, password });
    const { password: pw, ...rest } = await repository.save(entity);
    return rest;
}

export const findAll = async () => {
    const repository = getCustomRepository(UserRepository);
    const entities = await repository.find();
    return entities.map(entity => {
        const { password, ...e } = entity;
        return e;
    });
}

export const findById = async (id: string) => {
    const repository = getCustomRepository(UserRepository);
    return await repository.findOne({ id });
}

export const findByEmail = async (email: string) => {
    const repository = getCustomRepository(UserRepository);
    return await repository.findOne({ email });
}
