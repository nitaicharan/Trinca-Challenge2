import { getConnection, getCustomRepository } from 'typeorm';
import { CreateRequestBodyDto } from '../dto/Barbecue/CreateRequestBodyDto';
import { CreateRequestQueryDto } from '../dto/Barbecue/CreateRequestQueryDto';
import { BarbecueRepository } from '../repositories/BarbecueRepository';
import { Barbecue } from './../entities/Barbecue';
import * as RedisService from './RedisService';

export const save = async (params: CreateRequestBodyDto & CreateRequestQueryDto) => {
    const repository = getCustomRepository(BarbecueRepository);
    const entity = repository.create({ ...params });
    RedisService.deleteData('barbecues');
    return await repository.save(entity);
}

export const findAll = async () => {
    let entities: Barbecue[];
    entities = await RedisService.getData('barbecues');

    if (!entities?.length) {
        const repository = getCustomRepository(BarbecueRepository);
        entities = await repository.find({ relations: ['users'], })
        entities && RedisService.setData('barbecues', entities);
    }

    return entities;
}

export const findById = async (id: string) => {
    let entity: Barbecue;
    entity = await RedisService.getData(id);

    if (!entity) {
        const repository = getCustomRepository(BarbecueRepository);;
        entity = await repository.findOne({ id }, { relations: ['users'] })
        entity && RedisService.setData(entity.id, entity);
    }

    return entity;
}

export const signUser = async (params: { user_id: string, barbecue_id: string }) => {
    await getConnection()
        .createQueryBuilder()
        .relation(Barbecue, 'users')
        .of(params.barbecue_id)
        .add(params.user_id);

}