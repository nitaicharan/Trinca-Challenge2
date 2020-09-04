import bcrypt from 'bcrypt';
import { getCustomRepository, Repository } from 'typeorm';
import { CreateRequestBodyDto } from '../dto/User/CreateRequestBodyDto';
import { CreateRequestQueryDto } from '../dto/User/CreateRequestQueryDto';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {
    private repository: Repository<User>;

    constructor() {
        this.repository = getCustomRepository(UserRepository);
    }

    async save(params: CreateRequestBodyDto & CreateRequestQueryDto) {
        const password = bcrypt.hashSync(params.password, 10);
        const user = this.repository.create({ ...params, password });
        const { password: pw, ...entity } = await this.repository.save(user);
        return entity;
    }

    async findAll() {
        const entities = await this.repository.find();
        return entities.map(entity => {
            const { password, ...e } = entity;
            return e;
        });
    }

    async findById(id: string) {
        return await this.repository.findOne({ id });
    }

    async findByEmail(email: string) {
        return await this.repository.findOne({ email });
    }

}