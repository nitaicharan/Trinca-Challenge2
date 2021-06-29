import Redis from 'ioredis';

export const getData = async (key: string, param?: { [key: string]: string }) => {
    const redis = new Redis({
        port: +process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
    });
    const data = await redis.get(key);
    return JSON.parse(data) || null;
}

export const setData = async (key: string, param?: any) => {
    const redis = new Redis({
        port: +process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
    });
    await redis.set(key, JSON.stringify(param))
    return param;
}

export const deleteData = async (key: string) => {
    const redis = new Redis({
        port: +process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
    });
    await redis.del(key);
}