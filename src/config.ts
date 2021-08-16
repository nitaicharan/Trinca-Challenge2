import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: `${path.join(__dirname, '..', 'environments', `redis.${process.env.NODE_ENV}.env`)}`
});

dotenv.config({
    path: `${path.join(__dirname, '..', 'environments', `typeorm.${process.env.NODE_ENV}.env`)}`
});