import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import './app_api/models/db.js';
import s3Router from './app_api/routes/s3Router.js';
import apiRouter from './app_api/routes/index.js';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", apiRouter);
app.use("/api/s3", s3Router);
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
