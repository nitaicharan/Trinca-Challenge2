import { getCustomRepository } from 'typeorm';
import { CreateRequestBodyDto } from '../dto/Barbecue/CreateRequestBodyDto';
import { CreateRequestQueryDto } from '../dto/Barbecue/CreateRequestQueryDto';
import { BarbecueRepository } from '../repositories/BarbecueRepository';

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
