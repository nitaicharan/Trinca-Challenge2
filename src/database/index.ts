import dotenv from "dotenv";
import path from 'path';
import { createConnection, getConnectionOptions } from "typeorm";

const op = dotenv.config({
    path: path.resolve(__dirname, '..', '..', 'environment', `ormconfig.${process.env.NODE_ENV}.env`),
});

createConnection();