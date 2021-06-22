import { getCustomRepository } from 'typeorm';
import { CreateRequestBodyDto } from '../dto/Barbecue/CreateRequestBodyDto';
import { CreateRequestQueryDto } from '../dto/Barbecue/CreateRequestQueryDto';
import { BarbecueRepository } from '../repositories/BarbecueRepository';
import * as UserService from './UserService';

export const save = async (params: CreateRequestBodyDto & CreateRequestQueryDto) => {
    const repository = getCustomRepository(BarbecueRepository);
    const entity = repository.create({ ...params });
    return await repository.save(entity);
}

export const findAll = async () => {
    const repository = getCustomRepository(BarbecueRepository);
    return await repository.find();
}

export const findById = async (id: string) => {
    const repository = getCustomRepository(BarbecueRepository);
    return await repository.findOne({ id });
}

export const signUser = async (params: { user_id: string, barbecue_id: string }) => {
    const repository = getCustomRepository(BarbecueRepository);
    // TODO check if user already exist at a middleware
    const user = await UserService.findById(params.user_id);
    // TODO check if barbecue already exist at a middleware
    const barbecue = await repository.findOne({ id: params.barbecue_id });
    return repository.save({ ...barbecue, users: barbecue.users ? [...barbecue.users, user] : [user] });
}