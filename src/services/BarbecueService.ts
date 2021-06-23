import { getConnection, getCustomRepository } from 'typeorm';
import { CreateRequestBodyDto } from '../dto/Barbecue/CreateRequestBodyDto';
import { CreateRequestQueryDto } from '../dto/Barbecue/CreateRequestQueryDto';
import { BarbecueRepository } from '../repositories/BarbecueRepository';
import { Barbecue } from './../entities/Barbecue';

export const save = async (params: CreateRequestBodyDto & CreateRequestQueryDto) => {
    const repository = getCustomRepository(BarbecueRepository);
    const entity = repository.create({ ...params });
    return await repository.save(entity);
}

export const findAll = async () => {
    const repository = getCustomRepository(BarbecueRepository);
    return await repository.find({ relations: ['users'], });
}

export const findById = async (id: string) => {
    const repository = getCustomRepository(BarbecueRepository);
    return await repository.findOne({ id }, { relations: ['users'] });
}

export const signUser = async (params: { user_id: string, barbecue_id: string }) => {
    // TODO check if user already exist at a middleware
    // TODO check if barbecue already exist at a middleware
    await getConnection()
        .createQueryBuilder()
        .relation(Barbecue, 'users')
        .of(params.barbecue_id)
        .add(params.user_id);

}