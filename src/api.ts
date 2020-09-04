import express from 'express';
import routers from './routers';
import './database';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routers.forEach(router => app.use(router));

export { app };