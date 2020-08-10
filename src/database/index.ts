import { Barbecue } from './../entities/Barbecue';
import dotenv from "dotenv";
import path from 'path';
import { createConnection, getConnectionOptions } from "typeorm";
import { User } from "../entities/User";
import users from './registers/users.json';
import barbecues from './registers/barbecues.json';
import authentications from './registers/authentications.json';
import { Authentication } from '../entities/Authentication';
import { RoleType } from '../types/RoleType';

dotenv.config({
    path: path.resolve(__dirname, '..', '..', 'environments', `typeorm.${process.env.NODE_ENV}.env`),
});

getConnectionOptions().then(async options => {
    const connection = await createConnection(options);

    await connection.createQueryBuilder()
        .insert()
        .into(User)
        .values(users)
        .execute();

    await connection.createQueryBuilder()
        .insert()
        .into(Barbecue)
        .values(barbecues)
        .execute();

    await connection.createQueryBuilder()
        .createQueryBuilder()
        .insert()
        .into(Authentication)
        .values(authentications.map(i => ({ ...i, role: RoleType[i.role], user: { id: i.user_id } })))
        .execute();

    await connection.createQueryBuilder()
        .createQueryBuilder()
        .relation(Barbecue, "users")
        .of(barbecues)
        .add(users);
});