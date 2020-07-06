import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import 'reflect-metadata';

import AppError from './errors/AppError';
import './database';
import uploadConfig from './config/upload';
import 'express-async-errors';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// 4 parämetros
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        messagem: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      mesasage: 'Internal Server Error',
    });
  },
);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
