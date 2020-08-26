import dotenv from "dotenv";
import path from 'path';
import { createConnection, getConnectionOptions } from "typeorm";

dotenv.config({
    path: path.resolve(__dirname, '..', '..', 'environments', `typeorm.${process.env.NODE_ENV}.env`),
});

getConnectionOptions().then(createConnection);