import path from 'path';
import dotenv from 'dotenv';


dotenv.config({
    path: `${path.join(__dirname, '..', 'environments', `redis.${process.env.NODE_ENV}.env`)}`
});


dotenv.config({
    path: `${path.join(__dirname, '..', 'environments', `typeorm.${process.env.NODE_ENV}.env`)}`
});